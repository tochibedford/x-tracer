import { Point, Ttuple, Vector } from "../../Tuples";
import { Matrix, matrixMultiply } from "../index";

describe("Matrices", () => {
    test("Creating a 4x4 matrix", () => {
        const matrix = new Matrix([
            1, 2, 3, 4,
            5.5, 6.5, 7.5, 8.5,
            9, 10, 11, 12,
            13.5, 14.5, 15.5, 16.5
        ], 4, 4)
        expect(matrix.elementAt(0, 0)).toBe(1)
        expect(matrix.elementAt(0, 3)).toBe(4)
        expect(matrix.elementAt(1, 0)).toBe(5.5)
        expect(matrix.elementAt(1, 2)).toBe(7.5)
        expect(matrix.elementAt(2, 2)).toBe(11)
        expect(matrix.elementAt(3, 0)).toBe(13.5)
        expect(matrix.elementAt(3, 2)).toBe(15.5)
    })

    test("Getting a row", () => {
        const matrix = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2], 4, 4)
        expect(matrix.getRow(0)).toEqual(new Float64Array([1, 2, 3, 4]))
        expect(matrix.getRow(1)).toEqual(new Float64Array([5, 6, 7, 8]))
        expect(matrix.getRow(2)).toEqual(new Float64Array([9, 8, 7, 6]))
        expect(matrix.getRow(3)).toEqual(new Float64Array([5, 4, 3, 2]))
    })

    test("Getting a column", () => {
        const matrix = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2], 4, 4)
        expect(matrix.getColumn(0)).toEqual(new Float64Array([1, 5, 9, 5]))
        expect(matrix.getColumn(1)).toEqual(new Float64Array([2, 6, 8, 4]))
        expect(matrix.getColumn(2)).toEqual(new Float64Array([3, 7, 7, 3]))
        expect(matrix.getColumn(3)).toEqual(new Float64Array([4, 8, 6, 2]))
    })

    test("Creating a 3x3 matrix", () => {
        const matrix = new Matrix([-3, 5, 0, 1, -2, -7, 0, 1, 1], 3, 3)
        expect(matrix.elementAt(0, 0)).toBe(-3)
        expect(matrix.elementAt(1, 1)).toBe(-2)
        expect(matrix.elementAt(2, 2)).toBe(1)
    })

    test("Creating a 2x2 matrix", () => {
        const matrix = new Matrix([-3, 5, 1, -2], 2, 2)
        expect(matrix.elementAt(0, 0)).toBe(-3)
        expect(matrix.elementAt(0, 1)).toBe(5)
        expect(matrix.elementAt(1, 0)).toBe(1)
        expect(matrix.elementAt(1, 1)).toBe(-2)
    })

    test("Equality of Two Matrices", () => {
        const matrix1 = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2], 4, 4)
        const matrix2 = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2], 4, 4)

        expect(matrix1.equals(matrix2)).toBe(true)
    })

    test("Inequality of Two Matrices", () => {
        const matrix1 = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2], 4, 4)
        const matrix2 = new Matrix([2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1], 4, 4)

        expect(matrix1.equals(matrix2)).toBe(false)
    })

    test("Should not be able to multiply 2 tuples as Matrices", () => {
        const vector1 = new Vector(1, 2, 3)
        const vector2 = new Vector(1, 2, 3)

        expect(() => { matrixMultiply(vector1, vector2) }).toThrowError()
    })

    test("Tuple x Matrix Multiplication", () => {
        const vector = new Vector(1, 1, 1)
        const matrix = new Matrix([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 4, 4)

        expect(matrixMultiply(vector, matrix)).toEqual(new Matrix([3, 3, 3, 3], 1, 4))
    })

    test("Matrix x Tuple Multiplication", () => {
        const matrix = new Matrix([1, 2, 3, 4, 2, 4, 4, 2, 8, 6, 4, 1, 0, 0, 0, 1], 4, 4)
        const point = new Point(1, 2, 3)

        const resultPoint = new Point(18, 24, 33)
        expect([...(matrixMultiply(matrix, point) as Ttuple).components()]).toEqual(resultPoint.components())
    })

    test("multiplying 2 matrices", () => {
        const matrix1 = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2], 4, 4)
        const matrix2 = new Matrix([-2, 1, 2, 3, 3, 2, 1, -1, 4, 3, 6, 5, 1, 2, 7, 8], 4, 4)

        expect((matrixMultiply(matrix1, matrix2) as Matrix).equals(new Matrix([20, 22, 50, 48, 44, 54, 114, 108, 40, 58, 110, 102, 16, 26, 46, 42], 4, 4)))
    })
})