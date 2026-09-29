#!/usr/bin/env node
// Generates csrc/generated.cpp, csrc/generated.h and build/api.json from Box2D's public headers.
//
// Every enum becomes an embind enum. Every plain struct (scalars, enums, other plain structs, fixed arrays of them)
// becomes a value object: a plain JavaScript object on the JavaScript side, copied on every crossing, nothing to
// free. Every struct with a `b2Default<Name>` function is a definition: it gets `<Name>ToJS` / `<Name>Apply` /
// `<Name>FromJS` converters that apply any subset of a JavaScript object's fields onto the C default, so its
// validation cookie and pointer fields stay right and a field left out keeps its default. Every function whose
// signature is scalars, enums, plain structs, pointers to plain structs (taken by value) or definitions (converted)
// is bound in one line; the rest is listed for csrc/glue.cpp (`manualFunctions`) or left out
// (`excludedFunctions`), and the generator fails if a header function is in none of the three. Functions are found
// by the shape of their declaration, not by a macro, and scripts/check-headers.mjs compares the result with clang's
// view of the headers at build time.
//
// build/api.json carries every function's parameter names and TypeScript types for scripts/patch-types.mjs.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { additions, arrayCounts, excludedFunctions, excludedPrefixes, extraDefFields, headers, manualFunctions, manualStructs, nestedDefStructs, pointerFields, skippedFields } from './bindings.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const include = join(root, 'box2d', 'include', 'box2d');

// ---------------------------------------------------------------------------------------------------------------
// Parsing

const callbackTypes = new Set(); // the function types (`typedef bool b2OverlapResultFcn(...)`) fields point at

/** A header without comments or preprocessor lines. */
function stripped(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, '').replace(/\r/g, '').replace(/^[ \t]*#[^\n]*$/gm, '');
}

