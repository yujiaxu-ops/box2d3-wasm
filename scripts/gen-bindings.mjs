#!/usr/bin/env node
// Generates csrc/generated.cpp, csrc/generated.h and build/api.json from Box2D's public headers, as clang sees them:
// the one source is `emcc -Xclang -ast-dump=json` over box2d.h, so every enum, struct, field, function, parameter
// name, array size and doc comment comes from the compiler, not from a pattern over the text.
//
// Every enum becomes an embind enum. Every plain struct (scalars, enums, other plain structs, fixed arrays of them)
// becomes a value object: a plain JavaScript object on the JavaScript side, copied on every crossing, nothing to
// free. Every struct with a `b2Default<Name>` function is a definition: it gets `<Name>ToJS` / `<Name>Apply` /
// `<Name>FromJS` converters that apply any subset of a JavaScript object's fields onto the C default, so its
// validation cookie and pointer fields stay right and a field left out keeps its default. Every function whose
// signature is scalars, enums, plain structs, pointers to plain structs (taken by value) or definitions (converted)
// is bound in one line; the rest is listed for csrc/glue.cpp (`manualFunctions`) or left out
// (`excludedFunctions`), and the generator fails if a header function is in none of the three.
//
// build/api.json carries everything scripts/emit-types.mjs needs for the declaration file.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { additions, arrayCounts, excludedFunctions, excludedPrefixes, extraDefFields, manualFunctions, manualStructs, nestedDefStructs, pointerFields, skippedFields } from './bindings.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------------------------------------------------------
// Parsing: clang's AST of box2d.h (which includes every other public header)

const ast = JSON.parse(execFileSync('emcc', [
  '-x', 'c', '-fsyntax-only', '-Wno-pragma-once-outside-header', '-Xclang', '-ast-dump=json',
  '-I', join(root, 'box2d', 'include'), join(root, 'box2d', 'include', 'box2d', 'box2d.h'),
], { encoding: 'utf8', maxBuffer: 1 << 30 }));

