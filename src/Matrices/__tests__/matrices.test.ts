import { Point, Ttuple, Vector } from "../../Tuples";
import {
    canInvertMatrix,
    IdentityMatrix,
    Matrix,
    matrixCofactor,
    matrixDeterminant,
    matrixInverse,
    matrixMinor,
    matrixMultiply,
    matrixTranspose,
    subMatrix
} from "../index";

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

    test("Creating Identity Matrices", () => {
        const identityMat = new IdentityMatrix(4, 4);
        expect(Array.from(identityMat)).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    })

    test("Multiplying a matrix by an Identity Matrix", () => {
        const matrix = new Matrix([0, 1, 2, 4, 1, 2, 4, 8, 2, 4, 8, 16, 4, 8, 16, 32], 4, 4)
        const identityMat = new IdentityMatrix(4, 4);
        expect(Array.from(matrixMultiply(matrix, identityMat) as Matrix)).toEqual([0, 1, 2, 4, 1, 2, 4, 8, 2, 4, 8, 16, 4, 8, 16, 32])
    })

    test("Transposing a matrix", () => {
        const matrix = new Matrix([0, 9, 3, 0, 9, 8, 0, 8, 1, 8, 5, 3, 0, 0, 5, 8], 4, 4)
        expect(Array.from(matrixTranspose(matrix))).toEqual([0, 9, 1, 0, 9, 8, 8, 0, 3, 0, 5, 5, 0, 8, 3, 8])
    })

    test("Transposing an Identity Matrix", () => {
        const identityMat = new IdentityMatrix(4, 4)
        expect(Array.from(matrixTranspose(identityMat))).toEqual(Array.from(identityMat))
    })

    test("Determinant of a 2x2 matrix", () => {
        const matrix = new Matrix([1, 5, -3, 2], 2, 2)
        expect(matrixDeterminant(matrix)).toBe(17)
    })

    test("Determinant of higher order matrices", () => {
        const matrix1 = new Matrix([1, 2, 6, -5, 8, -4, 2, 6, 4], 3, 3)
        const matrix2 = new Matrix([-2, -8, 3, 5, -3, 1, 7, 3, 1, 2, -9, 6, -6, 7, 7, -9], 4, 4)

        expect(matrixDeterminant(matrix1)).toBe(-196)
        expect(matrixDeterminant(matrix2)).toBe(-4071)
    })

    test("Spotting subMatrices", () => {
        const matrix1 = new Matrix([1, 5, 0, -3, 2, 7, 0, 6, -3], 3, 3)
        const matrix2 = new Matrix([-6, 1, 1, 6, -8, 5, 8, 6, -1, 0, 8, 2, -7, 1, -1, 1], 4, 4)

        expect(Array.from(subMatrix(matrix1, 0, 2))).toEqual(Array.from(new Matrix([-3, 2, 0, 6], 2, 2)))
        expect(Array.from(subMatrix(matrix2, 2, 1))).toEqual(Array.from(new Matrix([-6, 1, 6, -8, 8, 6, -7, -1, 1], 3, 3)))
    })

    test("Matrix Minor calculation", () => {
        const matrix = new Matrix([3, 5, 0, 2, -1, -7, 6, -1, 5], 3, 3)

        expect(matrixMinor(matrix, 1, 0)).toBe(25)
        expect(matrixMinor(matrix, 1, 0)).toBe(matrixDeterminant(subMatrix(matrix, 1, 0)))
    })

    test("Cofactors", () => {
        const matrix = new Matrix([3, 5, 0, 2, -1, -7, 6, -1, 5], 3, 3)

        expect(matrixCofactor(matrix, 0, 0)).toBe(-12)
        expect(matrixCofactor(matrix, 1, 0)).toBe(-25)
    })

    test("Can tell invertable matrices for non-invertable ones", () => {
        const matrix1 = new Matrix([6, 4, 4, 4, 5, 5, 7, 6, 4, -9, 3, -7, 9, 1, 7, -6], 4, 4)
        const matrix2 = new Matrix([-4, 2, -2, -3, 9, 6, 2, 6, 0, -5, 1, -5, 0, 0, 0, 0], 4, 4)

        expect(canInvertMatrix(matrix1)).toBeTruthy()
        expect(canInvertMatrix(matrix2)).toBeFalsy()
    })

    test("Calculate inverse of a matrix", () => {
        const matrix = new Matrix([-5, 2, 6, -8, 1, -5, 1, 8, 7, 7, -6, -7, 1, -3, 7, 4], 4, 4)
        const inverse = matrixInverse(matrix)

        expect(matrixDeterminant(matrix)).toBe(532)
        expect(matrixCofactor(matrix, 2, 3)).toBe(-160)
        expect(matrixCofactor(matrix, 3, 2)).toBe(105)
        expect(inverse.elementAt(3, 2)).toEqual(-160 / 532)
        expect(inverse.elementAt(2, 3)).toEqual(105 / 532)
        expect(Array.from(inverse)).toEqual([116 / 532, 240 / 532, 128 / 532, -24 / 532, -430 / 532, -775 / 532, -236 / 532, 277 / 532, -42 / 532, -119 / 532, -28 / 532, 105 / 532, -278 / 532, -433 / 532, -160 / 532, 163 / 532])
    })

    test("Multiplying a product by its inverse", () => {
        const matrix1 = new Matrix([3, -9, 7, 3, 3, -8, 2, -9, -4, 4, 4, 1, -6, 5, -1, 1], 4, 4)
        const matrix2 = new Matrix([8, 2, 2, 2, 3, -1, 7, 0, 7, 0, 5, 4, 6, -2, 0, 5], 4, 4)
        const matrix3: Matrix = matrixMultiply(matrix1, matrix2) as Matrix

        expect((matrixMultiply(matrix3, matrixInverse(matrix2)) as Matrix).equals(matrix1,0.000000001)).toBeTruthy()
    })

    test("Multiplying a matrix by its inverse", ()=>{
        const matrix1 = new Matrix([3, -9, 7, 3, 3, -8, 2, -9, -4, 4, 4, 1, -6, 5, -1, 1], 4, 4)
        const inv = matrixInverse(matrix1)
        expect((matrixMultiply(matrix1, inv) as Matrix).fixed(3)).toEqual(new Matrix(Array.from(new IdentityMatrix(4, 4)), 4,4)) //-> useless hacks
    })
})
