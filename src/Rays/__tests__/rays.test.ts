import { Ray } from "../index"
import { Point, Vector } from "../../Tuples"

describe("Rays", () => {
    test("Creating/instantiating a ray", () => {
        const origin = new Point(1, 2, 3)
        const direction = new Vector(4, 5, 6)
        const r = new Ray(origin, direction)

        expect(r.origin.components()).toEqual(new Point(1, 2, 3).components())
        expect(r.direction.components()).toEqual(new Vector(4, 5, 6).components())
    })
})