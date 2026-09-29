// What the generator (gen-bindings.mjs) may not derive from the headers alone: which functions and structs are
// bound by hand in csrc/glue.cpp, which are left out and why, how array fields are sized, which fields of the
// definition structs stay at their defaults, and the TypeScript signatures of the hand-written functions.

/**
 * Definition structs: a JavaScript object of any subset of the fields is applied onto the C default, so a field left
 * out keeps its default and the validation cookie and pointer fields stay right. The rule is "every struct with a
 * `b2Default<Name>` function"; the generator finds those itself. These are the definitions without a default of
 * their own: nested in another definition and applied in place.
 */
export const nestedDefStructs = ['b2JointDef'];

/**
 * Fields of the definition structs that stay at their C defaults: raw pointers have no JavaScript form (user data is
 * an integer set after creation, see glue.cpp; a debug drawer's context is the glue's own), and the world's worker
 * count stays 1 in a single-threaded build. Function-pointer fields are skipped without being listed.
 */
export const skippedFields = {
  b2WorldDef: ['userTaskContext', 'userData', 'workerCount'],
  b2BodyDef: ['userData'],
  b2ShapeDef: ['userData'],
  b2ChainDef: ['userData', 'points', 'count', 'materials', 'materialCount'],
  b2JointDef: ['userData'],
  b2DebugDraw: ['context'],
};

/** Pointer fields of value objects that cross as the integer user data (`*_SetUserDataInt`), since the events are where body user data is read. */
export const pointerFields = {
  b2BodyMoveEvent: ['userData'],
  b2JointEvent: ['userData'],
};

/** Structs bound by hand or not at all. */
export const manualStructs = {
  b2SensorEvents: 'pointer arrays; b2World_GetSensorEvents returns plain arrays',
  b2ContactEvents: 'pointer arrays; b2World_GetContactEvents returns plain arrays',
  b2BodyEvents: 'pointer arrays; b2World_GetBodyEvents returns plain arrays',
  b2JointEvents: 'pointer arrays; b2World_GetJointEvents returns plain arrays',
  b2DynamicTree: 'internal broad-phase tree; not exposed',
};

/**
 * How array fields are read back: the field whose value is the number of live entries (which is then clamped to the
 * array's capacity on the way in), or null for the whole array.
 */
export const arrayCounts = {
  'b2Polygon.vertices': 'count',
  'b2Polygon.normals': 'count',
  'b2Hull.points': 'count',
  'b2ShapeProxy.points': 'count',
  'b2Manifold.points': 'pointCount',
  'b2Counters.colorCounts': null,
  'b2SimplexCache.indexA': null,
  'b2SimplexCache.indexB': null,
};

/** Function-name prefixes left out entirely, with the reason. */
export const excludedPrefixes = {
  b2DynamicTree_: 'internal broad-phase tree; not exposed',
};

/** Functions left out, with the reason. */
export const excludedFunctions = {
  b2SetAllocator: 'allocation is the wasm heap',
  b2Chain_GetSurfaceMaterialCount: 'declared in box2d.h but not defined at the pinned Box2D commit',
  b2World_SetFrictionCallback: 'a JavaScript call per contact per step; the mixing rules stay Box2D\'s',
  b2World_SetRestitutionCallback: 'a JavaScript call per contact per step; the mixing rules stay Box2D\'s',
  b2GetByteCount: 'see getMemoryStats',
  b2SetAssertFcn: 'asserts abort the wasm module',
  b2InternalAssertFcn: 'internal',
  b2GetTicks: 'timing belongs to the host',
  b2GetMilliseconds: 'timing belongs to the host',
  b2GetMillisecondsAndReset: 'timing belongs to the host',
  b2Yield: 'single-threaded build',
  b2Hash: 'internal',
  b2StoreContactId: 'writes a uint32_t array; a contact id is a plain object, keep its three fields',
  b2LoadContactId: 'reads a uint32_t array; a contact id is a plain object, keep its three fields',
  b2World_SetUserData: 'raw pointer user data; see the integer user data functions in glue.cpp',
  b2World_GetUserData: 'raw pointer user data',
  b2Body_SetUserData: 'raw pointer user data',
  b2Body_GetUserData: 'raw pointer user data',
  b2Shape_SetUserData: 'raw pointer user data',
  b2Shape_GetUserData: 'raw pointer user data',
  b2Joint_SetUserData: 'raw pointer user data',
  b2Joint_GetUserData: 'raw pointer user data',
};

