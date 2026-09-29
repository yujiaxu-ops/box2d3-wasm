// Hand-written bindings: what scripts/gen-bindings.mjs cannot derive from the headers. Callbacks (a JavaScript
// function crosses as an `emscripten::val`; a query holds it on the stack for its duration, a persistent callback in
// a table keyed by world, dropped with the world), arrays in and out (plain JavaScript arrays of value objects),
// strings, integer user data in place of raw pointers, the event lists, out-parameters, and a debug drawer
// implemented in JavaScript. The names match Box2D's; `*Int` and `getMemoryStats` are this binding's additions.
// bindings.config.mjs lists every one with its TypeScript signature.
//
// No JavaScript exception may unwind through a wasm frame (the shadow stack pointer would not be restored, and a
// Box2D step or query would be left half done), so every callback is invoked through `Module.__guard` (csrc/post.js),
// which keeps what the callback throws, hands Box2D the fallback and lets the call finish; the wrapper post.js puts
// around every exported function throws the kept error once the call returns. `fail` is how this file reports an
// error of its own. Conversions of the arguments happen before Box2D is entered, so a conversion error (embind's,
// on a malformed object) leaves nothing behind but the temporaries of the converter.
#include "glue.h"
#include <malloc.h>
#include <unordered_map>

using namespace emscripten;

