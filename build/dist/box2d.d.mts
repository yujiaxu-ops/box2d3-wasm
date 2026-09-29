// Box2D v3 for JavaScript: the declarations of the embind bindings scripts/gen-bindings.mjs generates from Box2D's
// headers and csrc/glue.cpp writes by hand, with the doc comments of the headers. Written by scripts/emit-types.mjs;
// do not edit. Structs are plain objects, copied on every crossing; a definition goes in as any subset of its
// fields; 64-bit integers are numbers (exact up to 2^53); enums are the `b2*` objects of the module.

/** A value of b2TOIState; compare with ===. */
export interface b2TOIStateValue<T extends number> {
  readonly value: T;
}

/** Describes the TOI output */
export type b2TOIState = b2TOIStateValue<0> | b2TOIStateValue<1> | b2TOIStateValue<2> | b2TOIStateValue<3> | b2TOIStateValue<4>;

/** A value of b2BodyType; compare with ===. */
export interface b2BodyTypeValue<T extends number> {
  readonly value: T;
}

/** The body simulation type. Each body is one of these three types. The type determines how the body behaves in the simulation. */
export type b2BodyType = b2BodyTypeValue<0> | b2BodyTypeValue<1> | b2BodyTypeValue<2> | b2BodyTypeValue<3>;

/** A value of b2ShapeType; compare with ===. */
export interface b2ShapeTypeValue<T extends number> {
  readonly value: T;
}

/** Shape type */
export type b2ShapeType = b2ShapeTypeValue<0> | b2ShapeTypeValue<1> | b2ShapeTypeValue<2> | b2ShapeTypeValue<3> | b2ShapeTypeValue<4> | b2ShapeTypeValue<5>;

/** A value of b2JointType; compare with ===. */
export interface b2JointTypeValue<T extends number> {
  readonly value: T;
}

/** Joint type enumeration This is useful because all joint types use b2JointId and sometimes you want to get the type of a joint. */
export type b2JointType = b2JointTypeValue<0> | b2JointTypeValue<1> | b2JointTypeValue<2> | b2JointTypeValue<3> | b2JointTypeValue<4> | b2JointTypeValue<5> | b2JointTypeValue<6>;

/** A value of b2HexColor; compare with ===. */
export interface b2HexColorValue<T extends number> {
  readonly value: T;
}

/** These colors are used for debug draw and mostly match the named SVG colors. See https://www.rapidtables.com/web/color/index.html https://johndecember.com/html/spec/colorsvg.html https://upload.wikimedia.org/wikipedia/commons/2/2b/SVG_Recognized_color_keyword_names.svg */
export type b2HexColor = b2HexColorValue<15792383> | b2HexColorValue<16444375> | b2HexColorValue<65535> | b2HexColorValue<8388564> | b2HexColorValue<15794175> | b2HexColorValue<16119260> | b2HexColorValue<16770244> | b2HexColorValue<0> | b2HexColorValue<16772045> | b2HexColorValue<255> | b2HexColorValue<9055202> | b2HexColorValue<10824234> | b2HexColorValue<14596231> | b2HexColorValue<6266528> | b2HexColorValue<8388352> | b2HexColorValue<13789470> | b2HexColorValue<16744272> | b2HexColorValue<6591981> | b2HexColorValue<16775388> | b2HexColorValue<14423100> | b2HexColorValue<65535> | b2HexColorValue<139> | b2HexColorValue<35723> | b2HexColorValue<12092939> | b2HexColorValue<11119017> | b2HexColorValue<25600> | b2HexColorValue<12433259> | b2HexColorValue<9109643> | b2HexColorValue<5597999> | b2HexColorValue<16747520> | b2HexColorValue<10040012> | b2HexColorValue<9109504> | b2HexColorValue<15308410> | b2HexColorValue<9419919> | b2HexColorValue<4734347> | b2HexColorValue<3100495> | b2HexColorValue<52945> | b2HexColorValue<9699539> | b2HexColorValue<16716947> | b2HexColorValue<49151> | b2HexColorValue<6908265> | b2HexColorValue<2003199> | b2HexColorValue<11674146> | b2HexColorValue<16775920> | b2HexColorValue<2263842> | b2HexColorValue<16711935> | b2HexColorValue<14474460> | b2HexColorValue<16316671> | b2HexColorValue<16766720> | b2HexColorValue<14329120> | b2HexColorValue<8421504> | b2HexColorValue<32768> | b2HexColorValue<11403055> | b2HexColorValue<15794160> | b2HexColorValue<16738740> | b2HexColorValue<13458524> | b2HexColorValue<4915330> | b2HexColorValue<16777200> | b2HexColorValue<15787660> | b2HexColorValue<15132410> | b2HexColorValue<16773365> | b2HexColorValue<8190976> | b2HexColorValue<16775885> | b2HexColorValue<11393254> | b2HexColorValue<15761536> | b2HexColorValue<14745599> | b2HexColorValue<16448210> | b2HexColorValue<13882323> | b2HexColorValue<9498256> | b2HexColorValue<16758465> | b2HexColorValue<16752762> | b2HexColorValue<2142890> | b2HexColorValue<8900346> | b2HexColorValue<7833753> | b2HexColorValue<11584734> | b2HexColorValue<16777184> | b2HexColorValue<65280> | b2HexColorValue<3329330> | b2HexColorValue<16445670> | b2HexColorValue<16711935> | b2HexColorValue<8388608> | b2HexColorValue<6737322> | b2HexColorValue<205> | b2HexColorValue<12211667> | b2HexColorValue<9662683> | b2HexColorValue<3978097> | b2HexColorValue<8087790> | b2HexColorValue<64154> | b2HexColorValue<4772300> | b2HexColorValue<13047173> | b2HexColorValue<1644912> | b2HexColorValue<16121850> | b2HexColorValue<16770273> | b2HexColorValue<16770229> | b2HexColorValue<16768685> | b2HexColorValue<128> | b2HexColorValue<16643558> | b2HexColorValue<8421376> | b2HexColorValue<7048739> | b2HexColorValue<16753920> | b2HexColorValue<16729344> | b2HexColorValue<14315734> | b2HexColorValue<15657130> | b2HexColorValue<10025880> | b2HexColorValue<11529966> | b2HexColorValue<14381203> | b2HexColorValue<16773077> | b2HexColorValue<16767673> | b2HexColorValue<13468991> | b2HexColorValue<16761035> | b2HexColorValue<14524637> | b2HexColorValue<11591910> | b2HexColorValue<8388736> | b2HexColorValue<6697881> | b2HexColorValue<16711680> | b2HexColorValue<12357519> | b2HexColorValue<4286945> | b2HexColorValue<9127187> | b2HexColorValue<16416882> | b2HexColorValue<16032864> | b2HexColorValue<3050327> | b2HexColorValue<16774638> | b2HexColorValue<10506797> | b2HexColorValue<12632256> | b2HexColorValue<8900331> | b2HexColorValue<6970061> | b2HexColorValue<7372944> | b2HexColorValue<16775930> | b2HexColorValue<65407> | b2HexColorValue<4620980> | b2HexColorValue<13808780> | b2HexColorValue<32896> | b2HexColorValue<14204888> | b2HexColorValue<16737095> | b2HexColorValue<4251856> | b2HexColorValue<15631086> | b2HexColorValue<16113331> | b2HexColorValue<16777215> | b2HexColorValue<16119285> | b2HexColorValue<16776960> | b2HexColorValue<10145074> | b2HexColorValue<14430514> | b2HexColorValue<3190463> | b2HexColorValue<9226532> | b2HexColorValue<16772748>;

/** Version numbering scheme. See https://semver.org/ */
export interface b2Version {
  /** Significant changes */
  major: number;
  /** Incremental changes */
  minor: number;
  /** Bug fixes */
  revision: number;
}

/** 2D vector This can be used to represent a point or free vector */
export interface b2Vec2 {
  /** coordinates */
  x: number;
  /** coordinates */
  y: number;
}

/** Cosine and sine pair This uses a custom implementation designed for cross-platform determinism */
export interface b2CosSin {
  /** cosine and sine */
  cosine: number;
  sine: number;
}

/** 2D rotation This is similar to using a complex number for rotation */
export interface b2Rot {
  /** cosine and sine */
  c: number;
  /** cosine and sine */
  s: number;
}

/** A 2D rigid transform */
export interface b2Transform {
  p: b2Vec2;
  q: b2Rot;
}

/** A 2-by-2 Matrix */
export interface b2Mat22 {
  /** columns */
  cx: b2Vec2;
  /** columns */
  cy: b2Vec2;
}

/** Axis-aligned bounding box */
export interface b2AABB {
  lowerBound: b2Vec2;
  upperBound: b2Vec2;
}

/** separation = dot(normal, point) - offset */
export interface b2Plane {
  normal: b2Vec2;
  offset: number;
}

/** Low level ray cast input data */
export interface b2RayCastInput {
  /** Start point of the ray cast */
  origin: b2Vec2;
  /** Translation of the ray cast */
  translation: b2Vec2;
  /** The maximum fraction of the translation to consider, typically 1 */
  maxFraction: number;
}

/** A distance proxy is used by the GJK algorithm. It encapsulates any shape. You can provide between 1 and B2_MAX_POLYGON_VERTICES and a radius. */
export interface b2ShapeProxy {
  /** The point cloud */
  points: b2Vec2[];
  /** The number of points. Must be greater than 0. */
  count: number;
  /** The external radius of the point cloud. May be zero. */
  radius: number;
}

/** Low level shape cast input in generic form. This allows casting an arbitrary point cloud wrap with a radius. For example, a circle is a single point with a non-zero radius. A capsule is two points with a non-zero radius. A box is four points with a zero radius. */
export interface b2ShapeCastInput {
  /** A generic shape */
  proxy: b2ShapeProxy;
  /** The translation of the shape cast */
  translation: b2Vec2;
  /** The maximum fraction of the translation to consider, typically 1 */
  maxFraction: number;
  /** Allow shape cast to encroach when initially touching. This only works if the radius is greater than zero. */
  canEncroach: boolean;
}

/** Low level ray cast or shape-cast output data. Returns a zero fraction and normal in the case of initial overlap. */
export interface b2CastOutput {
  /** The surface normal at the hit point */
  normal: b2Vec2;
  /** The surface hit point */
  point: b2Vec2;
  /** The fraction of the input translation at collision */
  fraction: number;
  /** The number of iterations used */
  iterations: number;
  /** Did the cast hit? */
  hit: boolean;
}

/** This holds the mass data computed for a shape. */
export interface b2MassData {
  /** The mass of the shape, usually in kilograms. */
  mass: number;
  /** The position of the shape's centroid relative to the shape's origin. */
  center: b2Vec2;
  /** The rotational inertia of the shape about the shape center. */
  rotationalInertia: number;
}

/** A solid circle */
export interface b2Circle {
  /** The local center */
  center: b2Vec2;
  /** The radius */
  radius: number;
}

/** A solid capsule can be viewed as two semicircles connected by a rectangle. */
export interface b2Capsule {
  /** Local center of the first semicircle */
  center1: b2Vec2;
  /** Local center of the second semicircle */
  center2: b2Vec2;
  /** The radius of the semicircles */
  radius: number;
}

/** A solid convex polygon. It is assumed that the interior of the polygon is to the left of each edge. Polygons have a maximum number of vertices equal to B2_MAX_POLYGON_VERTICES. In most cases you should not need many vertices for a convex polygon. */
export interface b2Polygon {
  /** The polygon vertices */
  vertices: b2Vec2[];
  /** The outward normal vectors of the polygon sides */
  normals: b2Vec2[];
  /** The centroid of the polygon */
  centroid: b2Vec2;
  /** The external radius for rounded polygons */
  radius: number;
  /** The number of polygon vertices */
  count: number;
}

/** A line segment with two-sided collision. */
export interface b2Segment {
  /** The first point */
  point1: b2Vec2;
  /** The second point */
  point2: b2Vec2;
}

/** A line segment with one-sided collision. Only collides on the right side. Several of these are generated for a chain shape. ghost1 -> point1 -> point2 -> ghost2 */
export interface b2ChainSegment {
  /** The tail ghost vertex */
  ghost1: b2Vec2;
  /** The line segment */
  segment: b2Segment;
  /** The head ghost vertex */
  ghost2: b2Vec2;
  /** The owning chain shape index (internal usage only) */
  chainId: number;
}

/** A convex hull. Used to create convex polygons. */
export interface b2Hull {
  /** The final points of the hull */
  points: b2Vec2[];
  /** The number of points */
  count: number;
}

/** Result of computing the distance between two line segments */
export interface b2SegmentDistanceResult {
  /** The closest point on the first segment */
  closest1: b2Vec2;
  /** The closest point on the second segment */
  closest2: b2Vec2;
  /** The barycentric coordinate on the first segment */
  fraction1: number;
  /** The barycentric coordinate on the second segment */
  fraction2: number;
  /** The squared distance between the closest points */
  distanceSquared: number;
}

/** Used to warm start the GJK simplex. If you call this function multiple times with nearby transforms this might improve performance. Otherwise you can zero initialize this. The distance cache must be initialized to zero on the first call. Users should generally just zero initialize this structure for each call. */
export interface b2SimplexCache {
  /** The number of stored simplex points */
  count: number;
  /** The cached simplex indices on shape A */
  indexA: number[];
  /** The cached simplex indices on shape B */
  indexB: number[];
}

/** Input for b2ShapeDistance */
export interface b2DistanceInput {
  /** The proxy for shape A */
  proxyA: b2ShapeProxy;
  /** The proxy for shape B */
  proxyB: b2ShapeProxy;
  /** The world transform for shape A */
  transformA: b2Transform;
  /** The world transform for shape B */
  transformB: b2Transform;
  /** Should the proxy radius be considered? */
  useRadii: boolean;
}

/** Output for b2ShapeDistance */
export interface b2DistanceOutput {
  /** Closest point on shapeA */
  pointA: b2Vec2;
  /** Closest point on shapeB */
  pointB: b2Vec2;
  /** Normal vector that points from A to B. Invalid if distance is zero. */
  normal: b2Vec2;
  /** The final distance, zero if overlapped */
  distance: number;
  /** Number of GJK iterations used */
  iterations: number;
  /** The number of simplexes stored in the simplex array */
  simplexCount: number;
}

/** Simplex vertex for debugging the GJK algorithm */
export interface b2SimplexVertex {
  /** support point in proxyA */
  wA: b2Vec2;
  /** support point in proxyB */
  wB: b2Vec2;
  /** wB - wA */
  w: b2Vec2;
  /** barycentric coordinate for closest point */
  a: number;
  /** wA index */
  indexA: number;
  /** wB index */
  indexB: number;
}

/** Simplex from the GJK algorithm */
export interface b2Simplex {
  /** vertices */
  v1: b2SimplexVertex;
  /** vertices */
  v2: b2SimplexVertex;
  /** vertices */
  v3: b2SimplexVertex;
  /** number of valid vertices */
  count: number;
}

/** Input parameters for b2ShapeCast */
export interface b2ShapeCastPairInput {
  /** The proxy for shape A */
  proxyA: b2ShapeProxy;
  /** The proxy for shape B */
  proxyB: b2ShapeProxy;
  /** The world transform for shape A */
  transformA: b2Transform;
  /** The world transform for shape B */
  transformB: b2Transform;
  /** The translation of shape B */
  translationB: b2Vec2;
  /** The fraction of the translation to consider, typically 1 */
  maxFraction: number;
  /** Allows shapes with a radius to move slightly closer if already touching */
  canEncroach: boolean;
}

/** This describes the motion of a body/shape for TOI computation. Shapes are defined with respect to the body origin, which may not coincide with the center of mass. However, to support dynamics we must interpolate the center of mass position. */
export interface b2Sweep {
  /** Local center of mass position */
  localCenter: b2Vec2;
  /** Starting center of mass world position */
  c1: b2Vec2;
  /** Ending center of mass world position */
  c2: b2Vec2;
  /** Starting world rotation */
  q1: b2Rot;
  /** Ending world rotation */
  q2: b2Rot;
}

/** Time of impact input */
export interface b2TOIInput {
  /** The proxy for shape A */
  proxyA: b2ShapeProxy;
  /** The proxy for shape B */
  proxyB: b2ShapeProxy;
  /** The movement of shape A */
  sweepA: b2Sweep;
  /** The movement of shape B */
  sweepB: b2Sweep;
  /** Defines the sweep interval [0, maxFraction] */
  maxFraction: number;
}

