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

    test("Computing a point at a distance along the ray", () => {
        const r = new Ray(new Point(2, 3, 4), new Vector(1, 0, 0))

        expect(r.position(0).components()).toEqual(new Point(2, 3, 4).components())
        expect(r.position(1).components()).toEqual(new Point(3, 3, 4).components())
        expect(r.position(-1).components()).toEqual(new Point(1, 3, 4).components())
        expect(r.position(2.5).components()).toEqual(new Point(4.5, 3, 4).components())
    })
})