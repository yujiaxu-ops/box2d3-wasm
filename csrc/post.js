// Appended to the module factory by scripts/build.sh (--post-js). JavaScript exceptions must never unwind through
// wasm frames: the shadow stack pointer is not restored on the way (the heap corrupts after enough of them), and a
// Box2D step or query would be left half done. So:
// 1. `__guard` is how csrc/glue.cpp calls every JavaScript callback: what the callback throws is kept, the fallback
//    goes back to Box2D, and the call finishes. `__fail` is how the glue reports an error of its own.
// 2. Once the runtime is up, every exported function is wrapped: the kept error is thrown once the call has
//    returned, and the stack pointer is restored when an error thrown by embind (a conversion of a malformed
//    object, inside a converter) unwinds through the call.
let pending = null;

// The stack helpers are exported for this file only; they are not part of the module's API.
const saveStack = stackSave;
const restoreStack = stackRestore;
delete Module['stackSave'];
delete Module['stackRestore'];

Module['__guard'] = (fcn, self, fallback, ...args) => {
  try {
    return fcn.apply(self, args);
  } catch (error) {
    pending ??= error;
    return fallback;
  }
};

Module['__fail'] = (message) => {
  pending ??= new Error(message);
};

// Once the bindings are on the module: now, when the runtime has already started by the time this file runs, else
// when it does.
const wrapExports = () => {
  for (const name of Object.keys(Module)) {
    const fn = Module[name];
    if (typeof fn !== 'function' || !(name.startsWith('b2') || name === 'getMemoryStats')) continue;
    if ('values' in fn) continue; // an enum: embind registers it as a function carrying its values
    Module[name] = function (...args) {
      const sp = saveStack();
      let result;
      try {
        result = fn.apply(this, args);
      } catch (error) {
        restoreStack(sp);
        pending = null;
        throw error;
      }
      if (pending !== null) {
        const error = pending;
        pending = null;
        throw error;
      }
      return result;
    };
  }
};
if (runtimeInitialized) wrapExports();
else addOnPostRun(wrapExports);