/** Time of impact output */
export interface b2TOIOutput {
  /** The type of result */
  state: b2TOIState;
  /** The hit point */
  point: b2Vec2;
  /** The hit normal */
  normal: b2Vec2;
  /** The sweep time of the collision */
  fraction: number;
}

/** A manifold point is a contact point belonging to a contact manifold. It holds details related to the geometry and dynamics of the contact points. Box2D uses speculative collision so some contact points may be separated. You may use the totalNormalImpulse to determine if there was an interaction during the time step. */
export interface b2ManifoldPoint {
  /** Location of the contact point in world space. Subject to precision loss at large coordinates. */
  point: b2Vec2;
  /** Location of the contact point relative to shapeA's origin in world space */
  anchorA: b2Vec2;
  /** Location of the contact point relative to shapeB's origin in world space */
  anchorB: b2Vec2;
  /** The separation of the contact point, negative if penetrating */
  separation: number;
  /** The impulse along the manifold normal vector. */
  normalImpulse: number;
  /** The friction impulse */
  tangentImpulse: number;
  /** The total normal impulse applied across sub-stepping and restitution. This is important to identify speculative contact points that had an interaction in the time step. */
  totalNormalImpulse: number;
  /** Relative normal velocity pre-solve. Used for hit events. If the normal impulse is zero then there was no hit. Negative means shapes are approaching. */
  normalVelocity: number;
  /** Uniquely identifies a contact point between two shapes */
  id: number;
  /** Did this contact point exist the previous step? */
  persisted: boolean;
}

/** A contact manifold describes the contact points between colliding shapes. */
export interface b2Manifold {
  /** The unit normal vector in world space, points from shape A to bodyB */
  normal: b2Vec2;
  /** Angular impulse applied for rolling resistance. N * m * s = kg * m^2 / s */
  rollingImpulse: number;
  /** The manifold points, up to two are possible in 2D */
  points: b2ManifoldPoint[];
  /** The number of contacts points, will be 0, 1, or 2 */
  pointCount: number;
}

/** These are performance results returned by dynamic tree queries. */
export interface b2TreeStats {
  /** Number of internal nodes visited during the query */
  nodeVisits: number;
  /** Number of leaf nodes visited during the query */
  leafVisits: number;
}

/** These are the collision planes returned from b2World_CollideMover A mover collision: the plane is in world space; `point` is on the shape in the shape's local frame, as Box2D returns it (b2CollideMover rotates the normal only). */
export interface b2PlaneResult {
  /** The collision plane between the mover and a convex shape */
  plane: b2Plane;
  point: b2Vec2;
  /** Did the collision register a hit? If not this plane should be ignored. */
  hit: boolean;
}

/** These are collision planes that can be fed to b2SolvePlanes. Normally this is assembled by the user from plane results in b2PlaneResult */
export interface b2CollisionPlane {
  /** The collision plane between the mover and some shape */
  plane: b2Plane;
  /** Setting this to FLT_MAX makes the plane as rigid as possible. Lower values can make the plane collision soft. Usually in meters. */
  pushLimit: number;
  /** The push on the mover determined by b2SolvePlanes. Usually in meters. */
  push: number;
  /** Indicates if b2ClipVector should clip against this plane. Should be false for soft collision. */
  clipVelocity: boolean;
}

/** Result returned by b2SolvePlanes */
export interface b2PlaneSolverResult {
  /** The translation of the mover */
  translation: b2Vec2;
  /** The number of iterations used by the plane solver. For diagnostics. */
  iterationCount: number;
}

/** World id references a world instance. This should be treated as an opaque handle. */
export interface b2WorldId {
  index1: number;
  generation: number;
}

/** Body id references a body instance. This should be treated as an opaque handle. */
export interface b2BodyId {
  index1: number;
  world0: number;
  generation: number;
}

/** Shape id references a shape instance. This should be treated as an opaque handle. */
export interface b2ShapeId {
  index1: number;
  world0: number;
  generation: number;
}

/** Chain id references a chain instances. This should be treated as an opaque handle. */
export interface b2ChainId {
  index1: number;
  world0: number;
  generation: number;
}

/** Joint id references a joint instance. This should be treated as an opaque handle. */
export interface b2JointId {
  index1: number;
  world0: number;
  generation: number;
}

/** Contact id references a contact instance. This should be treated as an opaque handled. */
export interface b2ContactId {
  index1: number;
  world0: number;
  padding: number;
  generation: number;
}

/** Result from b2World_RayCastClosest If there is initial overlap the fraction and normal will be zero while the point is an arbitrary point in the overlap region. */
export interface b2RayResult {
  shapeId: b2ShapeId;
  point: b2Vec2;
  normal: b2Vec2;
  fraction: number;
  nodeVisits: number;
  leafVisits: number;
  hit: boolean;
}

/** Motion locks to restrict the body movement */
export interface b2MotionLocks {
  /** Prevent translation along the x-axis */
  linearX: boolean;
  /** Prevent translation along the y-axis */
  linearY: boolean;
  /** Prevent rotation around the z-axis */
  angularZ: boolean;
}

/** Profiling data. Times are in milliseconds. */
export interface b2Profile {
  step: number;
  pairs: number;
  collide: number;
  solve: number;
  prepareStages: number;
  solveConstraints: number;
  prepareConstraints: number;
  integrateVelocities: number;
  warmStart: number;
  solveImpulses: number;
  integratePositions: number;
  relaxImpulses: number;
  applyRestitution: number;
  storeImpulses: number;
  splitIslands: number;
  transforms: number;
  sensorHits: number;
  jointEvents: number;
  hitEvents: number;
  refit: number;
  bullets: number;
  sleepIslands: number;
  sensors: number;
}

/** Counters that give details of the simulation size. */
export interface b2Counters {
  bodyCount: number;
  shapeCount: number;
  contactCount: number;
  jointCount: number;
  islandCount: number;
  stackUsed: number;
  staticTreeHeight: number;
  treeHeight: number;
  byteCount: number;
  taskCount: number;
  colorCounts: number[];
}

/** A begin touch event is generated when a shape starts to overlap a sensor shape. */
export interface b2SensorBeginTouchEvent {
  /** The id of the sensor shape */
  sensorShapeId: b2ShapeId;
  /** The id of the shape that began touching the sensor shape */
  visitorShapeId: b2ShapeId;
}

/** An end touch event is generated when a shape stops overlapping a sensor shape. These include things like setting the transform, destroying a body or shape, or changing a filter. You will also get an end event if the sensor or visitor are destroyed. Therefore you should always confirm the shape id is valid using b2Shape_IsValid. */
export interface b2SensorEndTouchEvent {
  /** The id of the sensor shape */
  sensorShapeId: b2ShapeId;
  /** The id of the shape that stopped touching the sensor shape */
  visitorShapeId: b2ShapeId;
}

/** A begin touch event is generated when two shapes begin touching. */
export interface b2ContactBeginTouchEvent {
  /** Id of the first shape */
  shapeIdA: b2ShapeId;
  /** Id of the second shape */
  shapeIdB: b2ShapeId;
  /** The transient contact id. This contact maybe destroyed automatically when the world is modified or simulated. Used b2Contact_IsValid before using this id. */
  contactId: b2ContactId;
}

/** An end touch event is generated when two shapes stop touching. You will get an end event if you do anything that destroys contacts previous to the last world step. These include things like setting the transform, destroying a body or shape, or changing a filter or body type. */
export interface b2ContactEndTouchEvent {
  /** Id of the first shape */
  shapeIdA: b2ShapeId;
  /** Id of the second shape */
  shapeIdB: b2ShapeId;
  /** Id of the contact. */
  contactId: b2ContactId;
}

/** A hit touch event is generated when two shapes collide with a speed faster than the hit speed threshold. This may be reported for speculative contacts that have a confirmed impulse. */
export interface b2ContactHitEvent {
  /** Id of the first shape */
  shapeIdA: b2ShapeId;
  /** Id of the second shape */
  shapeIdB: b2ShapeId;
  /** Point where the shapes hit at the beginning of the time step. This is a mid-point between the two surfaces. It could be at speculative point where the two shapes were not touching at the beginning of the time step. */
  point: b2Vec2;
  /** Normal vector pointing from shape A to shape B */
  normal: b2Vec2;
  /** The speed the shapes are approaching. Always positive. Typically in meters per second. */
  approachSpeed: number;
}

/** Body move events triggered when a body moves. Triggered when a body moves due to simulation. Not reported for bodies moved by the user. This also has a flag to indicate that the body went to sleep so the application can also sleep that actor/entity/object associated with the body. On the other hand if the flag does not indicate the body went to sleep then the application can treat the actor/entity/object associated with the body as awake. This is an efficient way for an application to update game object transforms rather than calling functions such as b2Body_GetTransform() because this data is delivered as a contiguous array and it is only populated with bodies that have moved. */
export interface b2BodyMoveEvent {
  userData: number;
  transform: b2Transform;
  bodyId: b2BodyId;
  fellAsleep: boolean;
}

/** Joint events report joints that are awake and have a force and/or torque exceeding the threshold The observed forces and torques are not returned for efficiency reasons. */
export interface b2JointEvent {
  /** The joint id */
  jointId: b2JointId;
  /** The user data from the joint for convenience */
  userData: number;
}

/** The contact data for two shapes. By convention the manifold normal points from shape A to shape B. */
export interface b2ContactData {
  contactId: b2ContactId;
  shapeIdA: b2ShapeId;
  shapeIdB: b2ShapeId;
  manifold: b2Manifold;
}

/** Base joint definition used by all joint types. The local frames are measured from the body's origin rather than the center of mass because: 1. you might not know where the center of mass will be 2. if you add/remove shapes from a body and recompute the mass, the joints will be broken */
export interface b2JointDef {
  /** The first attached body */
  bodyIdA: b2BodyId;
  /** The second attached body */
  bodyIdB: b2BodyId;
  /** The first local joint frame */
  localFrameA: b2Transform;
  /** The second local joint frame */
  localFrameB: b2Transform;
  /** Force threshold for joint events */
  forceThreshold: number;
  /** Torque threshold for joint events */
  torqueThreshold: number;
  /** Constraint hertz (advanced feature) */
  constraintHertz: number;
  /** Constraint damping ratio (advanced feature) */
  constraintDampingRatio: number;
  /** Debug draw scale */
  drawScale: number;
  /** Set this flag to true if the attached bodies should collide */
  collideConnected: boolean;
}

/** What the functions taking a b2JointDef accept: a subset of its fields; one left out keeps the default of b2DefaultJointDef(). */
export type b2JointDefInput = Partial<b2JointDef>;

/** World definition used to create a simulation world. Must be initialized using b2DefaultWorldDef(). */
export interface b2WorldDef {
  /** Gravity vector. Box2D has no up-vector defined. */
  gravity: b2Vec2;
  /** Restitution speed threshold, usually in m/s. Collisions above this speed have restitution applied (will bounce). */
  restitutionThreshold: number;
  /** Threshold speed for hit events. Usually meters per second. */
  hitEventThreshold: number;
  /** Contact stiffness. Cycles per second. Increasing this increases the speed of overlap recovery, but can introduce jitter. */
  contactHertz: number;
  /** Contact bounciness. Non-dimensional. You can speed up overlap recovery by decreasing this with the trade-off that overlap resolution becomes more energetic. */
  contactDampingRatio: number;
  /** This parameter controls how fast overlap is resolved and usually has units of meters per second. This only puts a cap on the resolution speed. The resolution speed is increased by increasing the hertz and/or decreasing the damping ratio. */
  contactSpeed: number;
  /** Maximum linear speed. Usually meters per second. */
  maximumLinearSpeed: number;
  /** Can bodies go to sleep to improve performance */
  enableSleep: boolean;
  /** Enable continuous collision */
  enableContinuous: boolean;
  /** Contact softening when mass ratios are large. Experimental. */
  enableContactSoftening: boolean;
}

/** What the functions taking a b2WorldDef accept: a subset of its fields; one left out keeps the default of b2DefaultWorldDef(). */
export type b2WorldDefInput = Partial<b2WorldDef>;

/** A body definition holds all the data needed to construct a rigid body. You can safely re-use body definitions. Shapes are added to a body after construction. Body definitions are temporary objects used to bundle creation parameters. Must be initialized using b2DefaultBodyDef(). */
export interface b2BodyDef {
  /** The body type: static, kinematic, or dynamic. */
  type: b2BodyType;
  /** The initial world position of the body. Bodies should be created with the desired position. */
  position: b2Vec2;
  /** The initial world rotation of the body. Use b2MakeRot() if you have an angle. */
  rotation: b2Rot;
  /** The initial linear velocity of the body's origin. Usually in meters per second. */
  linearVelocity: b2Vec2;
  /** The initial angular velocity of the body. Radians per second. */
  angularVelocity: number;
  /** Linear damping is used to reduce the linear velocity. The damping parameter can be larger than 1 but the damping effect becomes sensitive to the time step when the damping parameter is large. Generally linear damping is undesirable because it makes objects move slowly as if they are floating. */
  linearDamping: number;
  /** Angular damping is used to reduce the angular velocity. The damping parameter can be larger than 1.0f but the damping effect becomes sensitive to the time step when the damping parameter is large. Angular damping can be use slow down rotating bodies. */
  angularDamping: number;
  /** Scale the gravity applied to this body. Non-dimensional. */
  gravityScale: number;
  /** Sleep speed threshold, default is 0.05 meters per second */
  sleepThreshold: number;
  /** Optional body name for debugging. Up to 31 characters (excluding null termination) */
  name: string;
  /** Motions locks to restrict linear and angular movement. Caution: may lead to softer constraints along the locked direction */
  motionLocks: b2MotionLocks;
  /** Set this flag to false if this body should never fall asleep. */
  enableSleep: boolean;
  /** Is this body initially awake or sleeping? */
  isAwake: boolean;
  /** Treat this body as high speed object that performs continuous collision detection against dynamic and kinematic bodies, but not other bullet bodies. */
  isBullet: boolean;
  /** Used to disable a body. A disabled body does not move or collide. */
  isEnabled: boolean;
  /** This allows this body to bypass rotational speed limits. Should only be used for circular objects, like wheels. */
  allowFastRotation: boolean;
}

/** What the functions taking a b2BodyDef accept: a subset of its fields; one left out keeps the default of b2DefaultBodyDef(). */
export type b2BodyDefInput = Partial<b2BodyDef>;

/** This is used to filter collision on shapes. It affects shape-vs-shape collision and shape-versus-query collision (such as b2World_CastRay). */
export interface b2Filter {
  /** The collision category bits. Normally you would just set one bit. The category bits should represent your application object types. For example: */
  categoryBits: number;
  /** The collision mask bits. This states the categories that this shape would accept for collision. For example, you may want your player to only collide with static objects and other players. */
  maskBits: number;
  /** Collision groups allow a certain group of objects to never collide (negative) or always collide (positive). A group index of zero has no effect. Non-zero group filtering always wins against the mask bits. For example, you may want ragdolls to collide with other ragdolls but you don't want ragdoll self-collision. In this case you would give each ragdoll a unique negative group index and apply that group index to all shapes on the ragdoll. */
  groupIndex: number;
}

/** What the functions taking a b2Filter accept: a subset of its fields; one left out keeps the default of b2DefaultFilter(). */
export type b2FilterInput = Partial<b2Filter>;

/** The query filter is used to filter collisions between queries and shapes. For example, you may want a ray-cast representing a projectile to hit players and the static environment but not debris. */
export interface b2QueryFilter {
  /** The collision category bits of this query. Normally you would just set one bit. */
  categoryBits: number;
  /** The collision mask bits. This states the shape categories that this query would accept for collision. */
  maskBits: number;
}

/** What the functions taking a b2QueryFilter accept: a subset of its fields; one left out keeps the default of b2DefaultQueryFilter(). */
export type b2QueryFilterInput = Partial<b2QueryFilter>;

/** Surface materials allow chain shapes to have per segment surface properties. */
export interface b2SurfaceMaterial {
  /** The Coulomb (dry) friction coefficient, usually in the range [0,1]. */
  friction: number;
  /** The coefficient of restitution (bounce) usually in the range [0,1]. https://en.wikipedia.org/wiki/Coefficient_of_restitution */
  restitution: number;
  /** The rolling resistance usually in the range [0,1]. */
  rollingResistance: number;
  /** The tangent speed for conveyor belts */
  tangentSpeed: number;
  /** User material identifier. This is passed with query results and to friction and restitution combining functions. It is not used internally. */
  userMaterialId: number;
  /** Custom debug draw color. */
  customColor: number;
}

