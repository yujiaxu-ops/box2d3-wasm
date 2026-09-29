// The binding's contract, from JavaScript: plain objects in and out, definitions as any subset of their fields,
// callbacks, arrays, events, the additions, exceptions that never cross wasm, worlds that outlive mistakes, and a
// run that is reproducible. Box2D's own behaviour is Box2D's business; these tests guard the crossing.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it, before } from 'node:test';
import createBox2D from '../build/dist/box2d.mjs';
import createDebugBox2D from '../build/dist-debug/box2d.mjs';

/** @type {import('../build/dist/box2d.d.mts').Box2D} */
let B;
before(async () => {
  B = await createBox2D();
});

const identity = { p: { x: 0, y: 0 }, q: { c: 1, s: 0 } };
const everything = () => B.b2DefaultQueryFilter();

/** A world with a 20 m wide static floor whose top is at y = 0. */
function floorWorld() {
  const worldId = B.b2CreateWorld({});
  const ground = B.b2CreateBody(worldId, { position: { x: 0, y: -1 } });
  B.b2CreatePolygonShape(ground, {}, B.b2MakeBox(10, 1));
  return { worldId, ground };
}

function ball(worldId, x, y, radius = 0.5, shapeDef = {}) {
  const bodyId = B.b2CreateBody(worldId, { type: B.b2BodyType.b2_dynamicBody, position: { x, y } });
  const shapeId = B.b2CreateCircleShape(bodyId, shapeDef, { center: { x: 0, y: 0 }, radius });
  return { bodyId, shapeId };
}

/** The heap growth (bytes) over `round`, run `times` times. */
function heapGrowth(times, round) {
  const before = B.getMemoryStats().inUse;
  for (let i = 0; i < times; i++) round(i);
  return B.getMemoryStats().inUse - before;
}

