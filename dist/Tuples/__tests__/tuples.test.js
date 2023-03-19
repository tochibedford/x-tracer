import { Point, tupleSum, tupleSubtract, tuple, Vector, negateTuple, scalarMult, scalarDiv, magnitude, normalize } from '../index';
describe("Creating Vectors and points from Tuples", () => {
    let pointFromTuple = tuple(4.3, -4.2, 3.1, 1);
    let vectorFromTuple = tuple(4.3, -4.2, 3.1, 0);
    test('A tuple is a Point when w is 1', () => {
        expect(pointFromTuple.x).toEqual(4.3);
        expect(pointFromTuple.y).toEqual(-4.2);
        expect(pointFromTuple.z).toEqual(3.1);
        expect(pointFromTuple.w).toBe(1);
        expect(pointFromTuple).toBeInstanceOf(Point);
        expect(pointFromTuple).not.toBeInstanceOf(Vector);
    });
    test('A tuple is a Vector when w is 0', () => {
        expect(vectorFromTuple.x).toEqual(4.3);
        expect(vectorFromTuple.y).toEqual(-4.2);
        expect(vectorFromTuple.z).toEqual(3.1);
        expect(vectorFromTuple.w).toBe(0);
        expect(vectorFromTuple).toBeInstanceOf(Vector);
        expect(vectorFromTuple).not.toBeInstanceOf(Point);
    });
});
describe("Creating Points", () => {
    let point = new Point(4, -4, 3);
    let pointFromTuple = tuple(4, -4, 3, 1);
    test("Point class creates tuples with w = 1", () => {
        expect(point.equals(pointFromTuple)).toBe(true);
    });
});
describe("Creating Vectors", () => {
    let vector = new Vector(4, -4, 3);
    let vectorFromTuple = tuple(4, -4, 3, 0);
    test("Vector class creates tuples with w = 0", () => {
        expect(vector.equals(vectorFromTuple)).toBe(true);
    });
});
describe("Operations on tuples", () => {
    test("Adding 2 tuples: Point + Vector", () => {
        const point = tuple(3, -2, 5, 1);
        const vector = tuple(-2, 3, 1, 0);
        const total = new Point(1, 1, 6);
        expect(tupleSum(point, vector).equals(total)).toBe(true);
    });
    test("Adding two Points throws Error", () => {
        const point1 = tuple(3, -2, 5, 1);
        const point2 = tuple(4, -2, 5, 1);
        // @ts-ignore
        expect(() => { tupleSum(point1, point2); }).toThrowError(RangeError);
    });
    test("Subtracting 2 tuples: Point - Point -> Vector", () => {
        const point1 = new Point(3, 2, 1);
        const point2 = new Point(5, 6, 7);
        expect(tupleSubtract(point1, point2).components()).toEqual([-2, -4, -6, 0]);
        expect(tupleSubtract(point1, point2)).toBeInstanceOf(Vector);
    });
    test("Subtracting 2 tuples: Point - Vector -> Point", () => {
        const point = new Point(3, 2, 1);
        const vector = new Vector(5, 6, 7);
        expect(tupleSubtract(point, vector).components()).toEqual([-2, -4, -6, 1]);
        expect(tupleSubtract(point, vector)).toBeInstanceOf(Point);
    });
    test("Subtracting 2 vectors: Vector - Vector -> Vector", () => {
        const vector1 = new Vector(3, 2, 1);
        const vector2 = new Vector(5, 6, 7);
        expect(tupleSubtract(vector1, vector2).components()).toEqual([-2, -4, -6, 0]);
    });
    test("Subtracting Point from vector throws error", () => {
        const vector = new Vector(3, -2, 5);
        const point = new Point(4, -2, 5);
        // @ts-ignore
        expect(() => { tupleSubtract(vector, point); }).toThrowError(RangeError);
    });
    test("Negating a tuple", () => {
        const vector = tuple(1, -2, 3, 0);
        vector.negate();
        expect(vector.components()).toEqual([-1, 2, -3, 0]);
        expect(negateTuple(vector).components()).toEqual([1, -2, 3, 0]);
    });
    test("Multiplying a tuple by a scalar", () => {
        const vector = tuple(1, -2, 3, 0);
        expect(scalarMult(vector, 3.5).components()).toEqual([3.5, -7, 10.5, 0]);
    });
    test("Multiplying a tuple by a scalar (fraction)", () => {
        const vector = tuple(1, -2, 3, 0);
        expect(scalarMult(vector, 0.5).components()).toEqual([0.5, -1, 1.5, 0]);
    });
    test("Dividing a tuple by a scalar", () => {
        const vector = tuple(1, -2, 3, 0);
        expect(scalarDiv(vector, 2).components()).toEqual([0.5, -1, 1.5, 0]);
    });
    test("Magnitude of a tuple", () => {
        const vector1 = new Vector(1, 0, 0);
        const vector2 = new Vector(0, 1, 0);
        const vector3 = new Vector(0, 0, 1);
        const vector4 = new Vector(1, 2, 3);
        const vector5 = new Vector(-1, -2, -3);
        expect(magnitude(vector1)).toEqual(1);
        expect(magnitude(vector2)).toEqual(1);
        expect(magnitude(vector3)).toEqual(1);
        expect(magnitude(vector4)).toEqual(Math.sqrt(14));
        expect(magnitude(vector5)).toEqual(Math.sqrt(14));
    });
    test("Normalizing vectors", () => {
        const vector1 = new Vector(4, 0, 0);
        const vector2 = new Vector(1, 2, 3);
        expect(normalize(vector1).components()).toEqual([1, 0, 0, 0]);
        expect(normalize(vector2).components()).toEqual([1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14), 0]);
    });
    test("Magnitude of a Normalized vector should always be 1", () => {
        const vector = new Vector(1, 2, 3);
        expect(magnitude(normalize(vector))).toEqual(1);
    });
    test("Vector dot product", () => {
        const vector1 = new Vector(1, 2, 3);
        const vector2 = new Vector(2, 3, 4);
        expect(vector1.dot(vector2)).toEqual(20);
    });
    test("Vector cross product", () => {
        const vector1 = new Vector(1, 2, 3);
        const vector2 = new Vector(2, 3, 4);
        expect(vector1.cross(vector2).components()).toEqual([-1, 2, -1, 0]);
        expect(vector2.cross(vector1).components()).toEqual([1, -2, 1, 0]);
    });
});
//# sourceMappingURL=tuples.test.js.map