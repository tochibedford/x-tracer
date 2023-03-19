import { Intersection, intersections, intersect, Ray } from "../index"
import { Point, Vector } from "../../Tuples"
import { Sphere } from "../../helpers"

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

    test("A ray intersects a sphere at two points", () => {
        const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
        const s = new Sphere()
        const intersections = intersect(s, r)

        expect(intersections[0].t).toBe(4.0)
        expect(intersections[1].t).toBe(6.0)
    })

    test("A ray intersects a sphere at a tangent", () => {
        const r = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1))
        const s = new Sphere()
        const intersections = intersect(s, r)

        expect(intersections[0].t).toBe(5.0)
        expect(intersections[1].t).toBe(5.0)
    })

    test("A ray misses a sphere", () => {
        const r = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1))
        const s = new Sphere()
        const intersections = intersect(s, r)

        expect(intersections).toEqual([])
    })

    test("A ray originates inside a sphere", () => {
        const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
        const s = new Sphere()
        const intersections = intersect(s, r)

        expect(intersections[0].t).toBe(-1.0)
        expect(intersections[1].t).toBe(1.0)
    })

    test("A sphere is behind a ray", () => {
        const r = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
        const s = new Sphere()
        const intersections = intersect(s, r)

        expect(intersections[0].t).toBe(-6.0)
        expect(intersections[1].t).toBe(-4.0)
    })
})

describe("Intersections", () => {
    test("An intersection contains a t value and and object", () => {
        const s = new Sphere()
        const i = new Intersection(3.5, s)
        expect(i.t).toBe(3.5)
        expect(i.object).toBe(s)
    })

    test("Aggregating intersections", () => {
        const s = new Sphere()
        const i1 = new Intersection(1, s)
        const i2 = new Intersection(2, s)
        const xs = intersections(i1, i2)

        expect(xs.length).toBe(2)
        expect(xs[0].t).toBe(1)
        expect(xs[1].t).toBe(2)
    })

    test("Intersect sets the object on the intersection", () => {
        const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
        const s = new Sphere()
        const xs = intersect(s, r)

        expect(xs.length).toBe(2)
        expect(xs[0].object).toBe(s)
        expect(xs[1].object).toBe(s)
    })
})