namespace {

// ---- calling into JavaScript ----

/** Calls `fcn` with `self` as `this`; what it throws is kept for the wrapper and `fallback` is returned instead. */
template <typename... Args>
val call(const val& fcn, const val& self, val fallback, Args&&... args) {
    static val guard = val::module_property("__guard");
    return guard(fcn, self, std::move(fallback), std::forward<Args>(args)...);
}

/** Keeps an error of the binding's own for the wrapper to throw once the call returns. */
void fail(const char* message) {
    static val failer = val::module_property("__fail");
    failer(std::string(message));
}

// ---- query callbacks: the JavaScript function is the context; a throw ends the query ----

bool overlapResult(b2ShapeId shapeId, void* context) {
    return call(*static_cast<val*>(context), val::undefined(), val(false), shapeId).as<bool>();
}

float castResult(b2ShapeId shapeId, b2Vec2 point, b2Vec2 normal, float fraction, void* context) {
    return call(*static_cast<val*>(context), val::undefined(), val(0.0f), shapeId, point, normal, fraction).as<float>();
}

bool planeResult(b2ShapeId shapeId, const b2PlaneResult* result, void* context) {
    return call(*static_cast<val*>(context), val::undefined(), val(false), shapeId, *result).as<bool>();
}

// ---- the world table: persistent callbacks and whether the world is inside one of its callbacks ----

struct WorldSlot {
    val customFilter;
    val preSolve;
    /** How many of the world's callbacks are on the stack: b2DestroyWorld refuses while any is. */
    int busy = 0;
};

// Keyed by the id's index (unique among live worlds); the slot goes with b2DestroyWorld, so a recycled index starts
// clean. Node-based, so the addresses Box2D keeps as callback contexts stay valid.
std::unordered_map<uint16_t, WorldSlot> worlds;

WorldSlot& slot(b2WorldId worldId) { return worlds[worldId.index1]; }

struct Busy {
    WorldSlot& world;
    explicit Busy(b2WorldId worldId) : world(slot(worldId)) { world.busy++; }
    ~Busy() { world.busy--; }
};

bool customFilter(b2ShapeId shapeIdA, b2ShapeId shapeIdB, void* context) {
    return call(*static_cast<val*>(context), val::undefined(), val(true), shapeIdA, shapeIdB).as<bool>();
}

bool preSolve(b2ShapeId shapeIdA, b2ShapeId shapeIdB, b2Vec2 point, b2Vec2 normal, void* context) {
    return call(*static_cast<val*>(context), val::undefined(), val(true), shapeIdA, shapeIdB, point, normal).as<bool>();
}

/** Stores `fcn` in the world's slot and returns its address, or null when `fcn` is null or undefined. */
val* hold(val& held, val fcn) {
    if (fcn.isNull() || fcn.isUndefined()) {
        held = val::undefined();
        return nullptr;
    }
    held = std::move(fcn);
    return &held;
}

void b2World_SetCustomFilterCallback_JS(b2WorldId worldId, val fcn) {
    val* held = hold(slot(worldId).customFilter, std::move(fcn));
    b2World_SetCustomFilterCallback(worldId, held ? customFilter : nullptr, held);
}

void b2World_SetPreSolveCallback_JS(b2WorldId worldId, val fcn) {
    val* held = hold(slot(worldId).preSolve, std::move(fcn));
    b2World_SetPreSolveCallback(worldId, held ? preSolve : nullptr, held);
}

void b2World_Step_JS(b2WorldId worldId, float timeStep, int subStepCount) {
    Busy busy(worldId);
    b2World_Step(worldId, timeStep, subStepCount);
}

void b2DestroyWorld_JS(b2WorldId worldId) {
    auto found = worlds.find(worldId.index1);
    if (found != worlds.end()) {
        if (found->second.busy > 0) {
            fail("b2DestroyWorld: the world is inside one of its callbacks");
            return;
        }
        worlds.erase(found);
    }
    b2DestroyWorld(worldId);
}

// ---- queries ----

b2TreeStats b2World_OverlapAABB_JS(b2WorldId worldId, b2AABB aabb, val filter, val fcn) {
    b2QueryFilter filter_ = b2QueryFilterFromJS(filter);
    Busy busy(worldId);
    return b2World_OverlapAABB(worldId, aabb, filter_, overlapResult, &fcn);
}

b2TreeStats b2World_OverlapShape_JS(b2WorldId worldId, const b2ShapeProxy& proxy, val filter, val fcn) {
    b2QueryFilter filter_ = b2QueryFilterFromJS(filter);
    Busy busy(worldId);
    return b2World_OverlapShape(worldId, &proxy, filter_, overlapResult, &fcn);
}

b2TreeStats b2World_CastRay_JS(b2WorldId worldId, b2Vec2 origin, b2Vec2 translation, val filter, val fcn) {
    b2QueryFilter filter_ = b2QueryFilterFromJS(filter);
    Busy busy(worldId);
    return b2World_CastRay(worldId, origin, translation, filter_, castResult, &fcn);
}

b2TreeStats b2World_CastShape_JS(b2WorldId worldId, const b2ShapeProxy& proxy, b2Vec2 translation, val filter, val fcn) {
    b2QueryFilter filter_ = b2QueryFilterFromJS(filter);
    Busy busy(worldId);
    return b2World_CastShape(worldId, &proxy, translation, filter_, castResult, &fcn);
}

void b2World_CollideMover_JS(b2WorldId worldId, const b2Capsule& mover, val filter, val fcn) {
    b2QueryFilter filter_ = b2QueryFilterFromJS(filter);
    Busy busy(worldId);
    b2World_CollideMover(worldId, &mover, filter_, planeResult, &fcn);
}

// ---- arrays in ----

b2Hull b2ComputeHull_JS(val points) {
    std::vector<b2Vec2> items = valToVector<b2Vec2>(points);
    return b2ComputeHull(items.data(), static_cast<int>(items.size()));
}

b2ShapeProxy b2MakeProxy_JS(val points, float radius) {
    std::vector<b2Vec2> items = valToVector<b2Vec2>(points);
    return b2MakeProxy(items.data(), static_cast<int>(items.size()), radius);
}

b2ShapeProxy b2MakeOffsetProxy_JS(val points, float radius, b2Vec2 position, b2Rot rotation) {
    std::vector<b2Vec2> items = valToVector<b2Vec2>(points);
    return b2MakeOffsetProxy(items.data(), static_cast<int>(items.size()), radius, position, rotation);
}

b2AABB b2MakeAABB_JS(val points, float radius) {
    std::vector<b2Vec2> items = valToVector<b2Vec2>(points);
    return b2MakeAABB(items.data(), static_cast<int>(items.size()), radius);
}

/** The solver writes each plane's push back, so the planes come back with the result. */
val b2SolvePlanes_JS(b2Vec2 targetDelta, val planes) {
    std::vector<b2CollisionPlane> items = valToVector<b2CollisionPlane>(planes);
    b2PlaneSolverResult result = b2SolvePlanes(targetDelta, items.data(), static_cast<int>(items.size()));
    val out = val::object();
    out.set("translation", result.translation);
    out.set("iterationCount", result.iterationCount);
    out.set("planes", arrayToVal(items.data(), static_cast<int>(items.size())));
    return out;
}

b2Vec2 b2ClipVector_JS(b2Vec2 vector, val planes) {
    std::vector<b2CollisionPlane> items = valToVector<b2CollisionPlane>(planes);
    return b2ClipVector(vector, items.data(), static_cast<int>(items.size()));
}

/** A chain's points and materials come from the JavaScript def's arrays; Box2D copies both at creation. */
b2ChainId b2CreateChain_JS(b2BodyId bodyId, val def) {
    if (def["points"].isUndefined()) {
        fail("b2CreateChain: def.points is required");
        return b2_nullChainId;
    }
    b2ChainDef chainDef = b2ChainDefFromJS(def);
    std::vector<b2Vec2> points = valToVector<b2Vec2>(def["points"]);
    chainDef.points = points.data();
    chainDef.count = static_cast<int>(points.size());
    std::vector<b2SurfaceMaterial> materials;
    val given = def["materials"];
    if (!given.isUndefined()) {
        int count = given["length"].as<int>();
        materials.resize(count);
        for (int i = 0; i < count; i++) materials[i] = b2SurfaceMaterialFromJS(given[i]);
        chainDef.materials = materials.data();
        chainDef.materialCount = count;
    }
    return b2CreateChain(bodyId, &chainDef);
}

// ---- arrays out ----

val b2Body_GetShapes_JS(b2BodyId bodyId) {
    std::vector<b2ShapeId> items(b2Body_GetShapeCount(bodyId));
    int count = b2Body_GetShapes(bodyId, items.data(), static_cast<int>(items.size()));
    return arrayToVal(items.data(), count);
}

val b2Body_GetJoints_JS(b2BodyId bodyId) {
    std::vector<b2JointId> items(b2Body_GetJointCount(bodyId));
    int count = b2Body_GetJoints(bodyId, items.data(), static_cast<int>(items.size()));
    return arrayToVal(items.data(), count);
}

val b2Body_GetContactData_JS(b2BodyId bodyId) {
    std::vector<b2ContactData> items(b2Body_GetContactCapacity(bodyId));
    int count = b2Body_GetContactData(bodyId, items.data(), static_cast<int>(items.size()));
    return arrayToVal(items.data(), count);
}

val b2Shape_GetContactData_JS(b2ShapeId shapeId) {
    std::vector<b2ContactData> items(b2Shape_GetContactCapacity(shapeId));
    int count = b2Shape_GetContactData(shapeId, items.data(), static_cast<int>(items.size()));
    return arrayToVal(items.data(), count);
}

val b2Shape_GetSensorData_JS(b2ShapeId shapeId) {
    std::vector<b2ShapeId> items(b2Shape_GetSensorCapacity(shapeId));
    int count = b2Shape_GetSensorData(shapeId, items.data(), static_cast<int>(items.size()));
    return arrayToVal(items.data(), count);
}

val b2Chain_GetSegments_JS(b2ChainId chainId) {
    std::vector<b2ShapeId> items(b2Chain_GetSegmentCount(chainId));
    int count = b2Chain_GetSegments(chainId, items.data(), static_cast<int>(items.size()));
    return arrayToVal(items.data(), count);
}

// ---- distance and manifolds: the simplex cache is not exposed, every call starts cold ----

b2DistanceOutput b2ShapeDistance_JS(const b2DistanceInput& input) {
    b2SimplexCache cache = {};
    return b2ShapeDistance(&input, &cache, nullptr, 0);
}

b2Manifold b2CollideChainSegmentAndCapsule_JS(const b2ChainSegment& segmentA, b2Transform xfA, const b2Capsule& capsuleB, b2Transform xfB) {
    b2SimplexCache cache = {};
    return b2CollideChainSegmentAndCapsule(&segmentA, xfA, &capsuleB, xfB, &cache);
}

b2Manifold b2CollideChainSegmentAndPolygon_JS(const b2ChainSegment& segmentA, b2Transform xfA, const b2Polygon& polygonB, b2Transform xfB) {
    b2SimplexCache cache = {};
    return b2CollideChainSegmentAndPolygon(&segmentA, xfA, &polygonB, xfB, &cache);
}

// ---- out-parameters ----

val b2GetLengthAndNormalize_JS(b2Vec2 v) {
    float length = 0;
    b2Vec2 vector = b2GetLengthAndNormalize(&length, v);
    val out = val::object();
    out.set("length", length);
    out.set("vector", vector);
    return out;
}

val b2Joint_GetConstraintTuning_JS(b2JointId jointId) {
    float hertz = 0;
    float dampingRatio = 0;
    b2Joint_GetConstraintTuning(jointId, &hertz, &dampingRatio);
    val out = val::object();
    out.set("hertz", hertz);
    out.set("dampingRatio", dampingRatio);
    return out;
}

val b2DistanceJoint_GetSpringForceRange_JS(b2JointId jointId) {
    float lowerForce = 0;
    float upperForce = 0;
    b2DistanceJoint_GetSpringForceRange(jointId, &lowerForce, &upperForce);
    val out = val::object();
    out.set("lowerForce", lowerForce);
    out.set("upperForce", upperForce);
    return out;
}

// ---- events ----

val b2World_GetSensorEvents_JS(b2WorldId worldId) {
    b2SensorEvents events = b2World_GetSensorEvents(worldId);
    val out = val::object();
    out.set("beginEvents", arrayToVal(events.beginEvents, events.beginCount));
    out.set("endEvents", arrayToVal(events.endEvents, events.endCount));
    return out;
}

val b2World_GetContactEvents_JS(b2WorldId worldId) {
    b2ContactEvents events = b2World_GetContactEvents(worldId);
    val out = val::object();
    out.set("beginEvents", arrayToVal(events.beginEvents, events.beginCount));
    out.set("endEvents", arrayToVal(events.endEvents, events.endCount));
    out.set("hitEvents", arrayToVal(events.hitEvents, events.hitCount));
    return out;
}

val b2World_GetBodyEvents_JS(b2WorldId worldId) {
    b2BodyEvents events = b2World_GetBodyEvents(worldId);
    val out = val::object();
    out.set("moveEvents", arrayToVal(events.moveEvents, events.moveCount));
    return out;
}

val b2World_GetJointEvents_JS(b2WorldId worldId) {
    b2JointEvents events = b2World_GetJointEvents(worldId);
    val out = val::object();
    out.set("jointEvents", arrayToVal(events.jointEvents, events.count));
    return out;
}

// ---- strings and integer user data ----

void b2Body_SetName_JS(b2BodyId bodyId, std::string name) {
    b2Body_SetName(bodyId, name.c_str());
}

std::string b2Body_GetName_JS(b2BodyId bodyId) {
    const char* name = b2Body_GetName(bodyId);
    return name ? std::string(name) : std::string();
}

void b2World_SetUserDataInt(b2WorldId worldId, uint32_t value) { b2World_SetUserData(worldId, fromInt(value)); }
uint32_t b2World_GetUserDataInt(b2WorldId worldId) { return toInt(b2World_GetUserData(worldId)); }
void b2Body_SetUserDataInt(b2BodyId bodyId, uint32_t value) { b2Body_SetUserData(bodyId, fromInt(value)); }
uint32_t b2Body_GetUserDataInt(b2BodyId bodyId) { return toInt(b2Body_GetUserData(bodyId)); }
void b2Shape_SetUserDataInt(b2ShapeId shapeId, uint32_t value) { b2Shape_SetUserData(shapeId, fromInt(value)); }
uint32_t b2Shape_GetUserDataInt(b2ShapeId shapeId) { return toInt(b2Shape_GetUserData(shapeId)); }
void b2Joint_SetUserDataInt(b2JointId jointId, uint32_t value) { b2Joint_SetUserData(jointId, fromInt(value)); }
uint32_t b2Joint_GetUserDataInt(b2JointId jointId) { return toInt(b2Joint_GetUserData(jointId)); }

// ---- debug draw: the flags of b2DebugDraw and the Draw* methods of a JavaScript object, resolved once per draw ----

struct Drawer {
    val self;
    val polygon, solidPolygon, circle, solidCircle, solidCapsule, line, transform, point, string;
    Drawer(val js)
        : self(js), polygon(js["DrawPolygon"]), solidPolygon(js["DrawSolidPolygon"]), circle(js["DrawCircle"]),
          solidCircle(js["DrawSolidCircle"]), solidCapsule(js["DrawSolidCapsule"]), line(js["DrawLine"]),
          transform(js["DrawTransform"]), point(js["DrawPoint"]), string(js["DrawString"]) {}
};

const Drawer& drawer(void* context) { return *static_cast<const Drawer*>(context); }

template <typename... Args>
void draw(const Drawer& d, const val& method, Args&&... args) {
    if (!method.isUndefined()) call(method, d.self, val::undefined(), std::forward<Args>(args)...);
}

void drawPolygon(const b2Vec2* vertices, int vertexCount, b2HexColor color, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.polygon, arrayToVal(vertices, vertexCount), static_cast<int>(color));
}

