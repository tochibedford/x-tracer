import { Matrix} from "../index";

describe("Matrices", ()=>{
    test("Creating a 4x4 matrix", ()=>{
        const matrix = new Matrix([
            1,   2,   3,   4,
            5.5, 6.5, 7.5, 8.5,
            9,   10,  11,  12,
            13.5,14.5,15.5,16.5
        ], 4, 4)
        expect(matrix.elementAt(0,0)).toBe(1)
        expect(matrix.elementAt(0,3)).toBe(4)
        expect(matrix.elementAt(1,0)).toBe(5.5)
        expect(matrix.elementAt(1,2)).toBe(7.5)
        expect(matrix.elementAt(2,2)).toBe(11)
        expect(matrix.elementAt(3,0)).toBe(13.5)
        expect(matrix.elementAt(3,2)).toBe(15.5)
    })

    test("Creating a 3x3 matrix", ()=>{
        const matrix = new Matrix([-3,5,0,1,-2,-7,0,1,1], 3, 3)
        expect(matrix.elementAt(0,0)).toBe(-3)
        expect(matrix.elementAt(1,1)).toBe(-2)
        expect(matrix.elementAt(2,2)).toBe(1)
    })

    test("Creating a 2x2 matrix", ()=>{
        const matrix = new Matrix([-3,5,1,-2], 2, 2)
        expect(matrix.elementAt(0,0)).toBe(-3)
        expect(matrix.elementAt(0,1)).toBe(5)
        expect(matrix.elementAt(1,0)).toBe(1)
        expect(matrix.elementAt(1,1)).toBe(-2)
    })

    test("Equality of Two Matrices", ()=>{
        const matrix1 = new Matrix([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2], 4, 4)
        const matrix2 = new Matrix([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2], 4, 4)

        expect(matrix1.equals(matrix2)).toBe(true)
    })

    test("Inequality of Two Matrices", ()=>{
        const matrix1 = new Matrix([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2], 4, 4)
        const matrix2 = new Matrix([2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1], 4, 4)

        expect(matrix1.equals(matrix2)).toBe(false)
    })
})