/** The paragraphs of a declaration's doc comment, as one line; '' without one. */
function docOf(node) {
  const comment = (node.inner ?? []).find((n) => n.kind === 'FullComment');
  if (!comment) return '';
  const texts = [];
  for (const paragraph of comment.inner ?? []) {
    if (paragraph.kind !== 'ParagraphComment') continue;
    for (const text of paragraph.inner ?? []) if (text.kind === 'TextComment') texts.push(text.text.trim());
  }
  return texts.filter(Boolean).join(' ').replace(/\s+/g, ' ').replace(/\*\//g, '* /');
}

/** A C type as this file spells it: no space before `*`, `bool` for `_Bool`, no `struct`/`enum` tag. */
const spell = (qualType) => qualType.replace(/\s*\*/g, '*').replace(/\b_Bool\b/g, 'bool').replace(/\b(struct|enum) /g, '').trim();

const callbackTypes = new Set(); // the function types (`typedef bool b2OverlapResultFcn(...)`) that fields and parameters point at
const enums = new Map(); // name -> { doc, values: [{ name, value, doc }] }
const structs = new Map(); // name -> { name, doc, fields: [{ type, name, array, doc }], manual }
const functions = []; // { name, doc, ret, params: [{ type, name }] }

for (const node of ast.inner) {
  if (!node.name?.startsWith('b2')) continue;
  if (node.kind === 'TypedefDecl') {
    if (node.type.qualType.includes('(')) callbackTypes.add(node.name);
  } else if (node.kind === 'EnumDecl') {
    const values = [];
    let next = 0;
    for (const constant of node.inner ?? []) {
      if (constant.kind !== 'EnumConstantDecl') continue;
      const given = (constant.inner ?? []).find((n) => n.kind === 'ConstantExpr');
      const value = given ? Number(given.value) : next;
      values.push({ name: constant.name, value, doc: docOf(constant) });
      next = value + 1;
    }
    enums.set(node.name, { doc: docOf(node), values });
  } else if (node.kind === 'RecordDecl' && node.completeDefinition) {
    const fields = [];
    let manual = null;
    for (const field of node.inner ?? []) {
      if (field.kind !== 'FieldDecl') continue;
      const qualType = spell(field.type.qualType);
      if (qualType.includes('(*)') || callbackTypes.has(qualType.replace(/\bconst\b/g, '').replace('*', '').trim())) {
        manual = 'function pointer field'; // never a value object; a definition skips the field
        continue;
      }
      const array = qualType.match(/^(.+?)\[(\d+)\]$/);
      fields.push({ type: array ? array[1] : qualType, name: field.name, array: array ? Number(array[2]) : null, doc: docOf(field) });
    }
    structs.set(node.name, { name: node.name, doc: docOf(node), fields, manual });
  } else if (node.kind === 'FunctionDecl') {
    if (functions.some((f) => f.name === node.name)) continue;
    const signature = node.type.qualType;
    const ret = spell(signature.slice(0, signature.indexOf('(')));
    const params = (node.inner ?? []).filter((n) => n.kind === 'ParmVarDecl').map((p, i) => ({ type: spell(p.type.qualType), name: p.name ?? `_${i}` }));
    functions.push({ name: node.name, doc: docOf(node), ret, params });
  }
}

const SCALARS = {
  float: 'number', int: 'number', bool: 'boolean', uint8_t: 'number', uint16_t: 'number', int16_t: 'number',
  uint32_t: 'number', int32_t: 'number', uint64_t: 'number', int64_t: 'number', double: 'number', unsigned: 'number',
};

// ---------------------------------------------------------------------------------------------------------------
// Classification

const headerFunctionNames = new Set(functions.map((f) => f.name));
const defStructs = new Set(nestedDefStructs);
for (const name of structs.keys()) if (headerFunctionNames.has(`b2Default${name.slice(2)}`)) defStructs.add(name);

/** 'scalar' | 'enum' | 'value' | 'def' | 'manual' | null for a bare type name. */
function kindOf(type) {
  if (SCALARS[type]) return 'scalar';
  if (enums.has(type)) return 'enum';
  if (defStructs.has(type)) return 'def';
  if (manualStructs[type]) return 'manual';
  if (structs.has(type)) return structs.get(type).manual ? 'manual' : 'value';
  return null;
}

const isPointerField = (structName, field) => (pointerFields[structName] ?? []).includes(field.name);

// A struct is a value object when every field is bindable; decided recursively since structs nest.
const valueOk = new Map();
function isValueStruct(name) {
  if (valueOk.has(name)) return valueOk.get(name);
  const struct = structs.get(name);
  if (!struct || struct.manual || defStructs.has(name) || manualStructs[name]) return valueOk.set(name, false).get(name);
  valueOk.set(name, true); // provisional, for cycles
  const ok = struct.fields.every((field) => {
    if (isPointerField(name, field)) return field.type === 'void*';
    if (field.type.includes('*')) return false;
    const kind = kindOf(field.type);
    return kind === 'scalar' || kind === 'enum' || (kind === 'value' && isValueStruct(field.type));
  });
  valueOk.set(name, ok);
  return ok;
}
for (const name of structs.keys()) isValueStruct(name);

/** The TypeScript type of a C type as the binding presents it (a definition as its full interface). */
function tsType(type) {
  const bare = type.replace(/\bconst\b/g, '').replace('*', '').trim();
  if (SCALARS[bare]) return SCALARS[bare];
  if (bare === 'void') return 'void';
  if (bare === 'char' && type.includes('*')) return 'string';
  if (enums.has(bare)) return bare;
  if (defStructs.has(bare) || structs.has(bare)) return bare;
  throw new Error(`no TypeScript type for '${type}'`);
}

/** The TypeScript type of a struct field. */
function fieldTs(structName, field) {
  if (isPointerField(structName, field)) return 'number';
  const ts = tsType(field.type);
  return field.array !== null ? `${ts}[]` : ts;
}

const is64 = (type) => type === 'uint64_t' || type === 'int64_t';
const from64 = (type) => (type === 'uint64_t' ? 'toU64' : 'toI64');

// ---------------------------------------------------------------------------------------------------------------
// Emission: enums and value objects

const out = [];
const emit = (line = '') => out.push(line);

emit('// GENERATED by scripts/gen-bindings.mjs from box2d/include/box2d/*.h. Do not edit; run `npm run gen`.');
emit('#include "glue.h"');
emit('');
emit('using namespace emscripten;');
emit('');

// Field accessors for arrays, counts, 64-bit integers and pointers live outside the bindings block.
const accessors = [];
function fieldBinding(structName, field, countCapacity) {
  const key = `${structName}.${field.name}`;
  const getter = `get_${structName}_${field.name}`;
  const setter = `set_${structName}_${field.name}`;
  if (field.array !== null) {
    // Arrays cross as JavaScript arrays of the live count, never past the capacity; a short array is zero-filled.
    if (!(key in arrayCounts)) throw new Error(`arrayCounts needs an entry for ${key}`);
    const count = arrayCounts[key];
    const live = count === null ? `static_cast<int>(std::size(s.${field.name}))` : `std::min(static_cast<int>(s.${count}), static_cast<int>(std::size(s.${field.name})))`;
    accessors.push(`static val ${getter}(const ${structName}& s) { return arrayToVal(s.${field.name}, ${live}); }`);
    accessors.push(`static void ${setter}(${structName}& s, val v) { valToArray(v, s.${field.name}, static_cast<int>(std::size(s.${field.name}))); }`);
    return `.field("${field.name}", &${getter}, &${setter})`;
  }
  if (countCapacity !== undefined) {
    // The count of an array field: clamped to the smallest capacity of the arrays it counts.
    accessors.push(`static ${field.type} ${getter}(const ${structName}& s) { return s.${field.name}; }`);
    accessors.push(`static void ${setter}(${structName}& s, ${field.type} v) { s.${field.name} = v < 0 ? 0 : (v > ${countCapacity} ? ${countCapacity} : v); }`);
    return `.field("${field.name}", &${getter}, &${setter})`;
  }
  if (is64(field.type)) {
    // 64-bit integers cross as doubles: exact up to 2^53, which covers every mask a game uses, without BigInt.
    accessors.push(`static double ${getter}(const ${structName}& s) { return static_cast<double>(s.${field.name}); }`);
    accessors.push(`static void ${setter}(${structName}& s, double v) { s.${field.name} = ${from64(field.type)}(v); }`);
    return `.field("${field.name}", &${getter}, &${setter})`;
  }
  if (isPointerField(structName, field)) {
    accessors.push(`static uint32_t ${getter}(const ${structName}& s) { return toInt(s.${field.name}); }`);
    accessors.push(`static void ${setter}(${structName}& s, uint32_t v) { s.${field.name} = fromInt(v); }`);
    return `.field("${field.name}", &${getter}, &${setter})`;
  }
  return `.field("${field.name}", &${structName}::${field.name})`;
}

const valueStructs = [...structs.values()].filter((s) => isValueStruct(s.name));
const valueLines = [];
for (const struct of valueStructs) {
  // A count field's capacity: the smallest capacity among the arrays it counts.
  const countCapacity = new Map();
  for (const field of struct.fields) {
    if (field.array === null) continue;
    const count = arrayCounts[`${struct.name}.${field.name}`];
    if (!count) continue;
    const capacity = `static_cast<${struct.fields.find((f) => f.name === count).type}>(std::size(s.${field.name}))`;
    countCapacity.set(count, countCapacity.has(count) ? `std::min(${countCapacity.get(count)}, ${capacity})` : capacity);
  }
  valueLines.push(`    value_object<${struct.name}>("${struct.name}")`);
  for (const field of struct.fields) valueLines.push(`        ${fieldBinding(struct.name, field, countCapacity.get(field.name))}`);
  valueLines[valueLines.length - 1] += ';';
}

// ---------------------------------------------------------------------------------------------------------------
// Emission: definition converters

// `<Name>Apply` writes the fields a JavaScript object carries onto a C struct; `<Name>FromJS` starts from the C
// default (a nested definition, like a joint def's `base`, has none of its own and is applied in place).
const converterDecls = [];
const converterDefs = [];
const defTypes = {}; // name -> { doc, fields: [{ name, ts, doc }], input }
for (const name of defStructs) {
  const struct = structs.get(name);
  if (!struct) throw new Error(`definition struct ${name} is not in the headers`);
  const skip = new Set(skippedFields[name] ?? []);
  const toJS = [`val ${name}ToJS(const ${name}& d) {`, '    val o = val::object();'];
  const apply = [`void ${name}Apply(${name}& d, val o) {`];
  const fields = [];
  const nested = [];
  for (const field of struct.fields) {
    if (skip.has(field.name) || field.name === 'internalValue') continue;
    if (field.type === 'const char*') {
      toJS.push(`    o.set("${field.name}", d.${field.name} ? std::string(d.${field.name}) : std::string());`);
      // Box2D copies the string at creation; the static only has to outlive the call.
      apply.push(`    if (!o["${field.name}"].isUndefined()) { static std::string s; s = o["${field.name}"].as<std::string>(); d.${field.name} = s.c_str(); }`);
      fields.push({ name: field.name, ts: 'string', doc: field.doc });
      continue;
    }
    if (field.array !== null || field.type.includes('*')) throw new Error(`definition field ${name}.${field.name} needs a skippedFields entry or a converter`);
    const kind = kindOf(field.type);
    if (kind === 'def') {
      nested.push({ name: field.name, ts: `${field.type}Input` });
      toJS.push(`    o.set("${field.name}", ${field.type}ToJS(d.${field.name}));`);
      apply.push(`    if (!o["${field.name}"].isUndefined()) ${field.type}Apply(d.${field.name}, o["${field.name}"]);`);
    } else if (is64(field.type)) {
      toJS.push(`    o.set("${field.name}", static_cast<double>(d.${field.name}));`);
      apply.push(`    if (!o["${field.name}"].isUndefined()) d.${field.name} = ${from64(field.type)}(o["${field.name}"].as<double>());`);
    } else if (kind === 'scalar' || kind === 'enum' || kind === 'value') {
      toJS.push(`    o.set("${field.name}", d.${field.name});`);
      apply.push(`    if (!o["${field.name}"].isUndefined()) d.${field.name} = o["${field.name}"].as<${field.type}>();`);
    } else {
      throw new Error(`definition field ${name}.${field.name} has unbindable type ${field.type}`);
    }
    fields.push({ name: field.name, ts: tsType(field.type), doc: field.doc });
  }
  // The arrays behind pointer-and-count fields read out as JavaScript arrays; glue.cpp owns them on the way in.
  const extras = [];
  for (const extra of extraDefFields[name] ?? []) {
    const pointer = struct.fields.find((f) => f.name === extra.array.pointer);
    if (!pointer) throw new Error(`extraDefFields: ${name}.${extra.array.pointer} is not a field`);
    const element = pointer.type.replace(/\bconst\b/g, '').replace('*', '').trim();
    const elementKind = kindOf(element);
    if (elementKind === 'def') {
      toJS.push(`    { val a = val::array(); for (int i = 0; i < d.${extra.array.count}; i++) a.set(i, ${element}ToJS(d.${extra.array.pointer}[i])); o.set("${extra.name}", a); }`);
    } else if (elementKind === 'value') {
      toJS.push(`    o.set("${extra.name}", arrayToVal(d.${extra.array.pointer}, d.${extra.array.count}));`);
    } else {
      throw new Error(`extraDefFields: ${name}.${extra.name} has unbindable element type ${element}`);
    }
    const ts = `${element}[]`;
    fields.push({ name: extra.name, ts, doc: extra.doc });
    extras.push({ name: extra.name, tsInput: `${elementKind === 'def' ? `${element}Input` : element}[]`, required: !!extra.required });
  }
  toJS.push('    return o;', '}');
  apply.push('}');
  converterDecls.push(`emscripten::val ${name}ToJS(const ${name}& d);`, `void ${name}Apply(${name}& d, emscripten::val o);`);
  converterDefs.push(...toJS, '', ...apply, '');
  const defaultFn = `b2Default${name.slice(2)}`;
  if (headerFunctionNames.has(defaultFn)) {
    converterDecls.push(`${name} ${name}FromJS(emscripten::val o);`);
    converterDefs.push(`${name} ${name}FromJS(val o) {`, `    ${name} d = ${defaultFn}();`, `    ${name}Apply(d, o);`, '    return d;', '}', '');
  }
  // The input type: any subset of the interface, nested definitions as their own input types, the extras as declared.
  const own = [...nested, ...extras];
  const base = own.length ? `Partial<Omit<${name}, ${own.map((f) => `'${f.name}'`).join(' | ')}>>` : `Partial<${name}>`;
  const members = [...nested.map((f) => `${f.name}?: ${f.ts}`), ...extras.map((f) => `${f.name}${f.required ? '' : '?'}: ${f.tsInput}`)];
  defTypes[name] = { doc: struct.doc, fields, input: members.length ? `${base} & { ${members.join('; ')} }` : base };
}

// ---------------------------------------------------------------------------------------------------------------
// Emission: functions

const api = []; // { name, doc, params: [{ name, ts }], ret }
const functionLines = [];
const unbound = [];
for (const fn of functions) {
  if (excludedFunctions[fn.name]) continue;
  if (Object.keys(excludedPrefixes).some((prefix) => fn.name.startsWith(prefix))) continue;
  if (manualFunctions[fn.name]) continue;
  // Return type: scalar (64-bit ones as double), enum, value struct by value, or a definition by value (converted).
  const retKind = kindOf(fn.ret);
  const retOk = fn.ret === 'void' || retKind === 'scalar' || retKind === 'enum' || (retKind === 'value' && isValueStruct(fn.ret)) || retKind === 'def';
  // Parameters: by value (scalar, enum, value struct), const pointer to a value or definition struct, or a definition by value.
  const args = [];
  let paramsOk = retOk;
  for (const p of fn.params) {
    const pointer = p.type.endsWith('*');
    const bare = p.type.replace(/\bconst\b/g, '').replace('*', '').trim();
    const kind = kindOf(bare);
    if (pointer) {
      if (!p.type.startsWith('const ')) { paramsOk = false; break; } // out-parameter or mutable input: by hand
      if (kind === 'value' && isValueStruct(bare)) args.push({ decl: `const ${bare}& ${p.name}`, pass: `&${p.name}`, ts: bare, name: p.name });
      else if (kind === 'def') args.push({ decl: `val ${p.name}`, pre: `${bare} ${p.name}_ = ${bare}FromJS(${p.name});`, pass: `&${p.name}_`, ts: `${bare}Input`, name: p.name });
      else { paramsOk = false; break; }
    } else if (kind === 'scalar' || kind === 'enum' || (kind === 'value' && isValueStruct(bare))) {
      if (is64(bare)) args.push({ decl: `double ${p.name}`, pass: `${from64(bare)}(${p.name})`, ts: 'number', name: p.name });
      else args.push({ decl: `${bare} ${p.name}`, pass: p.name, ts: tsType(bare), name: p.name });
    } else if (kind === 'def') {
      args.push({ decl: `val ${p.name}`, pre: `${bare} ${p.name}_ = ${bare}FromJS(${p.name});`, pass: `${p.name}_`, ts: `${bare}Input`, name: p.name });
    } else {
      paramsOk = false;
      break;
    }
  }
  if (!paramsOk) {
    unbound.push(`${fn.name}: ${fn.ret} (${fn.params.map((p) => `${p.type} ${p.name}`).join(', ')})`);
    continue;
  }
  const direct = args.every((a) => !a.pre && !a.decl.startsWith('const ') && !a.decl.startsWith('double ')) && retKind !== 'def' && !is64(fn.ret);
  if (direct) {
    functionLines.push(`    function("${fn.name}", &${fn.name});`);
  } else {
    const body = [];
    for (const a of args) if (a.pre) body.push(a.pre);
    const call = `${fn.name}(${args.map((a) => a.pass).join(', ')})`;
    if (fn.ret === 'void') body.push(`${call};`);
    else if (retKind === 'def') body.push(`return ${fn.ret}ToJS(${call});`);
    else if (is64(fn.ret)) body.push(`return static_cast<double>(${call});`);
    else body.push(`return ${call};`);
    const retDecl = retKind === 'def' ? 'val' : is64(fn.ret) ? 'double' : fn.ret;
    functionLines.push(`    function("${fn.name}", +[](${args.map((a) => a.decl).join(', ')}) -> ${retDecl} { ${body.join(' ')} });`);
  }
  api.push({ name: fn.name, doc: fn.doc, params: args.map((a) => ({ name: a.name, ts: a.ts })), ret: retKind === 'def' ? fn.ret : tsType(fn.ret) });
}

// Every header function must be generated, manual or excluded; every manual function must be in the headers or a
// declared addition.
const missing = unbound.filter((line) => !manualFunctions[line.split(':')[0]]);
if (missing.length) {
  console.error('functions the generator cannot bind that bindings.config.mjs neither lists as manual nor excludes:\n  ' + missing.join('\n  '));
  process.exit(1);
}
const unknownManual = Object.keys(manualFunctions).filter((name) => !headerFunctionNames.has(name) && !additions.has(name));
if (unknownManual.length) {
  console.error(`manualFunctions not in the headers and not declared in additions: ${unknownManual.join(', ')}`);
  process.exit(1);
}
for (const name of Object.keys(excludedFunctions)) if (!headerFunctionNames.has(name)) console.warn(`excludedFunctions: ${name} is not in the headers any more`);
for (const name of additions) if (headerFunctionNames.has(name)) console.warn(`additions: ${name} is now in the headers`);
const untyped = [...structs.keys()].filter((name) => !isValueStruct(name) && !defStructs.has(name) && !manualStructs[name]);
if (untyped.length) {
  console.error(`structs that are neither value objects, definitions nor listed in manualStructs: ${untyped.join(', ')}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------------------------------------------
// Write

emit('// ---- accessors for array, count, 64-bit and pointer fields ----');
for (const line of accessors) emit(line);
emit('');
emit('// ---- definition struct converters ----');
for (const line of converterDefs) emit(line);
emit('EMSCRIPTEN_BINDINGS(box2d_generated) {');
emit('    // ---- enums ----');
for (const [name, { values }] of enums) {
  emit(`    enum_<${name}>("${name}")`);
  values.forEach((v, i) => emit(`        .value("${v.name}", ${v.name})${i === values.length - 1 ? ';' : ''}`));
}
emit('');
emit('    // ---- value objects ----');
for (const line of valueLines) emit(line);
emit('');
emit('    // ---- functions ----');
for (const line of functionLines) emit(line);
emit('}');
emit('');

mkdirSync(join(root, 'build'), { recursive: true });
writeFileSync(join(root, 'csrc', 'generated.cpp'), out.join('\n'));
writeFileSync(join(root, 'csrc', 'generated.h'), [
  '// GENERATED by scripts/gen-bindings.mjs. Converters between the definition structs and plain JavaScript objects.',
  '#pragma once',
  '#include <box2d/box2d.h>',
  '#include <emscripten/val.h>',
  '#include <string>',
  '',
  ...converterDecls,
  '',
].join('\n'));

const headerDocs = Object.fromEntries(functions.filter((f) => manualFunctions[f.name]).map((f) => [f.name, f.doc]));
writeFileSync(join(root, 'build', 'api.json'), JSON.stringify({
  enums: [...enums].map(([name, { doc, values }]) => ({ name, doc, values })),
  valueStructs: valueStructs.map((s) => ({ name: s.name, doc: s.doc, fields: s.fields.map((f) => ({ name: f.name, ts: fieldTs(s.name, f), doc: f.doc })) })),
  defStructs: defTypes,
  functions: api,
  manualDocs: headerDocs,
}, null, 2));

console.log(`headers: ${headerFunctionNames.size} functions, ${structs.size} structs, ${enums.size} enums`);
console.log(`generated: ${api.length} functions, ${valueStructs.length} value objects, ${defStructs.size} definition converters; manual: ${Object.keys(manualFunctions).filter((name) => headerFunctionNames.has(name)).length} (+${additions.size} additions); excluded: ${Object.keys(excludedFunctions).length}`);
