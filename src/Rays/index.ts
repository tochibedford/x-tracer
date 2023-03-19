import { Sphere } from "../helpers";
import { Point, scalarMult, tupleSubtract, tupleSum, Vector } from "../Tuples";

class Ray {
    origin: Point
    direction: Vector

    constructor(origin: Point, direction: Vector) {
        this.origin = origin
        this.direction = direction
    }

    // calculates point at a given distance alng the ray
    position(distance: number) {
        return tupleSum(this.origin, scalarMult(this.direction, distance))
    }
}

// the returns a number of points where the ray intersects the sphere
function intersects(s: Sphere, r: Ray): number[] {
    const distanceFromSphereToRay = tupleSubtract(r.origin, s.position)
    const a = r.direction.dot(r.direction)
    const b = 2 * r.direction.dot(distanceFromSphereToRay)
    const c = distanceFromSphereToRay.dot(distanceFromSphereToRay) - 1
    const discriminant = b * b - 4 * a * c
    if (discriminant < 0) {
        return []
    } else {
        const int1 = (-b - Math.sqrt(discriminant)) / (2 * a)
        const int2 = (-b + Math.sqrt(discriminant)) / (2 * a)
        return [int1, int2]
    }
}

export {
    Ray,
    intersects
}