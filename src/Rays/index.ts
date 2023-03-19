import { Point, Vector } from "../Tuples";

class Ray {
    origin: Point
    direction: Vector

    constructor(origin: Point, direction: Vector) {
        this.origin = origin
        this.direction = direction
    }
}

export {
    Ray
}