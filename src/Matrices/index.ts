import { dotProduct } from "../helpers"
import { Point, Ttuple, tuple, Vector } from "../Tuples"

/**
 * This class represents a matrix and extends the Float64Array type
 */
class Matrix extends Float64Array {
    private rows: number
    private columns: number
    constructor(args: number[], rows: number, columns: number) {
        if (rows * columns !== args.length) {
            throw Error(`Array: ${args} is not shapable to a ${rows} x ${columns} matrix \n Either remove the rows and columns or chaange the shape`)
        }
        super(args)
        this.rows = rows
        this.columns = columns
    }

    /**
     * Used to index a matrix. i.e Given index (i,j) it returns the value at index (i,j)
     * @remarks rows and columns here are 0-indexed
     * @param row The row of the required value
     * @param column The column of the required value
     * 
     * @example 
     * ```
     * const matrix = new Matrix([-3,5,1,-2], 2, 2)
     * matrix.elementAt(0,0) === -3 // true
     * matrix.elementAt(0,1) === 5 // true
     * matrix.elementAt(1,0) === 1 // true
     * matrix.elementAt(1,1) === -2 // true
     * ```
     */
    elementAt(row: number, column: number): number {
        if (row <= this.rows - 1 && row >= 0 && column <= this.columns - 1 && column >= 0) {
            const index = (row * this.columns) + column // since matrix is stored as a 1D array
            return this[index]
        } else if (row > this.rows - 1 || row < 0) {
            throw RangeError(`Row ${row} is out of range for this matrix and its current shape`)
        } else if (column > this.columns - 1 || column < 0) {
            throw RangeError(`Column ${column} is out of range for this matrix and its current shape`)
        }
    }

    getRow(row: number): Float64Array {
        if (row > this.rows - 1 || row < 0) {
            throw RangeError(`Row ${row} is out of range for this matrix and its current shape`)
        }
        return new Float64Array(this).slice(row * this.columns, (row * this.columns) + this.columns)
    }

    getColumn(column: number): Float64Array {
        if(column > this.columns - 1 || column < 0) {
            throw RangeError(`Column ${column} is out of range for this matrix and its current shape`)
        }
        const result = []
        for(let i=column; i < this.length; i=i+this.columns) {
            result.push(this[i])
        }

        return new Float64Array(result)
    }

    /**
     * Checks for equality between the current matrix instance and some other matrix
     * @param matrix Another matrix to compare with for equality
     * @example
     * ```
     * const matrix1 = new Matrix([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2], 4, 4)
     * const matrix2 = new Matrix([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2], 4, 4)
     * const matrix3 = new Matrix([2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1], 4, 4)
     * 
     * matrix1.equals(matrix2) // true
     * matrix1.equals(matrix3) // false
     * ```
     */
    equals(matrix: Matrix): boolean {
        for (let i = 0; i < this.length; i++) {
            if (this[i] !== matrix[i]) {
                return false
            }
        }
        return true
    }

    /**
     * The dimensions of the matrix in the format [rows, columns]
     */
    get dimensions(): [number, number] {
        return [this.rows, this.columns]
    }
}

class IdentityMatrix extends Matrix {
    constructor(rows: number, columns: number) {
        const args: number[] = []
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                if(i===j){
                    args.push(1)
                }else{
                    args.push(0)
                }
            }
        }
        super(args, rows, columns)
    }
}

function matrixMultiply(matrix1: Matrix | Ttuple, matrix2: Matrix | Ttuple): Matrix | Ttuple {
    if((matrix1 instanceof Vector || matrix1 instanceof Point) && (matrix2 instanceof Vector || matrix2 instanceof Point)){ // do not multiply 2 tuples with this function
        throw TypeError("Do not multiply 2 tuples using this function")
    }else if (matrix1 instanceof Vector || matrix1 instanceof Point) { // if matrix1 is a tuple
        matrix1 = matrix1 as Ttuple
        matrix2 = matrix2 as Matrix
        const result: number[] = []
        for(let column=0; column < matrix2.dimensions[1]; column++) {
            result.push(dotProduct(matrix1.components(), Array.from(matrix2.getColumn(column))))
        }
        return new Matrix(result, 1, matrix2.dimensions[1])
    } else if(matrix2 instanceof Vector || matrix2 instanceof Point){ // if matrix2 is a tuple
        matrix1 = matrix1 as Matrix
        matrix2 = matrix2 as Ttuple
        matrix2 = new Matrix(matrix2.components(), matrix2.components().length, 1) // treat matrix2 like a single column matrix
        const result: number[] = []
        for(let row=0; row < matrix1.dimensions[0]; row++) {
            const currentRow = matrix1.getRow(row)
            result.push(dotProduct(Array.from(currentRow), Array.from(matrix2)))
        }
        return tuple(result[0], result[1], result[2], result[3] as (0 | 1))
    } else { // both are actually matrices
        if ((matrix1 as Matrix).dimensions[1] !== (matrix2 as Matrix).dimensions[0]) // checking if the shape of the matrices are multipliable
            throw Error(`The number columns of first matrix: ${(matrix1 as Matrix).dimensions[1]} and number of rows of second matrix: ${(matrix2 as Matrix).dimensions[0]} have to be the same`)
        const result = []
        matrix1 = matrix1 as Matrix
        matrix2 = matrix2 as Matrix
        for(let row=0; row < matrix1.dimensions[0]; row++) {
            const currentRow = matrix1.getRow(row)
            for(let column=0; column < matrix2.dimensions[1]; column++) {
                result.push(dotProduct(Array.from(currentRow), Array.from(matrix2.getColumn(column))))
            }
        }
        return new Matrix(result, matrix1.dimensions[0], matrix2.dimensions[1])
    }
}


export {
    Matrix,
    IdentityMatrix,
    matrixMultiply
}