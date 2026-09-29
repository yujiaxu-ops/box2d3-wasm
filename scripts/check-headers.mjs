#!/usr/bin/env node
// The generator finds functions by the shape of their declaration. This asks clang (emcc's) for every function
// declared in Box2D's public headers and fails the build if the generator missed one, so a Box2D update that adds a
// function it cannot see stops here rather than silently leaving the function out of the module.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const header = join(root, 'box2d', 'include', 'box2d', 'box2d.h');
const known = new Set(JSON.parse(readFileSync(join(root, 'build', 'api.json'), 'utf8')).headerFunctions);

const json = execFileSync('emcc', ['-x', 'c', '-fsyntax-only', '-Wno-pragma-once-outside-header', '-Xclang', '-ast-dump=json', '-I', join(root, 'box2d', 'include'), header], { encoding: 'utf8', maxBuffer: 1 << 30 });
const declared = new Set();
(function walk(node) {
  if (!node || typeof node !== 'object') return;
  if (node.kind === 'FunctionDecl' && typeof node.name === 'string' && node.name.startsWith('b2') && !node.isImplicit) declared.add(node.name);
  for (const child of node.inner ?? []) walk(child);
})(JSON.parse(json));

const missed = [...declared].filter((name) => !known.has(name)).sort();
const invented = [...known].filter((name) => !declared.has(name)).sort();
if (missed.length) console.error(`functions clang declares that the generator did not see: ${missed.join(', ')}`);
if (invented.length) console.error(`functions the generator saw that clang does not declare: ${invented.join(', ')}`);
if (missed.length || invented.length) process.exit(1);
console.log(`headers check: ${declared.size} functions, the generator saw every one`);