describe('definitions and values are plain objects', () => {
  it('a definition is any subset of its fields; what is left out keeps the C default; the defaults come out whole', () => {
    const worldDef = B.b2DefaultWorldDef();
    assert.deepEqual(worldDef.gravity, { x: 0, y: -10 });
    assert.equal('internalValue' in worldDef, false);
    const worldId = B.b2CreateWorld({ gravity: { x: 0, y: -1 } });
    assert.deepEqual(B.b2World_GetGravity(worldId), { x: 0, y: -1 });
    const bodyDef = B.b2DefaultBodyDef();
    bodyDef.type = B.b2BodyType.b2_dynamicBody;
    bodyDef.name = 'crate';
    bodyDef.position = { x: 1, y: 2 };
    const bodyId = B.b2CreateBody(worldId, bodyDef);
    assert.equal(B.b2Body_GetType(bodyId), B.b2BodyType.b2_dynamicBody);
    assert.equal(B.b2Body_GetName(bodyId), 'crate');
    assert.deepEqual(B.b2Body_GetPosition(bodyId), { x: 1, y: 2 });
    assert.equal(bodyDef.position.x, 1, 'the JavaScript object is not touched');
    const shapeId = B.b2CreatePolygonShape(bodyId, { material: { friction: 0.25 }, filter: { categoryBits: 4 } }, B.b2MakeBox(1, 1)); // nested definitions, partial too
    assert.ok(Math.abs(B.b2Shape_GetFriction(shapeId) - 0.25) < 1e-6);
    assert.equal(B.b2Shape_GetFilter(shapeId).categoryBits, 4);
    assert.equal(B.b2Shape_GetFilter(shapeId).maskBits, 2 ** 64, 'the rest of the filter is the default');
    assert.equal(B.b2Shape_GetRestitution(shapeId), B.b2DefaultSurfaceMaterial().restitution);
    B.b2DestroyWorld(worldId);
  });

  it('a joint definition nests its base, partial as well', () => {
    const { worldId } = floorWorld();
    const a = ball(worldId, 0, 2).bodyId;
    const b = ball(worldId, 1, 2).bodyId;
    const jointId = B.b2CreateRevoluteJoint(worldId, { base: { bodyIdA: a, bodyIdB: b, localFrameB: { p: { x: -1, y: 0 }, q: { c: 1, s: 0 } } }, enableLimit: true, lowerAngle: -0.5, upperAngle: 0.5 });
    assert.equal(B.b2Joint_GetType(jointId), B.b2JointType.b2_revoluteJoint);
    assert.equal(B.b2RevoluteJoint_IsLimitEnabled(jointId), true);
    assert.deepEqual(B.b2Joint_GetLocalFrameB(jointId), { p: { x: -1, y: 0 }, q: { c: 1, s: 0 } });
    assert.equal(B.b2Body_GetJoints(a).length, 1);
    assert.equal(typeof B.b2Joint_GetConstraintTuning(jointId).hertz, 'number');
    B.b2World_Step(worldId, 1 / 60, 4);
    assert.ok(Array.isArray(B.b2World_GetJointEvents(worldId).jointEvents));
    B.b2DestroyWorld(worldId);
  });

  it('polygons carry their vertices and normals as arrays of the live count, and a count never exceeds the capacity', () => {
    const box = B.b2MakeBox(1, 2);
    assert.equal(box.count, 4);
    assert.equal(box.vertices.length, 4);
    assert.equal(box.normals.length, 4);
    assert.deepEqual(box.vertices[0], { x: -1, y: -2 });
    const hull = B.b2ComputeHull([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }]);
    assert.equal(hull.count, 3);
    const polygon = B.b2MakePolygon(hull, 0);
    assert.equal(polygon.vertices.length, 3);
    const moved = B.b2TransformPolygon({ p: { x: 5, y: 0 }, q: { c: 1, s: 0 } }, polygon); // a polygon goes in by value too
    assert.equal(moved.vertices[1].x, 6);
    box.count = 12; // a lie about the array's length
    assert.equal(B.b2TransformPolygon(identity, box).count, 8, 'clamped to B2_MAX_POLYGON_VERTICES');
  });

  it('64-bit integers are numbers: a full mask survives the round trip, -1 is all ones, and no BigInt comes out', () => {
    const { worldId } = floorWorld();
    const { shapeId } = ball(worldId, 0, 5);
    const filter = B.b2Shape_GetFilter(shapeId);
    assert.equal(filter.categoryBits, 1);
    assert.equal(filter.maskBits, 2 ** 64); // UINT64_MAX as a double
    B.b2Shape_SetFilter(shapeId, { ...filter, categoryBits: 2 ** 40 });
    assert.equal(B.b2Shape_GetFilter(shapeId).categoryBits, 2 ** 40);
    assert.equal(B.b2Shape_GetFilter(shapeId).maskBits, 2 ** 64); // saturated, not trapped
    B.b2Shape_SetFilter(shapeId, { maskBits: -1 });
    assert.equal(B.b2Shape_GetFilter(shapeId).maskBits, 2 ** 64, 'as C converts -1');
    B.b2Shape_SetUserMaterial(shapeId, 5);
    assert.equal(B.b2Shape_GetUserMaterial(shapeId), 5);
    assert.equal(typeof B.b2Shape_GetUserMaterial(shapeId), 'number');
    assert.deepEqual(B.b2LoadBodyId(B.b2StoreBodyId(B.b2Shape_GetBody(shapeId))), B.b2Shape_GetBody(shapeId));
    B.b2DestroyWorld(worldId);
  });

  it('out-parameters and cold-cache functions return plain results', () => {
    const normalized = B.b2GetLengthAndNormalize({ x: 3, y: 4 });
    assert.equal(normalized.length, 5);
    assert.ok(Math.abs(normalized.vector.x - 0.6) < 1e-6);
    const output = B.b2ShapeDistance({ proxyA: B.b2MakeProxy([{ x: 0, y: 0 }], 0.5), proxyB: B.b2MakeProxy([{ x: 3, y: 0 }], 0.5), transformA: identity, transformB: identity, useRadii: true });
    assert.ok(Math.abs(output.distance - 2) < 1e-6);
    assert.equal(typeof B.b2Body_ClearForces, 'function');
  });
});