void drawSolidPolygon(b2Transform transform, const b2Vec2* vertices, int vertexCount, float radius, b2HexColor color, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.solidPolygon, transform, arrayToVal(vertices, vertexCount), radius, static_cast<int>(color));
}

void drawCircle(b2Vec2 center, float radius, b2HexColor color, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.circle, center, radius, static_cast<int>(color));
}

void drawSolidCircle(b2Transform transform, float radius, b2HexColor color, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.solidCircle, transform, radius, static_cast<int>(color));
}

void drawSolidCapsule(b2Vec2 p1, b2Vec2 p2, float radius, b2HexColor color, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.solidCapsule, p1, p2, radius, static_cast<int>(color));
}

void drawLine(b2Vec2 p1, b2Vec2 p2, b2HexColor color, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.line, p1, p2, static_cast<int>(color));
}

void drawTransform(b2Transform transform, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.transform, transform);
}

void drawPoint(b2Vec2 p, float size, b2HexColor color, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.point, p, size, static_cast<int>(color));
}

void drawString(b2Vec2 p, const char* s, b2HexColor color, void* context) {
    const Drawer& d = drawer(context);
    draw(d, d.string, p, std::string(s ? s : ""), static_cast<int>(color));
}

void b2World_Draw_JS(b2WorldId worldId, val js) {
    b2DebugDraw debugDraw = b2DebugDrawFromJS(js);
    Drawer d(js);
    debugDraw.DrawPolygonFcn = drawPolygon;
    debugDraw.DrawSolidPolygonFcn = drawSolidPolygon;
    debugDraw.DrawCircleFcn = drawCircle;
    debugDraw.DrawSolidCircleFcn = drawSolidCircle;
    debugDraw.DrawSolidCapsuleFcn = drawSolidCapsule;
    debugDraw.DrawLineFcn = drawLine;
    debugDraw.DrawTransformFcn = drawTransform;
    debugDraw.DrawPointFcn = drawPoint;
    debugDraw.DrawStringFcn = drawString;
    debugDraw.context = &d;
    Busy busy(worldId);
    b2World_Draw(worldId, &debugDraw);
}

