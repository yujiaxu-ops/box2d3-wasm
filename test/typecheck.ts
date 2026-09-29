// Compiled, never run: the declarations must let a game write ordinary Box2D code with plain objects, and must
// reject the mistakes the old class-based binding invited.
import createBox2D, { type b2BodyDef, type b2BodyDefInput, type b2Vec2, type Box2D } from '../build/dist/box2d.mjs';

const B: Box2D = await createBox2D();

const worldId = B.b2CreateWorld({ gravity: { x: 0, y: -9.81 } });
const def: b2BodyDef = B.b2DefaultBodyDef();
def.type = B.b2BodyType.b2_dynamicBody;
def.position = { x: 1, y: 2 };
def.name = 'hero';
const bodyId = B.b2CreateBody(worldId, def);
const partial: b2BodyDefInput = { position: { x: 1, y: 2 } };
const other = B.b2CreateBody(worldId, partial);
const position: b2Vec2 = B.b2Body_GetPosition(bodyId);
const sum: number = position.x + position.y;
const box = B.b2MakeBox(1, 1);
const first: b2Vec2 = box.vertices[0];
const shapeId = B.b2CreatePolygonShape(bodyId, { material: { friction: 0.3 }, filter: { categoryBits: 2 } }, box);
const filter = B.b2Shape_GetFilter(shapeId);
const mask: number = filter.maskBits;
const material: number = B.b2Shape_GetUserMaterial(shapeId);
const chainDef = B.b2DefaultChainDef();
const friction: number = chainDef.materials[0].friction;
const chainId = B.b2CreateChain(bodyId, { points: [{ x: 0, y: 0 }, { x: 1, y: 0 }], materials: [{ friction: 0.5 }] });
const segments = B.b2Chain_GetSegments(chainId);
const type = B.b2Shape_GetType(segments[0]);
const isChain: boolean = type === B.b2ShapeType.b2_chainSegmentShape;
const jointId = B.b2CreateRevoluteJoint(worldId, { base: { bodyIdA: bodyId, bodyIdB: other }, enableLimit: true });
const revolute: boolean = B.b2Joint_GetType(jointId) === B.b2JointType.b2_revoluteJoint;
B.b2World_SetPreSolveCallback(worldId, (a, b, point, normal) => point.y > normal.y && a.index1 !== b.index1);
B.b2World_SetPreSolveCallback(worldId, null);
B.b2World_CollideMover(worldId, { center1: { x: 0, y: 0 }, center2: { x: 0, y: 1 }, radius: 0.5 }, {}, (id, result) => result.point.x > 0 && result.hit);
const solved = B.b2SolvePlanes({ x: 0, y: 0 }, []);
const pushed: number = solved.planes.length + solved.iterationCount;
const events = B.b2World_GetContactEvents(worldId);
const hits: number = events.hitEvents.length;
const moved: number = B.b2World_GetBodyEvents(worldId).moveEvents[0]?.userData ?? 0;
const contacts = B.b2Body_GetContactData(bodyId);
const normalY: number = contacts.length ? contacts[0].manifold.points[0].point.y : 0;
B.b2World_Draw(worldId, { drawShapes: true, forceScale: 2, DrawCircle: (center, radius, color) => void (center.x + radius + color) });
B.b2World_Explode(worldId, { position: { x: 0, y: 0 }, radius: 2 });
const distance: number = B.b2ShapeDistance({ proxyA: B.b2MakeProxy([{ x: 0, y: 0 }], 0.5), proxyB: B.b2MakeProxy([{ x: 3, y: 0 }], 0), transformA: { p: { x: 0, y: 0 }, q: { c: 1, s: 0 } }, transformB: { p: { x: 0, y: 0 }, q: { c: 1, s: 0 } }, useRadii: true }).distance;
const stored: number = B.b2StoreBodyId(bodyId);
const memory: number = B.getMemoryStats().inUse;
const destroyed: void = B.b2DestroyWorld(worldId);
void [sum, first, mask, material, friction, isChain, revolute, pushed, hits, moved, normalY, distance, stored, memory, destroyed];

// @ts-expect-error a def is a plain object: there is nothing to delete
def.delete();
// @ts-expect-error a vector is a plain object with x and y
B.b2Body_SetLinearVelocity(bodyId, { x: 1 });
// @ts-expect-error a vector inside a definition is whole too
B.b2CreateBody(worldId, { position: { x: 1 } });
// @ts-expect-error a chain needs its points
B.b2CreateChain(bodyId, { isLoop: true });
// @ts-expect-error masks are numbers
B.b2Shape_SetFilter(shapeId, { ...filter, maskBits: 1n });
// @ts-expect-error the callback must return a boolean
B.b2World_OverlapAABB(worldId, { lowerBound: { x: 0, y: 0 }, upperBound: { x: 1, y: 1 } }, {}, () => 1);
// @ts-expect-error the stack helpers are not part of the module
B.stackSave();