describe('callbacks and arrays', () => {
  it('queries call a JavaScript function with plain objects and stop when it says so', () => {
    const { worldId } = floorWorld();
    const { shapeId } = ball(worldId, 0, 3);
    const seen = [];
    const stats = B.b2World_OverlapAABB(worldId, { lowerBound: { x: -1, y: 2 }, upperBound: { x: 1, y: 4 } }, {}, (id) => {
      seen.push(id);
      return true;
    });
    assert.deepEqual(seen, [shapeId]);
    assert.ok(stats.nodeVisits > 0);
    const fractions = [];
    B.b2World_CastRay(worldId, { x: 0, y: 10 }, { x: 0, y: -20 }, everything(), (id, point, normal, fraction) => {
      fractions.push(fraction);
      assert.equal(typeof point.x, 'number');
      assert.deepEqual(normal, { x: 0, y: 1 });
      return fraction; // clip: nothing farther than this hit is reported afterwards
    });
    assert.ok(fractions.length >= 1 && fractions.length <= 2, 'the ball, and the floor only if the tree visited it first');
    assert.ok(fractions.every((f, i) => f > 0 && f < 1 && (i === 0 || f < fractions[i - 1])));
    const closest = B.b2World_CastRayClosest(worldId, { x: 0, y: 10 }, { x: 0, y: -20 }, everything());
    assert.equal(closest.hit, true);
    assert.deepEqual(closest.shapeId, shapeId);
    assert.equal(closest.fraction, fractions.at(-1));
    B.b2DestroyWorld(worldId);
  });

  it('the mover collides into planes with the contact point, and the plane solver returns the pushed planes', () => {
    const { worldId } = floorWorld();
    const planes = [];
    B.b2World_CollideMover(worldId, { center1: { x: 0, y: 0.3 }, center2: { x: 0, y: 1 }, radius: 0.4 }, {}, (shapeId, result) => {
      assert.equal(result.hit, true);
      assert.deepEqual(result.plane.normal, { x: 0, y: 1 }); // world space
      assert.deepEqual(result.point, { x: 0, y: 1 }); // the shape's local frame: the top of the 1 m half-height floor box, as Box2D returns it
      planes.push({ plane: result.plane, pushLimit: Number.MAX_VALUE, push: 0, clipVelocity: true });
      return true;
    });
    assert.equal(planes.length, 1);
    const solved = B.b2SolvePlanes({ x: 0, y: -0.5 }, planes);
    assert.ok(solved.translation.y > -0.5, 'the floor holds the mover up');
    assert.equal(solved.planes.length, 1);
    assert.ok(solved.planes[0].push > 0, 'the pushed plane comes back');
    assert.deepEqual(B.b2ClipVector({ x: 1, y: -1 }, planes), { x: 1, y: -1 }, 'unpushed planes do not clip: the input array is never mutated');
    assert.deepEqual(B.b2ClipVector({ x: 1, y: -1 }, solved.planes), { x: 1, y: 0 });
    const fraction = B.b2World_CastMover(worldId, { center1: { x: 0, y: 1 }, center2: { x: 0, y: 2 }, radius: 0.4 }, { x: 0, y: -5 }, {});
    assert.ok(fraction > 0 && fraction < 1);
    B.b2DestroyWorld(worldId);
  });

  it('a chain takes its points and materials from arrays and reports its segments', () => {
    const { worldId, ground } = floorWorld();
    const chainDef = B.b2DefaultChainDef();
    assert.deepEqual(chainDef.points, []);
    assert.equal(chainDef.materials.length, 1, 'the C default points at one default material');
    assert.equal(chainDef.materials[0].friction, B.b2DefaultSurfaceMaterial().friction);
    assert.throws(() => B.b2CreateChain(ground, {}), /points/);
    const chainId = B.b2CreateChain(ground, { points: [{ x: -5, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 6 }, { x: -5, y: 6 }], isLoop: true, materials: [{ friction: 0.2 }] });
    const segments = B.b2Chain_GetSegments(chainId);
    assert.equal(segments.length, 4);
    assert.equal(B.b2Chain_GetSegmentCount(chainId), 4);
    assert.equal(B.b2Shape_GetType(segments[0]), B.b2ShapeType.b2_chainSegmentShape);
    assert.ok(Math.abs(B.b2Shape_GetFriction(segments[0]) - 0.2) < 1e-6, 'the material reached the segments');
    assert.equal(typeof B.b2Shape_GetChainSegment(segments[0]).chainId, 'number');
    assert.equal(B.b2Body_GetShapes(ground).length, 5);
    B.b2DestroyWorld(worldId);
  });

  it('contact data and the collide functions return manifolds with their live points', () => {
    const { worldId } = floorWorld();
    const { bodyId } = ball(worldId, 0, 0.4);
    B.b2World_Step(worldId, 1 / 60, 4);
    const contacts = B.b2Body_GetContactData(bodyId);
    assert.equal(contacts.length, 1);
    assert.equal(contacts[0].manifold.pointCount, 1);
    assert.equal(contacts[0].manifold.points.length, 1);
    assert.equal(typeof contacts[0].manifold.points[0].point.y, 'number');
    const manifold = B.b2CollidePolygonAndCircle(B.b2MakeBox(1, 1), identity, { center: { x: 0, y: 0 }, radius: 0.5 }, { p: { x: 0, y: 1.2 }, q: { c: 1, s: 0 } });
    assert.equal(manifold.pointCount, 1);
    assert.deepEqual(manifold.normal, { x: 0, y: 1 });
    // A chain segment is one-sided and solid on its right: running from +x to -x, its solid side faces up.
    const chain = B.b2CollideChainSegmentAndCapsule({ ghost1: { x: 2, y: 0 }, segment: { point1: { x: 1, y: 0 }, point2: { x: -1, y: 0 } }, ghost2: { x: -2, y: 0 }, chainId: 0 }, identity, { center1: { x: 0, y: 0.3 }, center2: { x: 0, y: 1 }, radius: 0.4 }, identity);
    assert.ok(chain.pointCount >= 1);
    assert.equal(chain.points.length, chain.pointCount);
    B.b2DestroyWorld(worldId);
  });

  it('a persistent callback is kept for the world until it is replaced, cleared or the world is destroyed', () => {
    const { worldId } = floorWorld();
    const { shapeId } = ball(worldId, 0, 0.4);
    B.b2Shape_EnablePreSolveEvents(shapeId, true);
    let first = 0;
    let second = 0;
    B.b2World_SetPreSolveCallback(worldId, (a, b, point, normal) => {
      first++;
      assert.equal(typeof point.x, 'number');
      assert.equal(typeof normal.y, 'number');
      return true;
    });
    B.b2World_Step(worldId, 1 / 60, 4);
    assert.ok(first > 0);
    B.b2World_SetPreSolveCallback(worldId, () => {
      second++;
      return true;
    });
    const firstBefore = first;
    B.b2World_Step(worldId, 1 / 60, 4);
    assert.ok(second > 0);
    assert.equal(first, firstBefore, 'the replaced callback is not called');
    B.b2World_SetPreSolveCallback(worldId, null);
    const secondBefore = second;
    B.b2World_Step(worldId, 1 / 60, 4);
    assert.equal(second, secondBefore, 'the cleared callback is not called');
    B.b2DestroyWorld(worldId);
  });

  it('a destroyed world takes its callbacks with it: a world that recycles its id starts clean', () => {
    let calls = 0;
    const scene = () => {
      const { worldId } = floorWorld();
      const { shapeId } = ball(worldId, 0, 0.4);
      B.b2Shape_EnablePreSolveEvents(shapeId, true);
      return worldId;
    };
    const first = scene();
    B.b2World_SetPreSolveCallback(first, () => {
      calls++;
      return true;
    });
    B.b2World_Step(first, 1 / 60, 4);
    assert.ok(calls > 0);
    B.b2DestroyWorld(first);
    const second = scene();
    assert.equal(second.index1, first.index1, 'Box2D hands the slot out again');
    const before = calls;
    B.b2World_Step(second, 1 / 60, 4);
    assert.equal(calls, before, 'no stale callback');
    B.b2DestroyWorld(second);
  });

  it('events come back as arrays of plain objects, with the integer user data', () => {
    const { worldId } = floorWorld();
    const sensorBody = B.b2CreateBody(worldId, { position: { x: 0, y: 1 } });
    const sensorShape = B.b2CreatePolygonShape(sensorBody, { isSensor: true, enableSensorEvents: true }, B.b2MakeBox(1, 1));
    const { bodyId, shapeId } = ball(worldId, 0, 1.2, 0.5, { enableSensorEvents: true });
    B.b2Body_SetUserDataInt(bodyId, 77);
    B.b2World_Step(worldId, 1 / 60, 4);
    const events = B.b2World_GetSensorEvents(worldId);
    assert.equal(events.beginEvents.length, 1);
    assert.deepEqual(events.beginEvents[0].sensorShapeId, sensorShape);
    assert.deepEqual(events.beginEvents[0].visitorShapeId, shapeId);
    assert.equal(events.endEvents.length, 0);
    assert.deepEqual(B.b2Shape_GetSensorData(sensorShape), [shapeId]);
    const bodyEvents = B.b2World_GetBodyEvents(worldId);
    assert.equal(bodyEvents.moveEvents.length, 1);
    assert.equal(bodyEvents.moveEvents[0].userData, 77);
    B.b2DestroyWorld(worldId);
  });

  it('integer user data stands in for the raw pointers', () => {
    const { worldId, ground } = floorWorld();
    B.b2Body_SetUserDataInt(ground, 4242);
    assert.equal(B.b2Body_GetUserDataInt(ground), 4242);
    const shape = B.b2Body_GetShapes(ground)[0];
    B.b2Shape_SetUserDataInt(shape, 7);
    assert.equal(B.b2Shape_GetUserDataInt(shape), 7);
    assert.equal(B.b2Body_GetUserDataInt(B.b2CreateBody(worldId, {})), 0);
    B.b2DestroyWorld(worldId);
  });

  it('the debug drawer takes the flags of b2DebugDraw and Draw* methods, and receives plain values', () => {
    const defaults = B.b2DefaultDebugDraw();
    assert.equal(typeof defaults.forceScale, 'number');
    assert.equal(typeof defaults.jointScale, 'number');
    assert.equal('DrawPolygonFcn' in defaults, false);
    const { worldId } = floorWorld();
    ball(worldId, 0, 3);
    const calls = { polygons: 0, circles: 0 };
    const drawer = {
      drawShapes: true,
      DrawSolidPolygon(transform, vertices, radius, color) {
        calls.polygons++;
        assert.equal(this, drawer, 'called as a method of the drawer');
        assert.equal(vertices.length, 4);
        assert.equal(typeof transform.q.c, 'number');
        assert.equal(typeof color, 'number');
        void radius;
      },
      DrawSolidCircle(transform, radius, color) {
        calls.circles++;
        assert.ok(Math.abs(radius - 0.5) < 1e-6);
        void transform;
        void color;
      },
    };
    B.b2World_Draw(worldId, drawer);
    assert.deepEqual(calls, { polygons: 1, circles: 1 });
    B.b2DestroyWorld(worldId);
  });
});