/** A stripped header without function typedefs or brace groups (inline bodies, struct and enum bodies): every function is one declaration ending in `;`. */
function functionsOnly(text) {
  text = text.replace(/typedef\s+[^;{]*?\b(\w+)\s*\([^;]*\)\s*;/g, (_, name) => { callbackTypes.add(name); return ''; });
  let previous;
  do {
    previous = text;
    text = text.replace(/\{[^{}]*\}/g, ';'); // innermost first
  } while (text !== previous);
  return text;
}

const SCALARS = {
  float: 'number', int: 'number', bool: 'boolean', uint8_t: 'number', uint16_t: 'number', int16_t: 'number',
  uint32_t: 'number', int32_t: 'number', uint64_t: 'number', int64_t: 'number', double: 'number', unsigned: 'number',
};
const DECORATIONS = /\b(B2_API|B2_INLINE|B2_ID_INLINE|static|inline|extern)\b/g;

const enums = new Map(); // name -> [values]
const structs = new Map(); // name -> { name, fields: [{ type, name, array }], header, manual }
const functions = []; // { name, ret, params: [{ type, name, array }], header }

for (const header of headers) {
  const text = stripped(readFileSync(join(include, header), 'utf8'));
  const declarations = functionsOnly(text); // first: it collects the callback types the struct fields refer to
  for (const match of text.matchAll(/typedef\s+enum\s+(\w+)\s*\{([^}]*)\}\s*\1\s*;/g)) {
    const values = match[2].split(',').map((s) => s.trim()).filter(Boolean).map((s) => s.split('=')[0].trim());
    enums.set(match[1], values);
  }
  for (const match of text.matchAll(/typedef\s+struct\s+(\w+)\s*\{([^}]*)\}\s*\1\s*;/g)) {
    const name = match[1];
    const fields = [];
    let manual = null;
    for (const raw of match[2].split(';')) {
      const line = raw.trim();
      if (!line) continue;
      if (line.includes('(')) {
        manual = 'function pointer field'; // never a value object; a definition skips the field
        continue;
      }
      const parts = line.match(/^(.+?)\s+([\w,\s\[\]]+)$/);
      if (!parts) throw new Error(`${header}: cannot parse field '${line}' of ${name}`);
      const type = parts[1].replace(/\s+/g, ' ').trim();
      if (callbackTypes.has(type.replace(/\bconst\b/g, '').replace('*', '').trim())) {
        manual = 'function pointer field';
        continue;
      }
      for (const declarator of parts[2].split(',')) {
        const field = declarator.trim().match(/^(\w+)(?:\[(\w+)\])?$/);
        if (!field) throw new Error(`${header}: cannot parse declarator '${declarator}' of ${name}`);
        fields.push({ type, name: field[1], array: field[2] ?? null });
      }
    }
    structs.set(name, { name, fields, header, manual });
  }
  for (const match of declarations.matchAll(/([\w\s\*]+?)\s+(b2\w+)\s*\(([^)]*)\)\s*;/g)) {
    const ret = match[1].replace(DECORATIONS, ' ').replace(/\s+/g, ' ').trim();
    const name = match[2];
    if (!ret || /^(return|sizeof|if|while|for)$/.test(ret)) throw new Error(`${header}: '${name}' looks like a call, not a declaration`);
    const params = match[3].trim() === 'void' || !match[3].trim() ? [] : match[3].split(',').map((p) => {
      const m = p.trim().match(/^(.+?)\s*(\w+)(?:\[(\w+)\])?$/);
      if (!m) throw new Error(`${header}: cannot parse parameter '${p}' of ${name}`);
      return { type: m[1].replace(/\s+/g, ' ').trim(), name: m[2], array: m[3] ?? null };
    });
    functions.push({ name, ret, params, header });
  }
}

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
    if (field.type.includes('*') || field.type.startsWith('struct ')) return false;
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
  if (enums.has(bare)) return bare;
  if (defStructs.has(bare) || structs.has(bare)) return bare;
  throw new Error(`no TypeScript type for '${type}'`);
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
const defInputs = {}; // name -> the TypeScript input type
for (const name of defStructs) {
  const struct = structs.get(name);
  if (!struct) throw new Error(`definition struct ${name} is not in the headers`);
  const skip = new Set(skippedFields[name] ?? []);
  const toJS = [`val ${name}ToJS(const ${name}& d) {`, '    val o = val::object();'];
  const apply = [`void ${name}Apply(${name}& d, val o) {`];
  const nested = [];
  for (const field of struct.fields) {
    if (skip.has(field.name) || field.name === 'internalValue') continue;
    if (field.type === 'const char*') {
      toJS.push(`    o.set("${field.name}", d.${field.name} ? std::string(d.${field.name}) : std::string());`);
      // Box2D copies the string at creation; the static only has to outlive the call.
      apply.push(`    if (!o["${field.name}"].isUndefined()) { static std::string s; s = o["${field.name}"].as<std::string>(); d.${field.name} = s.c_str(); }`);
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
    extras.push({ name: extra.name, ts: `${element}[]`, tsInput: `${elementKind === 'def' ? `${element}Input` : element}[]`, doc: extra.doc, required: !!extra.required });
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
  defInputs[name] = { input: members.length ? `${base} & { ${members.join('; ')} }` : base, extras };
}

// ---------------------------------------------------------------------------------------------------------------
// Emission: functions

const api = []; // for patch-types: { name, params: [{ name, ts }], ret }
const functionLines = [];
const unbound = [];
const seen = new Set();
for (const fn of functions) {
  if (seen.has(fn.name)) continue;
  seen.add(fn.name);
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
    if (p.array !== null) { paramsOk = false; break; }
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
    unbound.push(`${fn.name}: ${fn.ret} (${fn.params.map((p) => `${p.type} ${p.name}${p.array !== null ? `[${p.array}]` : ''}`).join(', ')})`);
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
  api.push({ name: fn.name, params: args.map((a) => ({ name: a.name, ts: a.ts })), ret: retKind === 'def' ? fn.ret : tsType(fn.ret) });
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

// ---------------------------------------------------------------------------------------------------------------
// Write

emit('// ---- accessors for array, count, 64-bit and pointer fields ----');
for (const line of accessors) emit(line);
emit('');
emit('// ---- definition struct converters ----');
for (const line of converterDefs) emit(line);
emit('EMSCRIPTEN_BINDINGS(box2d_generated) {');
emit('    // ---- enums ----');
for (const [name, values] of enums) {
  emit(`    enum_<${name}>("${name}")`);
  values.forEach((v, i) => emit(`        .value("${v}", ${v})${i === values.length - 1 ? ';' : ''}`));
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

// The definition structs' JavaScript shape, for the declarations: the C fields the converters carry plus the extras.
const defTypes = {};
for (const name of defStructs) {
  const skip = new Set(skippedFields[name] ?? []);
  const fields = structs.get(name).fields
    .filter((f) => !skip.has(f.name) && f.name !== 'internalValue')
    .map((f) => ({ name: f.name, ts: f.type === 'const char*' ? 'string' : tsType(f.type) }));
  for (const extra of defInputs[name].extras) fields.push({ name: extra.name, ts: extra.ts, doc: extra.doc });
  defTypes[name] = { fields, input: defInputs[name].input };
}

// Array fields of value objects cross as JavaScript arrays; Emscripten declares them `any`.
const arrayFields = [];
for (const struct of valueStructs) {
  for (const field of struct.fields) {
    if (field.array === null) continue;
    arrayFields.push({ struct: struct.name, field: field.name, ts: `${tsType(field.type)}[]` });
  }
}

writeFileSync(join(root, 'build', 'api.json'), JSON.stringify({
  headerFunctions: [...headerFunctionNames].sort(),
  enums: [...enums.keys()],
  valueStructs: valueStructs.map((s) => s.name),
  defStructs: defTypes,
  arrayFields,
  functions: api,
}, null, 2));

const bound = api.length;
const manual = Object.keys(manualFunctions).filter((name) => headerFunctionNames.has(name)).length;
const excluded = Object.keys(excludedFunctions).length;
console.log(`headers: ${headerFunctionNames.size} functions, ${structs.size} structs, ${enums.size} enums`);
console.log(`generated: ${bound} functions, ${valueStructs.length} value objects, ${defStructs.size} definition converters; manual: ${manual} (+${additions.size} additions); excluded: ${excluded}`);
const untyped = [...structs.keys()].filter((name) => !isValueStruct(name) && !defStructs.has(name) && !manualStructs[name]);
if (untyped.length) {
  console.error(`structs that are neither value objects, definitions nor listed in manualStructs: ${untyped.join(', ')}`);
  process.exit(1);
}