/** What the functions taking a b2SurfaceMaterial accept: a subset of its fields; one left out keeps the default of b2DefaultSurfaceMaterial(). */
export type b2SurfaceMaterialInput = Partial<b2SurfaceMaterial>;

/** Used to create a shape. This is a temporary object used to bundle shape creation parameters. You may use the same shape definition to create multiple shapes. Must be initialized using b2DefaultShapeDef(). */
export interface b2ShapeDef {
  /** The surface material for this shape. */
  material: b2SurfaceMaterial;
  /** The density, usually in kg/m^2. This is not part of the surface material because this is for the interior, which may have other considerations, such as being hollow. For example a wood barrel may be hollow or full of water. */
  density: number;
  /** Collision filtering data. */
  filter: b2Filter;
  /** Enable custom filtering. Only one of the two shapes needs to enable custom filtering. See b2WorldDef. */
  enableCustomFiltering: boolean;
  /** A sensor shape generates overlap events but never generates a collision response. Sensors do not have continuous collision. Instead, use a ray or shape cast for those scenarios. Sensors still contribute to the body mass if they have non-zero density. */
  isSensor: boolean;
  /** Enable sensor events for this shape. This applies to sensors and non-sensors. False by default, even for sensors. */
  enableSensorEvents: boolean;
  /** Enable contact events for this shape. Only applies to kinematic and dynamic bodies. Ignored for sensors. False by default. */
  enableContactEvents: boolean;
  /** Enable hit events for this shape. Only applies to kinematic and dynamic bodies. Ignored for sensors. False by default. */
  enableHitEvents: boolean;
  /** Enable pre-solve contact events for this shape. Only applies to dynamic bodies. These are expensive and must be carefully handled due to multithreading. Ignored for sensors. */
  enablePreSolveEvents: boolean;
  /** When shapes are created they will scan the environment for collision the next time step. This can significantly slow down static body creation when there are many static shapes. This is flag is ignored for dynamic and kinematic shapes which always invoke contact creation. */
  invokeContactCreation: boolean;
  /** Should the body update the mass properties when this shape is created. Default is true. */
  updateBodyMass: boolean;
}

/** What the functions taking a b2ShapeDef accept: a subset of its fields; one left out keeps the default of b2DefaultShapeDef(). */
export type b2ShapeDefInput = Partial<Omit<b2ShapeDef, 'material' | 'filter'>> & { material?: b2SurfaceMaterialInput; filter?: b2FilterInput };

/** Used to create a chain of line segments. This is designed to eliminate ghost collisions with some limitations. - chains are one-sided - chains have no mass and should be used on static bodies - chains have a counter-clockwise winding order (normal points right of segment direction) - chains are either a loop or open - a chain must have at least 4 points - the distance between any two points must be greater than B2_LINEAR_SLOP - a chain shape should not self intersect (this is not validated) - an open chain shape has NO COLLISION on the first and final edge - you may overlap two open chains on their first three and/or last three points to get smooth collision - a chain shape creates multiple line segment shapes on the body https://en.wikipedia.org/wiki/Polygonal_chain Must be initialized using b2DefaultChainDef(). */
export interface b2ChainDef {
  /** Contact filtering data. */
  filter: b2Filter;
  /** Indicates a closed chain formed by connecting the first and last points */
  isLoop: boolean;
  /** Enable sensors to detect this chain. False by default. */
  enableSensorEvents: boolean;
  /** The chain vertices; a loop closes itself, an open chain's first and last points are ghost vertices */
  points: b2Vec2[];
  /** One material for the whole chain, or one per segment */
  materials: b2SurfaceMaterial[];
}

/** What the functions taking a b2ChainDef accept: a subset of its fields; one left out keeps the default of b2DefaultChainDef(). */
export type b2ChainDefInput = Partial<Omit<b2ChainDef, 'filter' | 'points' | 'materials'>> & { filter?: b2FilterInput; points: b2Vec2[]; materials?: b2SurfaceMaterialInput[] };

/** Distance joint definition Connects a point on body A with a point on body B by a segment. Useful for ropes and springs. */
export interface b2DistanceJointDef {
  /** Base joint definition */
  base: b2JointDef;
  /** The rest length of this joint. Clamped to a stable minimum value. */
  length: number;
  /** Enable the distance constraint to behave like a spring. If false then the distance joint will be rigid, overriding the limit and motor. */
  enableSpring: boolean;
  /** The lower spring force controls how much tension it can sustain */
  lowerSpringForce: number;
  /** The upper spring force controls how much compression it an sustain */
  upperSpringForce: number;
  /** The spring linear stiffness Hertz, cycles per second */
  hertz: number;
  /** The spring linear damping ratio, non-dimensional */
  dampingRatio: number;
  /** Enable/disable the joint limit */
  enableLimit: boolean;
  /** Minimum length. Clamped to a stable minimum value. */
  minLength: number;
  /** Maximum length. Must be greater than or equal to the minimum length. */
  maxLength: number;
  /** Enable/disable the joint motor */
  enableMotor: boolean;
  /** The maximum motor force, usually in newtons */
  maxMotorForce: number;
  /** The desired motor speed, usually in meters per second */
  motorSpeed: number;
}

/** What the functions taking a b2DistanceJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultDistanceJointDef(). */
export type b2DistanceJointDefInput = Partial<Omit<b2DistanceJointDef, 'base'>> & { base?: b2JointDefInput };

/** A motor joint is used to control the relative velocity and or transform between two bodies. With a velocity of zero this acts like top-down friction. */
export interface b2MotorJointDef {
  /** Base joint definition */
  base: b2JointDef;
  /** The desired linear velocity */
  linearVelocity: b2Vec2;
  /** The maximum motor force in newtons */
  maxVelocityForce: number;
  /** The desired angular velocity */
  angularVelocity: number;
  /** The maximum motor torque in newton-meters */
  maxVelocityTorque: number;
  /** Linear spring hertz for position control */
  linearHertz: number;
  /** Linear spring damping ratio */
  linearDampingRatio: number;
  /** Maximum spring force in newtons */
  maxSpringForce: number;
  /** Angular spring hertz for position control */
  angularHertz: number;
  /** Angular spring damping ratio */
  angularDampingRatio: number;
  /** Maximum spring torque in newton-meters */
  maxSpringTorque: number;
}

/** What the functions taking a b2MotorJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultMotorJointDef(). */
export type b2MotorJointDefInput = Partial<Omit<b2MotorJointDef, 'base'>> & { base?: b2JointDefInput };

/** A filter joint is used to disable collision between two specific bodies. */
export interface b2FilterJointDef {
  /** Base joint definition */
  base: b2JointDef;
}

/** What the functions taking a b2FilterJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultFilterJointDef(). */
export type b2FilterJointDefInput = Partial<Omit<b2FilterJointDef, 'base'>> & { base?: b2JointDefInput };

/** Prismatic joint definition Body B may slide along the x-axis in local frame A. Body B cannot rotate relative to body A. The joint translation is zero when the local frame origins coincide in world space. */
export interface b2PrismaticJointDef {
  /** Base joint definition */
  base: b2JointDef;
  /** Enable a linear spring along the prismatic joint axis */
  enableSpring: boolean;
  /** The spring stiffness Hertz, cycles per second */
  hertz: number;
  /** The spring damping ratio, non-dimensional */
  dampingRatio: number;
  /** The target translation for the joint in meters. The spring-damper will drive to this translation. */
  targetTranslation: number;
  /** Enable/disable the joint limit */
  enableLimit: boolean;
  /** The lower translation limit */
  lowerTranslation: number;
  /** The upper translation limit */
  upperTranslation: number;
  /** Enable/disable the joint motor */
  enableMotor: boolean;
  /** The maximum motor force, typically in newtons */
  maxMotorForce: number;
  /** The desired motor speed, typically in meters per second */
  motorSpeed: number;
}

/** What the functions taking a b2PrismaticJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultPrismaticJointDef(). */
export type b2PrismaticJointDefInput = Partial<Omit<b2PrismaticJointDef, 'base'>> & { base?: b2JointDefInput };

/** Revolute joint definition A point on body B is fixed to a point on body A. Allows relative rotation. */
export interface b2RevoluteJointDef {
  /** Base joint definition */
  base: b2JointDef;
  /** The target angle for the joint in radians. The spring-damper will drive to this angle. */
  targetAngle: number;
  /** Enable a rotational spring on the revolute hinge axis */
  enableSpring: boolean;
  /** The spring stiffness Hertz, cycles per second */
  hertz: number;
  /** The spring damping ratio, non-dimensional */
  dampingRatio: number;
  /** A flag to enable joint limits */
  enableLimit: boolean;
  /** The lower angle for the joint limit in radians. Minimum of -0.99*pi radians. */
  lowerAngle: number;
  /** The upper angle for the joint limit in radians. Maximum of 0.99*pi radians. */
  upperAngle: number;
  /** A flag to enable the joint motor */
  enableMotor: boolean;
  /** The maximum motor torque, typically in newton-meters */
  maxMotorTorque: number;
  /** The desired motor speed in radians per second */
  motorSpeed: number;
}

/** What the functions taking a b2RevoluteJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultRevoluteJointDef(). */
export type b2RevoluteJointDefInput = Partial<Omit<b2RevoluteJointDef, 'base'>> & { base?: b2JointDefInput };

/** Weld joint definition Connects two bodies together rigidly. This constraint provides springs to mimic soft-body simulation. */
export interface b2WeldJointDef {
  /** Base joint definition */
  base: b2JointDef;
  /** Linear stiffness expressed as Hertz (cycles per second). Use zero for maximum stiffness. */
  linearHertz: number;
  /** Angular stiffness as Hertz (cycles per second). Use zero for maximum stiffness. */
  angularHertz: number;
  /** Linear damping ratio, non-dimensional. Use 1 for critical damping. */
  linearDampingRatio: number;
  /** Linear damping ratio, non-dimensional. Use 1 for critical damping. */
  angularDampingRatio: number;
}

/** What the functions taking a b2WeldJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultWeldJointDef(). */
export type b2WeldJointDefInput = Partial<Omit<b2WeldJointDef, 'base'>> & { base?: b2JointDefInput };

/** Wheel joint definition Body B is a wheel that may rotate freely and slide along the local x-axis in frame A. The joint translation is zero when the local frame origins coincide in world space. */
export interface b2WheelJointDef {
  /** Base joint definition */
  base: b2JointDef;
  /** Enable a linear spring along the local axis */
  enableSpring: boolean;
  /** Spring stiffness in Hertz */
  hertz: number;
  /** Spring damping ratio, non-dimensional */
  dampingRatio: number;
  /** Enable/disable the joint linear limit */
  enableLimit: boolean;
  /** The lower translation limit */
  lowerTranslation: number;
  /** The upper translation limit */
  upperTranslation: number;
  /** Enable/disable the joint rotational motor */
  enableMotor: boolean;
  /** The maximum motor torque, typically in newton-meters */
  maxMotorTorque: number;
  /** The desired motor speed in radians per second */
  motorSpeed: number;
}

/** What the functions taking a b2WheelJointDef accept: a subset of its fields; one left out keeps the default of b2DefaultWheelJointDef(). */
export type b2WheelJointDefInput = Partial<Omit<b2WheelJointDef, 'base'>> & { base?: b2JointDefInput };

/** The explosion definition is used to configure options for explosions. Explosions consider shape geometry when computing the impulse. */
export interface b2ExplosionDef {
  /** Mask bits to filter shapes */
  maskBits: number;
  /** The center of the explosion in world space */
  position: b2Vec2;
  /** The radius of the explosion */
  radius: number;
  /** The falloff distance beyond the radius. Impulse is reduced to zero at this distance. */
  falloff: number;
  /** Impulse per unit length. This applies an impulse according to the shape perimeter that is facing the explosion. Explosions only apply to circles, capsules, and polygons. This may be negative for implosions. */
  impulsePerLength: number;
}

/** What the functions taking a b2ExplosionDef accept: a subset of its fields; one left out keeps the default of b2DefaultExplosionDef(). */
export type b2ExplosionDefInput = Partial<b2ExplosionDef>;