describe('exceptions never cross wasm', () => {
  it('a throwing query callback ends the query, the error surfaces from the query, and the module lives on', () => {
    const { worldId } = floorWorld();
    ball(worldId, 0, 3);
    const aabb = { lowerBound: { x: -20, y: -20 }, upperBound: { x: 20, y: 20 } };
    const grown = heapGrowth(10_000, () => {
      assert.throws(() => B.b2World_OverlapAABB(worldId, aabb, {}, () => { throw new Error('boom'); }), /boom/);
    });
    assert.ok(grown < 64 * 1024, `heap grew by ${grown} bytes`);
    let seen = 0;
    B.b2World_OverlapAABB(worldId, aabb, {}, () => { seen++; return true; });
    assert.equal(seen, 2, 'the query still works afterwards');
    B.b2DestroyWorld(worldId);
  });

  it('a throwing pre-solve callback lets the step finish, then the step throws; the world keeps stepping', () => {
    const { worldId } = floorWorld();
    const { bodyId, shapeId } = ball(worldId, 0, 0.4);
    B.b2Shape_EnablePreSolveEvents(shapeId, true);
    B.b2Body_EnableSleep(bodyId, false); // resting on the floor and awake: the contact is there every step
    B.b2World_SetPreSolveCallback(worldId, () => { throw new Error('boom'); });
    for (let i = 0; i < 1000; i++) assert.throws(() => B.b2World_Step(worldId, 1 / 60, 4), /boom/);
    B.b2World_SetPreSolveCallback(worldId, null);
    B.b2Body_SetLinearVelocity(bodyId, { x: 5, y: 0 });
    B.b2World_Step(worldId, 1 / 60, 4);
    assert.ok(B.b2Body_GetPosition(bodyId).x > 0, 'the world is not left locked');
    assert.notEqual(B.b2CreateBody(worldId, {}).index1, 0, 'bodies can still be made');
    B.b2DestroyWorld(worldId);
  });

  it('a malformed definition throws a TypeError before Box2D is entered, as often as you like', () => {
    const { worldId } = floorWorld();
    const grown = heapGrowth(1000, () => {
      assert.throws(() => B.b2CreateBody(worldId, { position: { x: 1 } }), TypeError);
    });
    assert.ok(grown < 64 * 1024, `heap grew by ${grown} bytes`);
    assert.deepEqual(B.b2Body_GetPosition(B.b2CreateBody(worldId, { position: { x: 1, y: 2 } })), { x: 1, y: 2 });
    B.b2DestroyWorld(worldId);
  });

  it('a throwing drawer ends the draw and the error surfaces', () => {
    const { worldId } = floorWorld();
    for (let i = 0; i < 1000; i++) assert.throws(() => B.b2World_Draw(worldId, { drawShapes: true, DrawSolidPolygon() { throw new Error('boom'); } }), /boom/);
    B.b2DestroyWorld(worldId);
  });

  it('destroying a world from inside its own callback is refused, and reported once the call returns', () => {
    const { worldId } = floorWorld();
    const aabb = { lowerBound: { x: -20, y: -20 }, upperBound: { x: 20, y: 20 } };
    assert.throws(() => B.b2World_OverlapAABB(worldId, aabb, {}, () => {
      B.b2DestroyWorld(worldId);
      return true;
    }), /inside one of its callbacks/);
    B.b2World_Step(worldId, 1 / 60, 4); // still a world
    B.b2DestroyWorld(worldId);
  });
});

