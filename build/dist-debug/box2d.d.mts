// Box2D v3 for JavaScript: the declarations Emscripten emits for the embind bindings (scripts/gen-bindings.mjs,
// csrc/glue.cpp), completed by scripts/patch-types.mjs with the parameter names of Box2D's headers, the
// definition structs and the hand-written functions. Structs are plain objects, copied on every crossing;
// 64-bit integers are numbers (exact up to 2^53); enums are the `b2*` objects of the module.
interface WasmModule {
}

type EmbindString = ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
export interface b2TOIStateValue<T extends number> {
  value: T;
}
export type b2TOIState = b2TOIStateValue<0>|b2TOIStateValue<1>|b2TOIStateValue<2>|b2TOIStateValue<3>|b2TOIStateValue<4>;

export interface b2BodyTypeValue<T extends number> {
  value: T;
}
export type b2BodyType = b2BodyTypeValue<0>|b2BodyTypeValue<1>|b2BodyTypeValue<2>|b2BodyTypeValue<3>;

export interface b2ShapeTypeValue<T extends number> {
  value: T;
}
export type b2ShapeType = b2ShapeTypeValue<0>|b2ShapeTypeValue<1>|b2ShapeTypeValue<2>|b2ShapeTypeValue<3>|b2ShapeTypeValue<4>|b2ShapeTypeValue<5>;

export interface b2JointTypeValue<T extends number> {
  value: T;
}
export type b2JointType = b2JointTypeValue<0>|b2JointTypeValue<1>|b2JointTypeValue<2>|b2JointTypeValue<3>|b2JointTypeValue<4>|b2JointTypeValue<5>|b2JointTypeValue<6>;

export interface b2HexColorValue<T extends number> {
  value: T;
}
export type b2HexColor = b2HexColorValue<15792383>|b2HexColorValue<16444375>|b2HexColorValue<65535>|b2HexColorValue<8388564>|b2HexColorValue<15794175>|b2HexColorValue<16119260>|b2HexColorValue<16770244>|b2HexColorValue<0>|b2HexColorValue<16772045>|b2HexColorValue<255>|b2HexColorValue<9055202>|b2HexColorValue<10824234>|b2HexColorValue<14596231>|b2HexColorValue<6266528>|b2HexColorValue<8388352>|b2HexColorValue<13789470>|b2HexColorValue<16744272>|b2HexColorValue<6591981>|b2HexColorValue<16775388>|b2HexColorValue<14423100>|b2HexColorValue<65535>|b2HexColorValue<139>|b2HexColorValue<35723>|b2HexColorValue<12092939>|b2HexColorValue<11119017>|b2HexColorValue<25600>|b2HexColorValue<12433259>|b2HexColorValue<9109643>|b2HexColorValue<5597999>|b2HexColorValue<16747520>|b2HexColorValue<10040012>|b2HexColorValue<9109504>|b2HexColorValue<15308410>|b2HexColorValue<9419919>|b2HexColorValue<4734347>|b2HexColorValue<3100495>|b2HexColorValue<52945>|b2HexColorValue<9699539>|b2HexColorValue<16716947>|b2HexColorValue<49151>|b2HexColorValue<6908265>|b2HexColorValue<2003199>|b2HexColorValue<11674146>|b2HexColorValue<16775920>|b2HexColorValue<2263842>|b2HexColorValue<16711935>|b2HexColorValue<14474460>|b2HexColorValue<16316671>|b2HexColorValue<16766720>|b2HexColorValue<14329120>|b2HexColorValue<8421504>|b2HexColorValue<32768>|b2HexColorValue<11403055>|b2HexColorValue<15794160>|b2HexColorValue<16738740>|b2HexColorValue<13458524>|b2HexColorValue<4915330>|b2HexColorValue<16777200>|b2HexColorValue<15787660>|b2HexColorValue<15132410>|b2HexColorValue<16773365>|b2HexColorValue<8190976>|b2HexColorValue<16775885>|b2HexColorValue<11393254>|b2HexColorValue<15761536>|b2HexColorValue<14745599>|b2HexColorValue<16448210>|b2HexColorValue<13882323>|b2HexColorValue<9498256>|b2HexColorValue<16758465>|b2HexColorValue<16752762>|b2HexColorValue<2142890>|b2HexColorValue<8900346>|b2HexColorValue<7833753>|b2HexColorValue<11584734>|b2HexColorValue<16777184>|b2HexColorValue<65280>|b2HexColorValue<3329330>|b2HexColorValue<16445670>|b2HexColorValue<16711935>|b2HexColorValue<8388608>|b2HexColorValue<6737322>|b2HexColorValue<205>|b2HexColorValue<12211667>|b2HexColorValue<9662683>|b2HexColorValue<3978097>|b2HexColorValue<8087790>|b2HexColorValue<64154>|b2HexColorValue<4772300>|b2HexColorValue<13047173>|b2HexColorValue<1644912>|b2HexColorValue<16121850>|b2HexColorValue<16770273>|b2HexColorValue<16770229>|b2HexColorValue<16768685>|b2HexColorValue<128>|b2HexColorValue<16643558>|b2HexColorValue<8421376>|b2HexColorValue<7048739>|b2HexColorValue<16753920>|b2HexColorValue<16729344>|b2HexColorValue<14315734>|b2HexColorValue<15657130>|b2HexColorValue<10025880>|b2HexColorValue<11529966>|b2HexColorValue<14381203>|b2HexColorValue<16773077>|b2HexColorValue<16767673>|b2HexColorValue<13468991>|b2HexColorValue<16761035>|b2HexColorValue<14524637>|b2HexColorValue<11591910>|b2HexColorValue<8388736>|b2HexColorValue<6697881>|b2HexColorValue<16711680>|b2HexColorValue<12357519>|b2HexColorValue<4286945>|b2HexColorValue<9127187>|b2HexColorValue<16416882>|b2HexColorValue<16032864>|b2HexColorValue<3050327>|b2HexColorValue<16774638>|b2HexColorValue<10506797>|b2HexColorValue<12632256>|b2HexColorValue<8900331>|b2HexColorValue<6970061>|b2HexColorValue<7372944>|b2HexColorValue<16775930>|b2HexColorValue<65407>|b2HexColorValue<4620980>|b2HexColorValue<13808780>|b2HexColorValue<32896>|b2HexColorValue<14204888>|b2HexColorValue<16737095>|b2HexColorValue<4251856>|b2HexColorValue<15631086>|b2HexColorValue<16113331>|b2HexColorValue<16777215>|b2HexColorValue<16119285>|b2HexColorValue<16776960>|b2HexColorValue<10145074>|b2HexColorValue<14430514>|b2HexColorValue<3190463>|b2HexColorValue<9226532>|b2HexColorValue<16772748>;

export type b2Version = {
  major: number,
  minor: number,
  revision: number
};

export type b2WorldId = {
  index1: number,
  generation: number
};

export type b2BodyId = {
  index1: number,
  world0: number,
  generation: number
};

export type b2ShapeId = {
  index1: number,
  world0: number,
  generation: number
};

export type b2ChainId = {
  index1: number,
  world0: number,
  generation: number
};

export type b2JointId = {
  index1: number,
  world0: number,
  generation: number
};

export type b2ContactId = {
  index1: number,
  world0: number,
  padding: number,
  generation: number
};

export type b2Vec2 = {
  x: number,
  y: number
};

export type b2CosSin = {
  cosine: number,
  sine: number
};

export type b2Rot = {
  c: number,
  s: number
};

export type b2Transform = {
  p: b2Vec2,
  q: b2Rot
};

export type b2Mat22 = {
  cx: b2Vec2,
  cy: b2Vec2
};

export type b2AABB = {
  lowerBound: b2Vec2,
  upperBound: b2Vec2
};

export type b2Plane = {
  normal: b2Vec2,
  offset: number
};

export type b2RayCastInput = {
  origin: b2Vec2,
  translation: b2Vec2,
  maxFraction: number
};

export type b2ShapeProxy = {
  points: b2Vec2[],
  count: number,
  radius: number
};

export type b2ShapeCastInput = {
  proxy: b2ShapeProxy,
  translation: b2Vec2,
  maxFraction: number,
  canEncroach: boolean
};

export type b2CastOutput = {
  normal: b2Vec2,
  point: b2Vec2,
  fraction: number,
  iterations: number,
  hit: boolean
};

export type b2MassData = {
  mass: number,
  center: b2Vec2,
  rotationalInertia: number
};

export type b2Circle = {
  center: b2Vec2,
  radius: number
};

export type b2Capsule = {
  center1: b2Vec2,
  center2: b2Vec2,
  radius: number
};

export type b2Polygon = {
  vertices: b2Vec2[],
  normals: b2Vec2[],
  centroid: b2Vec2,
  radius: number,
  count: number
};

export type b2Segment = {
  point1: b2Vec2,
  point2: b2Vec2
};

export type b2ChainSegment = {
  ghost1: b2Vec2,
  segment: b2Segment,
  ghost2: b2Vec2,
  chainId: number
};

export type b2Hull = {
  points: b2Vec2[],
  count: number
};

export type b2SegmentDistanceResult = {
  closest1: b2Vec2,
  closest2: b2Vec2,
  fraction1: number,
  fraction2: number,
  distanceSquared: number
};

export type b2SimplexCache = {
  count: number,
  indexA: number[],
  indexB: number[]
};