/** Functions of this binding that are not in Box2D's headers. Any other hand-written name must be a header function. */
export const additions = new Set([
  'b2World_SetUserDataInt', 'b2World_GetUserDataInt',
  'b2Body_SetUserDataInt', 'b2Body_GetUserDataInt',
  'b2Shape_SetUserDataInt', 'b2Shape_GetUserDataInt',
  'b2Joint_SetUserDataInt', 'b2Joint_GetUserDataInt',
  'getMemoryStats',
]);

/** What the declarations say about the additions (a header function carries the header's own comment). */
export const additionDocs = {
  b2World_SetUserDataInt: 'Stores an integer as the world\'s user data, in place of the raw pointer.',
  b2World_GetUserDataInt: 'The integer stored as the world\'s user data; 0 when none.',
  b2Body_SetUserDataInt: 'Stores an integer as the body\'s user data, in place of the raw pointer.',
  b2Body_GetUserDataInt: 'The integer stored as the body\'s user data; 0 when none.',
  b2Shape_SetUserDataInt: 'Stores an integer as the shape\'s user data, in place of the raw pointer.',
  b2Shape_GetUserDataInt: 'The integer stored as the shape\'s user data; 0 when none.',
  b2Joint_SetUserDataInt: 'Stores an integer as the joint\'s user data, in place of the raw pointer.',
  b2Joint_GetUserDataInt: 'The integer stored as the joint\'s user data; 0 when none.',
  getMemoryStats: 'The wasm heap\'s use, from mallinfo: bytes in use and bytes held free.',
};