describe('the declarations and the module agree', () => {
  it('every function and enum the declarations name is on the module, and nothing on the module is undeclared', () => {
    const text = readFileSync(new URL('../build/dist/box2d.d.mts', import.meta.url), 'utf8');
    const module = text.slice(text.indexOf('export interface Box2D {'));
    const declared = [...module.matchAll(/^  (?:readonly )?(\w+)[(:]/gm)].map((m) => m[1]).sort();
    const present = Object.keys(B).filter((name) => name.startsWith('b2') || name === 'getMemoryStats').sort();
    assert.deepEqual(present, declared);
    assert.ok(declared.length > 450);
  });
});

describe('memory and reproducibility', () => {
  it('nothing crosses that has to be freed: the heap returns to where it was after worlds come and go', () => {
    const grown = heapGrowth(20, () => {
      const { worldId } = floorWorld();
      B.b2World_SetPreSolveCallback(worldId, () => true);
      B.b2World_SetCustomFilterCallback(worldId, () => true);
      for (let i = 0; i < 50; i++) ball(worldId, (i % 10) - 5, 1 + i * 0.1);
      for (let step = 0; step < 10; step++) {
        B.b2World_Step(worldId, 1 / 60, 4);
        B.b2World_GetContactEvents(worldId);
        B.b2World_CastRay(worldId, { x: 0, y: 10 }, { x: 0, y: -20 }, {}, () => 1);
      }
      B.b2DestroyWorld(worldId);
    });
    assert.ok(grown < 64 * 1024, `heap grew by ${grown} bytes`);
  });

  it('two identical runs give identical state', () => {
    const run = () => {
      const { worldId } = floorWorld();
      const bodies = [];
      for (let i = 0; i < 30; i++) bodies.push(ball(worldId, ((i * 7) % 11) - 5, 1 + i * 0.3).bodyId);
      B.b2World_Explode(worldId, { position: { x: 0, y: 1 }, radius: 3, impulsePerLength: 2 });
      for (let step = 0; step < 240; step++) B.b2World_Step(worldId, 1 / 60, 4);
      const state = bodies.map((id) => [B.b2Body_GetPosition(id), B.b2Body_GetRotation(id)]);
      B.b2DestroyWorld(worldId);
      return JSON.stringify(state);
    };
    assert.equal(run(), run());
  });

  it('reports Box2D\'s version, and the debug variant loads and steps', async () => {
    assert.equal(B.b2GetVersion().major, 3);
    const D = await createDebugBox2D();
    const worldId = D.b2CreateWorld({});
    const bodyId = D.b2CreateBody(worldId, { type: D.b2BodyType.b2_dynamicBody, position: { x: 0, y: 2 } });
    D.b2CreateCircleShape(bodyId, {}, { center: { x: 0, y: 0 }, radius: 0.5 });
    D.b2World_Step(worldId, 1 / 60, 4);
    assert.ok(D.b2Body_GetPosition(bodyId).y < 2);
    assert.throws(() => D.b2World_OverlapAABB(worldId, { lowerBound: { x: -1, y: -1 }, upperBound: { x: 1, y: 3 } }, {}, () => { throw new Error('boom'); }), /boom/);
    D.b2DestroyWorld(worldId);
  });
});