export type b2DistanceInput = {
  proxyA: b2ShapeProxy,
  proxyB: b2ShapeProxy,
  transformA: b2Transform,
  transformB: b2Transform,
  useRadii: boolean
};

export type b2DistanceOutput = {
  pointA: b2Vec2,
  pointB: b2Vec2,
  normal: b2Vec2,
  distance: number,
  iterations: number,
  simplexCount: number
};

export type b2SimplexVertex = {
  wA: b2Vec2,
  wB: b2Vec2,
  w: b2Vec2,
  a: number,
  indexA: number,
  indexB: number
};

export type b2Simplex = {
  v1: b2SimplexVertex,
  v2: b2SimplexVertex,
  v3: b2SimplexVertex,
  count: number
};

export type b2ShapeCastPairInput = {
  proxyA: b2ShapeProxy,
  proxyB: b2ShapeProxy,
  transformA: b2Transform,
  transformB: b2Transform,
  translationB: b2Vec2,
  maxFraction: number,
  canEncroach: boolean
};

export type b2Sweep = {
  localCenter: b2Vec2,
  c1: b2Vec2,
  c2: b2Vec2,
  q1: b2Rot,
  q2: b2Rot
};

export type b2TOIInput = {
  proxyA: b2ShapeProxy,
  proxyB: b2ShapeProxy,
  sweepA: b2Sweep,
  sweepB: b2Sweep,
  maxFraction: number
};

export type b2TOIOutput = {
  state: b2TOIState,
  point: b2Vec2,
  normal: b2Vec2,
  fraction: number
};

export type b2ManifoldPoint = {
  point: b2Vec2,
  anchorA: b2Vec2,
  anchorB: b2Vec2,
  separation: number,
  normalImpulse: number,
  tangentImpulse: number,
  totalNormalImpulse: number,
  normalVelocity: number,
  id: number,
  persisted: boolean
};

export type b2Manifold = {
  normal: b2Vec2,
  rollingImpulse: number,
  points: b2ManifoldPoint[],
  pointCount: number
};

export type b2TreeStats = {
  nodeVisits: number,
  leafVisits: number
};

/** A mover collision: the plane is in world space; `point` is on the shape in the shape's local frame, as Box2D returns it (b2CollideMover rotates the normal only). */
export type b2PlaneResult = {
  plane: b2Plane,
  point: b2Vec2,
  hit: boolean
};

export type b2CollisionPlane = {
  plane: b2Plane,
  pushLimit: number,
  push: number,
  clipVelocity: boolean
};

export type b2PlaneSolverResult = {
  translation: b2Vec2,
  iterationCount: number
};

export type b2RayResult = {
  shapeId: b2ShapeId,
  point: b2Vec2,
  normal: b2Vec2,
  fraction: number,
  nodeVisits: number,
  leafVisits: number,
  hit: boolean
};

export type b2MotionLocks = {
  linearX: boolean,
  linearY: boolean,
  angularZ: boolean
};

export type b2Profile = {
  step: number,
  pairs: number,
  collide: number,
  solve: number,
  prepareStages: number,
  solveConstraints: number,
  prepareConstraints: number,
  integrateVelocities: number,
  warmStart: number,
  solveImpulses: number,
  integratePositions: number,
  relaxImpulses: number,
  applyRestitution: number,
  storeImpulses: number,
  splitIslands: number,
  transforms: number,
  sensorHits: number,
  jointEvents: number,
  hitEvents: number,
  refit: number,
  bullets: number,
  sleepIslands: number,
  sensors: number
};

export type b2Counters = {
  bodyCount: number,
  shapeCount: number,
  contactCount: number,
  jointCount: number,
  islandCount: number,
  stackUsed: number,
  staticTreeHeight: number,
  treeHeight: number,
  byteCount: number,
  taskCount: number,
  colorCounts: number[]
};

export type b2SensorBeginTouchEvent = {
  sensorShapeId: b2ShapeId,
  visitorShapeId: b2ShapeId
};

export type b2SensorEndTouchEvent = {
  sensorShapeId: b2ShapeId,
  visitorShapeId: b2ShapeId
};

export type b2ContactBeginTouchEvent = {
  shapeIdA: b2ShapeId,
  shapeIdB: b2ShapeId,
  contactId: b2ContactId
};

export type b2ContactEndTouchEvent = {
  shapeIdA: b2ShapeId,
  shapeIdB: b2ShapeId,
  contactId: b2ContactId
};

export type b2ContactHitEvent = {
  shapeIdA: b2ShapeId,
  shapeIdB: b2ShapeId,
  point: b2Vec2,
  normal: b2Vec2,
  approachSpeed: number
};

export type b2BodyMoveEvent = {
  userData: number,
  transform: b2Transform,
  bodyId: b2BodyId,
  fellAsleep: boolean
};

export type b2JointEvent = {
  jointId: b2JointId,
  userData: number
};

export type b2ContactData = {
  contactId: b2ContactId,
  shapeIdA: b2ShapeId,
  shapeIdB: b2ShapeId,
  manifold: b2Manifold
};

export interface b2JointDef {
  bodyIdA: b2BodyId;
  bodyIdB: b2BodyId;
  localFrameA: b2Transform;
  localFrameB: b2Transform;
  forceThreshold: number;
  torqueThreshold: number;
  constraintHertz: number;
  constraintDampingRatio: number;
  drawScale: number;
  collideConnected: boolean;
}

/** What the functions taking a b2JointDef accept: a subset of its fields; one left out keeps the default of b2DefaultJointDef(). */
export type b2JointDefInput = Partial<b2JointDef>;

export interface b2WorldDef {
  gravity: b2Vec2;
  restitutionThreshold: number;
  hitEventThreshold: number;
  contactHertz: number;
  contactDampingRatio: number;
  contactSpeed: number;
  maximumLinearSpeed: number;
  enableSleep: boolean;
  enableContinuous: boolean;
  enableContactSoftening: boolean;
}

/** What the functions taking a b2WorldDef accept: a subset of its fields; one left out keeps the default of b2DefaultWorldDef(). */
export type b2WorldDefInput = Partial<b2WorldDef>;

export interface b2BodyDef {
  type: b2BodyType;
  position: b2Vec2;
  rotation: b2Rot;
  linearVelocity: b2Vec2;
  angularVelocity: number;
  linearDamping: number;
  angularDamping: number;
  gravityScale: number;
  sleepThreshold: number;
  name: string;
  motionLocks: b2MotionLocks;
  enableSleep: boolean;
  isAwake: boolean;
  isBullet: boolean;
  isEnabled: boolean;
  allowFastRotation: boolean;
}

/** What the functions taking a b2BodyDef accept: a subset of its fields; one left out keeps the default of b2DefaultBodyDef(). */
export type b2BodyDefInput = Partial<b2BodyDef>;

export interface b2Filter {
  categoryBits: number;
  maskBits: number;
  groupIndex: number;
}

/** What the functions taking a b2Filter accept: a subset of its fields; one left out keeps the default of b2DefaultFilter(). */
export type b2FilterInput = Partial<b2Filter>;

export interface b2QueryFilter {
  categoryBits: number;
  maskBits: number;
}

/** What the functions taking a b2QueryFilter accept: a subset of its fields; one left out keeps the default of b2DefaultQueryFilter(). */
export type b2QueryFilterInput = Partial<b2QueryFilter>;

export interface b2SurfaceMaterial {
  friction: number;
  restitution: number;
  rollingResistance: number;
  tangentSpeed: number;
  userMaterialId: number;
  customColor: number;
}

/** What the functions taking a b2SurfaceMaterial accept: a subset of its fields; one left out keeps the default of b2DefaultSurfaceMaterial(). */
export type b2SurfaceMaterialInput = Partial<b2SurfaceMaterial>;

export interface b2ShapeDef {
  material: b2SurfaceMaterial;
  density: number;
  filter: b2Filter;
  enableCustomFiltering: boolean;
  isSensor: boolean;
  enableSensorEvents: boolean;
  enableContactEvents: boolean;
  enableHitEvents: boolean;
  enablePreSolveEvents: boolean;
  invokeContactCreation: boolean;
  updateBodyMass: boolean;
}

/** What the functions taking a b2ShapeDef accept: a subset of its fields; one left out keeps the default of b2DefaultShapeDef(). */
export type b2ShapeDefInput = Partial<Omit<b2ShapeDef, 'material' | 'filter'>> & { material?: b2SurfaceMaterialInput; filter?: b2FilterInput };

export interface b2ChainDef {
  filter: b2Filter;
  isLoop: boolean;
  enableSensorEvents: boolean;
  /** The chain vertices; a loop closes itself, an open chain's first and last points are ghost vertices */
  points: b2Vec2[];
  /** One material for the whole chain, or one per segment */
  materials: b2SurfaceMaterial[];
}

/** What the functions taking a b2ChainDef accept: a subset of its fields; one left out keeps the default of b2DefaultChainDef(). */
export type b2ChainDefInput = Partial<Omit<b2ChainDef, 'filter' | 'points' | 'materials'>> & { filter?: b2FilterInput; points: b2Vec2[]; materials?: b2SurfaceMaterialInput[] };

export interface b2DistanceJointDef {
  base: b2JointDef;
  length: number;
  enableSpring: boolean;
  lowerSpringForce: number;
  upperSpringForce: number;
  hertz: number;
  dampingRatio: number;
  enableLimit: boolean;
  minLength: number;
  maxLength: number;
  enableMotor: boolean;
  maxMotorForce: number;
  motorSpeed: number;
}