/** Functions bound by hand in glue.cpp (callbacks, arrays, strings, out-parameters), with their TypeScript signatures. */
export const manualFunctions = {
  // Queries with callbacks. The callback receives plain objects; the query returns tree statistics.
  b2World_OverlapAABB: 'b2World_OverlapAABB(worldId: b2WorldId, aabb: b2AABB, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId) => boolean): b2TreeStats',
  b2World_OverlapShape: 'b2World_OverlapShape(worldId: b2WorldId, proxy: b2ShapeProxy, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId) => boolean): b2TreeStats',
  b2World_CastRay: 'b2World_CastRay(worldId: b2WorldId, origin: b2Vec2, translation: b2Vec2, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, point: b2Vec2, normal: b2Vec2, fraction: number) => number): b2TreeStats',
  b2World_CastShape: 'b2World_CastShape(worldId: b2WorldId, proxy: b2ShapeProxy, translation: b2Vec2, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, point: b2Vec2, normal: b2Vec2, fraction: number) => number): b2TreeStats',
  b2World_CollideMover: 'b2World_CollideMover(worldId: b2WorldId, mover: b2Capsule, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, result: b2PlaneResult) => boolean): void',
  // Persistent callbacks: the binding keeps the function for the world until it is replaced, cleared with null, or
  // the world is destroyed (b2DestroyWorld is bound by hand for that, and refuses to run inside the world's own
  // callbacks). b2World_Step is bound by hand so that a callback's error surfaces once the step is complete.
  b2World_SetCustomFilterCallback: 'b2World_SetCustomFilterCallback(worldId: b2WorldId, fcn: ((shapeIdA: b2ShapeId, shapeIdB: b2ShapeId) => boolean) | null): void',
  b2World_SetPreSolveCallback: 'b2World_SetPreSolveCallback(worldId: b2WorldId, fcn: ((shapeIdA: b2ShapeId, shapeIdB: b2ShapeId, point: b2Vec2, normal: b2Vec2) => boolean) | null): void',
  b2World_Step: 'b2World_Step(worldId: b2WorldId, timeStep: number, subStepCount: number): void',
  b2DestroyWorld: 'b2DestroyWorld(worldId: b2WorldId): void',
  // Arrays in and out.
  b2ComputeHull: 'b2ComputeHull(points: b2Vec2[]): b2Hull',
  b2MakeProxy: 'b2MakeProxy(points: b2Vec2[], radius: number): b2ShapeProxy',
  b2MakeOffsetProxy: 'b2MakeOffsetProxy(points: b2Vec2[], radius: number, position: b2Vec2, rotation: b2Rot): b2ShapeProxy',
  b2MakeAABB: 'b2MakeAABB(points: b2Vec2[], radius: number): b2AABB',
  b2SolvePlanes: 'b2SolvePlanes(targetDelta: b2Vec2, planes: b2CollisionPlane[]): b2PlaneSolverResult & { planes: b2CollisionPlane[] }',
  b2ClipVector: 'b2ClipVector(vector: b2Vec2, planes: b2CollisionPlane[]): b2Vec2',
  b2Body_GetShapes: 'b2Body_GetShapes(bodyId: b2BodyId): b2ShapeId[]',
  b2Body_GetJoints: 'b2Body_GetJoints(bodyId: b2BodyId): b2JointId[]',
  b2Body_GetContactData: 'b2Body_GetContactData(bodyId: b2BodyId): b2ContactData[]',
  b2Shape_GetContactData: 'b2Shape_GetContactData(shapeId: b2ShapeId): b2ContactData[]',
  b2Shape_GetSensorData: 'b2Shape_GetSensorData(shapeId: b2ShapeId): b2ShapeId[]',
  b2Chain_GetSegments: 'b2Chain_GetSegments(chainId: b2ChainId): b2ShapeId[]',
  b2CreateChain: 'b2CreateChain(bodyId: b2BodyId, def: b2ChainDefInput): b2ChainId',
  // Simplex caches are not exposed: these start from a cold cache on every call.
  b2ShapeDistance: 'b2ShapeDistance(input: b2DistanceInput): b2DistanceOutput',
  b2CollideChainSegmentAndCapsule: 'b2CollideChainSegmentAndCapsule(segmentA: b2ChainSegment, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold',
  b2CollideChainSegmentAndPolygon: 'b2CollideChainSegmentAndPolygon(segmentA: b2ChainSegment, xfA: b2Transform, polygonB: b2Polygon, xfB: b2Transform): b2Manifold',
  // Out-parameters become fields of the result.
  b2GetLengthAndNormalize: 'b2GetLengthAndNormalize(v: b2Vec2): { length: number; vector: b2Vec2 }',
  b2Joint_GetConstraintTuning: 'b2Joint_GetConstraintTuning(jointId: b2JointId): { hertz: number; dampingRatio: number }',
  b2DistanceJoint_GetSpringForceRange: 'b2DistanceJoint_GetSpringForceRange(jointId: b2JointId): { lowerForce: number; upperForce: number }',
  // Events, as plain arrays.
  b2World_GetSensorEvents: 'b2World_GetSensorEvents(worldId: b2WorldId): { beginEvents: b2SensorBeginTouchEvent[]; endEvents: b2SensorEndTouchEvent[] }',
  b2World_GetContactEvents: 'b2World_GetContactEvents(worldId: b2WorldId): { beginEvents: b2ContactBeginTouchEvent[]; endEvents: b2ContactEndTouchEvent[]; hitEvents: b2ContactHitEvent[] }',
  b2World_GetBodyEvents: 'b2World_GetBodyEvents(worldId: b2WorldId): { moveEvents: b2BodyMoveEvent[] }',
  b2World_GetJointEvents: 'b2World_GetJointEvents(worldId: b2WorldId): { jointEvents: b2JointEvent[] }',
  // Strings.
  b2Body_SetName: 'b2Body_SetName(bodyId: b2BodyId, name: string): void',
  b2Body_GetName: 'b2Body_GetName(bodyId: b2BodyId): string',
  // The debug drawer: the flags of b2DebugDraw and the Draw* methods implemented in JavaScript, all optional.
  b2World_Draw: 'b2World_Draw(worldId: b2WorldId, draw: b2DebugDrawInput & b2DebugDrawCallbacks): void',
  // Additions of this binding.
  b2World_SetUserDataInt: 'b2World_SetUserDataInt(worldId: b2WorldId, value: number): void',
  b2World_GetUserDataInt: 'b2World_GetUserDataInt(worldId: b2WorldId): number',
  b2Body_SetUserDataInt: 'b2Body_SetUserDataInt(bodyId: b2BodyId, value: number): void',
  b2Body_GetUserDataInt: 'b2Body_GetUserDataInt(bodyId: b2BodyId): number',
  b2Shape_SetUserDataInt: 'b2Shape_SetUserDataInt(shapeId: b2ShapeId, value: number): void',
  b2Shape_GetUserDataInt: 'b2Shape_GetUserDataInt(shapeId: b2ShapeId): number',
  b2Joint_SetUserDataInt: 'b2Joint_SetUserDataInt(jointId: b2JointId, value: number): void',
  b2Joint_GetUserDataInt: 'b2Joint_GetUserDataInt(jointId: b2JointId): number',
  getMemoryStats: 'getMemoryStats(): MemoryStats',
};

