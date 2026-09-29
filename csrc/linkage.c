// At the pinned commit Box2D declares b2Body_ClearForces without B2_API (box2d.h), so in a C++ file it has C++
// linkage and does not link against the library. This C file reaches it with C linkage; glue.cpp binds the wrapper
// under Box2D's name.
#include <box2d/box2d.h>

void b2Body_ClearForces_C(b2BodyId bodyId) {
    b2Body_ClearForces(bodyId);
}