/** What the functions taking a b2DistanceJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultDistanceJointDef(). */
export type b2DistanceJointDefInput = Partial<Omit<b2DistanceJointDef, 'base'>> & { base?: b2JointDefInput };

export interface b2MotorJointDef {
  base: b2JointDef;
  linearVelocity: b2Vec2;
  maxVelocityForce: number;
  angularVelocity: number;
  maxVelocityTorque: number;
  linearHertz: number;
  linearDampingRatio: number;
  maxSpringForce: number;
  angularHertz: number;
  angularDampingRatio: number;
  maxSpringTorque: number;
}

/** What the functions taking a b2MotorJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultMotorJointDef(). */
export type b2MotorJointDefInput = Partial<Omit<b2MotorJointDef, 'base'>> & { base?: b2JointDefInput };

export interface b2FilterJointDef {
  base: b2JointDef;
}

/** What the functions taking a b2FilterJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultFilterJointDef(). */
export type b2FilterJointDefInput = Partial<Omit<b2FilterJointDef, 'base'>> & { base?: b2JointDefInput };

export interface b2PrismaticJointDef {
  base: b2JointDef;
  enableSpring: boolean;
  hertz: number;
  dampingRatio: number;
  targetTranslation: number;
  enableLimit: boolean;
  lowerTranslation: number;
  upperTranslation: number;
  enableMotor: boolean;
  maxMotorForce: number;
  motorSpeed: number;
}

/** What the functions taking a b2PrismaticJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultPrismaticJointDef(). */
export type b2PrismaticJointDefInput = Partial<Omit<b2PrismaticJointDef, 'base'>> & { base?: b2JointDefInput };

export interface b2RevoluteJointDef {
  base: b2JointDef;
  targetAngle: number;
  enableSpring: boolean;
  hertz: number;
  dampingRatio: number;
  enableLimit: boolean;
  lowerAngle: number;
  upperAngle: number;
  enableMotor: boolean;
  maxMotorTorque: number;
  motorSpeed: number;
}

/** What the functions taking a b2RevoluteJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultRevoluteJointDef(). */
export type b2RevoluteJointDefInput = Partial<Omit<b2RevoluteJointDef, 'base'>> & { base?: b2JointDefInput };

export interface b2WeldJointDef {
  base: b2JointDef;
  linearHertz: number;
  angularHertz: number;
  linearDampingRatio: number;
  angularDampingRatio: number;
}

/** What the functions taking a b2WeldJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultWeldJointDef(). */
export type b2WeldJointDefInput = Partial<Omit<b2WeldJointDef, 'base'>> & { base?: b2JointDefInput };

export interface b2WheelJointDef {
  base: b2JointDef;
  enableSpring: boolean;
  hertz: number;
  dampingRatio: number;
  enableLimit: boolean;
  lowerTranslation: number;
  upperTranslation: number;
  enableMotor: boolean;
  maxMotorTorque: number;
  motorSpeed: number;
}

/** What the functions taking a b2WheelJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultWheelJointDef(). */
export type b2WheelJointDefInput = Partial<Omit<b2WheelJointDef, 'base'>> & { base?: b2JointDefInput };

export interface b2ExplosionDef {
  maskBits: number;
  position: b2Vec2;
  radius: number;
  falloff: number;
  impulsePerLength: number;
}

/** What the functions taking a b2ExplosionDef accept: a subset of its fields; one left out keeps the default of b2DefaultExplosionDef(). */
export type b2ExplosionDefInput = Partial<b2ExplosionDef>;

export interface b2DebugDraw {
  drawingBounds: b2AABB;
  forceScale: number;
  jointScale: number;
  drawShapes: boolean;
  drawJoints: boolean;
  drawJointExtras: boolean;
  drawBounds: boolean;
  drawMass: boolean;
  drawBodyNames: boolean;
  drawContactPoints: boolean;
  drawGraphColors: boolean;
  drawContactFeatures: boolean;
  drawContactNormals: boolean;
  drawContactForces: boolean;
  drawFrictionForces: boolean;
  drawIslands: boolean;
}

/** What the functions taking a b2DebugDraw accept: a subset of its fields; one left out keeps the default of b2DefaultDebugDraw(). */
export type b2DebugDrawInput = Partial<b2DebugDraw>;
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

