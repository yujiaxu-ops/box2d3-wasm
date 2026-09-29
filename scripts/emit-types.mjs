#!/usr/bin/env node
// Writes the declaration file from build/api.json (what the generator bound, with Box2D's own doc comments) and
// bindings.config.mjs (the hand-written functions' signatures and the types they refer to). The same data made
// csrc/generated.cpp, so the declarations cannot drift from the bindings; test/box2d.test.mjs checks the module
// against the file all the same.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { additionDocs, manualFunctions, manualTypes, typeNotes } from './bindings.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2];
if (!file) {
  console.error('usage: emit-types.mjs <box2d.d.mts>');
  process.exit(2);
}
const api = JSON.parse(readFileSync(join(root, 'build', 'api.json'), 'utf8'));

const doc = (text, indent = '') => (text ? `${indent}/** ${text} */\n` : '');
const lines = [];

lines.push(
  '// Box2D v3 for JavaScript: the declarations of the embind bindings scripts/gen-bindings.mjs generates from Box2D\'s',
  '// headers and csrc/glue.cpp writes by hand, with the doc comments of the headers. Written by scripts/emit-types.mjs;',
  '// do not edit. Structs are plain objects, copied on every crossing; a definition goes in as any subset of its',
  '// fields; 64-bit integers are numbers (exact up to 2^53); enums are the `b2*` objects of the module.',
  '',
);

// Enums: each value is an object of the module, compared with ===.
for (const { name, doc: text, values } of api.enums) {
  lines.push(doc(`A value of ${name}; compare with ===.`).trimEnd());
  lines.push(`export interface ${name}Value<T extends number> {`, '  readonly value: T;', '}', '');
  lines.push(`${doc(text)}export type ${name} = ${values.map((v) => `${name}Value<${v.value}>`).join(' | ')};`, '');
}

// Value objects.
for (const { name, doc: text, fields } of api.valueStructs) {
  const note = typeNotes[name];
  lines.push(`${doc([text, note].filter(Boolean).join(' '))}export interface ${name} {`);
  for (const field of fields) lines.push(`${doc(field.doc, '  ')}  ${field.name}: ${field.ts};`);
  lines.push('}', '');
}

// Definitions: what b2Default* returns, and what the functions taking one accept.
for (const [name, { doc: text, fields, input }] of Object.entries(api.defStructs)) {
  lines.push(`${doc(text)}export interface ${name} {`);
  for (const field of fields) lines.push(`${doc(field.doc, '  ')}  ${field.name}: ${field.ts};`);
  lines.push('}', '');
  lines.push(`/** What the functions taking a ${name} accept: a subset of its fields; one left out keeps the default of b2Default${name.slice(2)}(). */`);
  lines.push(`export type ${name}Input = ${input};`, '');
}

lines.push(manualTypes.trim(), '');

// The module.
lines.push('/** The Box2D module: every function of the C API on one object, ready once the wasm is instantiated. */');
lines.push('export interface Box2D {');
for (const { name, doc: text, values } of api.enums) {
  lines.push(`${doc(text, '  ')}  readonly ${name}: {`);
  for (const v of values) lines.push(`${doc(v.doc, '    ')}    readonly ${v.name}: ${name}Value<${v.value}>;`);
  lines.push('  };');
}
for (const fn of api.functions) {
  lines.push(`${doc(fn.doc, '  ')}  ${fn.name}(${fn.params.map((p) => `${p.name}: ${p.ts}`).join(', ')}): ${fn.ret};`);
}
for (const [name, signature] of Object.entries(manualFunctions)) {
  const text = api.manualDocs[name] ?? additionDocs[name];
  if (text === undefined) {
    console.error(`no doc for the hand-written function ${name}: an addition needs an additionDocs entry`);
    process.exit(1);
  }
  lines.push(`${doc(text, '  ')}  ${signature};`);
}
lines.push('}', '');
lines.push('/** Instantiates the wasm; the `locateFile` option redirects the .wasm request. */');
lines.push('export default function createBox2D(options?: { locateFile?(path: string, prefix: string): string }): Promise<Box2D>;', '');

writeFileSync(file, lines.join('\n'));
console.log(`declared ${api.enums.length} enums, ${api.valueStructs.length} value objects, ${Object.keys(api.defStructs).length} definitions, ${api.functions.length + Object.keys(manualFunctions).length} functions`);