// ---- heap use ----

val getMemoryStats() {
    struct mallinfo info = mallinfo();
    val out = val::object();
    out.set("inUse", static_cast<double>(info.uordblks));
    out.set("free", static_cast<double>(info.fordblks));
    return out;
}

} // namespace

EMSCRIPTEN_BINDINGS(box2d_manual) {
    function("b2World_OverlapAABB", &b2World_OverlapAABB_JS);
    function("b2World_OverlapShape", &b2World_OverlapShape_JS);
    function("b2World_CastRay", &b2World_CastRay_JS);
    function("b2World_CastShape", &b2World_CastShape_JS);
    function("b2World_CollideMover", &b2World_CollideMover_JS);
    function("b2World_SetCustomFilterCallback", &b2World_SetCustomFilterCallback_JS);
    function("b2World_SetPreSolveCallback", &b2World_SetPreSolveCallback_JS);
    function("b2World_Step", &b2World_Step_JS);
    function("b2DestroyWorld", &b2DestroyWorld_JS);
    function("b2ComputeHull", &b2ComputeHull_JS);
    function("b2MakeProxy", &b2MakeProxy_JS);
    function("b2MakeOffsetProxy", &b2MakeOffsetProxy_JS);
    function("b2MakeAABB", &b2MakeAABB_JS);
    function("b2SolvePlanes", &b2SolvePlanes_JS);
    function("b2ClipVector", &b2ClipVector_JS);
    function("b2CreateChain", &b2CreateChain_JS);
    function("b2Body_GetShapes", &b2Body_GetShapes_JS);
    function("b2Body_GetJoints", &b2Body_GetJoints_JS);
    function("b2Body_GetContactData", &b2Body_GetContactData_JS);
    function("b2Shape_GetContactData", &b2Shape_GetContactData_JS);
    function("b2Shape_GetSensorData", &b2Shape_GetSensorData_JS);
    function("b2Chain_GetSegments", &b2Chain_GetSegments_JS);
    function("b2ShapeDistance", &b2ShapeDistance_JS);
    function("b2CollideChainSegmentAndCapsule", &b2CollideChainSegmentAndCapsule_JS);
    function("b2CollideChainSegmentAndPolygon", &b2CollideChainSegmentAndPolygon_JS);
    function("b2GetLengthAndNormalize", &b2GetLengthAndNormalize_JS);
    function("b2Joint_GetConstraintTuning", &b2Joint_GetConstraintTuning_JS);
    function("b2DistanceJoint_GetSpringForceRange", &b2DistanceJoint_GetSpringForceRange_JS);
    function("b2World_GetSensorEvents", &b2World_GetSensorEvents_JS);
    function("b2World_GetContactEvents", &b2World_GetContactEvents_JS);
    function("b2World_GetBodyEvents", &b2World_GetBodyEvents_JS);
    function("b2World_GetJointEvents", &b2World_GetJointEvents_JS);
    function("b2Body_SetName", &b2Body_SetName_JS);
    function("b2Body_GetName", &b2Body_GetName_JS);
    function("b2World_SetUserDataInt", &b2World_SetUserDataInt);
    function("b2World_GetUserDataInt", &b2World_GetUserDataInt);
    function("b2Body_SetUserDataInt", &b2Body_SetUserDataInt);
    function("b2Body_GetUserDataInt", &b2Body_GetUserDataInt);
    function("b2Shape_SetUserDataInt", &b2Shape_SetUserDataInt);
    function("b2Shape_GetUserDataInt", &b2Shape_GetUserDataInt);
    function("b2Joint_SetUserDataInt", &b2Joint_SetUserDataInt);
    function("b2Joint_GetUserDataInt", &b2Joint_GetUserDataInt);
    function("b2World_Draw", &b2World_Draw_JS);
    function("getMemoryStats", &getMemoryStats);
}