interface EmbindModule {
  getMemoryStats(): MemoryStats;
  b2TOIState: {b2_toiStateUnknown: b2TOIStateValue<0>, b2_toiStateFailed: b2TOIStateValue<1>, b2_toiStateOverlapped: b2TOIStateValue<2>, b2_toiStateHit: b2TOIStateValue<3>, b2_toiStateSeparated: b2TOIStateValue<4>};
  b2BodyType: {b2_staticBody: b2BodyTypeValue<0>, b2_kinematicBody: b2BodyTypeValue<1>, b2_dynamicBody: b2BodyTypeValue<2>, b2_bodyTypeCount: b2BodyTypeValue<3>};
  b2ShapeType: {b2_circleShape: b2ShapeTypeValue<0>, b2_capsuleShape: b2ShapeTypeValue<1>, b2_segmentShape: b2ShapeTypeValue<2>, b2_polygonShape: b2ShapeTypeValue<3>, b2_chainSegmentShape: b2ShapeTypeValue<4>, b2_shapeTypeCount: b2ShapeTypeValue<5>};
  b2JointType: {b2_distanceJoint: b2JointTypeValue<0>, b2_filterJoint: b2JointTypeValue<1>, b2_motorJoint: b2JointTypeValue<2>, b2_prismaticJoint: b2JointTypeValue<3>, b2_revoluteJoint: b2JointTypeValue<4>, b2_weldJoint: b2JointTypeValue<5>, b2_wheelJoint: b2JointTypeValue<6>};
  b2HexColor: {b2_colorAliceBlue: b2HexColorValue<15792383>, b2_colorAntiqueWhite: b2HexColorValue<16444375>, b2_colorAqua: b2HexColorValue<65535>, b2_colorAquamarine: b2HexColorValue<8388564>, b2_colorAzure: b2HexColorValue<15794175>, b2_colorBeige: b2HexColorValue<16119260>, b2_colorBisque: b2HexColorValue<16770244>, b2_colorBlack: b2HexColorValue<0>, b2_colorBlanchedAlmond: b2HexColorValue<16772045>, b2_colorBlue: b2HexColorValue<255>, b2_colorBlueViolet: b2HexColorValue<9055202>, b2_colorBrown: b2HexColorValue<10824234>, b2_colorBurlywood: b2HexColorValue<14596231>, b2_colorCadetBlue: b2HexColorValue<6266528>, b2_colorChartreuse: b2HexColorValue<8388352>, b2_colorChocolate: b2HexColorValue<13789470>, b2_colorCoral: b2HexColorValue<16744272>, b2_colorCornflowerBlue: b2HexColorValue<6591981>, b2_colorCornsilk: b2HexColorValue<16775388>, b2_colorCrimson: b2HexColorValue<14423100>, b2_colorCyan: b2HexColorValue<65535>, b2_colorDarkBlue: b2HexColorValue<139>, b2_colorDarkCyan: b2HexColorValue<35723>, b2_colorDarkGoldenRod: b2HexColorValue<12092939>, b2_colorDarkGray: b2HexColorValue<11119017>, b2_colorDarkGreen: b2HexColorValue<25600>, b2_colorDarkKhaki: b2HexColorValue<12433259>, b2_colorDarkMagenta: b2HexColorValue<9109643>, b2_colorDarkOliveGreen: b2HexColorValue<5597999>, b2_colorDarkOrange: b2HexColorValue<16747520>, b2_colorDarkOrchid: b2HexColorValue<10040012>, b2_colorDarkRed: b2HexColorValue<9109504>, b2_colorDarkSalmon: b2HexColorValue<15308410>, b2_colorDarkSeaGreen: b2HexColorValue<9419919>, b2_colorDarkSlateBlue: b2HexColorValue<4734347>, b2_colorDarkSlateGray: b2HexColorValue<3100495>, b2_colorDarkTurquoise: b2HexColorValue<52945>, b2_colorDarkViolet: b2HexColorValue<9699539>, b2_colorDeepPink: b2HexColorValue<16716947>, b2_colorDeepSkyBlue: b2HexColorValue<49151>, b2_colorDimGray: b2HexColorValue<6908265>, b2_colorDodgerBlue: b2HexColorValue<2003199>, b2_colorFireBrick: b2HexColorValue<11674146>, b2_colorFloralWhite: b2HexColorValue<16775920>, b2_colorForestGreen: b2HexColorValue<2263842>, b2_colorFuchsia: b2HexColorValue<16711935>, b2_colorGainsboro: b2HexColorValue<14474460>, b2_colorGhostWhite: b2HexColorValue<16316671>, b2_colorGold: b2HexColorValue<16766720>, b2_colorGoldenRod: b2HexColorValue<14329120>, b2_colorGray: b2HexColorValue<8421504>, b2_colorGreen: b2HexColorValue<32768>, b2_colorGreenYellow: b2HexColorValue<11403055>, b2_colorHoneyDew: b2HexColorValue<15794160>, b2_colorHotPink: b2HexColorValue<16738740>, b2_colorIndianRed: b2HexColorValue<13458524>, b2_colorIndigo: b2HexColorValue<4915330>, b2_colorIvory: b2HexColorValue<16777200>, b2_colorKhaki: b2HexColorValue<15787660>, b2_colorLavender: b2HexColorValue<15132410>, b2_colorLavenderBlush: b2HexColorValue<16773365>, b2_colorLawnGreen: b2HexColorValue<8190976>, b2_colorLemonChiffon: b2HexColorValue<16775885>, b2_colorLightBlue: b2HexColorValue<11393254>, b2_colorLightCoral: b2HexColorValue<15761536>, b2_colorLightCyan: b2HexColorValue<14745599>, b2_colorLightGoldenRodYellow: b2HexColorValue<16448210>, b2_colorLightGray: b2HexColorValue<13882323>, b2_colorLightGreen: b2HexColorValue<9498256>, b2_colorLightPink: b2HexColorValue<16758465>, b2_colorLightSalmon: b2HexColorValue<16752762>, b2_colorLightSeaGreen: b2HexColorValue<2142890>, b2_colorLightSkyBlue: b2HexColorValue<8900346>, b2_colorLightSlateGray: b2HexColorValue<7833753>, b2_colorLightSteelBlue: b2HexColorValue<11584734>, b2_colorLightYellow: b2HexColorValue<16777184>, b2_colorLime: b2HexColorValue<65280>, b2_colorLimeGreen: b2HexColorValue<3329330>, b2_colorLinen: b2HexColorValue<16445670>, b2_colorMagenta: b2HexColorValue<16711935>, b2_colorMaroon: b2HexColorValue<8388608>, b2_colorMediumAquaMarine: b2HexColorValue<6737322>, b2_colorMediumBlue: b2HexColorValue<205>, b2_colorMediumOrchid: b2HexColorValue<12211667>, b2_colorMediumPurple: b2HexColorValue<9662683>, b2_colorMediumSeaGreen: b2HexColorValue<3978097>, b2_colorMediumSlateBlue: b2HexColorValue<8087790>, b2_colorMediumSpringGreen: b2HexColorValue<64154>, b2_colorMediumTurquoise: b2HexColorValue<4772300>, b2_colorMediumVioletRed: b2HexColorValue<13047173>, b2_colorMidnightBlue: b2HexColorValue<1644912>, b2_colorMintCream: b2HexColorValue<16121850>, b2_colorMistyRose: b2HexColorValue<16770273>, b2_colorMoccasin: b2HexColorValue<16770229>, b2_colorNavajoWhite: b2HexColorValue<16768685>, b2_colorNavy: b2HexColorValue<128>, b2_colorOldLace: b2HexColorValue<16643558>, b2_colorOlive: b2HexColorValue<8421376>, b2_colorOliveDrab: b2HexColorValue<7048739>, b2_colorOrange: b2HexColorValue<16753920>, b2_colorOrangeRed: b2HexColorValue<16729344>, b2_colorOrchid: b2HexColorValue<14315734>, b2_colorPaleGoldenRod: b2HexColorValue<15657130>, b2_colorPaleGreen: b2HexColorValue<10025880>, b2_colorPaleTurquoise: b2HexColorValue<11529966>, b2_colorPaleVioletRed: b2HexColorValue<14381203>, b2_colorPapayaWhip: b2HexColorValue<16773077>, b2_colorPeachPuff: b2HexColorValue<16767673>, b2_colorPeru: b2HexColorValue<13468991>, b2_colorPink: b2HexColorValue<16761035>, b2_colorPlum: b2HexColorValue<14524637>, b2_colorPowderBlue: b2HexColorValue<11591910>, b2_colorPurple: b2HexColorValue<8388736>, b2_colorRebeccaPurple: b2HexColorValue<6697881>, b2_colorRed: b2HexColorValue<16711680>, b2_colorRosyBrown: b2HexColorValue<12357519>, b2_colorRoyalBlue: b2HexColorValue<4286945>, b2_colorSaddleBrown: b2HexColorValue<9127187>, b2_colorSalmon: b2HexColorValue<16416882>, b2_colorSandyBrown: b2HexColorValue<16032864>, b2_colorSeaGreen: b2HexColorValue<3050327>, b2_colorSeaShell: b2HexColorValue<16774638>, b2_colorSienna: b2HexColorValue<10506797>, b2_colorSilver: b2HexColorValue<12632256>, b2_colorSkyBlue: b2HexColorValue<8900331>, b2_colorSlateBlue: b2HexColorValue<6970061>, b2_colorSlateGray: b2HexColorValue<7372944>, b2_colorSnow: b2HexColorValue<16775930>, b2_colorSpringGreen: b2HexColorValue<65407>, b2_colorSteelBlue: b2HexColorValue<4620980>, b2_colorTan: b2HexColorValue<13808780>, b2_colorTeal: b2HexColorValue<32896>, b2_colorThistle: b2HexColorValue<14204888>, b2_colorTomato: b2HexColorValue<16737095>, b2_colorTurquoise: b2HexColorValue<4251856>, b2_colorViolet: b2HexColorValue<15631086>, b2_colorWheat: b2HexColorValue<16113331>, b2_colorWhite: b2HexColorValue<16777215>, b2_colorWhiteSmoke: b2HexColorValue<16119285>, b2_colorYellow: b2HexColorValue<16776960>, b2_colorYellowGreen: b2HexColorValue<10145074>, b2_colorBox2DRed: b2HexColorValue<14430514>, b2_colorBox2DBlue: b2HexColorValue<3190463>, b2_colorBox2DGreen: b2HexColorValue<9226532>, b2_colorBox2DYellow: b2HexColorValue<16772748>};
  b2World_SetCustomFilterCallback(worldId: b2WorldId, fcn: ((shapeIdA: b2ShapeId, shapeIdB: b2ShapeId) => boolean) | null): void;
  b2World_SetPreSolveCallback(worldId: b2WorldId, fcn: ((shapeIdA: b2ShapeId, shapeIdB: b2ShapeId, point: b2Vec2, normal: b2Vec2) => boolean) | null): void;
  b2World_Step(worldId: b2WorldId, timeStep: number, subStepCount: number): void;
  b2DestroyWorld(worldId: b2WorldId): void;
  b2World_GetSensorEvents(worldId: b2WorldId): { beginEvents: b2SensorBeginTouchEvent[]; endEvents: b2SensorEndTouchEvent[] };
  b2World_GetContactEvents(worldId: b2WorldId): { beginEvents: b2ContactBeginTouchEvent[]; endEvents: b2ContactEndTouchEvent[]; hitEvents: b2ContactHitEvent[] };
  b2World_GetBodyEvents(worldId: b2WorldId): { moveEvents: b2BodyMoveEvent[] };
  b2World_GetJointEvents(worldId: b2WorldId): { jointEvents: b2JointEvent[] };
  b2World_SetUserDataInt(worldId: b2WorldId, value: number): void;
  b2World_GetUserDataInt(worldId: b2WorldId): number;
  b2World_Draw(worldId: b2WorldId, draw: b2DebugDrawInput & b2DebugDrawCallbacks): void;
  b2Body_GetShapes(bodyId: b2BodyId): b2ShapeId[];
  b2Body_GetJoints(bodyId: b2BodyId): b2JointId[];
  b2Body_GetContactData(bodyId: b2BodyId): b2ContactData[];
  b2Body_SetName(bodyId: b2BodyId, name: string): void;
  b2Body_GetName(bodyId: b2BodyId): string;
  b2Body_SetUserDataInt(bodyId: b2BodyId, value: number): void;
  b2Body_GetUserDataInt(bodyId: b2BodyId): number;
  b2Body_ClearForces(bodyId: b2BodyId): void;
  b2Shape_GetContactData(shapeId: b2ShapeId): b2ContactData[];
  b2Shape_GetSensorData(shapeId: b2ShapeId): b2ShapeId[];
  b2Shape_SetUserDataInt(shapeId: b2ShapeId, value: number): void;
  b2Shape_GetUserDataInt(shapeId: b2ShapeId): number;
  b2CreateChain(bodyId: b2BodyId, def: b2ChainDefInput): b2ChainId;
  b2Chain_GetSegments(chainId: b2ChainId): b2ShapeId[];
  b2Joint_GetConstraintTuning(jointId: b2JointId): { hertz: number; dampingRatio: number };
  b2DistanceJoint_GetSpringForceRange(jointId: b2JointId): { lowerForce: number; upperForce: number };
  b2Joint_SetUserDataInt(jointId: b2JointId, value: number): void;
  b2Joint_GetUserDataInt(jointId: b2JointId): number;
  b2SolvePlanes(targetDelta: b2Vec2, planes: b2CollisionPlane[]): b2PlaneSolverResult & { planes: b2CollisionPlane[] };
  b2ClipVector(vector: b2Vec2, planes: b2CollisionPlane[]): b2Vec2;
  b2GetLengthAndNormalize(v: b2Vec2): { length: number; vector: b2Vec2 };
  b2MakeAABB(points: b2Vec2[], radius: number): b2AABB;
  b2MakeProxy(points: b2Vec2[], radius: number): b2ShapeProxy;
  b2MakeOffsetProxy(points: b2Vec2[], radius: number, position: b2Vec2, rotation: b2Rot): b2ShapeProxy;
  b2World_CollideMover(worldId: b2WorldId, mover: b2Capsule, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, result: b2PlaneResult) => boolean): void;
  b2ComputeHull(points: b2Vec2[]): b2Hull;
  b2ShapeDistance(input: b2DistanceInput): b2DistanceOutput;
  b2CollideChainSegmentAndCapsule(segmentA: b2ChainSegment, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold;
  b2CollideChainSegmentAndPolygon(segmentA: b2ChainSegment, xfA: b2Transform, polygonB: b2Polygon, xfB: b2Transform): b2Manifold;
  b2World_OverlapAABB(worldId: b2WorldId, aabb: b2AABB, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId) => boolean): b2TreeStats;
  b2World_OverlapShape(worldId: b2WorldId, proxy: b2ShapeProxy, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId) => boolean): b2TreeStats;
  b2World_CastRay(worldId: b2WorldId, origin: b2Vec2, translation: b2Vec2, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, point: b2Vec2, normal: b2Vec2, fraction: number) => number): b2TreeStats;
  b2World_CastShape(worldId: b2WorldId, proxy: b2ShapeProxy, translation: b2Vec2, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, point: b2Vec2, normal: b2Vec2, fraction: number) => number): b2TreeStats;
  b2GetVersion(): b2Version;
  b2StoreWorldId(id: b2WorldId): number;
  b2LoadWorldId(x: number): b2WorldId;
  b2StoreBodyId(id: b2BodyId): number;
  b2LoadBodyId(x: number): b2BodyId;
  b2StoreShapeId(id: b2ShapeId): number;
  b2LoadShapeId(x: number): b2ShapeId;
  b2StoreChainId(id: b2ChainId): number;
  b2LoadChainId(x: number): b2ChainId;
  b2StoreJointId(id: b2JointId): number;
  b2LoadJointId(x: number): b2JointId;
  b2IsValidFloat(a: number): boolean;
  b2IsValidVec2(v: b2Vec2): boolean;
  b2IsValidRotation(q: b2Rot): boolean;
  b2IsValidTransform(t: b2Transform): boolean;
  b2IsValidAABB(aabb: b2AABB): boolean;
  b2IsValidPlane(a: b2Plane): boolean;
  b2MinInt(a: number, b: number): number;
  b2MaxInt(a: number, b: number): number;
  b2AbsInt(a: number): number;
  b2ClampInt(a: number, lower: number, upper: number): number;
  b2MinFloat(a: number, b: number): number;
  b2MaxFloat(a: number, b: number): number;
  b2AbsFloat(a: number): number;
  b2ClampFloat(a: number, lower: number, upper: number): number;
  b2Atan2(y: number, x: number): number;
  b2ComputeCosSin(radians: number): b2CosSin;
  b2Dot(a: b2Vec2, b: b2Vec2): number;
  b2Cross(a: b2Vec2, b: b2Vec2): number;
  b2CrossVS(v: b2Vec2, s: number): b2Vec2;
  b2CrossSV(s: number, v: b2Vec2): b2Vec2;
  b2LeftPerp(v: b2Vec2): b2Vec2;
  b2RightPerp(v: b2Vec2): b2Vec2;
  b2Add(a: b2Vec2, b: b2Vec2): b2Vec2;
  b2Sub(a: b2Vec2, b: b2Vec2): b2Vec2;
  b2Neg(a: b2Vec2): b2Vec2;
  b2Lerp(a: b2Vec2, b: b2Vec2, t: number): b2Vec2;
  b2Mul(a: b2Vec2, b: b2Vec2): b2Vec2;
  b2MulSV(s: number, v: b2Vec2): b2Vec2;
  b2MulAdd(a: b2Vec2, s: number, b: b2Vec2): b2Vec2;
  b2MulSub(a: b2Vec2, s: number, b: b2Vec2): b2Vec2;
  b2Abs(a: b2Vec2): b2Vec2;
  b2Min(a: b2Vec2, b: b2Vec2): b2Vec2;
  b2Max(a: b2Vec2, b: b2Vec2): b2Vec2;
  b2Clamp(v: b2Vec2, a: b2Vec2, b: b2Vec2): b2Vec2;
  b2Length(v: b2Vec2): number;
  b2Distance(a: b2Vec2, b: b2Vec2): number;
  b2Normalize(v: b2Vec2): b2Vec2;
  b2IsNormalized(a: b2Vec2): boolean;
  b2NormalizeRot(q: b2Rot): b2Rot;
  b2IntegrateRotation(q1: b2Rot, deltaAngle: number): b2Rot;
  b2LengthSquared(v: b2Vec2): number;
  b2DistanceSquared(a: b2Vec2, b: b2Vec2): number;
  b2MakeRot(radians: number): b2Rot;
  b2MakeRotFromUnitVector(unitVector: b2Vec2): b2Rot;
  b2ComputeRotationBetweenUnitVectors(v1: b2Vec2, v2: b2Vec2): b2Rot;
  b2IsNormalizedRot(q: b2Rot): boolean;
  b2NLerp(q1: b2Rot, q2: b2Rot, t: number): b2Rot;
  b2ComputeAngularVelocity(q1: b2Rot, q2: b2Rot, inv_h: number): number;
  b2Rot_GetAngle(q: b2Rot): number;
  b2Rot_GetXAxis(q: b2Rot): b2Vec2;
  b2Rot_GetYAxis(q: b2Rot): b2Vec2;
  b2MulRot(q: b2Rot, r: b2Rot): b2Rot;
  b2InvMulRot(a: b2Rot, b: b2Rot): b2Rot;
  b2RelativeAngle(a: b2Rot, b: b2Rot): number;
  b2UnwindAngle(radians: number): number;
  b2RotateVector(q: b2Rot, v: b2Vec2): b2Vec2;
  b2InvRotateVector(q: b2Rot, v: b2Vec2): b2Vec2;
  b2TransformPoint(t: b2Transform, p: b2Vec2): b2Vec2;
  b2InvTransformPoint(t: b2Transform, p: b2Vec2): b2Vec2;
  b2MulTransforms(A: b2Transform, B: b2Transform): b2Transform;
  b2InvMulTransforms(A: b2Transform, B: b2Transform): b2Transform;
  b2MulMV(A: b2Mat22, v: b2Vec2): b2Vec2;
  b2GetInverse22(A: b2Mat22): b2Mat22;
  b2Solve22(A: b2Mat22, b: b2Vec2): b2Vec2;
  b2AABB_Contains(a: b2AABB, b: b2AABB): boolean;
  b2AABB_Center(a: b2AABB): b2Vec2;
  b2AABB_Extents(a: b2AABB): b2Vec2;
  b2AABB_Union(a: b2AABB, b: b2AABB): b2AABB;
  b2AABB_Overlaps(a: b2AABB, b: b2AABB): boolean;
  b2PlaneSeparation(plane: b2Plane, point: b2Vec2): number;
  b2SpringDamper(hertz: number, dampingRatio: number, position: number, velocity: number, timeStep: number): number;
  b2SetLengthUnitsPerMeter(lengthUnits: number): void;
  b2GetLengthUnitsPerMeter(): number;
  b2IsValidRay(input: b2RayCastInput): boolean;
  b2MakePolygon(hull: b2Hull, radius: number): b2Polygon;
  b2MakeOffsetPolygon(hull: b2Hull, position: b2Vec2, rotation: b2Rot): b2Polygon;
  b2MakeOffsetRoundedPolygon(hull: b2Hull, position: b2Vec2, rotation: b2Rot, radius: number): b2Polygon;
  b2MakeSquare(halfWidth: number): b2Polygon;
  b2MakeBox(halfWidth: number, halfHeight: number): b2Polygon;
  b2MakeRoundedBox(halfWidth: number, halfHeight: number, radius: number): b2Polygon;
  b2MakeOffsetBox(halfWidth: number, halfHeight: number, center: b2Vec2, rotation: b2Rot): b2Polygon;
  b2MakeOffsetRoundedBox(halfWidth: number, halfHeight: number, center: b2Vec2, rotation: b2Rot, radius: number): b2Polygon;
  b2TransformPolygon(transform: b2Transform, polygon: b2Polygon): b2Polygon;
  b2ComputeCircleMass(shape: b2Circle, density: number): b2MassData;
  b2ComputeCapsuleMass(shape: b2Capsule, density: number): b2MassData;
  b2ComputePolygonMass(shape: b2Polygon, density: number): b2MassData;
  b2ComputeCircleAABB(shape: b2Circle, transform: b2Transform): b2AABB;
  b2ComputeCapsuleAABB(shape: b2Capsule, transform: b2Transform): b2AABB;
  b2ComputePolygonAABB(shape: b2Polygon, transform: b2Transform): b2AABB;
  b2ComputeSegmentAABB(shape: b2Segment, transform: b2Transform): b2AABB;
  b2PointInCircle(shape: b2Circle, point: b2Vec2): boolean;
  b2PointInCapsule(shape: b2Capsule, point: b2Vec2): boolean;
  b2PointInPolygon(shape: b2Polygon, point: b2Vec2): boolean;
  b2RayCastCircle(shape: b2Circle, input: b2RayCastInput): b2CastOutput;
  b2RayCastCapsule(shape: b2Capsule, input: b2RayCastInput): b2CastOutput;
  b2RayCastSegment(shape: b2Segment, input: b2RayCastInput, oneSided: boolean): b2CastOutput;
  b2RayCastPolygon(shape: b2Polygon, input: b2RayCastInput): b2CastOutput;
  b2ShapeCastCircle(shape: b2Circle, input: b2ShapeCastInput): b2CastOutput;
  b2ShapeCastCapsule(shape: b2Capsule, input: b2ShapeCastInput): b2CastOutput;
  b2ShapeCastSegment(shape: b2Segment, input: b2ShapeCastInput): b2CastOutput;
  b2ShapeCastPolygon(shape: b2Polygon, input: b2ShapeCastInput): b2CastOutput;
  b2ValidateHull(hull: b2Hull): boolean;
  b2SegmentDistance(p1: b2Vec2, q1: b2Vec2, p2: b2Vec2, q2: b2Vec2): b2SegmentDistanceResult;
  b2ShapeCast(input: b2ShapeCastPairInput): b2CastOutput;
  b2GetSweepTransform(sweep: b2Sweep, time: number): b2Transform;
  b2TimeOfImpact(input: b2TOIInput): b2TOIOutput;
  b2CollideCircles(circleA: b2Circle, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  b2CollideCapsuleAndCircle(capsuleA: b2Capsule, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  b2CollideSegmentAndCircle(segmentA: b2Segment, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  b2CollidePolygonAndCircle(polygonA: b2Polygon, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  b2CollideCapsules(capsuleA: b2Capsule, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold;
  b2CollideSegmentAndCapsule(segmentA: b2Segment, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold;
  b2CollidePolygonAndCapsule(polygonA: b2Polygon, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold;
  b2CollidePolygons(polygonA: b2Polygon, xfA: b2Transform, polygonB: b2Polygon, xfB: b2Transform): b2Manifold;
  b2CollideSegmentAndPolygon(segmentA: b2Segment, xfA: b2Transform, polygonB: b2Polygon, xfB: b2Transform): b2Manifold;
  b2CollideChainSegmentAndCircle(segmentA: b2ChainSegment, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  b2DefaultWorldDef(): b2WorldDef;
  b2DefaultBodyDef(): b2BodyDef;
  b2DefaultFilter(): b2Filter;
  b2DefaultQueryFilter(): b2QueryFilter;
  b2DefaultSurfaceMaterial(): b2SurfaceMaterial;
  b2DefaultShapeDef(): b2ShapeDef;
  b2DefaultChainDef(): b2ChainDef;
  b2DefaultDistanceJointDef(): b2DistanceJointDef;
  b2DefaultMotorJointDef(): b2MotorJointDef;
  b2DefaultFilterJointDef(): b2FilterJointDef;
  b2DefaultPrismaticJointDef(): b2PrismaticJointDef;
  b2DefaultRevoluteJointDef(): b2RevoluteJointDef;
  b2DefaultWeldJointDef(): b2WeldJointDef;
  b2DefaultWheelJointDef(): b2WheelJointDef;
  b2DefaultExplosionDef(): b2ExplosionDef;
  b2DefaultDebugDraw(): b2DebugDraw;
  b2CreateWorld(def: b2WorldDefInput): b2WorldId;
  b2World_IsValid(id: b2WorldId): boolean;
  b2World_CastRayClosest(worldId: b2WorldId, origin: b2Vec2, translation: b2Vec2, filter: b2QueryFilterInput): b2RayResult;
  b2World_CastMover(worldId: b2WorldId, mover: b2Capsule, translation: b2Vec2, filter: b2QueryFilterInput): number;
  b2World_EnableSleeping(worldId: b2WorldId, flag: boolean): void;
  b2World_IsSleepingEnabled(worldId: b2WorldId): boolean;
  b2World_EnableContinuous(worldId: b2WorldId, flag: boolean): void;
  b2World_IsContinuousEnabled(worldId: b2WorldId): boolean;
  b2World_SetRestitutionThreshold(worldId: b2WorldId, value: number): void;
  b2World_GetRestitutionThreshold(worldId: b2WorldId): number;
  b2World_SetHitEventThreshold(worldId: b2WorldId, value: number): void;
  b2World_GetHitEventThreshold(worldId: b2WorldId): number;
  b2World_SetGravity(worldId: b2WorldId, gravity: b2Vec2): void;
  b2World_GetGravity(worldId: b2WorldId): b2Vec2;
  b2World_Explode(worldId: b2WorldId, explosionDef: b2ExplosionDefInput): void;
  b2World_SetContactTuning(worldId: b2WorldId, hertz: number, dampingRatio: number, pushSpeed: number): void;
  b2World_SetMaximumLinearSpeed(worldId: b2WorldId, maximumLinearSpeed: number): void;
  b2World_GetMaximumLinearSpeed(worldId: b2WorldId): number;
  b2World_EnableWarmStarting(worldId: b2WorldId, flag: boolean): void;
  b2World_IsWarmStartingEnabled(worldId: b2WorldId): boolean;
  b2World_GetAwakeBodyCount(worldId: b2WorldId): number;
  b2World_GetProfile(worldId: b2WorldId): b2Profile;
  b2World_GetCounters(worldId: b2WorldId): b2Counters;
  b2World_DumpMemoryStats(worldId: b2WorldId): void;
  b2World_RebuildStaticTree(worldId: b2WorldId): void;
  b2World_EnableSpeculative(worldId: b2WorldId, flag: boolean): void;
  b2CreateBody(worldId: b2WorldId, def: b2BodyDefInput): b2BodyId;
  b2DestroyBody(bodyId: b2BodyId): void;
  b2Body_IsValid(id: b2BodyId): boolean;
  b2Body_GetType(bodyId: b2BodyId): b2BodyType;
  b2Body_SetType(bodyId: b2BodyId, type: b2BodyType): void;
  b2Body_GetPosition(bodyId: b2BodyId): b2Vec2;
  b2Body_GetRotation(bodyId: b2BodyId): b2Rot;
  b2Body_GetTransform(bodyId: b2BodyId): b2Transform;
  b2Body_SetTransform(bodyId: b2BodyId, position: b2Vec2, rotation: b2Rot): void;
  b2Body_GetLocalPoint(bodyId: b2BodyId, worldPoint: b2Vec2): b2Vec2;
  b2Body_GetWorldPoint(bodyId: b2BodyId, localPoint: b2Vec2): b2Vec2;
  b2Body_GetLocalVector(bodyId: b2BodyId, worldVector: b2Vec2): b2Vec2;
  b2Body_GetWorldVector(bodyId: b2BodyId, localVector: b2Vec2): b2Vec2;
  b2Body_GetLinearVelocity(bodyId: b2BodyId): b2Vec2;
  b2Body_GetAngularVelocity(bodyId: b2BodyId): number;
  b2Body_SetLinearVelocity(bodyId: b2BodyId, linearVelocity: b2Vec2): void;
  b2Body_SetAngularVelocity(bodyId: b2BodyId, angularVelocity: number): void;
  b2Body_SetTargetTransform(bodyId: b2BodyId, target: b2Transform, timeStep: number): void;
  b2Body_GetLocalPointVelocity(bodyId: b2BodyId, localPoint: b2Vec2): b2Vec2;
  b2Body_GetWorldPointVelocity(bodyId: b2BodyId, worldPoint: b2Vec2): b2Vec2;
  b2Body_ApplyForce(bodyId: b2BodyId, force: b2Vec2, point: b2Vec2, wake: boolean): void;
  b2Body_ApplyForceToCenter(bodyId: b2BodyId, force: b2Vec2, wake: boolean): void;
  b2Body_ApplyTorque(bodyId: b2BodyId, torque: number, wake: boolean): void;
  b2Body_ApplyLinearImpulse(bodyId: b2BodyId, impulse: b2Vec2, point: b2Vec2, wake: boolean): void;
  b2Body_ApplyLinearImpulseToCenter(bodyId: b2BodyId, impulse: b2Vec2, wake: boolean): void;
  b2Body_ApplyAngularImpulse(bodyId: b2BodyId, impulse: number, wake: boolean): void;
  b2Body_GetMass(bodyId: b2BodyId): number;
  b2Body_GetRotationalInertia(bodyId: b2BodyId): number;
  b2Body_GetLocalCenterOfMass(bodyId: b2BodyId): b2Vec2;
  b2Body_GetWorldCenterOfMass(bodyId: b2BodyId): b2Vec2;
  b2Body_SetMassData(bodyId: b2BodyId, massData: b2MassData): void;
  b2Body_GetMassData(bodyId: b2BodyId): b2MassData;
  b2Body_ApplyMassFromShapes(bodyId: b2BodyId): void;
  b2Body_SetLinearDamping(bodyId: b2BodyId, linearDamping: number): void;
  b2Body_GetLinearDamping(bodyId: b2BodyId): number;
  b2Body_SetAngularDamping(bodyId: b2BodyId, angularDamping: number): void;
  b2Body_GetAngularDamping(bodyId: b2BodyId): number;
  b2Body_SetGravityScale(bodyId: b2BodyId, gravityScale: number): void;
  b2Body_GetGravityScale(bodyId: b2BodyId): number;
  b2Body_IsAwake(bodyId: b2BodyId): boolean;
  b2Body_SetAwake(bodyId: b2BodyId, awake: boolean): void;
  b2Body_WakeTouching(bodyId: b2BodyId): void;
  b2Body_EnableSleep(bodyId: b2BodyId, enableSleep: boolean): void;
  b2Body_IsSleepEnabled(bodyId: b2BodyId): boolean;
  b2Body_SetSleepThreshold(bodyId: b2BodyId, sleepThreshold: number): void;
  b2Body_GetSleepThreshold(bodyId: b2BodyId): number;
  b2Body_IsEnabled(bodyId: b2BodyId): boolean;
  b2Body_Disable(bodyId: b2BodyId): void;
  b2Body_Enable(bodyId: b2BodyId): void;
  b2Body_SetMotionLocks(bodyId: b2BodyId, locks: b2MotionLocks): void;
  b2Body_GetMotionLocks(bodyId: b2BodyId): b2MotionLocks;
  b2Body_SetBullet(bodyId: b2BodyId, flag: boolean): void;
  b2Body_IsBullet(bodyId: b2BodyId): boolean;
  b2Body_EnableContactEvents(bodyId: b2BodyId, flag: boolean): void;
  b2Body_EnableHitEvents(bodyId: b2BodyId, flag: boolean): void;
  b2Body_GetWorld(bodyId: b2BodyId): b2WorldId;
  b2Body_GetShapeCount(bodyId: b2BodyId): number;
  b2Body_GetJointCount(bodyId: b2BodyId): number;
  b2Body_GetContactCapacity(bodyId: b2BodyId): number;
  b2Body_ComputeAABB(bodyId: b2BodyId): b2AABB;
  b2CreateCircleShape(bodyId: b2BodyId, def: b2ShapeDefInput, circle: b2Circle): b2ShapeId;
  b2CreateSegmentShape(bodyId: b2BodyId, def: b2ShapeDefInput, segment: b2Segment): b2ShapeId;
  b2CreateCapsuleShape(bodyId: b2BodyId, def: b2ShapeDefInput, capsule: b2Capsule): b2ShapeId;
  b2CreatePolygonShape(bodyId: b2BodyId, def: b2ShapeDefInput, polygon: b2Polygon): b2ShapeId;
  b2DestroyShape(shapeId: b2ShapeId, updateBodyMass: boolean): void;
  b2Shape_IsValid(id: b2ShapeId): boolean;
  b2Shape_GetType(shapeId: b2ShapeId): b2ShapeType;
  b2Shape_GetBody(shapeId: b2ShapeId): b2BodyId;
  b2Shape_GetWorld(shapeId: b2ShapeId): b2WorldId;
  b2Shape_IsSensor(shapeId: b2ShapeId): boolean;
  b2Shape_SetDensity(shapeId: b2ShapeId, density: number, updateBodyMass: boolean): void;
  b2Shape_GetDensity(shapeId: b2ShapeId): number;
  b2Shape_SetFriction(shapeId: b2ShapeId, friction: number): void;
  b2Shape_GetFriction(shapeId: b2ShapeId): number;
  b2Shape_SetRestitution(shapeId: b2ShapeId, restitution: number): void;
  b2Shape_GetRestitution(shapeId: b2ShapeId): number;
  b2Shape_SetUserMaterial(shapeId: b2ShapeId, material: number): void;
  b2Shape_GetUserMaterial(shapeId: b2ShapeId): number;
  b2Shape_SetSurfaceMaterial(shapeId: b2ShapeId, surfaceMaterial: b2SurfaceMaterialInput): void;
  b2Shape_GetSurfaceMaterial(shapeId: b2ShapeId): b2SurfaceMaterial;
  b2Shape_GetFilter(shapeId: b2ShapeId): b2Filter;
  b2Shape_SetFilter(shapeId: b2ShapeId, filter: b2FilterInput): void;
  b2Shape_EnableSensorEvents(shapeId: b2ShapeId, flag: boolean): void;
  b2Shape_AreSensorEventsEnabled(shapeId: b2ShapeId): boolean;
  b2Shape_EnableContactEvents(shapeId: b2ShapeId, flag: boolean): void;
  b2Shape_AreContactEventsEnabled(shapeId: b2ShapeId): boolean;
  b2Shape_EnablePreSolveEvents(shapeId: b2ShapeId, flag: boolean): void;
  b2Shape_ArePreSolveEventsEnabled(shapeId: b2ShapeId): boolean;
  b2Shape_EnableHitEvents(shapeId: b2ShapeId, flag: boolean): void;
  b2Shape_AreHitEventsEnabled(shapeId: b2ShapeId): boolean;
  b2Shape_TestPoint(shapeId: b2ShapeId, point: b2Vec2): boolean;
  b2Shape_RayCast(shapeId: b2ShapeId, input: b2RayCastInput): b2CastOutput;
  b2Shape_GetCircle(shapeId: b2ShapeId): b2Circle;
  b2Shape_GetSegment(shapeId: b2ShapeId): b2Segment;
  b2Shape_GetChainSegment(shapeId: b2ShapeId): b2ChainSegment;
  b2Shape_GetCapsule(shapeId: b2ShapeId): b2Capsule;
  b2Shape_GetPolygon(shapeId: b2ShapeId): b2Polygon;
  b2Shape_SetCircle(shapeId: b2ShapeId, circle: b2Circle): void;
  b2Shape_SetCapsule(shapeId: b2ShapeId, capsule: b2Capsule): void;
  b2Shape_SetSegment(shapeId: b2ShapeId, segment: b2Segment): void;
  b2Shape_SetPolygon(shapeId: b2ShapeId, polygon: b2Polygon): void;
  b2Shape_GetParentChain(shapeId: b2ShapeId): b2ChainId;
  b2Shape_GetContactCapacity(shapeId: b2ShapeId): number;
  b2Shape_GetSensorCapacity(shapeId: b2ShapeId): number;
  b2Shape_GetAABB(shapeId: b2ShapeId): b2AABB;
  b2Shape_ComputeMassData(shapeId: b2ShapeId): b2MassData;
  b2Shape_GetClosestPoint(shapeId: b2ShapeId, target: b2Vec2): b2Vec2;
  b2Shape_ApplyWind(shapeId: b2ShapeId, wind: b2Vec2, drag: number, lift: number, wake: boolean): void;
  b2DestroyChain(chainId: b2ChainId): void;
  b2Chain_GetWorld(chainId: b2ChainId): b2WorldId;
  b2Chain_GetSegmentCount(chainId: b2ChainId): number;
  b2Chain_SetSurfaceMaterial(chainId: b2ChainId, material: b2SurfaceMaterialInput, materialIndex: number): void;
  b2Chain_GetSurfaceMaterial(chainId: b2ChainId, materialIndex: number): b2SurfaceMaterial;
  b2Chain_IsValid(id: b2ChainId): boolean;
  b2DestroyJoint(jointId: b2JointId, wakeAttached: boolean): void;
  b2Joint_IsValid(id: b2JointId): boolean;
  b2Joint_GetType(jointId: b2JointId): b2JointType;
  b2Joint_GetBodyA(jointId: b2JointId): b2BodyId;
  b2Joint_GetBodyB(jointId: b2JointId): b2BodyId;
  b2Joint_GetWorld(jointId: b2JointId): b2WorldId;
  b2Joint_SetLocalFrameA(jointId: b2JointId, localFrame: b2Transform): void;
  b2Joint_GetLocalFrameA(jointId: b2JointId): b2Transform;
  b2Joint_SetLocalFrameB(jointId: b2JointId, localFrame: b2Transform): void;
  b2Joint_GetLocalFrameB(jointId: b2JointId): b2Transform;
  b2Joint_SetCollideConnected(jointId: b2JointId, shouldCollide: boolean): void;
  b2Joint_GetCollideConnected(jointId: b2JointId): boolean;
  b2Joint_WakeBodies(jointId: b2JointId): void;
  b2Joint_GetConstraintForce(jointId: b2JointId): b2Vec2;
  b2Joint_GetConstraintTorque(jointId: b2JointId): number;
  b2Joint_GetLinearSeparation(jointId: b2JointId): number;
  b2Joint_GetAngularSeparation(jointId: b2JointId): number;
  b2Joint_SetConstraintTuning(jointId: b2JointId, hertz: number, dampingRatio: number): void;
  b2Joint_SetForceThreshold(jointId: b2JointId, threshold: number): void;
  b2Joint_GetForceThreshold(jointId: b2JointId): number;
  b2Joint_SetTorqueThreshold(jointId: b2JointId, threshold: number): void;
  b2Joint_GetTorqueThreshold(jointId: b2JointId): number;
  b2CreateDistanceJoint(worldId: b2WorldId, def: b2DistanceJointDefInput): b2JointId;
  b2DistanceJoint_SetLength(jointId: b2JointId, length: number): void;
  b2DistanceJoint_GetLength(jointId: b2JointId): number;
  b2DistanceJoint_EnableSpring(jointId: b2JointId, enableSpring: boolean): void;
  b2DistanceJoint_IsSpringEnabled(jointId: b2JointId): boolean;
  b2DistanceJoint_SetSpringForceRange(jointId: b2JointId, lowerForce: number, upperForce: number): void;
  b2DistanceJoint_SetSpringHertz(jointId: b2JointId, hertz: number): void;
  b2DistanceJoint_SetSpringDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  b2DistanceJoint_GetSpringHertz(jointId: b2JointId): number;
  b2DistanceJoint_GetSpringDampingRatio(jointId: b2JointId): number;
  b2DistanceJoint_EnableLimit(jointId: b2JointId, enableLimit: boolean): void;
  b2DistanceJoint_IsLimitEnabled(jointId: b2JointId): boolean;
  b2DistanceJoint_SetLengthRange(jointId: b2JointId, minLength: number, maxLength: number): void;
  b2DistanceJoint_GetMinLength(jointId: b2JointId): number;
  b2DistanceJoint_GetMaxLength(jointId: b2JointId): number;
  b2DistanceJoint_GetCurrentLength(jointId: b2JointId): number;
  b2DistanceJoint_EnableMotor(jointId: b2JointId, enableMotor: boolean): void;
  b2DistanceJoint_IsMotorEnabled(jointId: b2JointId): boolean;
  b2DistanceJoint_SetMotorSpeed(jointId: b2JointId, motorSpeed: number): void;
  b2DistanceJoint_GetMotorSpeed(jointId: b2JointId): number;
  b2DistanceJoint_SetMaxMotorForce(jointId: b2JointId, force: number): void;
  b2DistanceJoint_GetMaxMotorForce(jointId: b2JointId): number;
  b2DistanceJoint_GetMotorForce(jointId: b2JointId): number;
  b2CreateMotorJoint(worldId: b2WorldId, def: b2MotorJointDefInput): b2JointId;
  b2MotorJoint_SetLinearVelocity(jointId: b2JointId, velocity: b2Vec2): void;
  b2MotorJoint_GetLinearVelocity(jointId: b2JointId): b2Vec2;
  b2MotorJoint_SetAngularVelocity(jointId: b2JointId, velocity: number): void;
  b2MotorJoint_GetAngularVelocity(jointId: b2JointId): number;
  b2MotorJoint_SetMaxVelocityForce(jointId: b2JointId, maxForce: number): void;
  b2MotorJoint_GetMaxVelocityForce(jointId: b2JointId): number;
  b2MotorJoint_SetMaxVelocityTorque(jointId: b2JointId, maxTorque: number): void;
  b2MotorJoint_GetMaxVelocityTorque(jointId: b2JointId): number;
  b2MotorJoint_SetLinearHertz(jointId: b2JointId, hertz: number): void;
  b2MotorJoint_GetLinearHertz(jointId: b2JointId): number;
  b2MotorJoint_SetLinearDampingRatio(jointId: b2JointId, damping: number): void;
  b2MotorJoint_GetLinearDampingRatio(jointId: b2JointId): number;
  b2MotorJoint_SetAngularHertz(jointId: b2JointId, hertz: number): void;
  b2MotorJoint_GetAngularHertz(jointId: b2JointId): number;
  b2MotorJoint_SetAngularDampingRatio(jointId: b2JointId, damping: number): void;
  b2MotorJoint_GetAngularDampingRatio(jointId: b2JointId): number;
  b2MotorJoint_SetMaxSpringForce(jointId: b2JointId, maxForce: number): void;
  b2MotorJoint_GetMaxSpringForce(jointId: b2JointId): number;
  b2MotorJoint_SetMaxSpringTorque(jointId: b2JointId, maxTorque: number): void;
  b2MotorJoint_GetMaxSpringTorque(jointId: b2JointId): number;
  b2CreateFilterJoint(worldId: b2WorldId, def: b2FilterJointDefInput): b2JointId;
  b2CreatePrismaticJoint(worldId: b2WorldId, def: b2PrismaticJointDefInput): b2JointId;
  b2PrismaticJoint_EnableSpring(jointId: b2JointId, enableSpring: boolean): void;
  b2PrismaticJoint_IsSpringEnabled(jointId: b2JointId): boolean;
  b2PrismaticJoint_SetSpringHertz(jointId: b2JointId, hertz: number): void;
  b2PrismaticJoint_GetSpringHertz(jointId: b2JointId): number;
  b2PrismaticJoint_SetSpringDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  b2PrismaticJoint_GetSpringDampingRatio(jointId: b2JointId): number;
  b2PrismaticJoint_SetTargetTranslation(jointId: b2JointId, translation: number): void;
  b2PrismaticJoint_GetTargetTranslation(jointId: b2JointId): number;
  b2PrismaticJoint_EnableLimit(jointId: b2JointId, enableLimit: boolean): void;
  b2PrismaticJoint_IsLimitEnabled(jointId: b2JointId): boolean;
  b2PrismaticJoint_GetLowerLimit(jointId: b2JointId): number;
  b2PrismaticJoint_GetUpperLimit(jointId: b2JointId): number;
  b2PrismaticJoint_SetLimits(jointId: b2JointId, lower: number, upper: number): void;
  b2PrismaticJoint_EnableMotor(jointId: b2JointId, enableMotor: boolean): void;
  b2PrismaticJoint_IsMotorEnabled(jointId: b2JointId): boolean;
  b2PrismaticJoint_SetMotorSpeed(jointId: b2JointId, motorSpeed: number): void;
  b2PrismaticJoint_GetMotorSpeed(jointId: b2JointId): number;
  b2PrismaticJoint_SetMaxMotorForce(jointId: b2JointId, force: number): void;
  b2PrismaticJoint_GetMaxMotorForce(jointId: b2JointId): number;
  b2PrismaticJoint_GetMotorForce(jointId: b2JointId): number;
  b2PrismaticJoint_GetTranslation(jointId: b2JointId): number;
  b2PrismaticJoint_GetSpeed(jointId: b2JointId): number;
  b2CreateRevoluteJoint(worldId: b2WorldId, def: b2RevoluteJointDefInput): b2JointId;
  b2RevoluteJoint_EnableSpring(jointId: b2JointId, enableSpring: boolean): void;
  b2RevoluteJoint_IsSpringEnabled(jointId: b2JointId): boolean;
  b2RevoluteJoint_SetSpringHertz(jointId: b2JointId, hertz: number): void;
  b2RevoluteJoint_GetSpringHertz(jointId: b2JointId): number;
  b2RevoluteJoint_SetSpringDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  b2RevoluteJoint_GetSpringDampingRatio(jointId: b2JointId): number;
  b2RevoluteJoint_SetTargetAngle(jointId: b2JointId, angle: number): void;
  b2RevoluteJoint_GetTargetAngle(jointId: b2JointId): number;
  b2RevoluteJoint_GetAngle(jointId: b2JointId): number;
  b2RevoluteJoint_EnableLimit(jointId: b2JointId, enableLimit: boolean): void;
  b2RevoluteJoint_IsLimitEnabled(jointId: b2JointId): boolean;
  b2RevoluteJoint_GetLowerLimit(jointId: b2JointId): number;
  b2RevoluteJoint_GetUpperLimit(jointId: b2JointId): number;
  b2RevoluteJoint_SetLimits(jointId: b2JointId, lower: number, upper: number): void;
  b2RevoluteJoint_EnableMotor(jointId: b2JointId, enableMotor: boolean): void;
  b2RevoluteJoint_IsMotorEnabled(jointId: b2JointId): boolean;
  b2RevoluteJoint_SetMotorSpeed(jointId: b2JointId, motorSpeed: number): void;
  b2RevoluteJoint_GetMotorSpeed(jointId: b2JointId): number;
  b2RevoluteJoint_GetMotorTorque(jointId: b2JointId): number;
  b2RevoluteJoint_SetMaxMotorTorque(jointId: b2JointId, torque: number): void;
  b2RevoluteJoint_GetMaxMotorTorque(jointId: b2JointId): number;
  b2CreateWeldJoint(worldId: b2WorldId, def: b2WeldJointDefInput): b2JointId;
  b2WeldJoint_SetLinearHertz(jointId: b2JointId, hertz: number): void;
  b2WeldJoint_GetLinearHertz(jointId: b2JointId): number;
  b2WeldJoint_SetLinearDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  b2WeldJoint_GetLinearDampingRatio(jointId: b2JointId): number;
  b2WeldJoint_SetAngularHertz(jointId: b2JointId, hertz: number): void;
  b2WeldJoint_GetAngularHertz(jointId: b2JointId): number;
  b2WeldJoint_SetAngularDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  b2WeldJoint_GetAngularDampingRatio(jointId: b2JointId): number;
  b2CreateWheelJoint(worldId: b2WorldId, def: b2WheelJointDefInput): b2JointId;
  b2WheelJoint_EnableSpring(jointId: b2JointId, enableSpring: boolean): void;
  b2WheelJoint_IsSpringEnabled(jointId: b2JointId): boolean;
  b2WheelJoint_SetSpringHertz(jointId: b2JointId, hertz: number): void;
  b2WheelJoint_GetSpringHertz(jointId: b2JointId): number;
  b2WheelJoint_SetSpringDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  b2WheelJoint_GetSpringDampingRatio(jointId: b2JointId): number;
  b2WheelJoint_EnableLimit(jointId: b2JointId, enableLimit: boolean): void;
  b2WheelJoint_IsLimitEnabled(jointId: b2JointId): boolean;
  b2WheelJoint_GetLowerLimit(jointId: b2JointId): number;
  b2WheelJoint_GetUpperLimit(jointId: b2JointId): number;
  b2WheelJoint_SetLimits(jointId: b2JointId, lower: number, upper: number): void;
  b2WheelJoint_EnableMotor(jointId: b2JointId, enableMotor: boolean): void;
  b2WheelJoint_IsMotorEnabled(jointId: b2JointId): boolean;
  b2WheelJoint_SetMotorSpeed(jointId: b2JointId, motorSpeed: number): void;
  b2WheelJoint_GetMotorSpeed(jointId: b2JointId): number;
  b2WheelJoint_SetMaxMotorTorque(jointId: b2JointId, torque: number): void;
  b2WheelJoint_GetMaxMotorTorque(jointId: b2JointId): number;
  b2WheelJoint_GetMotorTorque(jointId: b2JointId): number;
  b2Contact_IsValid(id: b2ContactId): boolean;
  b2Contact_GetData(contactId: b2ContactId): b2ContactData;
}

export type MainModule = WasmModule & EmbindModule;
/** The Box2D module: every function of the C API on one object, ready once the wasm is instantiated. */
export type Box2D = MainModule;

/** Instantiates the wasm; the `locateFile` option redirects the .wasm request. */
export default function createBox2D(options?: { locateFile?(path: string, prefix: string): string }): Promise<MainModule>;