/**
 * Fields of the definition structs that stand for a C pointer and count: their JavaScript form, and the C fields that
 * `<Name>ToJS` reads them from. `<Name>Apply` leaves them alone; glue.cpp owns the memory on the way in. `required`
 * marks what the input type cannot leave out.
 */
export const extraDefFields = {
  b2ChainDef: [
    { name: 'points', doc: 'The chain vertices; a loop closes itself, an open chain\'s first and last points are ghost vertices', array: { pointer: 'points', count: 'count' }, required: true },
    { name: 'materials', doc: 'One material for the whole chain, or one per segment', array: { pointer: 'materials', count: 'materialCount' } },
  ],
};

/** Doc comments for generated value objects whose header comment leaves something out. */
export const typeNotes = {
  b2PlaneResult: 'A mover collision: the plane is in world space; `point` is on the shape in the shape\'s local frame, as Box2D returns it (b2CollideMover rotates the normal only).',
};

/** Hand-written TypeScript declarations appended to the generated file: the types the manual functions refer to. */
export const manualTypes = `
/** The drawing callbacks of b2World_Draw, implemented in JavaScript; every one is optional. */
export interface b2DebugDrawCallbacks {
  DrawPolygon?(vertices: b2Vec2[], color: number): void;
  DrawSolidPolygon?(transform: b2Transform, vertices: b2Vec2[], radius: number, color: number): void;
  DrawCircle?(center: b2Vec2, radius: number, color: number): void;
  DrawSolidCircle?(transform: b2Transform, radius: number, color: number): void;
  DrawSolidCapsule?(p1: b2Vec2, p2: b2Vec2, radius: number, color: number): void;
  DrawLine?(p1: b2Vec2, p2: b2Vec2, color: number): void;
  DrawTransform?(transform: b2Transform): void;
  DrawPoint?(p: b2Vec2, size: number, color: number): void;
  DrawString?(p: b2Vec2, s: string, color: number): void;
}

/** The wasm heap's use, from mallinfo: bytes in use and bytes held free. */
export interface MemoryStats {
  inUse: number;
  free: number;
}
`;
