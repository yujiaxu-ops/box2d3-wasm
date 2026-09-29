#!/usr/bin/env node
// Completes the declaration file Emscripten emits (--emit-tsd) from build/api.json and bindings.config.mjs:
// parameter names from the headers instead of `_0, _1`, the definition structs as interfaces with their input
// types, the hand-written functions with their real signatures instead of `any`, the array fields, and the types
// they refer to. Fails when anything it expects to patch is not there, so the generator, the config, Emscripten's
// output and this file cannot drift apart unnoticed.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { manualFunctions, manualTypes, typeNotes } from './bindings.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2];
if (!file) {
  console.error('usage: patch-types.mjs <box2d.d.mts>');
  process.exit(2);
}
const api = JSON.parse(readFileSync(join(root, 'build', 'api.json'), 'utf8'));
let text = readFileSync(file, 'utf8');

/** Replaces the first match of `pattern`, or fails. */
function replace(what, pattern, replacement) {
  if (!pattern.test(text)) {
    console.error(`nothing to patch for ${what}`);
    process.exit(1);
  }
  text = text.replace(pattern, replacement);
}

/** Replaces the one line declaring `name` inside EmbindModule. */
function replaceDeclaration(name, declaration) {
  replace(`the declaration of ${name}`, new RegExp(`^  ${name}\\(.*\\): .*;$`, 'm'), `  ${declaration};`);
}

for (const fn of api.functions) {
  replaceDeclaration(fn.name, `${fn.name}(${fn.params.map((p) => `${p.name}: ${p.ts}`).join(', ')}): ${fn.ret}`);
}
for (const [name, signature] of Object.entries(manualFunctions)) replaceDeclaration(name, signature);

// Array fields of value objects.
for (const { struct, field, ts } of api.arrayFields) {
  replace(`the array field ${struct}.${field}`, new RegExp(`(export type ${struct} = \\{[^}]*?\\n  ${field}: )any`), `$1${ts}`);
}

// Notes on generated value objects.
for (const [name, note] of Object.entries(typeNotes)) {
  replace(`the note on ${name}`, new RegExp(`^export type ${name} = `, 'm'), `/** ${note} */\nexport type ${name} = `);
}

// The definition structs: plain objects the `b2Default*` functions return; any subset goes into the `b2Create*`
// functions, a field left out keeps its default.
const defs = Object.entries(api.defStructs).map(([name, { fields, input }]) => {
  const lines = fields.map((f) => `${f.doc ? `  /** ${f.doc} */\n` : ''}  ${f.name}: ${f.ts};`);
  return `export interface ${name} {\n${lines.join('\n')}\n}\n\n/** What the functions taking a ${name} accept: a subset of its fields; one left out keeps the default of b2Default${name.slice(2)}(). */\nexport type ${name}Input = ${input};`;
}).join('\n\n');

// The stack helpers post.js uses are runtime internals, not part of the module (post.js removes them from it); with
// them gone the runtime exports namespace is empty, and an empty namespace is not a value.
replace('the runtime exports namespace', /^declare namespace RuntimeExports \{\n    function stackSave\(\): any;\n    function stackRestore\(val: any\): any;\n\}\n/m, '');
replace('the runtime exports in MainModule', /typeof RuntimeExports & /, '');

const header = [
  '// Box2D v3 for JavaScript: the declarations Emscripten emits for the embind bindings (scripts/gen-bindings.mjs,',
  '// csrc/glue.cpp), completed by scripts/patch-types.mjs with the parameter names of Box2D\'s headers, the',
  '// definition structs and the hand-written functions. Structs are plain objects, copied on every crossing;',
  '// 64-bit integers are numbers (exact up to 2^53); enums are the `b2*` objects of the module.',
].join('\n');
replace('the header comment', /^\/\/ TypeScript bindings for emscripten-generated code\.[^\n]*\n/, `${header}\n`);
replace('the EmbindModule interface', /^interface EmbindModule \{/m, `${defs}\n${manualTypes.trim()}\n\ninterface EmbindModule {`);
replace('the default export', /^export default function MainModuleFactory ?\(options\?: unknown\): Promise<MainModule>;/m,
  '/** The Box2D module: every function of the C API on one object, ready once the wasm is instantiated. */\nexport type Box2D = MainModule;\n\n/** Instantiates the wasm; the `locateFile` option redirects the .wasm request. */\nexport default function createBox2D(options?: { locateFile?(path: string, prefix: string): string }): Promise<MainModule>;');

writeFileSync(file, text);
const anys = [...text.matchAll(/: any\b/g)].length;
console.log(`patched ${api.functions.length + Object.keys(manualFunctions).length} declarations; ${anys} 'any' left`);
if (anys) {
  console.error('the declarations must not contain `any`');
  process.exit(1);
}
