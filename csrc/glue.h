// Shared by the generated and the hand-written bindings: Box2D's headers, embind, and the conversions between
// JavaScript values and the C representations that embind does not cover.
#pragma once
#include <box2d/box2d.h>
#include <box2d/collision.h>
#include <box2d/math_functions.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <algorithm>
#include <cstdint>
#include <iterator>
#include <string>
#include <utility>
#include <vector>
#include "generated.h"

/**
 * 64-bit integers cross as doubles: exact up to 2^53. Beyond the range the value saturates (UINT64_MAX reads back as
 * 2^64 and goes in again as UINT64_MAX); a negative number converts as C converts a signed integer, so -1 is all
 * ones; NaN is 0.
 */
inline uint64_t toU64(double v) {
    if (v != v) return 0;
    if (v >= 18446744073709551615.0) return UINT64_MAX;
    if (v < 0) return static_cast<uint64_t>(static_cast<int64_t>(v <= -9223372036854775808.0 ? -9223372036854775808.0 : v));
    return static_cast<uint64_t>(v);
}

inline int64_t toI64(double v) {
    if (v != v) return 0;
    if (v >= 9223372036854775807.0) return INT64_MAX;
    if (v <= -9223372036854775808.0) return INT64_MIN;
    return static_cast<int64_t>(v);
}

/** Raw user-data pointers stand in for integers: the binding never dereferences them. */
inline void* fromInt(uint32_t value) { return reinterpret_cast<void*>(static_cast<uintptr_t>(value)); }
inline uint32_t toInt(const void* pointer) { return static_cast<uint32_t>(reinterpret_cast<uintptr_t>(pointer)); }

/** A JavaScript array of `count` items copied out of a C array. */
template <typename T>
emscripten::val arrayToVal(const T* items, int count) {
    emscripten::val array = emscripten::val::array();
    for (int i = 0; i < count; i++) array.set(i, items[i]);
    return array;
}

/** Copies a JavaScript array into a C array of `capacity` items: at most `capacity` are taken, the rest are zeroed. */
template <typename T>
void valToArray(emscripten::val array, T* items, int capacity) {
    int count = std::min(array["length"].as<int>(), capacity);
    for (int i = 0; i < count; i++) items[i] = array[i].as<T>();
    for (int i = count; i < capacity; i++) items[i] = T{};
}

/** A JavaScript array as a vector. */
template <typename T>
std::vector<T> valToVector(emscripten::val array) {
    int count = array["length"].as<int>();
    std::vector<T> items(count);
    for (int i = 0; i < count; i++) items[i] = array[i].as<T>();
    return items;
}
