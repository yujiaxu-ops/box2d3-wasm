#!/usr/bin/env bash
# Builds build/dist/box2d.mjs, box2d.wasm and box2d.d.mts: Box2D as a static library through emcmake, then the
# bindings through emcc with embind. `scripts/build.sh` is the release build; `scripts/build.sh debug` keeps
# assertions and a source map and writes build/dist-debug/.
#
# Needs Emscripten on PATH with EMSDK set (emsdk_env.sh does both; .github/workflows/ci.yml pins the version),
# CMake, Ninja and Node.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-release}"
case "$MODE" in
  # No link-time optimisation: across Box2D and the bindings it made the wasm 10% larger, not smaller.
  release) CMAKE_TYPE=Release; LIB=libbox2d.a; DIST="$ROOT/build/dist"; EMCC_MODE=(-O3 -DNDEBUG) ;; # NDEBUG: the inline math asserts must match the library's
  debug) CMAKE_TYPE=Debug; LIB=libbox2dd.a; DIST="$ROOT/build/dist-debug"; EMCC_MODE=(-O1 -gsource-map -sASSERTIONS=1 -sSAFE_HEAP=1) ;; # Box2D's CMake adds the d postfix
  *) echo "usage: scripts/build.sh [release|debug]" >&2; exit 2 ;;
esac

command -v emcc >/dev/null || { echo "emcc is not on PATH; source emsdk_env.sh" >&2; exit 1; }
: "${EMSDK:?EMSDK is not set; source emsdk_env.sh}"
CMAKE_DIR="$ROOT/build/cmake-$MODE"
cd "$ROOT" # emcc writes the path of the post-js file into the module: a relative one is the same on every machine

# The paths the compiler embeds (asserts, the source map) are made relative to the repository, so builds match
# across machines: the checkout as `.`, the toolchain as if it sat at build/emsdk (symlink it there to resolve the
# source map).
PREFIX_MAP=(-ffile-prefix-map="$ROOT=." -ffile-prefix-map="$EMSDK=$ROOT/build/emsdk")

# Box2D itself, without validation, samples and tests; its CMake enables the SIMD path (SSE2 intrinsics become wasm
# SIMD) for Emscripten on its own.
emcmake cmake -S "$ROOT/box2d" -B "$CMAKE_DIR" -G Ninja \
  -DCMAKE_BUILD_TYPE="$CMAKE_TYPE" \
  -DBOX2D_SAMPLES=OFF -DBOX2D_UNIT_TESTS=OFF -DBOX2D_DOCS=OFF -DBOX2D_VALIDATE=OFF \
  -DCMAKE_C_FLAGS="${PREFIX_MAP[*]}" >/dev/null
cmake --build "$CMAKE_DIR" --target box2d >/dev/null

# The bindings: the generated part from the headers (checked against clang's view of them), the hand-written part,
# one ES module with its wasm beside it.
node "$ROOT/scripts/gen-bindings.mjs"
node "$ROOT/scripts/check-headers.mjs"
mkdir -p "$DIST"
emcc -lembind -msimd128 -msse2 "${PREFIX_MAP[@]}" "${EMCC_MODE[@]}" \
  -I"$ROOT/box2d/include" \
  "$ROOT/csrc/glue.cpp" "$ROOT/csrc/generated.cpp" "$ROOT/csrc/linkage.c" "$CMAKE_DIR/src/$LIB" \
  -o "$DIST/box2d.mjs" \
  --emit-tsd "$DIST/box2d.d.mts" \
  --post-js csrc/post.js \
  -sMODULARIZE=1 -sEXPORT_ES6=1 -sEXPORT_NAME=createBox2D \
  -sENVIRONMENT=web,worker,node \
  -sALLOW_MEMORY_GROWTH=1 -sFILESYSTEM=0 \
  -sEXPORTED_RUNTIME_METHODS=stackSave,stackRestore \
  -sSTACK_OVERFLOW_CHECK=1
node "$ROOT/scripts/patch-types.mjs" "$DIST/box2d.d.mts"
ls -l "$DIST"
