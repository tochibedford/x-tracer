import { Point, scalarMult, tupleSum, Vector } from "../Tuples";

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

export {
    Ray
}