/** This struct holds callbacks you can implement to draw a Box2D world. This structure should be zero initialized. */
export interface b2DebugDraw {
  /** World bounds to use for debug draw */
  drawingBounds: b2AABB;
  /** Scale to use when drawing forces */
  forceScale: number;
  /** Global scaling for joint drawing */
  jointScale: number;
  /** Option to draw shapes */
  drawShapes: boolean;
  /** Option to draw joints */
  drawJoints: boolean;
  /** Option to draw additional information for joints */
  drawJointExtras: boolean;
  /** Option to draw the bounding boxes for shapes */
  drawBounds: boolean;
  /** Option to draw the mass and center of mass of dynamic bodies */
  drawMass: boolean;
  /** Option to draw body names */
  drawBodyNames: boolean;
  /** Option to draw contact points */
  drawContactPoints: boolean;
  /** Option to visualize the graph coloring used for contacts and joints */
  drawGraphColors: boolean;
  /** Option to draw contact feature ids */
  drawContactFeatures: boolean;
  /** Option to draw contact normals */
  drawContactNormals: boolean;
  /** Option to draw contact normal forces */
  drawContactForces: boolean;
  /** Option to draw contact friction forces */
  drawFrictionForces: boolean;
  /** Option to draw islands as bounding boxes */
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

/** The Box2D module: every function of the C API on one object, ready once the wasm is instantiated. */
export interface Box2D {
  /** Describes the TOI output */
  readonly b2TOIState: {
    readonly b2_toiStateUnknown: b2TOIStateValue<0>;
    readonly b2_toiStateFailed: b2TOIStateValue<1>;
    readonly b2_toiStateOverlapped: b2TOIStateValue<2>;
    readonly b2_toiStateHit: b2TOIStateValue<3>;
    readonly b2_toiStateSeparated: b2TOIStateValue<4>;
  };
  /** The body simulation type. Each body is one of these three types. The type determines how the body behaves in the simulation. */
  readonly b2BodyType: {
    /** zero mass, zero velocity, may be manually moved */
    readonly b2_staticBody: b2BodyTypeValue<0>;
    /** zero mass, velocity set by user, moved by solver */
    readonly b2_kinematicBody: b2BodyTypeValue<1>;
    /** positive mass, velocity determined by forces, moved by solver */
    readonly b2_dynamicBody: b2BodyTypeValue<2>;
    /** number of body types */
    readonly b2_bodyTypeCount: b2BodyTypeValue<3>;
  };
  /** Shape type */
  readonly b2ShapeType: {
    /** A circle with an offset */
    readonly b2_circleShape: b2ShapeTypeValue<0>;
    /** A capsule is an extruded circle */
    readonly b2_capsuleShape: b2ShapeTypeValue<1>;
    /** A line segment */
    readonly b2_segmentShape: b2ShapeTypeValue<2>;
    /** A convex polygon */
    readonly b2_polygonShape: b2ShapeTypeValue<3>;
    /** A line segment owned by a chain shape */
    readonly b2_chainSegmentShape: b2ShapeTypeValue<4>;
    /** The number of shape types */
    readonly b2_shapeTypeCount: b2ShapeTypeValue<5>;
  };
  /** Joint type enumeration This is useful because all joint types use b2JointId and sometimes you want to get the type of a joint. */
  readonly b2JointType: {
    readonly b2_distanceJoint: b2JointTypeValue<0>;
    readonly b2_filterJoint: b2JointTypeValue<1>;
    readonly b2_motorJoint: b2JointTypeValue<2>;
    readonly b2_prismaticJoint: b2JointTypeValue<3>;
    readonly b2_revoluteJoint: b2JointTypeValue<4>;
    readonly b2_weldJoint: b2JointTypeValue<5>;
    readonly b2_wheelJoint: b2JointTypeValue<6>;
  };
  /** These colors are used for debug draw and mostly match the named SVG colors. See https://www.rapidtables.com/web/color/index.html https://johndecember.com/html/spec/colorsvg.html https://upload.wikimedia.org/wikipedia/commons/2/2b/SVG_Recognized_color_keyword_names.svg */
  readonly b2HexColor: {
    readonly b2_colorAliceBlue: b2HexColorValue<15792383>;
    readonly b2_colorAntiqueWhite: b2HexColorValue<16444375>;
    readonly b2_colorAqua: b2HexColorValue<65535>;
    readonly b2_colorAquamarine: b2HexColorValue<8388564>;
    readonly b2_colorAzure: b2HexColorValue<15794175>;
    readonly b2_colorBeige: b2HexColorValue<16119260>;
    readonly b2_colorBisque: b2HexColorValue<16770244>;
    readonly b2_colorBlack: b2HexColorValue<0>;
    readonly b2_colorBlanchedAlmond: b2HexColorValue<16772045>;
    readonly b2_colorBlue: b2HexColorValue<255>;
    readonly b2_colorBlueViolet: b2HexColorValue<9055202>;
    readonly b2_colorBrown: b2HexColorValue<10824234>;
    readonly b2_colorBurlywood: b2HexColorValue<14596231>;
    readonly b2_colorCadetBlue: b2HexColorValue<6266528>;
    readonly b2_colorChartreuse: b2HexColorValue<8388352>;
    readonly b2_colorChocolate: b2HexColorValue<13789470>;
    readonly b2_colorCoral: b2HexColorValue<16744272>;
    readonly b2_colorCornflowerBlue: b2HexColorValue<6591981>;
    readonly b2_colorCornsilk: b2HexColorValue<16775388>;
    readonly b2_colorCrimson: b2HexColorValue<14423100>;
    readonly b2_colorCyan: b2HexColorValue<65535>;
    readonly b2_colorDarkBlue: b2HexColorValue<139>;
    readonly b2_colorDarkCyan: b2HexColorValue<35723>;
    readonly b2_colorDarkGoldenRod: b2HexColorValue<12092939>;
    readonly b2_colorDarkGray: b2HexColorValue<11119017>;
    readonly b2_colorDarkGreen: b2HexColorValue<25600>;
    readonly b2_colorDarkKhaki: b2HexColorValue<12433259>;
    readonly b2_colorDarkMagenta: b2HexColorValue<9109643>;
    readonly b2_colorDarkOliveGreen: b2HexColorValue<5597999>;
    readonly b2_colorDarkOrange: b2HexColorValue<16747520>;
    readonly b2_colorDarkOrchid: b2HexColorValue<10040012>;
    readonly b2_colorDarkRed: b2HexColorValue<9109504>;
    readonly b2_colorDarkSalmon: b2HexColorValue<15308410>;
    readonly b2_colorDarkSeaGreen: b2HexColorValue<9419919>;
    readonly b2_colorDarkSlateBlue: b2HexColorValue<4734347>;
    readonly b2_colorDarkSlateGray: b2HexColorValue<3100495>;
    readonly b2_colorDarkTurquoise: b2HexColorValue<52945>;
    readonly b2_colorDarkViolet: b2HexColorValue<9699539>;
    readonly b2_colorDeepPink: b2HexColorValue<16716947>;
    readonly b2_colorDeepSkyBlue: b2HexColorValue<49151>;
    readonly b2_colorDimGray: b2HexColorValue<6908265>;
    readonly b2_colorDodgerBlue: b2HexColorValue<2003199>;
    readonly b2_colorFireBrick: b2HexColorValue<11674146>;
    readonly b2_colorFloralWhite: b2HexColorValue<16775920>;
    readonly b2_colorForestGreen: b2HexColorValue<2263842>;
    readonly b2_colorFuchsia: b2HexColorValue<16711935>;
    readonly b2_colorGainsboro: b2HexColorValue<14474460>;
    readonly b2_colorGhostWhite: b2HexColorValue<16316671>;
    readonly b2_colorGold: b2HexColorValue<16766720>;
    readonly b2_colorGoldenRod: b2HexColorValue<14329120>;
    readonly b2_colorGray: b2HexColorValue<8421504>;
    readonly b2_colorGreen: b2HexColorValue<32768>;
    readonly b2_colorGreenYellow: b2HexColorValue<11403055>;
    readonly b2_colorHoneyDew: b2HexColorValue<15794160>;
    readonly b2_colorHotPink: b2HexColorValue<16738740>;
    readonly b2_colorIndianRed: b2HexColorValue<13458524>;
    readonly b2_colorIndigo: b2HexColorValue<4915330>;
    readonly b2_colorIvory: b2HexColorValue<16777200>;
    readonly b2_colorKhaki: b2HexColorValue<15787660>;
    readonly b2_colorLavender: b2HexColorValue<15132410>;
    readonly b2_colorLavenderBlush: b2HexColorValue<16773365>;
    readonly b2_colorLawnGreen: b2HexColorValue<8190976>;
    readonly b2_colorLemonChiffon: b2HexColorValue<16775885>;
    readonly b2_colorLightBlue: b2HexColorValue<11393254>;
    readonly b2_colorLightCoral: b2HexColorValue<15761536>;
    readonly b2_colorLightCyan: b2HexColorValue<14745599>;
    readonly b2_colorLightGoldenRodYellow: b2HexColorValue<16448210>;
    readonly b2_colorLightGray: b2HexColorValue<13882323>;
    readonly b2_colorLightGreen: b2HexColorValue<9498256>;
    readonly b2_colorLightPink: b2HexColorValue<16758465>;
    readonly b2_colorLightSalmon: b2HexColorValue<16752762>;
    readonly b2_colorLightSeaGreen: b2HexColorValue<2142890>;
    readonly b2_colorLightSkyBlue: b2HexColorValue<8900346>;
    readonly b2_colorLightSlateGray: b2HexColorValue<7833753>;
    readonly b2_colorLightSteelBlue: b2HexColorValue<11584734>;
    readonly b2_colorLightYellow: b2HexColorValue<16777184>;
    readonly b2_colorLime: b2HexColorValue<65280>;
    readonly b2_colorLimeGreen: b2HexColorValue<3329330>;
    readonly b2_colorLinen: b2HexColorValue<16445670>;
    readonly b2_colorMagenta: b2HexColorValue<16711935>;
    readonly b2_colorMaroon: b2HexColorValue<8388608>;
    readonly b2_colorMediumAquaMarine: b2HexColorValue<6737322>;
    readonly b2_colorMediumBlue: b2HexColorValue<205>;
    readonly b2_colorMediumOrchid: b2HexColorValue<12211667>;
    readonly b2_colorMediumPurple: b2HexColorValue<9662683>;
    readonly b2_colorMediumSeaGreen: b2HexColorValue<3978097>;
    readonly b2_colorMediumSlateBlue: b2HexColorValue<8087790>;
    readonly b2_colorMediumSpringGreen: b2HexColorValue<64154>;
    readonly b2_colorMediumTurquoise: b2HexColorValue<4772300>;
    readonly b2_colorMediumVioletRed: b2HexColorValue<13047173>;
    readonly b2_colorMidnightBlue: b2HexColorValue<1644912>;
    readonly b2_colorMintCream: b2HexColorValue<16121850>;
    readonly b2_colorMistyRose: b2HexColorValue<16770273>;
    readonly b2_colorMoccasin: b2HexColorValue<16770229>;
    readonly b2_colorNavajoWhite: b2HexColorValue<16768685>;
    readonly b2_colorNavy: b2HexColorValue<128>;
    readonly b2_colorOldLace: b2HexColorValue<16643558>;
    readonly b2_colorOlive: b2HexColorValue<8421376>;
    readonly b2_colorOliveDrab: b2HexColorValue<7048739>;
    readonly b2_colorOrange: b2HexColorValue<16753920>;
    readonly b2_colorOrangeRed: b2HexColorValue<16729344>;
    readonly b2_colorOrchid: b2HexColorValue<14315734>;
    readonly b2_colorPaleGoldenRod: b2HexColorValue<15657130>;
    readonly b2_colorPaleGreen: b2HexColorValue<10025880>;
    readonly b2_colorPaleTurquoise: b2HexColorValue<11529966>;
    readonly b2_colorPaleVioletRed: b2HexColorValue<14381203>;
    readonly b2_colorPapayaWhip: b2HexColorValue<16773077>;
    readonly b2_colorPeachPuff: b2HexColorValue<16767673>;
    readonly b2_colorPeru: b2HexColorValue<13468991>;
    readonly b2_colorPink: b2HexColorValue<16761035>;
    readonly b2_colorPlum: b2HexColorValue<14524637>;
    readonly b2_colorPowderBlue: b2HexColorValue<11591910>;
    readonly b2_colorPurple: b2HexColorValue<8388736>;
    readonly b2_colorRebeccaPurple: b2HexColorValue<6697881>;
    readonly b2_colorRed: b2HexColorValue<16711680>;
    readonly b2_colorRosyBrown: b2HexColorValue<12357519>;
    readonly b2_colorRoyalBlue: b2HexColorValue<4286945>;
    readonly b2_colorSaddleBrown: b2HexColorValue<9127187>;
    readonly b2_colorSalmon: b2HexColorValue<16416882>;
    readonly b2_colorSandyBrown: b2HexColorValue<16032864>;
    readonly b2_colorSeaGreen: b2HexColorValue<3050327>;
    readonly b2_colorSeaShell: b2HexColorValue<16774638>;
    readonly b2_colorSienna: b2HexColorValue<10506797>;
    readonly b2_colorSilver: b2HexColorValue<12632256>;
    readonly b2_colorSkyBlue: b2HexColorValue<8900331>;
    readonly b2_colorSlateBlue: b2HexColorValue<6970061>;
    readonly b2_colorSlateGray: b2HexColorValue<7372944>;
    readonly b2_colorSnow: b2HexColorValue<16775930>;
    readonly b2_colorSpringGreen: b2HexColorValue<65407>;
    readonly b2_colorSteelBlue: b2HexColorValue<4620980>;
    readonly b2_colorTan: b2HexColorValue<13808780>;
    readonly b2_colorTeal: b2HexColorValue<32896>;
    readonly b2_colorThistle: b2HexColorValue<14204888>;
    readonly b2_colorTomato: b2HexColorValue<16737095>;
    readonly b2_colorTurquoise: b2HexColorValue<4251856>;
    readonly b2_colorViolet: b2HexColorValue<15631086>;
    readonly b2_colorWheat: b2HexColorValue<16113331>;
    readonly b2_colorWhite: b2HexColorValue<16777215>;
    readonly b2_colorWhiteSmoke: b2HexColorValue<16119285>;
    readonly b2_colorYellow: b2HexColorValue<16776960>;
    readonly b2_colorYellowGreen: b2HexColorValue<10145074>;
    readonly b2_colorBox2DRed: b2HexColorValue<14430514>;
    readonly b2_colorBox2DBlue: b2HexColorValue<3190463>;
    readonly b2_colorBox2DGreen: b2HexColorValue<9226532>;
    readonly b2_colorBox2DYellow: b2HexColorValue<16772748>;
  };
  /** Get the current version of Box2D */
  b2GetVersion(): b2Version;
  /** Is this a valid number? Not NaN or infinity. */
  b2IsValidFloat(a: number): boolean;
  /** Is this a valid vector? Not NaN or infinity. */
  b2IsValidVec2(v: b2Vec2): boolean;
  /** Is this a valid rotation? Not NaN or infinity. Is normalized. */
  b2IsValidRotation(q: b2Rot): boolean;
  /** Is this a valid transform? Not NaN or infinity. Rotation is normalized. */
  b2IsValidTransform(t: b2Transform): boolean;
  /** Is this a valid bounding box? Not Nan or infinity. Upper bound greater than or equal to lower bound. */
  b2IsValidAABB(aabb: b2AABB): boolean;
  /** Is this a valid plane? Normal is a unit vector. Not Nan or infinity. */
  b2IsValidPlane(a: b2Plane): boolean;
  b2MinInt(a: number, b: number): number;
  b2MaxInt(a: number, b: number): number;
  b2AbsInt(a: number): number;
  b2ClampInt(a: number, lower: number, upper: number): number;
  b2MinFloat(a: number, b: number): number;
  b2MaxFloat(a: number, b: number): number;
  b2AbsFloat(a: number): number;
  b2ClampFloat(a: number, lower: number, upper: number): number;
  /** Compute an approximate arctangent in the range [-pi, pi] This is hand coded for cross-platform determinism. The atan2f function in the standard library is not cross-platform deterministic. Accurate to around 0.0023 degrees */
  b2Atan2(y: number, x: number): number;
  /** Compute the cosine and sine of an angle in radians. Implemented for cross-platform determinism. */
  b2ComputeCosSin(radians: number): b2CosSin;
  /** Vector dot product */
  b2Dot(a: b2Vec2, b: b2Vec2): number;
  /** Vector cross product. In 2D this yields a scalar. */
  b2Cross(a: b2Vec2, b: b2Vec2): number;
  /** Perform the cross product on a vector and a scalar. In 2D this produces a vector. */
  b2CrossVS(v: b2Vec2, s: number): b2Vec2;
  /** Perform the cross product on a scalar and a vector. In 2D this produces a vector. */
  b2CrossSV(s: number, v: b2Vec2): b2Vec2;
  /** Get a left pointing perpendicular vector. Equivalent to b2CrossSV(1.0f, v) */
  b2LeftPerp(v: b2Vec2): b2Vec2;
  /** Get a right pointing perpendicular vector. Equivalent to b2CrossVS(v, 1.0f) */
  b2RightPerp(v: b2Vec2): b2Vec2;
  /** Vector addition */
  b2Add(a: b2Vec2, b: b2Vec2): b2Vec2;
  /** Vector subtraction */
  b2Sub(a: b2Vec2, b: b2Vec2): b2Vec2;
  /** Vector negation */
  b2Neg(a: b2Vec2): b2Vec2;
  /** Vector linear interpolation https://fgiesen.wordpress.com/2012/08/15/linear-interpolation-past-present-and-future/ */
  b2Lerp(a: b2Vec2, b: b2Vec2, t: number): b2Vec2;
  /** Component-wise multiplication */
  b2Mul(a: b2Vec2, b: b2Vec2): b2Vec2;
  /** Multiply a scalar and vector */
  b2MulSV(s: number, v: b2Vec2): b2Vec2;
  /** a + s * b */
  b2MulAdd(a: b2Vec2, s: number, b: b2Vec2): b2Vec2;
  /** a - s * b */
  b2MulSub(a: b2Vec2, s: number, b: b2Vec2): b2Vec2;
  /** Component-wise absolute vector */
  b2Abs(a: b2Vec2): b2Vec2;
  /** Component-wise minimum vector */
  b2Min(a: b2Vec2, b: b2Vec2): b2Vec2;
  /** Component-wise maximum vector */
  b2Max(a: b2Vec2, b: b2Vec2): b2Vec2;
  /** Component-wise clamp vector v into the range [a, b] */
  b2Clamp(v: b2Vec2, a: b2Vec2, b: b2Vec2): b2Vec2;
  /** Get the length of this vector (the norm) */
  b2Length(v: b2Vec2): number;
  /** Get the distance between two points */
  b2Distance(a: b2Vec2, b: b2Vec2): number;
  /** Convert a vector into a unit vector if possible, otherwise returns the zero vector. todo MSVC is not inlining this function in several places per warning 4710 */
  b2Normalize(v: b2Vec2): b2Vec2;
  /** Determines if the provided vector is normalized (norm(a) == 1). */
  b2IsNormalized(a: b2Vec2): boolean;
  /** Normalize rotation */
  b2NormalizeRot(q: b2Rot): b2Rot;
  /** Integrate rotation from angular velocity */
  b2IntegrateRotation(q1: b2Rot, deltaAngle: number): b2Rot;
  /** Get the length squared of this vector */
  b2LengthSquared(v: b2Vec2): number;
  /** Get the distance squared between points */
  b2DistanceSquared(a: b2Vec2, b: b2Vec2): number;
  /** Make a rotation using an angle in radians */
  b2MakeRot(radians: number): b2Rot;
  /** Make a rotation using a unit vector */
  b2MakeRotFromUnitVector(unitVector: b2Vec2): b2Rot;
  /** Compute the rotation between two unit vectors */
  b2ComputeRotationBetweenUnitVectors(v1: b2Vec2, v2: b2Vec2): b2Rot;
  /** Is this rotation normalized? */
  b2IsNormalizedRot(q: b2Rot): boolean;
  /** Normalized linear interpolation https://fgiesen.wordpress.com/2012/08/15/linear-interpolation-past-present-and-future/ https://web.archive.org/web/20170825184056/http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It/ */
  b2NLerp(q1: b2Rot, q2: b2Rot, t: number): b2Rot;
  /** Compute the angular velocity necessary to rotate between two rotations over a give time */
  b2ComputeAngularVelocity(q1: b2Rot, q2: b2Rot, inv_h: number): number;
  /** Get the angle in radians in the range [-pi, pi] */
  b2Rot_GetAngle(q: b2Rot): number;
  /** Get the x-axis */
  b2Rot_GetXAxis(q: b2Rot): b2Vec2;
  /** Get the y-axis */
  b2Rot_GetYAxis(q: b2Rot): b2Vec2;
  /** Multiply two rotations: q * r */
  b2MulRot(q: b2Rot, r: b2Rot): b2Rot;
  /** Transpose multiply two rotations: inv(a) * b This rotates a vector local in frame b into a vector local in frame a */
  b2InvMulRot(a: b2Rot, b: b2Rot): b2Rot;
  /** Relative angle between a and b */
  b2RelativeAngle(a: b2Rot, b: b2Rot): number;
  /** Convert any angle into the range [-pi, pi] */
  b2UnwindAngle(radians: number): number;
  /** Rotate a vector */
  b2RotateVector(q: b2Rot, v: b2Vec2): b2Vec2;
  /** Inverse rotate a vector */
  b2InvRotateVector(q: b2Rot, v: b2Vec2): b2Vec2;
  /** Transform a point (e.g. local space to world space) */
  b2TransformPoint(t: b2Transform, p: b2Vec2): b2Vec2;
  /** Inverse transform a point (e.g. world space to local space) */
  b2InvTransformPoint(t: b2Transform, p: b2Vec2): b2Vec2;
  /** Multiply two transforms. If the result is applied to a point p local to frame B, the transform would first convert p to a point local to frame A, then into a point in the world frame. v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p */
  b2MulTransforms(A: b2Transform, B: b2Transform): b2Transform;
  /** Creates a transform that converts a local point in frame B to a local point in frame A. v2 = A.q' * (B.q * v1 + B.p - A.p) = A.q' * B.q * v1 + A.q' * (B.p - A.p) */
  b2InvMulTransforms(A: b2Transform, B: b2Transform): b2Transform;
  /** Multiply a 2-by-2 matrix times a 2D vector */
  b2MulMV(A: b2Mat22, v: b2Vec2): b2Vec2;
  /** Get the inverse of a 2-by-2 matrix */
  b2GetInverse22(A: b2Mat22): b2Mat22;
  /** Solve A * x = b, where b is a column vector. This is more efficient than computing the inverse in one-shot cases. */
  b2Solve22(A: b2Mat22, b: b2Vec2): b2Vec2;
  /** Does a fully contain b */
  b2AABB_Contains(a: b2AABB, b: b2AABB): boolean;
  /** Get the center of the AABB. */
  b2AABB_Center(a: b2AABB): b2Vec2;
  /** Get the extents of the AABB (half-widths). */
  b2AABB_Extents(a: b2AABB): b2Vec2;
  /** Union of two AABBs */
  b2AABB_Union(a: b2AABB, b: b2AABB): b2AABB;
  /** Do a and b overlap */
  b2AABB_Overlaps(a: b2AABB, b: b2AABB): boolean;
  /** Signed separation of a point from a plane */
  b2PlaneSeparation(plane: b2Plane, point: b2Vec2): number;
  /** One-dimensional mass-spring-damper simulation. Returns the new velocity given the position and time step. You can then compute the new position using: position += timeStep * newVelocity This drives towards a zero position. By using implicit integration we get a stable solution that doesn't require transcendental functions. */
  b2SpringDamper(hertz: number, dampingRatio: number, position: number, velocity: number, timeStep: number): number;
  /** Box2D bases all length units on meters, but you may need different units for your game. You can set this value to use different units. This should be done at application startup and only modified once. Default value is 1. For example, if your game uses pixels for units you can use pixels for all length values sent to Box2D. There should be no extra cost. However, Box2D has some internal tolerances and thresholds that have been tuned for meters. By calling this function, Box2D is able to adjust those tolerances and thresholds to improve accuracy. A good rule of thumb is to pass the height of your player character to this function. So if your player character is 32 pixels high, then pass 32 to this function. Then you may confidently use pixels for all the length values sent to Box2D. All length values returned from Box2D will also be pixels because Box2D does not do any scaling internally. However, you are now on the hook for coming up with good values for gravity, density, and forces. */
  b2SetLengthUnitsPerMeter(lengthUnits: number): void;
  /** Get the current length units per meter. */
  b2GetLengthUnitsPerMeter(): number;
  /** Validate ray cast input data (NaN, etc) */
  b2IsValidRay(input: b2RayCastInput): boolean;
  /** Make a convex polygon from a convex hull. This will assert if the hull is not valid. */
  b2MakePolygon(hull: b2Hull, radius: number): b2Polygon;
  /** Make an offset convex polygon from a convex hull. This will assert if the hull is not valid. */
  b2MakeOffsetPolygon(hull: b2Hull, position: b2Vec2, rotation: b2Rot): b2Polygon;
  /** Make an offset convex polygon from a convex hull. This will assert if the hull is not valid. */
  b2MakeOffsetRoundedPolygon(hull: b2Hull, position: b2Vec2, rotation: b2Rot, radius: number): b2Polygon;
  /** Make a square polygon, bypassing the need for a convex hull. */
  b2MakeSquare(halfWidth: number): b2Polygon;
  /** Make a box (rectangle) polygon, bypassing the need for a convex hull. */
  b2MakeBox(halfWidth: number, halfHeight: number): b2Polygon;
  /** Make a rounded box, bypassing the need for a convex hull. */
  b2MakeRoundedBox(halfWidth: number, halfHeight: number, radius: number): b2Polygon;
  /** Make an offset box, bypassing the need for a convex hull. */
  b2MakeOffsetBox(halfWidth: number, halfHeight: number, center: b2Vec2, rotation: b2Rot): b2Polygon;
  /** Make an offset rounded box, bypassing the need for a convex hull. */
  b2MakeOffsetRoundedBox(halfWidth: number, halfHeight: number, center: b2Vec2, rotation: b2Rot, radius: number): b2Polygon;
  /** Transform a polygon. This is useful for transferring a shape from one body to another. */
  b2TransformPolygon(transform: b2Transform, polygon: b2Polygon): b2Polygon;
  /** Compute mass properties of a circle */
  b2ComputeCircleMass(shape: b2Circle, density: number): b2MassData;
  /** Compute mass properties of a capsule */
  b2ComputeCapsuleMass(shape: b2Capsule, density: number): b2MassData;
  /** Compute mass properties of a polygon */
  b2ComputePolygonMass(shape: b2Polygon, density: number): b2MassData;
  /** Compute the bounding box of a transformed circle */
  b2ComputeCircleAABB(shape: b2Circle, transform: b2Transform): b2AABB;
  /** Compute the bounding box of a transformed capsule */
  b2ComputeCapsuleAABB(shape: b2Capsule, transform: b2Transform): b2AABB;
  /** Compute the bounding box of a transformed polygon */
  b2ComputePolygonAABB(shape: b2Polygon, transform: b2Transform): b2AABB;
  /** Compute the bounding box of a transformed line segment */
  b2ComputeSegmentAABB(shape: b2Segment, transform: b2Transform): b2AABB;
  /** Test a point for overlap with a circle in local space */
  b2PointInCircle(shape: b2Circle, point: b2Vec2): boolean;
  /** Test a point for overlap with a capsule in local space */
  b2PointInCapsule(shape: b2Capsule, point: b2Vec2): boolean;
  /** Test a point for overlap with a convex polygon in local space */
  b2PointInPolygon(shape: b2Polygon, point: b2Vec2): boolean;
  /** Ray cast versus circle shape in local space. */
  b2RayCastCircle(shape: b2Circle, input: b2RayCastInput): b2CastOutput;
  /** Ray cast versus capsule shape in local space. */
  b2RayCastCapsule(shape: b2Capsule, input: b2RayCastInput): b2CastOutput;
  /** Ray cast versus segment shape in local space. Optionally treat the segment as one-sided with hits from the left side being treated as a miss. */
  b2RayCastSegment(shape: b2Segment, input: b2RayCastInput, oneSided: boolean): b2CastOutput;
  /** Ray cast versus polygon shape in local space. */
  b2RayCastPolygon(shape: b2Polygon, input: b2RayCastInput): b2CastOutput;
  /** Shape cast versus a circle. */
  b2ShapeCastCircle(shape: b2Circle, input: b2ShapeCastInput): b2CastOutput;
  /** Shape cast versus a capsule. */
  b2ShapeCastCapsule(shape: b2Capsule, input: b2ShapeCastInput): b2CastOutput;
  /** Shape cast versus a line segment. */
  b2ShapeCastSegment(shape: b2Segment, input: b2ShapeCastInput): b2CastOutput;
  /** Shape cast versus a convex polygon. */
  b2ShapeCastPolygon(shape: b2Polygon, input: b2ShapeCastInput): b2CastOutput;
  /** This determines if a hull is valid. Checks for: - convexity - collinear points This is expensive and should not be called at runtime. */
  b2ValidateHull(hull: b2Hull): boolean;
  /** Compute the distance between two line segments, clamping at the end points if needed. */
  b2SegmentDistance(p1: b2Vec2, q1: b2Vec2, p2: b2Vec2, q2: b2Vec2): b2SegmentDistanceResult;
  /** Perform a linear shape cast of shape B moving and shape A fixed. Determines the hit point, normal, and translation fraction. Initially touching shapes are treated as a miss. */
  b2ShapeCast(input: b2ShapeCastPairInput): b2CastOutput;
  /** Evaluate the transform sweep at a specific time. */
  b2GetSweepTransform(sweep: b2Sweep, time: number): b2Transform;
  /** Compute the upper bound on time before two shapes penetrate. Time is represented as a fraction between [0,tMax]. This uses a swept separating axis and may miss some intermediate, non-tunneling collisions. If you change the time interval, you should call this function again. */
  b2TimeOfImpact(input: b2TOIInput): b2TOIOutput;
  /** Compute the contact manifold between two circles */
  b2CollideCircles(circleA: b2Circle, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between a capsule and circle */
  b2CollideCapsuleAndCircle(capsuleA: b2Capsule, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between an segment and a circle */
  b2CollideSegmentAndCircle(segmentA: b2Segment, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between a polygon and a circle */
  b2CollidePolygonAndCircle(polygonA: b2Polygon, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between a capsule and circle */
  b2CollideCapsules(capsuleA: b2Capsule, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between an segment and a capsule */
  b2CollideSegmentAndCapsule(segmentA: b2Segment, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between a polygon and capsule */
  b2CollidePolygonAndCapsule(polygonA: b2Polygon, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between two polygons */
  b2CollidePolygons(polygonA: b2Polygon, xfA: b2Transform, polygonB: b2Polygon, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between an segment and a polygon */
  b2CollideSegmentAndPolygon(segmentA: b2Segment, xfA: b2Transform, polygonB: b2Polygon, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between a chain segment and a circle */
  b2CollideChainSegmentAndCircle(segmentA: b2ChainSegment, xfA: b2Transform, circleB: b2Circle, xfB: b2Transform): b2Manifold;
  /** Store a world id into a uint32_t. */
  b2StoreWorldId(id: b2WorldId): number;
  /** Load a uint32_t into a world id. */
  b2LoadWorldId(x: number): b2WorldId;
  /** Store a body id into a uint64_t. */
  b2StoreBodyId(id: b2BodyId): number;
  /** Load a uint64_t into a body id. */
  b2LoadBodyId(x: number): b2BodyId;
  /** Store a shape id into a uint64_t. */
  b2StoreShapeId(id: b2ShapeId): number;
  /** Load a uint64_t into a shape id. */
  b2LoadShapeId(x: number): b2ShapeId;
  /** Store a chain id into a uint64_t. */
  b2StoreChainId(id: b2ChainId): number;
  /** Load a uint64_t into a chain id. */
  b2LoadChainId(x: number): b2ChainId;
  /** Store a joint id into a uint64_t. */
  b2StoreJointId(id: b2JointId): number;
  /** Load a uint64_t into a joint id. */
  b2LoadJointId(x: number): b2JointId;
  /** Use this to initialize your world definition */
  b2DefaultWorldDef(): b2WorldDef;
  /** Use this to initialize your body definition */
  b2DefaultBodyDef(): b2BodyDef;
  /** Use this to initialize your filter */
  b2DefaultFilter(): b2Filter;
  /** Use this to initialize your query filter */
  b2DefaultQueryFilter(): b2QueryFilter;
  /** Use this to initialize your surface material */
  b2DefaultSurfaceMaterial(): b2SurfaceMaterial;
  /** Use this to initialize your shape definition */
  b2DefaultShapeDef(): b2ShapeDef;
  /** Use this to initialize your chain definition */
  b2DefaultChainDef(): b2ChainDef;
  /** Use this to initialize your joint definition */
  b2DefaultDistanceJointDef(): b2DistanceJointDef;
  /** Use this to initialize your joint definition */
  b2DefaultMotorJointDef(): b2MotorJointDef;
  /** Use this to initialize your joint definition */
  b2DefaultFilterJointDef(): b2FilterJointDef;
  /** Use this to initialize your joint definition */
  b2DefaultPrismaticJointDef(): b2PrismaticJointDef;
  /** Use this to initialize your joint definition. */
  b2DefaultRevoluteJointDef(): b2RevoluteJointDef;
  /** Use this to initialize your joint definition */
  b2DefaultWeldJointDef(): b2WeldJointDef;
  /** Use this to initialize your joint definition */
  b2DefaultWheelJointDef(): b2WheelJointDef;
  /** Use this to initialize your explosion definition */
  b2DefaultExplosionDef(): b2ExplosionDef;
  /** Use this to initialize your drawing interface. This allows you to implement a sub-set of the drawing functions. */
  b2DefaultDebugDraw(): b2DebugDraw;
  /** Create a world for rigid body simulation. A world contains bodies, shapes, and constraints. You make create up to 128 worlds. Each world is completely independent and may be simulated in parallel. */
  b2CreateWorld(def: b2WorldDefInput): b2WorldId;
  /** World id validation. Provides validation for up to 64K allocations. */
  b2World_IsValid(id: b2WorldId): boolean;
  /** Cast a ray into the world to collect the closest hit. This is a convenience function. Ignores initial overlap. This is less general than b2World_CastRay() and does not allow for custom filtering. */
  b2World_CastRayClosest(worldId: b2WorldId, origin: b2Vec2, translation: b2Vec2, filter: b2QueryFilterInput): b2RayResult;
  /** Cast a capsule mover through the world. This is a special shape cast that handles sliding along other shapes while reducing clipping. */
  b2World_CastMover(worldId: b2WorldId, mover: b2Capsule, translation: b2Vec2, filter: b2QueryFilterInput): number;
  /** Enable/disable sleep. If your application does not need sleeping, you can gain some performance by disabling sleep completely at the world level. */
  b2World_EnableSleeping(worldId: b2WorldId, flag: boolean): void;
  /** Is body sleeping enabled? */
  b2World_IsSleepingEnabled(worldId: b2WorldId): boolean;
  /** Enable/disable continuous collision between dynamic and static bodies. Generally you should keep continuous collision enabled to prevent fast moving objects from going through static objects. The performance gain from disabling continuous collision is minor. */
  b2World_EnableContinuous(worldId: b2WorldId, flag: boolean): void;
  /** Is continuous collision enabled? */
  b2World_IsContinuousEnabled(worldId: b2WorldId): boolean;
  /** Adjust the restitution threshold. It is recommended not to make this value very small because it will prevent bodies from sleeping. Usually in meters per second. */
  b2World_SetRestitutionThreshold(worldId: b2WorldId, value: number): void;
  /** Get the the restitution speed threshold. Usually in meters per second. */
  b2World_GetRestitutionThreshold(worldId: b2WorldId): number;
  /** Adjust the hit event threshold. This controls the collision speed needed to generate a b2ContactHitEvent. Usually in meters per second. */
  b2World_SetHitEventThreshold(worldId: b2WorldId, value: number): void;
  /** Get the the hit event speed threshold. Usually in meters per second. */
  b2World_GetHitEventThreshold(worldId: b2WorldId): number;
  /** Set the gravity vector for the entire world. Box2D has no concept of an up direction and this is left as a decision for the application. Usually in m/s^2. */
  b2World_SetGravity(worldId: b2WorldId, gravity: b2Vec2): void;
  /** Get the gravity vector */
  b2World_GetGravity(worldId: b2WorldId): b2Vec2;
  /** Apply a radial explosion */
  b2World_Explode(worldId: b2WorldId, explosionDef: b2ExplosionDefInput): void;
  /** Adjust contact tuning parameters */
  b2World_SetContactTuning(worldId: b2WorldId, hertz: number, dampingRatio: number, pushSpeed: number): void;
  /** Set the maximum linear speed. Usually in m/s. */
  b2World_SetMaximumLinearSpeed(worldId: b2WorldId, maximumLinearSpeed: number): void;
  /** Get the maximum linear speed. Usually in m/s. */
  b2World_GetMaximumLinearSpeed(worldId: b2WorldId): number;
  /** Enable/disable constraint warm starting. Advanced feature for testing. Disabling warm starting greatly reduces stability and provides no performance gain. */
  b2World_EnableWarmStarting(worldId: b2WorldId, flag: boolean): void;
  /** Is constraint warm starting enabled? */
  b2World_IsWarmStartingEnabled(worldId: b2WorldId): boolean;
  /** Get the number of awake bodies. */
  b2World_GetAwakeBodyCount(worldId: b2WorldId): number;
  /** Get the current world performance profile */
  b2World_GetProfile(worldId: b2WorldId): b2Profile;
  /** Get world counters and sizes */
  b2World_GetCounters(worldId: b2WorldId): b2Counters;
  /** Dump memory stats to box2d_memory.txt */
  b2World_DumpMemoryStats(worldId: b2WorldId): void;
  /** This is for internal testing */
  b2World_RebuildStaticTree(worldId: b2WorldId): void;
  /** This is for internal testing */
  b2World_EnableSpeculative(worldId: b2WorldId, flag: boolean): void;
  /** Create a rigid body given a definition. No reference to the definition is retained. So you can create the definition on the stack and pass it as a pointer. */
  b2CreateBody(worldId: b2WorldId, def: b2BodyDefInput): b2BodyId;
  /** Destroy a rigid body given an id. This destroys all shapes and joints attached to the body. Do not keep references to the associated shapes and joints. */
  b2DestroyBody(bodyId: b2BodyId): void;
  /** Body identifier validation. A valid body exists in a world and is non-null. This can be used to detect orphaned ids. Provides validation for up to 64K allocations. */
  b2Body_IsValid(id: b2BodyId): boolean;
  /** Get the body type: static, kinematic, or dynamic */
  b2Body_GetType(bodyId: b2BodyId): b2BodyType;
  /** Change the body type. This is an expensive operation. This automatically updates the mass properties regardless of the automatic mass setting. */
  b2Body_SetType(bodyId: b2BodyId, type: b2BodyType): void;
  /** Get the world position of a body. This is the location of the body origin. */
  b2Body_GetPosition(bodyId: b2BodyId): b2Vec2;
  /** Get the world rotation of a body as a cosine/sine pair (complex number) */
  b2Body_GetRotation(bodyId: b2BodyId): b2Rot;
  /** Get the world transform of a body. */
  b2Body_GetTransform(bodyId: b2BodyId): b2Transform;
  /** Set the world transform of a body. This acts as a teleport and is fairly expensive. */
  b2Body_SetTransform(bodyId: b2BodyId, position: b2Vec2, rotation: b2Rot): void;
  /** Get a local point on a body given a world point */
  b2Body_GetLocalPoint(bodyId: b2BodyId, worldPoint: b2Vec2): b2Vec2;
  /** Get a world point on a body given a local point */
  b2Body_GetWorldPoint(bodyId: b2BodyId, localPoint: b2Vec2): b2Vec2;
  /** Get a local vector on a body given a world vector */
  b2Body_GetLocalVector(bodyId: b2BodyId, worldVector: b2Vec2): b2Vec2;
  /** Get a world vector on a body given a local vector */
  b2Body_GetWorldVector(bodyId: b2BodyId, localVector: b2Vec2): b2Vec2;
  /** Get the linear velocity of a body's center of mass. Usually in meters per second. */
  b2Body_GetLinearVelocity(bodyId: b2BodyId): b2Vec2;
  /** Get the angular velocity of a body in radians per second */
  b2Body_GetAngularVelocity(bodyId: b2BodyId): number;
  /** Set the linear velocity of a body. Usually in meters per second. */
  b2Body_SetLinearVelocity(bodyId: b2BodyId, linearVelocity: b2Vec2): void;
  /** Set the angular velocity of a body in radians per second */
  b2Body_SetAngularVelocity(bodyId: b2BodyId, angularVelocity: number): void;
  /** Set the velocity to reach the given transform after a given time step. The result will be close but maybe not exact. This is meant for kinematic bodies. The target is not applied if the velocity would be below the sleep threshold. This will automatically wake the body if asleep. */
  b2Body_SetTargetTransform(bodyId: b2BodyId, target: b2Transform, timeStep: number): void;
  /** Get the linear velocity of a local point attached to a body. Usually in meters per second. */
  b2Body_GetLocalPointVelocity(bodyId: b2BodyId, localPoint: b2Vec2): b2Vec2;
  /** Get the linear velocity of a world point attached to a body. Usually in meters per second. */
  b2Body_GetWorldPointVelocity(bodyId: b2BodyId, worldPoint: b2Vec2): b2Vec2;
  /** Apply a force at a world point. If the force is not applied at the center of mass, it will generate a torque and affect the angular velocity. This optionally wakes up the body. The force is ignored if the body is not awake. */
  b2Body_ApplyForce(bodyId: b2BodyId, force: b2Vec2, point: b2Vec2, wake: boolean): void;
  /** Apply a force to the center of mass. This optionally wakes up the body. The force is ignored if the body is not awake. */
  b2Body_ApplyForceToCenter(bodyId: b2BodyId, force: b2Vec2, wake: boolean): void;
  /** Apply a torque. This affects the angular velocity without affecting the linear velocity. This optionally wakes the body. The torque is ignored if the body is not awake. */
  b2Body_ApplyTorque(bodyId: b2BodyId, torque: number, wake: boolean): void;
  /** Apply an impulse at a point. This immediately modifies the velocity. It also modifies the angular velocity if the point of application is not at the center of mass. This optionally wakes the body. The impulse is ignored if the body is not awake. */
  b2Body_ApplyLinearImpulse(bodyId: b2BodyId, impulse: b2Vec2, point: b2Vec2, wake: boolean): void;
  /** Apply an impulse to the center of mass. This immediately modifies the velocity. The impulse is ignored if the body is not awake. This optionally wakes the body. */
  b2Body_ApplyLinearImpulseToCenter(bodyId: b2BodyId, impulse: b2Vec2, wake: boolean): void;
  /** Apply an angular impulse. The impulse is ignored if the body is not awake. This optionally wakes the body. */
  b2Body_ApplyAngularImpulse(bodyId: b2BodyId, impulse: number, wake: boolean): void;
  /** Get the mass of the body, usually in kilograms */
  b2Body_GetMass(bodyId: b2BodyId): number;
  /** Get the rotational inertia of the body, usually in kg*m^2 */
  b2Body_GetRotationalInertia(bodyId: b2BodyId): number;
  /** Get the center of mass position of the body in local space */
  b2Body_GetLocalCenterOfMass(bodyId: b2BodyId): b2Vec2;
  /** Get the center of mass position of the body in world space */
  b2Body_GetWorldCenterOfMass(bodyId: b2BodyId): b2Vec2;
  /** Override the body's mass properties. Normally this is computed automatically using the shape geometry and density. This information is lost if a shape is added or removed or if the body type changes. */
  b2Body_SetMassData(bodyId: b2BodyId, massData: b2MassData): void;
  /** Get the mass data for a body */
  b2Body_GetMassData(bodyId: b2BodyId): b2MassData;
  /** This updates the mass properties to the sum of the mass properties of the shapes. This normally does not need to be called unless you called SetMassData to override the mass and you later want to reset the mass. You may also use this when automatic mass computation has been disabled. You should call this regardless of body type. Note that sensor shapes may have mass. */
  b2Body_ApplyMassFromShapes(bodyId: b2BodyId): void;
  /** Adjust the linear damping. Normally this is set in b2BodyDef before creation. */
  b2Body_SetLinearDamping(bodyId: b2BodyId, linearDamping: number): void;
  /** Get the current linear damping. */
  b2Body_GetLinearDamping(bodyId: b2BodyId): number;
  /** Adjust the angular damping. Normally this is set in b2BodyDef before creation. */
  b2Body_SetAngularDamping(bodyId: b2BodyId, angularDamping: number): void;
  /** Get the current angular damping. */
  b2Body_GetAngularDamping(bodyId: b2BodyId): number;
  /** Adjust the gravity scale. Normally this is set in b2BodyDef before creation. */
  b2Body_SetGravityScale(bodyId: b2BodyId, gravityScale: number): void;
  /** Get the current gravity scale */
  b2Body_GetGravityScale(bodyId: b2BodyId): number;
  b2Body_IsAwake(bodyId: b2BodyId): boolean;
  /** Wake a body from sleep. This wakes the entire island the body is touching. */
  b2Body_SetAwake(bodyId: b2BodyId, awake: boolean): void;
  /** Wake bodies touching this body. Works for static bodies. */
  b2Body_WakeTouching(bodyId: b2BodyId): void;
  /** Enable or disable sleeping for this body. If sleeping is disabled the body will wake. */
  b2Body_EnableSleep(bodyId: b2BodyId, enableSleep: boolean): void;
  /** Returns true if sleeping is enabled for this body */
  b2Body_IsSleepEnabled(bodyId: b2BodyId): boolean;
  /** Set the sleep threshold, usually in meters per second */
  b2Body_SetSleepThreshold(bodyId: b2BodyId, sleepThreshold: number): void;
  /** Get the sleep threshold, usually in meters per second. */
  b2Body_GetSleepThreshold(bodyId: b2BodyId): number;
  /** Returns true if this body is enabled */
  b2Body_IsEnabled(bodyId: b2BodyId): boolean;
  /** Disable a body by removing it completely from the simulation. This is expensive. */
  b2Body_Disable(bodyId: b2BodyId): void;
  /** Enable a body by adding it to the simulation. This is expensive. */
  b2Body_Enable(bodyId: b2BodyId): void;
  /** Set the motion locks on this body. */
  b2Body_SetMotionLocks(bodyId: b2BodyId, locks: b2MotionLocks): void;
  /** Get the motion locks for this body. */
  b2Body_GetMotionLocks(bodyId: b2BodyId): b2MotionLocks;
  /** Set this body to be a bullet. A bullet does continuous collision detection against dynamic bodies (but not other bullets). */
  b2Body_SetBullet(bodyId: b2BodyId, flag: boolean): void;
  /** Is this body a bullet? */
  b2Body_IsBullet(bodyId: b2BodyId): boolean;
  /** Enable/disable contact events on all shapes. */
  b2Body_EnableContactEvents(bodyId: b2BodyId, flag: boolean): void;
  /** Enable/disable hit events on all shapes */
  b2Body_EnableHitEvents(bodyId: b2BodyId, flag: boolean): void;
  /** Get the world that owns this body */
  b2Body_GetWorld(bodyId: b2BodyId): b2WorldId;
  /** Get the number of shapes on this body */
  b2Body_GetShapeCount(bodyId: b2BodyId): number;
  /** Get the number of joints on this body */
  b2Body_GetJointCount(bodyId: b2BodyId): number;
  /** Get the maximum capacity required for retrieving all the touching contacts on a body */
  b2Body_GetContactCapacity(bodyId: b2BodyId): number;
  /** Get the current world AABB that contains all the attached shapes. Note that this may not encompass the body origin. If there are no shapes attached then the returned AABB is empty and centered on the body origin. */
  b2Body_ComputeAABB(bodyId: b2BodyId): b2AABB;
  /** Create a circle shape and attach it to a body. The shape definition and geometry are fully cloned. Contacts are not created until the next time step. */
  b2CreateCircleShape(bodyId: b2BodyId, def: b2ShapeDefInput, circle: b2Circle): b2ShapeId;
  /** Create a line segment shape and attach it to a body. The shape definition and geometry are fully cloned. Contacts are not created until the next time step. */
  b2CreateSegmentShape(bodyId: b2BodyId, def: b2ShapeDefInput, segment: b2Segment): b2ShapeId;
  /** Create a capsule shape and attach it to a body. The shape definition and geometry are fully cloned. Contacts are not created until the next time step. */
  b2CreateCapsuleShape(bodyId: b2BodyId, def: b2ShapeDefInput, capsule: b2Capsule): b2ShapeId;
  /** Create a polygon shape and attach it to a body. The shape definition and geometry are fully cloned. Contacts are not created until the next time step. */
  b2CreatePolygonShape(bodyId: b2BodyId, def: b2ShapeDefInput, polygon: b2Polygon): b2ShapeId;
  /** Destroy a shape. You may defer the body mass update which can improve performance if several shapes on a body are destroyed at once. */
  b2DestroyShape(shapeId: b2ShapeId, updateBodyMass: boolean): void;
  /** Shape identifier validation. Provides validation for up to 64K allocations. */
  b2Shape_IsValid(id: b2ShapeId): boolean;
  /** Get the type of a shape */
  b2Shape_GetType(shapeId: b2ShapeId): b2ShapeType;
  /** Get the id of the body that a shape is attached to */
  b2Shape_GetBody(shapeId: b2ShapeId): b2BodyId;
  /** Get the world that owns this shape */
  b2Shape_GetWorld(shapeId: b2ShapeId): b2WorldId;
  /** Returns true if the shape is a sensor. It is not possible to change a shape from sensor to solid dynamically because this breaks the contract for sensor events. */
  b2Shape_IsSensor(shapeId: b2ShapeId): boolean;
  /** Set the mass density of a shape, usually in kg/m^2. This will optionally update the mass properties on the parent body. */
  b2Shape_SetDensity(shapeId: b2ShapeId, density: number, updateBodyMass: boolean): void;
  /** Get the density of a shape, usually in kg/m^2 */
  b2Shape_GetDensity(shapeId: b2ShapeId): number;
  /** Set the friction on a shape */
  b2Shape_SetFriction(shapeId: b2ShapeId, friction: number): void;
  /** Get the friction of a shape */
  b2Shape_GetFriction(shapeId: b2ShapeId): number;
  /** Set the shape restitution (bounciness) */
  b2Shape_SetRestitution(shapeId: b2ShapeId, restitution: number): void;
  /** Get the shape restitution */
  b2Shape_GetRestitution(shapeId: b2ShapeId): number;
  /** Set the user material identifier */
  b2Shape_SetUserMaterial(shapeId: b2ShapeId, material: number): void;
  /** Get the user material identifier */
  b2Shape_GetUserMaterial(shapeId: b2ShapeId): number;
  /** Set the shape surface material */
  b2Shape_SetSurfaceMaterial(shapeId: b2ShapeId, surfaceMaterial: b2SurfaceMaterialInput): void;
  /** Get the shape surface material */
  b2Shape_GetSurfaceMaterial(shapeId: b2ShapeId): b2SurfaceMaterial;
  /** Get the shape filter */
  b2Shape_GetFilter(shapeId: b2ShapeId): b2Filter;
  /** Set the current filter. This is almost as expensive as recreating the shape. This may cause contacts to be immediately destroyed. However contacts are not created until the next world step. Sensor overlap state is also not updated until the next world step. */
  b2Shape_SetFilter(shapeId: b2ShapeId, filter: b2FilterInput): void;
  /** Enable sensor events for this shape. */
  b2Shape_EnableSensorEvents(shapeId: b2ShapeId, flag: boolean): void;
  /** Returns true if sensor events are enabled. */
  b2Shape_AreSensorEventsEnabled(shapeId: b2ShapeId): boolean;
  /** Enable contact events for this shape. Only applies to kinematic and dynamic bodies. Ignored for sensors. */
  b2Shape_EnableContactEvents(shapeId: b2ShapeId, flag: boolean): void;
  /** Returns true if contact events are enabled */
  b2Shape_AreContactEventsEnabled(shapeId: b2ShapeId): boolean;
  /** Enable pre-solve contact events for this shape. Only applies to dynamic bodies. These are expensive and must be carefully handled due to multithreading. Ignored for sensors. */
  b2Shape_EnablePreSolveEvents(shapeId: b2ShapeId, flag: boolean): void;
  /** Returns true if pre-solve events are enabled */
  b2Shape_ArePreSolveEventsEnabled(shapeId: b2ShapeId): boolean;
  /** Enable contact hit events for this shape. Ignored for sensors. */
  b2Shape_EnableHitEvents(shapeId: b2ShapeId, flag: boolean): void;
  /** Returns true if hit events are enabled */
  b2Shape_AreHitEventsEnabled(shapeId: b2ShapeId): boolean;
  /** Test a point for overlap with a shape */
  b2Shape_TestPoint(shapeId: b2ShapeId, point: b2Vec2): boolean;
  /** Ray cast a shape directly */
  b2Shape_RayCast(shapeId: b2ShapeId, input: b2RayCastInput): b2CastOutput;
  /** Get a copy of the shape's circle. Asserts the type is correct. */
  b2Shape_GetCircle(shapeId: b2ShapeId): b2Circle;
  /** Get a copy of the shape's line segment. Asserts the type is correct. */
  b2Shape_GetSegment(shapeId: b2ShapeId): b2Segment;
  /** Get a copy of the shape's chain segment. These come from chain shapes. Asserts the type is correct. */
  b2Shape_GetChainSegment(shapeId: b2ShapeId): b2ChainSegment;
  /** Get a copy of the shape's capsule. Asserts the type is correct. */
  b2Shape_GetCapsule(shapeId: b2ShapeId): b2Capsule;
  /** Get a copy of the shape's convex polygon. Asserts the type is correct. */
  b2Shape_GetPolygon(shapeId: b2ShapeId): b2Polygon;
  /** Allows you to change a shape to be a circle or update the current circle. This does not modify the mass properties. */
  b2Shape_SetCircle(shapeId: b2ShapeId, circle: b2Circle): void;
  /** Allows you to change a shape to be a capsule or update the current capsule. This does not modify the mass properties. */
  b2Shape_SetCapsule(shapeId: b2ShapeId, capsule: b2Capsule): void;
  /** Allows you to change a shape to be a segment or update the current segment. */
  b2Shape_SetSegment(shapeId: b2ShapeId, segment: b2Segment): void;
  /** Allows you to change a shape to be a polygon or update the current polygon. This does not modify the mass properties. */
  b2Shape_SetPolygon(shapeId: b2ShapeId, polygon: b2Polygon): void;
  /** Get the parent chain id if the shape type is a chain segment, otherwise returns b2_nullChainId. */
  b2Shape_GetParentChain(shapeId: b2ShapeId): b2ChainId;
  /** Get the maximum capacity required for retrieving all the touching contacts on a shape */
  b2Shape_GetContactCapacity(shapeId: b2ShapeId): number;
  /** Get the maximum capacity required for retrieving all the overlapped shapes on a sensor shape. This returns 0 if the provided shape is not a sensor. */
  b2Shape_GetSensorCapacity(shapeId: b2ShapeId): number;
  /** Get the current world AABB */
  b2Shape_GetAABB(shapeId: b2ShapeId): b2AABB;
  /** Compute the mass data for a shape */
  b2Shape_ComputeMassData(shapeId: b2ShapeId): b2MassData;
  /** Get the closest point on a shape to a target point. Target and result are in world space. todo need sample */
  b2Shape_GetClosestPoint(shapeId: b2ShapeId, target: b2Vec2): b2Vec2;
  /** Apply a wind force to the body for this shape using the density of air. This considers the projected area of the shape in the wind direction. This also considers the relative velocity of the shape. */
  b2Shape_ApplyWind(shapeId: b2ShapeId, wind: b2Vec2, drag: number, lift: number, wake: boolean): void;
  /** Destroy a chain shape */
  b2DestroyChain(chainId: b2ChainId): void;
  /** Get the world that owns this chain shape */
  b2Chain_GetWorld(chainId: b2ChainId): b2WorldId;
  /** Get the number of segments on this chain */
  b2Chain_GetSegmentCount(chainId: b2ChainId): number;
  /** Set a chain material. If the chain has only one material, this material is applied to all segments. Otherwise it is applied to a single segment. */
  b2Chain_SetSurfaceMaterial(chainId: b2ChainId, material: b2SurfaceMaterialInput, materialIndex: number): void;
  /** Get a chain material by index. */
  b2Chain_GetSurfaceMaterial(chainId: b2ChainId, materialIndex: number): b2SurfaceMaterial;
  /** Chain identifier validation. Provides validation for up to 64K allocations. */
  b2Chain_IsValid(id: b2ChainId): boolean;
  /** Destroy a joint. Optionally wake attached bodies. */
  b2DestroyJoint(jointId: b2JointId, wakeAttached: boolean): void;
  /** Joint identifier validation. Provides validation for up to 64K allocations. */
  b2Joint_IsValid(id: b2JointId): boolean;
  /** Get the joint type */
  b2Joint_GetType(jointId: b2JointId): b2JointType;
  /** Get body A id on a joint */
  b2Joint_GetBodyA(jointId: b2JointId): b2BodyId;
  /** Get body B id on a joint */
  b2Joint_GetBodyB(jointId: b2JointId): b2BodyId;
  /** Get the world that owns this joint */
  b2Joint_GetWorld(jointId: b2JointId): b2WorldId;
  /** Set the local frame on bodyA */
  b2Joint_SetLocalFrameA(jointId: b2JointId, localFrame: b2Transform): void;
  /** Get the local frame on bodyA */
  b2Joint_GetLocalFrameA(jointId: b2JointId): b2Transform;
  /** Set the local frame on bodyB */
  b2Joint_SetLocalFrameB(jointId: b2JointId, localFrame: b2Transform): void;
  /** Get the local frame on bodyB */
  b2Joint_GetLocalFrameB(jointId: b2JointId): b2Transform;
  /** Toggle collision between connected bodies */
  b2Joint_SetCollideConnected(jointId: b2JointId, shouldCollide: boolean): void;
  /** Is collision allowed between connected bodies? */
  b2Joint_GetCollideConnected(jointId: b2JointId): boolean;
  /** Wake the bodies connect to this joint */
  b2Joint_WakeBodies(jointId: b2JointId): void;
  /** Get the current constraint force for this joint. Usually in Newtons. */
  b2Joint_GetConstraintForce(jointId: b2JointId): b2Vec2;
  /** Get the current constraint torque for this joint. Usually in Newton * meters. */
  b2Joint_GetConstraintTorque(jointId: b2JointId): number;
  /** Get the current linear separation error for this joint. Does not consider admissible movement. Usually in meters. */
  b2Joint_GetLinearSeparation(jointId: b2JointId): number;
  /** Get the current angular separation error for this joint. Does not consider admissible movement. Usually in meters. */
  b2Joint_GetAngularSeparation(jointId: b2JointId): number;
  /** Set the joint constraint tuning. Advanced feature. */
  b2Joint_SetConstraintTuning(jointId: b2JointId, hertz: number, dampingRatio: number): void;
  /** Set the force threshold for joint events (Newtons) */
  b2Joint_SetForceThreshold(jointId: b2JointId, threshold: number): void;
  /** Get the force threshold for joint events (Newtons) */
  b2Joint_GetForceThreshold(jointId: b2JointId): number;
  /** Set the torque threshold for joint events (N-m) */
  b2Joint_SetTorqueThreshold(jointId: b2JointId, threshold: number): void;
  /** Get the torque threshold for joint events (N-m) */
  b2Joint_GetTorqueThreshold(jointId: b2JointId): number;
  /** Create a distance joint */
  b2CreateDistanceJoint(worldId: b2WorldId, def: b2DistanceJointDefInput): b2JointId;
  /** Set the rest length of a distance joint */
  b2DistanceJoint_SetLength(jointId: b2JointId, length: number): void;
  /** Get the rest length of a distance joint */
  b2DistanceJoint_GetLength(jointId: b2JointId): number;
  /** Enable/disable the distance joint spring. When disabled the distance joint is rigid. */
  b2DistanceJoint_EnableSpring(jointId: b2JointId, enableSpring: boolean): void;
  /** Is the distance joint spring enabled? */
  b2DistanceJoint_IsSpringEnabled(jointId: b2JointId): boolean;
  /** Set the force range for the spring. */
  b2DistanceJoint_SetSpringForceRange(jointId: b2JointId, lowerForce: number, upperForce: number): void;
  /** Set the spring stiffness in Hertz */
  b2DistanceJoint_SetSpringHertz(jointId: b2JointId, hertz: number): void;
  /** Set the spring damping ratio, non-dimensional */
  b2DistanceJoint_SetSpringDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  /** Get the spring Hertz */
  b2DistanceJoint_GetSpringHertz(jointId: b2JointId): number;
  /** Get the spring damping ratio */
  b2DistanceJoint_GetSpringDampingRatio(jointId: b2JointId): number;
  /** Enable joint limit. The limit only works if the joint spring is enabled. Otherwise the joint is rigid and the limit has no effect. */
  b2DistanceJoint_EnableLimit(jointId: b2JointId, enableLimit: boolean): void;
  /** Is the distance joint limit enabled? */
  b2DistanceJoint_IsLimitEnabled(jointId: b2JointId): boolean;
  /** Set the minimum and maximum length parameters of a distance joint */
  b2DistanceJoint_SetLengthRange(jointId: b2JointId, minLength: number, maxLength: number): void;
  /** Get the distance joint minimum length */
  b2DistanceJoint_GetMinLength(jointId: b2JointId): number;
  /** Get the distance joint maximum length */
  b2DistanceJoint_GetMaxLength(jointId: b2JointId): number;
  /** Get the current length of a distance joint */
  b2DistanceJoint_GetCurrentLength(jointId: b2JointId): number;
  /** Enable/disable the distance joint motor */
  b2DistanceJoint_EnableMotor(jointId: b2JointId, enableMotor: boolean): void;
  /** Is the distance joint motor enabled? */
  b2DistanceJoint_IsMotorEnabled(jointId: b2JointId): boolean;
  /** Set the distance joint motor speed, usually in meters per second */
  b2DistanceJoint_SetMotorSpeed(jointId: b2JointId, motorSpeed: number): void;
  /** Get the distance joint motor speed, usually in meters per second */
  b2DistanceJoint_GetMotorSpeed(jointId: b2JointId): number;
  /** Set the distance joint maximum motor force, usually in newtons */
  b2DistanceJoint_SetMaxMotorForce(jointId: b2JointId, force: number): void;
  /** Get the distance joint maximum motor force, usually in newtons */
  b2DistanceJoint_GetMaxMotorForce(jointId: b2JointId): number;
  /** Get the distance joint current motor force, usually in newtons */
  b2DistanceJoint_GetMotorForce(jointId: b2JointId): number;
  /** Create a motor joint */
  b2CreateMotorJoint(worldId: b2WorldId, def: b2MotorJointDefInput): b2JointId;
  /** Set the desired relative linear velocity in meters per second */
  b2MotorJoint_SetLinearVelocity(jointId: b2JointId, velocity: b2Vec2): void;
  /** Get the desired relative linear velocity in meters per second */
  b2MotorJoint_GetLinearVelocity(jointId: b2JointId): b2Vec2;
  /** Set the desired relative angular velocity in radians per second */
  b2MotorJoint_SetAngularVelocity(jointId: b2JointId, velocity: number): void;
  /** Get the desired relative angular velocity in radians per second */
  b2MotorJoint_GetAngularVelocity(jointId: b2JointId): number;
  /** Set the motor joint maximum force, usually in newtons */
  b2MotorJoint_SetMaxVelocityForce(jointId: b2JointId, maxForce: number): void;
  /** Get the motor joint maximum force, usually in newtons */
  b2MotorJoint_GetMaxVelocityForce(jointId: b2JointId): number;
  /** Set the motor joint maximum torque, usually in newton-meters */
  b2MotorJoint_SetMaxVelocityTorque(jointId: b2JointId, maxTorque: number): void;
  /** Get the motor joint maximum torque, usually in newton-meters */
  b2MotorJoint_GetMaxVelocityTorque(jointId: b2JointId): number;
  /** Set the spring linear hertz stiffness */
  b2MotorJoint_SetLinearHertz(jointId: b2JointId, hertz: number): void;
  /** Get the spring linear hertz stiffness */
  b2MotorJoint_GetLinearHertz(jointId: b2JointId): number;
  /** Set the spring linear damping ratio. Use 1.0 for critical damping. */
  b2MotorJoint_SetLinearDampingRatio(jointId: b2JointId, damping: number): void;
  /** Get the spring linear damping ratio. */
  b2MotorJoint_GetLinearDampingRatio(jointId: b2JointId): number;
  /** Set the spring angular hertz stiffness */
  b2MotorJoint_SetAngularHertz(jointId: b2JointId, hertz: number): void;
  /** Get the spring angular hertz stiffness */
  b2MotorJoint_GetAngularHertz(jointId: b2JointId): number;
  /** Set the spring angular damping ratio. Use 1.0 for critical damping. */
  b2MotorJoint_SetAngularDampingRatio(jointId: b2JointId, damping: number): void;
  /** Get the spring angular damping ratio. */
  b2MotorJoint_GetAngularDampingRatio(jointId: b2JointId): number;
  /** Set the maximum spring force in newtons. */
  b2MotorJoint_SetMaxSpringForce(jointId: b2JointId, maxForce: number): void;
  /** Get the maximum spring force in newtons. */
  b2MotorJoint_GetMaxSpringForce(jointId: b2JointId): number;
  /** Set the maximum spring torque in newtons * meters */
  b2MotorJoint_SetMaxSpringTorque(jointId: b2JointId, maxTorque: number): void;
  /** Get the maximum spring torque in newtons * meters */
  b2MotorJoint_GetMaxSpringTorque(jointId: b2JointId): number;
  /** Create a filter joint. */
  b2CreateFilterJoint(worldId: b2WorldId, def: b2FilterJointDefInput): b2JointId;
  /** Create a prismatic (slider) joint. */
  b2CreatePrismaticJoint(worldId: b2WorldId, def: b2PrismaticJointDefInput): b2JointId;
  /** Enable/disable the joint spring. */
  b2PrismaticJoint_EnableSpring(jointId: b2JointId, enableSpring: boolean): void;
  /** Is the prismatic joint spring enabled or not? */
  b2PrismaticJoint_IsSpringEnabled(jointId: b2JointId): boolean;
  /** Set the prismatic joint stiffness in Hertz. This should usually be less than a quarter of the simulation rate. For example, if the simulation runs at 60Hz then the joint stiffness should be 15Hz or less. */
  b2PrismaticJoint_SetSpringHertz(jointId: b2JointId, hertz: number): void;
  /** Get the prismatic joint stiffness in Hertz */
  b2PrismaticJoint_GetSpringHertz(jointId: b2JointId): number;
  /** Set the prismatic joint damping ratio (non-dimensional) */
  b2PrismaticJoint_SetSpringDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  /** Get the prismatic spring damping ratio (non-dimensional) */
  b2PrismaticJoint_GetSpringDampingRatio(jointId: b2JointId): number;
  /** Set the prismatic joint spring target angle, usually in meters */
  b2PrismaticJoint_SetTargetTranslation(jointId: b2JointId, translation: number): void;
  /** Get the prismatic joint spring target translation, usually in meters */
  b2PrismaticJoint_GetTargetTranslation(jointId: b2JointId): number;
  /** Enable/disable a prismatic joint limit */
  b2PrismaticJoint_EnableLimit(jointId: b2JointId, enableLimit: boolean): void;
  /** Is the prismatic joint limit enabled? */
  b2PrismaticJoint_IsLimitEnabled(jointId: b2JointId): boolean;
  /** Get the prismatic joint lower limit */
  b2PrismaticJoint_GetLowerLimit(jointId: b2JointId): number;
  /** Get the prismatic joint upper limit */
  b2PrismaticJoint_GetUpperLimit(jointId: b2JointId): number;
  /** Set the prismatic joint limits */
  b2PrismaticJoint_SetLimits(jointId: b2JointId, lower: number, upper: number): void;
  /** Enable/disable a prismatic joint motor */
  b2PrismaticJoint_EnableMotor(jointId: b2JointId, enableMotor: boolean): void;
  /** Is the prismatic joint motor enabled? */
  b2PrismaticJoint_IsMotorEnabled(jointId: b2JointId): boolean;
  /** Set the prismatic joint motor speed, usually in meters per second */
  b2PrismaticJoint_SetMotorSpeed(jointId: b2JointId, motorSpeed: number): void;
  /** Get the prismatic joint motor speed, usually in meters per second */
  b2PrismaticJoint_GetMotorSpeed(jointId: b2JointId): number;
  /** Set the prismatic joint maximum motor force, usually in newtons */
  b2PrismaticJoint_SetMaxMotorForce(jointId: b2JointId, force: number): void;
  /** Get the prismatic joint maximum motor force, usually in newtons */
  b2PrismaticJoint_GetMaxMotorForce(jointId: b2JointId): number;
  /** Get the prismatic joint current motor force, usually in newtons */
  b2PrismaticJoint_GetMotorForce(jointId: b2JointId): number;
  /** Get the current joint translation, usually in meters. */
  b2PrismaticJoint_GetTranslation(jointId: b2JointId): number;
  /** Get the current joint translation speed, usually in meters per second. */
  b2PrismaticJoint_GetSpeed(jointId: b2JointId): number;
  /** Create a revolute joint */
  b2CreateRevoluteJoint(worldId: b2WorldId, def: b2RevoluteJointDefInput): b2JointId;
  /** Enable/disable the revolute joint spring */
  b2RevoluteJoint_EnableSpring(jointId: b2JointId, enableSpring: boolean): void;
  /** It the revolute angular spring enabled? */
  b2RevoluteJoint_IsSpringEnabled(jointId: b2JointId): boolean;
  /** Set the revolute joint spring stiffness in Hertz */
  b2RevoluteJoint_SetSpringHertz(jointId: b2JointId, hertz: number): void;
  /** Get the revolute joint spring stiffness in Hertz */
  b2RevoluteJoint_GetSpringHertz(jointId: b2JointId): number;
  /** Set the revolute joint spring damping ratio, non-dimensional */
  b2RevoluteJoint_SetSpringDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  /** Get the revolute joint spring damping ratio, non-dimensional */
  b2RevoluteJoint_GetSpringDampingRatio(jointId: b2JointId): number;
  /** Set the revolute joint spring target angle, radians */
  b2RevoluteJoint_SetTargetAngle(jointId: b2JointId, angle: number): void;
  /** Get the revolute joint spring target angle, radians */
  b2RevoluteJoint_GetTargetAngle(jointId: b2JointId): number;
  /** Get the revolute joint current angle in radians relative to the reference angle */
  b2RevoluteJoint_GetAngle(jointId: b2JointId): number;
  /** Enable/disable the revolute joint limit */
  b2RevoluteJoint_EnableLimit(jointId: b2JointId, enableLimit: boolean): void;
  /** Is the revolute joint limit enabled? */
  b2RevoluteJoint_IsLimitEnabled(jointId: b2JointId): boolean;
  /** Get the revolute joint lower limit in radians */
  b2RevoluteJoint_GetLowerLimit(jointId: b2JointId): number;
  /** Get the revolute joint upper limit in radians */
  b2RevoluteJoint_GetUpperLimit(jointId: b2JointId): number;
  /** Set the revolute joint limits in radians. It is expected that lower < = upper and that -0.99 * B2_PI < = lower & & upper < = -0.99 * B2_PI. */
  b2RevoluteJoint_SetLimits(jointId: b2JointId, lower: number, upper: number): void;
  /** Enable/disable a revolute joint motor */
  b2RevoluteJoint_EnableMotor(jointId: b2JointId, enableMotor: boolean): void;
  /** Is the revolute joint motor enabled? */
  b2RevoluteJoint_IsMotorEnabled(jointId: b2JointId): boolean;
  /** Set the revolute joint motor speed in radians per second */
  b2RevoluteJoint_SetMotorSpeed(jointId: b2JointId, motorSpeed: number): void;
  /** Get the revolute joint motor speed in radians per second */
  b2RevoluteJoint_GetMotorSpeed(jointId: b2JointId): number;
  /** Get the revolute joint current motor torque, usually in newton-meters */
  b2RevoluteJoint_GetMotorTorque(jointId: b2JointId): number;
  /** Set the revolute joint maximum motor torque, usually in newton-meters */
  b2RevoluteJoint_SetMaxMotorTorque(jointId: b2JointId, torque: number): void;
  /** Get the revolute joint maximum motor torque, usually in newton-meters */
  b2RevoluteJoint_GetMaxMotorTorque(jointId: b2JointId): number;
  /** Create a weld joint */
  b2CreateWeldJoint(worldId: b2WorldId, def: b2WeldJointDefInput): b2JointId;
  /** Set the weld joint linear stiffness in Hertz. 0 is rigid. */
  b2WeldJoint_SetLinearHertz(jointId: b2JointId, hertz: number): void;
  /** Get the weld joint linear stiffness in Hertz */
  b2WeldJoint_GetLinearHertz(jointId: b2JointId): number;
  /** Set the weld joint linear damping ratio (non-dimensional) */
  b2WeldJoint_SetLinearDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  /** Get the weld joint linear damping ratio (non-dimensional) */
  b2WeldJoint_GetLinearDampingRatio(jointId: b2JointId): number;
  /** Set the weld joint angular stiffness in Hertz. 0 is rigid. */
  b2WeldJoint_SetAngularHertz(jointId: b2JointId, hertz: number): void;
  /** Get the weld joint angular stiffness in Hertz */
  b2WeldJoint_GetAngularHertz(jointId: b2JointId): number;
  /** Set weld joint angular damping ratio, non-dimensional */
  b2WeldJoint_SetAngularDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  /** Get the weld joint angular damping ratio, non-dimensional */
  b2WeldJoint_GetAngularDampingRatio(jointId: b2JointId): number;
  /** Create a wheel joint */
  b2CreateWheelJoint(worldId: b2WorldId, def: b2WheelJointDefInput): b2JointId;
  /** Enable/disable the wheel joint spring */
  b2WheelJoint_EnableSpring(jointId: b2JointId, enableSpring: boolean): void;
  /** Is the wheel joint spring enabled? */
  b2WheelJoint_IsSpringEnabled(jointId: b2JointId): boolean;
  /** Set the wheel joint stiffness in Hertz */
  b2WheelJoint_SetSpringHertz(jointId: b2JointId, hertz: number): void;
  /** Get the wheel joint stiffness in Hertz */
  b2WheelJoint_GetSpringHertz(jointId: b2JointId): number;
  /** Set the wheel joint damping ratio, non-dimensional */
  b2WheelJoint_SetSpringDampingRatio(jointId: b2JointId, dampingRatio: number): void;
  /** Get the wheel joint damping ratio, non-dimensional */
  b2WheelJoint_GetSpringDampingRatio(jointId: b2JointId): number;
  /** Enable/disable the wheel joint limit */
  b2WheelJoint_EnableLimit(jointId: b2JointId, enableLimit: boolean): void;
  /** Is the wheel joint limit enabled? */
  b2WheelJoint_IsLimitEnabled(jointId: b2JointId): boolean;
  /** Get the wheel joint lower limit */
  b2WheelJoint_GetLowerLimit(jointId: b2JointId): number;
  /** Get the wheel joint upper limit */
  b2WheelJoint_GetUpperLimit(jointId: b2JointId): number;
  /** Set the wheel joint limits */
  b2WheelJoint_SetLimits(jointId: b2JointId, lower: number, upper: number): void;
  /** Enable/disable the wheel joint motor */
  b2WheelJoint_EnableMotor(jointId: b2JointId, enableMotor: boolean): void;
  /** Is the wheel joint motor enabled? */
  b2WheelJoint_IsMotorEnabled(jointId: b2JointId): boolean;
  /** Set the wheel joint motor speed in radians per second */
  b2WheelJoint_SetMotorSpeed(jointId: b2JointId, motorSpeed: number): void;
  /** Get the wheel joint motor speed in radians per second */
  b2WheelJoint_GetMotorSpeed(jointId: b2JointId): number;
  /** Set the wheel joint maximum motor torque, usually in newton-meters */
  b2WheelJoint_SetMaxMotorTorque(jointId: b2JointId, torque: number): void;
  /** Get the wheel joint maximum motor torque, usually in newton-meters */
  b2WheelJoint_GetMaxMotorTorque(jointId: b2JointId): number;
  /** Get the wheel joint current motor torque, usually in newton-meters */
  b2WheelJoint_GetMotorTorque(jointId: b2JointId): number;
  /** Contact identifier validation. Provides validation for up to 2^32 allocations. */
  b2Contact_IsValid(id: b2ContactId): boolean;
  /** Get the data for a contact. The manifold may have no points if the contact is not touching. */
  b2Contact_GetData(contactId: b2ContactId): b2ContactData;
  /** Overlap test for all shapes that *potentially* overlap the provided AABB */
  b2World_OverlapAABB(worldId: b2WorldId, aabb: b2AABB, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId) => boolean): b2TreeStats;
  /** Overlap test for all shapes that overlap the provided shape proxy. */
  b2World_OverlapShape(worldId: b2WorldId, proxy: b2ShapeProxy, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId) => boolean): b2TreeStats;
  /** Cast a ray into the world to collect shapes in the path of the ray. Your callback function controls whether you get the closest point, any point, or n-points. */
  b2World_CastRay(worldId: b2WorldId, origin: b2Vec2, translation: b2Vec2, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, point: b2Vec2, normal: b2Vec2, fraction: number) => number): b2TreeStats;
  /** Cast a shape through the world. Similar to a cast ray except that a shape is cast instead of a point. */
  b2World_CastShape(worldId: b2WorldId, proxy: b2ShapeProxy, translation: b2Vec2, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, point: b2Vec2, normal: b2Vec2, fraction: number) => number): b2TreeStats;
  /** Collide a capsule mover with the world, gathering collision planes that can be fed to b2SolvePlanes. Useful for kinematic character movement. */
  b2World_CollideMover(worldId: b2WorldId, mover: b2Capsule, filter: b2QueryFilterInput, fcn: (shapeId: b2ShapeId, result: b2PlaneResult) => boolean): void;
  /** Register the custom filter callback. This is optional. */
  b2World_SetCustomFilterCallback(worldId: b2WorldId, fcn: ((shapeIdA: b2ShapeId, shapeIdB: b2ShapeId) => boolean) | null): void;
  /** Register the pre-solve callback. This is optional. */
  b2World_SetPreSolveCallback(worldId: b2WorldId, fcn: ((shapeIdA: b2ShapeId, shapeIdB: b2ShapeId, point: b2Vec2, normal: b2Vec2) => boolean) | null): void;
  /** Simulate a world for one time step. This performs collision detection, integration, and constraint solution. */
  b2World_Step(worldId: b2WorldId, timeStep: number, subStepCount: number): void;
  /** Destroy a world */
  b2DestroyWorld(worldId: b2WorldId): void;
  /** Compute the convex hull of a set of points. Returns an empty hull if it fails. Some failure cases: - all points very close together - all points on a line - less than 3 points - more than B2_MAX_POLYGON_VERTICES points This welds close points and removes collinear points. */
  b2ComputeHull(points: b2Vec2[]): b2Hull;
  /** Make a proxy for use in overlap, shape cast, and related functions. This is a deep copy of the points. */
  b2MakeProxy(points: b2Vec2[], radius: number): b2ShapeProxy;
  /** Make a proxy with a transform. This is a deep copy of the points. */
  b2MakeOffsetProxy(points: b2Vec2[], radius: number, position: b2Vec2, rotation: b2Rot): b2ShapeProxy;
  /** Compute the bounding box of an array of circles */
  b2MakeAABB(points: b2Vec2[], radius: number): b2AABB;
  /** Solves the position of a mover that satisfies the given collision planes. */
  b2SolvePlanes(targetDelta: b2Vec2, planes: b2CollisionPlane[]): b2PlaneSolverResult & { planes: b2CollisionPlane[] };
  /** Clips the velocity against the given collision planes. Planes with zero push or clipVelocity set to false are skipped. */
  b2ClipVector(vector: b2Vec2, planes: b2CollisionPlane[]): b2Vec2;
  /** Get the shape ids for all shapes on this body, up to the provided capacity. */
  b2Body_GetShapes(bodyId: b2BodyId): b2ShapeId[];
  /** Get the joint ids for all joints on this body, up to the provided capacity */
  b2Body_GetJoints(bodyId: b2BodyId): b2JointId[];
  /** Get the touching contact data for a body. */
  b2Body_GetContactData(bodyId: b2BodyId): b2ContactData[];
  /** Get the touching contact data for a shape. The provided shapeId will be either shapeIdA or shapeIdB on the contact data. */
  b2Shape_GetContactData(shapeId: b2ShapeId): b2ContactData[];
  /** Get the overlap data for a sensor shape. */
  b2Shape_GetSensorData(shapeId: b2ShapeId): b2ShapeId[];
  /** Fill a user array with chain segment shape ids up to the specified capacity. Returns the actual number of segments returned. */
  b2Chain_GetSegments(chainId: b2ChainId): b2ShapeId[];
  /** Create a chain shape */
  b2CreateChain(bodyId: b2BodyId, def: b2ChainDefInput): b2ChainId;
  /** Compute the closest points between two shapes represented as point clouds. b2SimplexCache cache is input/output. On the first call set b2SimplexCache.count to zero. The underlying GJK algorithm may be debugged by passing in debug simplexes and capacity. You may pass in NULL and 0 for these. */
  b2ShapeDistance(input: b2DistanceInput): b2DistanceOutput;
  /** Compute the contact manifold between a chain segment and a capsule */
  b2CollideChainSegmentAndCapsule(segmentA: b2ChainSegment, xfA: b2Transform, capsuleB: b2Capsule, xfB: b2Transform): b2Manifold;
  /** Compute the contact manifold between a chain segment and a rounded polygon */
  b2CollideChainSegmentAndPolygon(segmentA: b2ChainSegment, xfA: b2Transform, polygonB: b2Polygon, xfB: b2Transform): b2Manifold;
  /** Convert a vector into a unit vector if possible, otherwise returns the zero vector. Also outputs the length. */
  b2GetLengthAndNormalize(v: b2Vec2): { length: number; vector: b2Vec2 };
  /** Get the joint constraint tuning. Advanced feature. */
  b2Joint_GetConstraintTuning(jointId: b2JointId): { hertz: number; dampingRatio: number };
  /** Get the force range for the spring. */
  b2DistanceJoint_GetSpringForceRange(jointId: b2JointId): { lowerForce: number; upperForce: number };
  /** Get sensor events for the current time step. The event data is transient. Do not store a reference to this data. */
  b2World_GetSensorEvents(worldId: b2WorldId): { beginEvents: b2SensorBeginTouchEvent[]; endEvents: b2SensorEndTouchEvent[] };
  /** Get contact events for this current time step. The event data is transient. Do not store a reference to this data. */
  b2World_GetContactEvents(worldId: b2WorldId): { beginEvents: b2ContactBeginTouchEvent[]; endEvents: b2ContactEndTouchEvent[]; hitEvents: b2ContactHitEvent[] };
  /** Get the body events for the current time step. The event data is transient. Do not store a reference to this data. */
  b2World_GetBodyEvents(worldId: b2WorldId): { moveEvents: b2BodyMoveEvent[] };
  /** Get the joint events for the current time step. The event data is transient. Do not store a reference to this data. */
  b2World_GetJointEvents(worldId: b2WorldId): { jointEvents: b2JointEvent[] };
  /** Set the body name. Up to 31 characters excluding 0 termination. */
  b2Body_SetName(bodyId: b2BodyId, name: string): void;
  /** Get the body name. */
  b2Body_GetName(bodyId: b2BodyId): string;
  /** Clear the force and torque on this body. Forces and torques are automatically cleared after each world step. So this only needs to be called if the application wants to remove the effect of previous calls to apply forces and torques before the world step is called. */
  b2Body_ClearForces(bodyId: b2BodyId): void;
  /** Call this to draw shapes and other debug draw data */
  b2World_Draw(worldId: b2WorldId, draw: b2DebugDrawInput & b2DebugDrawCallbacks): void;
  /** Stores an integer as the world's user data, in place of the raw pointer. */
  b2World_SetUserDataInt(worldId: b2WorldId, value: number): void;
  /** The integer stored as the world's user data; 0 when none. */
  b2World_GetUserDataInt(worldId: b2WorldId): number;
  /** Stores an integer as the body's user data, in place of the raw pointer. */
  b2Body_SetUserDataInt(bodyId: b2BodyId, value: number): void;
  /** The integer stored as the body's user data; 0 when none. */
  b2Body_GetUserDataInt(bodyId: b2BodyId): number;
  /** Stores an integer as the shape's user data, in place of the raw pointer. */
  b2Shape_SetUserDataInt(shapeId: b2ShapeId, value: number): void;
  /** The integer stored as the shape's user data; 0 when none. */
  b2Shape_GetUserDataInt(shapeId: b2ShapeId): number;
  /** Stores an integer as the joint's user data, in place of the raw pointer. */
  b2Joint_SetUserDataInt(jointId: b2JointId, value: number): void;
  /** The integer stored as the joint's user data; 0 when none. */
  b2Joint_GetUserDataInt(jointId: b2JointId): number;
  /** The wasm heap's use, from mallinfo: bytes in use and bytes held free. */
  getMemoryStats(): MemoryStats;
}

/** Instantiates the wasm; the `locateFile` option redirects the .wasm request. */
export default function createBox2D(options?: { locateFile?(path: string, prefix: string): string }): Promise<Box2D>;
