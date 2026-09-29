# @mora/box2d3-wasm

[Box2D v3](https://github.com/erincatto/box2d) compiled to WebAssembly, with bindings generated from Box2D's own
headers. Structs are plain JavaScript objects, definitions take any subset of their fields, there is nothing to free,
exceptions never cross into wasm, and the declarations are complete.

This is a fork of [box2d3-wasm](https://github.com/Birch-san/box2d3-wasm) by Alex Birch and Erik Sombroek, made for
the Mora game engine. It keeps their Emscripten and embind approach and the pinned Box2D commit, and replaces the
hand-written glue with a generator. See [CHANGELOG.md](CHANGELOG.md) for what changed and why.

## Use

```js
import createBox2D from '@mora/box2d3-wasm';

const B = await createBox2D();

const worldId = B.b2CreateWorld({ gravity: { x: 0, y: -10 } });

const ground = B.b2CreateBody(worldId, { position: { x: 0, y: -1 } });
B.b2CreatePolygonShape(ground, { material: { friction: 0.6 } }, B.b2MakeBox(10, 1));

const bodyId = B.b2CreateBody(worldId, { type: B.b2BodyType.b2_dynamicBody, position: { x: 0, y: 4 } });
B.b2CreateCircleShape(bodyId, {}, { center: { x: 0, y: 0 }, radius: 0.5 });

for (let i = 0; i < 60; i++) B.b2World_Step(worldId, 1 / 60, 4);
console.log(B.b2Body_GetPosition(bodyId)); // { x: 0, y: 0.4999… }

B.b2DestroyWorld(worldId);
```

The module is an ES module with the `.wasm` beside it. Bundlers that understand `new URL(..., import.meta.url)` find it
on their own; otherwise pass `locateFile` to `createBox2D` to say where it is. `@mora/box2d3-wasm/debug` is the same
API built with Box2D's assertions, Emscripten's runtime checks and a source map.

The functions are Box2D's C API, one for one, with the names of Box2D's headers. Read
[Box2D's documentation](https://box2d.org/documentation/) for what they do; this file only describes how the C types
appear in JavaScript.

### How C types appear

| C | JavaScript |
| --- | --- |
| a struct without pointers (`b2Vec2`, `b2Transform`, `b2Polygon`, `b2Manifold`, ids, …) | a plain object, copied on every crossing. `{ x: 1, y: 2 }` is a `b2Vec2`. Every field must be present. Fixed-size arrays are JavaScript arrays of the live count: `b2Polygon.vertices` has `count` entries; a count above the array's capacity is clamped, an array shorter than its count is zero-filled. |
| a definition: every struct with a `b2Default*` function (`b2WorldDef`, `b2BodyDef`, `b2ShapeDef`, `b2ChainDef`, the joint defs, `b2Filter`, `b2QueryFilter`, `b2SurfaceMaterial`, `b2ExplosionDef`, `b2DebugDraw`) | a plain object. `b2Default*()` returns it whole; the functions that take one accept any subset of its fields (the `b2*DefInput` types), nested definitions included, and a field left out keeps its C default. `userData` and the callback fields are not exposed. `b2ChainDef.points` and `.materials` are arrays. |
| `enum` | an object of the module: `B.b2BodyType.b2_dynamicBody`. Compare with `===`. A raw number is not an enum value. |
| `uint64_t` (collision masks, user material ids) | a `number`, exact up to 2^53 (a larger value is what the double holds). `UINT64_MAX` reads as 2^64 and writes back as `UINT64_MAX`; a negative number converts as C converts a signed integer, so `-1` is all ones. |
| `float`, `int`, `bool`, `const char*` | `number`, `number`, `boolean`, `string`. |
| a callback (`b2World_CastRay`, `b2World_OverlapAABB`, `b2World_CollideMover`, …) | a JavaScript function receiving plain objects and returning what Box2D's callback returns. The `context` parameter does not exist. |
| a persistent callback (`b2World_SetPreSolveCallback`, `b2World_SetCustomFilterCallback`) | a JavaScript function or `null`. The binding keeps it for the world until it is replaced, cleared with `null`, or the world is destroyed. |
| an array in (`b2ComputeHull`, `b2MakeProxy`, `b2SolvePlanes`, `b2ChainDef.points`, …) | a JavaScript array; the count parameter does not exist. |
| an array out (`b2Body_GetShapes`, `b2Body_GetContactData`, `b2Chain_GetSegments`, …) | the function returns an array; the capacity parameter does not exist. |
| an out-parameter (`b2GetLengthAndNormalize`, `b2Joint_GetConstraintTuning`, `b2DistanceJoint_GetSpringForceRange`) | a field of the returned object. `b2SolvePlanes(targetDelta, planes)` returns `{ translation, iterationCount, planes }`: Box2D writes `push` into the planes, so the pushed planes come back rather than the input being mutated. |
| a simplex cache (`b2ShapeDistance`, `b2CollideChainSegmentAnd*`) | not exposed: every call starts from a cold cache, and `b2ShapeDistance` returns no simplexes. |
| events (`b2World_GetContactEvents`, …) | an object of arrays: `{ beginEvents: [...], endEvents: [...], hitEvents: [...] }`. A move or joint event's `userData` is the integer below. |
| `void* userData` | `b2World_SetUserDataInt`, `b2Body_SetUserDataInt`, `b2Shape_SetUserDataInt`, `b2Joint_SetUserDataInt` and their getters store an integer instead; keep your objects in a `Map` keyed by it. |
| `b2DebugDraw` | `b2World_Draw(worldId, draw)` takes one object: the flags and scales of `b2DebugDraw` (any subset, `b2DefaultDebugDraw()` for the whole) and `Draw*` methods, all optional, called as methods of that object. |
| `b2StoreBodyId` and the other id packers | as in C, with the packed id a number. |
| `b2GetByteCount` | `getMemoryStats()` reports the wasm heap: `{ inUse, free }`. |

Not bound, each with its reason in `scripts/bindings.config.mjs`: the dynamic tree (`b2DynamicTree_*`), the timer
(`b2GetTicks`, `b2GetMilliseconds*`), the allocator and assert hooks, `b2Yield` and `b2Hash`, the friction and
restitution mixing callbacks (a JavaScript call per contact per step), the raw user-data pointer functions (see the
integer ones), `b2Chain_GetSurfaceMaterialCount` (declared but not defined at the pinned commit), and
`b2StoreContactId`/`b2LoadContactId` (a `uint32_t[3]`; a contact id is a plain object).

`b2PlaneResult.point`, the contact point `b2World_CollideMover` reports, is in the shape's local frame while the plane
is in world space: that is how Box2D returns it at this commit.

### Exceptions

A JavaScript exception must never unwind through wasm: the stack pointer would not be restored, and a Box2D step or
query would be left half done. So the binding never lets one. What a callback throws is kept, Box2D gets the
callback's terminating answer (the query ends; a pre-solve or filter callback answers `true`; a draw call is skipped),
and once the Box2D call has returned, that call throws the kept error. A malformed object (a `b2Vec2` without `y`)
throws a `TypeError` from embind before Box2D is entered. `b2DestroyWorld` refuses to run inside one of the world's
own callbacks and reports it the same way. After any of these the module is intact and the world still steps.

## Layout

```
box2d/                 Box2D, a git submodule at the pinned commit
csrc/glue.h, glue.cpp  the hand-written bindings: callbacks, arrays, strings, events, out-parameters, debug draw, user data
csrc/post.js           appended to the module: the callback guard and the wrapper around every export (see Exceptions)
csrc/linkage.c         reaches b2Body_ClearForces, which the header declares without C linkage at the pinned commit
csrc/generated.*       what scripts/gen-bindings.mjs writes from Box2D's headers (committed, so a diff shows a change)
scripts/bindings.config.mjs  the decisions: what is hand-written, what is excluded and why, the hand-written signatures
scripts/gen-bindings.mjs     the generator
scripts/check-headers.mjs    asks clang for every function in the headers and fails if the generator missed one
scripts/patch-types.mjs      completes the declaration file Emscripten emits
scripts/build.sh             the whole build
build/dist/, build/dist-debug/   the artifacts, committed
test/                  the binding's contract (node:test) and a compiled type check of the declarations
```

Every function in Box2D's headers is generated, hand-written or listed as excluded; the generator fails otherwise,
and at build time clang's view of the headers is compared with the generator's. The type patcher fails when anything
it expects to complete is not there. So a Box2D update that adds, renames or changes a function stops the build until
the change is decided on.

## Build

Needs [emsdk](https://emscripten.org/docs/getting_started/downloads.html) 4.0.18 (the version
`.github/workflows/ci.yml` pins), CMake, Ninja and Node 22.

```sh
git submodule update --init
npm ci
source path/to/emsdk/emsdk_env.sh
npm run build          # build/dist
npm run build:debug    # build/dist-debug
npm test
npm run typecheck
```

The artifacts are reproducible: paths embedded in them are relative to the checkout, with the toolchain's own files
placed as if emsdk sat at `build/emsdk` (symlink it there for the debug source map to resolve). CI builds both
variants on every push and fails when the committed artifacts differ from what the sources produce, so commit
`build/dist*` and `csrc/generated.*` together with the change that produced them.

### Updating Box2D

Move the submodule, rebuild, and read what the generator and the header check report: new functions must be
excluded or, when they need help, written in `glue.cpp` and declared in `bindings.config.mjs`; renamed or removed
ones fail the type patcher. A newer Box2D changes simulation results, so treat it as a release of its own.

## License

MIT; see [LICENSE](LICENSE). Box2D is MIT, Copyright Erin Catto.
