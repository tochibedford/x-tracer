import { dotProduct, fEqual } from "../helpers"
import { Point, Ttuple, tuple, Vector } from "../Tuples"

/**
 * This class represents a matrix and extends the Float64Array type
 */
class Matrix extends Float64Array {
    private rows: number
    private columns: number
    constructor(args: number[], rows: number, columns: number) {
        if (rows * columns !== args.length) {
            throw Error(`Array: ${args} is not shapable to a ${rows} x ${columns} matrix \n Either remove the rows and columns or change the shape`)
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

    /**
     * Returns the equivalent index of the given row & column in a flat-array version of the matrix
     * @remarks rows and columns here are 0-indexed
     * @param row The row of the required index
     * @param column The column of the required index
     * @returns 
     */
    getIndex(row: number, column: number): number {
        if (row <= this.rows - 1 && row >= 0 && column <= this.columns - 1 && column >= 0) {
            const index = (row * this.columns) + column // since matrix is stored as a 1D array
            return index
        } else if (row > this.rows - 1 || row < 0) {
            throw RangeError(`Row ${row} is out of range for this matrix and its current shape`)
        } else if (column > this.columns - 1 || column < 0) {
            throw RangeError(`Column ${column} is out of range for this matrix and its current shape`)
        }
    }

    /**
     * Sets the element at a given row & column to the given value
     * @param value - value to set element to
     * @param row - row of the required element
     * @param column - column of the required element
     */
    setElementAt(value: number, row: number, column: number) {
        if (row <= this.rows - 1 && row >= 0 && column <= this.columns - 1 && column >= 0) {
            const index = (row * this.columns) + column // since matrix is stored as a 1D array
            this[index] = value
        } else if (row > this.rows - 1 || row < 0) {
            throw RangeError(`Row ${row} is out of range for this matrix and its current shape`)
        } else if (column > this.columns - 1 || column < 0) {
            throw RangeError(`Column ${column} is out of range for this matrix and its current shape`)
        }
    }

    /**
     * Get a given row of the matrix and returns it as a typed array
     * @param row - A 0-index number representing the row to retrieve
     * 
     * @example
     * ```
     * const matrix = new Matrix([1, 2, 3, 4,
     *                            5, 6, 7, 8,
     *                            9, 8, 7, 6,
     *                            5, 4, 3, 2], 4, 4)
     * matrix.getRow(0) //-> Float64Array([1, 2, 3, 4])
     * ```
     */
    getRow(row: number): Float64Array {
        if (row > this.rows - 1 || row < 0) {
            throw RangeError(`Row ${row} is out of range for this matrix and its current shape`)
        }
        return new Float64Array(this).slice(row * this.columns, (row * this.columns) + this.columns)
    }

    /**
     * Get a given column of the matrix and returns it as a typed array
     * @param column - A 0-index number representing the column to retrieve
     * @example
     * const matrix = new Matrix([1, 2, 3, 4,
     *                            5, 6, 7, 8,
     *                            9, 8, 7, 6, 
     *                            5, 4, 3, 2], 4, 4)
     * matrix.getColumn(0) //-> Float64Array([1, 5, 9, 5])
     */
    getColumn(column: number): Float64Array {
        if (column > this.columns - 1 || column < 0) {
            throw RangeError(`Column ${column} is out of range for this matrix and its current shape`)
        }
        const result = []
        for (let i = column; i < this.length; i = i + this.columns) {
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
    equals(matrix: Matrix, EPS: number = 0.0001): boolean {
        for (let i = 0; i < this.length; i++) {
            if (!fEqual(this[i], matrix[i], EPS)) {
                return false
            }
        }
        return true
    }

    /**
     * Used to produce a fixed digit version of the matrix, same as running element.toFixed(...) on every single element of the matrix
     * @param fractionDigits 
     * @returns 
     */
    fixed(fractionDigits: number) {
        const result: number[] = []
        this.forEach(num => {
            const converted = Number(num.toFixed(fractionDigits))
            result.push(converted === 0 ? 0 : converted)
        })
        return new Matrix(result, this.dimensions[0], this.dimensions[1])
    }

    /**
     * The dimensions of the matrix in the format [rows, columns]
     */
    get dimensions(): [number, number] {
        return [this.rows, this.columns]
    }
}

/**
 * This class represents and spawns an identity matrix of arbitray sizes and extends the original {@link Matrix class}
 * @example
 * ```
 * const identityMat = new IdentityMatrix(4, 4);
 * Array.from(identityMat) 
 *  -> [1, 0, 0, 0,
 *      0, 1, 0, 0,
 *      0, 0, 1, 0,
 *      0, 0, 0, 1]
 * ```
 */
class IdentityMatrix extends Matrix {
    constructor(rows: number, columns: number) {
        const args: number[] = []
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (i === j) {
                    args.push(1)
                } else {
                    args.push(0)
                }
            }
        }
        super(args, rows, columns)
    }
}

/**
 * This function perfors matrix multiplication on 2 compatible matrices.
 * For 2 matrices to be compatible the columns of the first matrix must equal the rows of the second
 * @param matrix1 - first matrix
 * @param matrix2 - second matrix
 * 
 * @remarks
 * - Do not use this function to multiply two {@link Ttuple} instances, a type error will be thrown
 * - If the matrix1 is an {@link Ttuple} instance (Vector/Point) and matrix2 is a matrix the multiplication will go through and a new matrix is returned
 * - If matrix2 is an {@link Ttuple} instance (Vector/Point) while matrix1 is a matrix, matrix2 will be treated like a single column matrix and a tuple will be returned
 * 
 * @example
 * ```
 * const matrix1 = new Matrix([1, 2, 3, 4,
 *                             5, 6, 7, 8,
 *                             9, 8, 7, 6,
 *                             5, 4, 3, 2], 4, 4)
 * const matrix2 = new Matrix([-2, 1, 2, 3,
 *                              3, 2, 1, -1, 
 *                              4, 3, 6, 5, 
 *                              1, 2, 7, 8], 4, 4)
 * matrixMultiply(matrix1, matrix2) as Matrix
 * -> Matrix(   [20, 22, 50, 48,
 *              44, 54, 114, 108,
 *              40, 58, 110, 102,
 *              16, 26, 46, 42], 4, 4)
 * ```
 */
function matrixMultiply(matrix1: Matrix | Ttuple, matrix2: Matrix | Ttuple): Matrix | Ttuple {
    if ((matrix1 instanceof Vector || matrix1 instanceof Point) && (matrix2 instanceof Vector || matrix2 instanceof Point)) { // do not multiply 2 tuples with this function
        throw TypeError("Do not multiply 2 tuples using this function")
    } else if (matrix1 instanceof Vector || matrix1 instanceof Point) { // if matrix1 is a tuple
        matrix1 = matrix1 as Ttuple
        matrix2 = matrix2 as Matrix
        const result: number[] = []
        for (let column = 0; column < matrix2.dimensions[1]; column++) {
            result.push(dotProduct(matrix1.components(), Array.from(matrix2.getColumn(column))))
        }
        return new Matrix(result, 1, matrix2.dimensions[1])
    } else if (matrix2 instanceof Vector || matrix2 instanceof Point) { // if matrix2 is a tuple
        matrix1 = matrix1 as Matrix
        matrix2 = matrix2 as Ttuple
        matrix2 = new Matrix(matrix2.components(), matrix2.components().length, 1) // treat matrix2 like a single column matrix
        const result: number[] = []
        for (let row = 0; row < matrix1.dimensions[0]; row++) {
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
        for (let row = 0; row < matrix1.dimensions[0]; row++) {
            const currentRow = matrix1.getRow(row)
            for (let column = 0; column < matrix2.dimensions[1]; column++) {
                result.push(dotProduct(Array.from(currentRow), Array.from(matrix2.getColumn(column))))
            }
        }
        return new Matrix(result, matrix1.dimensions[0], matrix2.dimensions[1])
    }
}

/**
 * This function transposes a matrix, i.e. turns its rows to columns and its columns to rows
 * 
 * @param matrix - matrix to transpose 
 * @example
 * ```
 * const matrix = new Matrix([0, 9, 3, 0,
 *                            9, 8, 0, 8,
 *                            1, 8, 5, 3, 
 *                            0, 0, 5, 8], 4, 4)
 * Array.from(matrixTranspose(matrix)))
 * ->   [0, 9, 1, 0,
 *      9, 8, 8, 0,
 *      3, 0, 5, 5,
 *      0, 8, 3, 8]
 * ```
 */
function matrixTranspose(matrix: Matrix): Matrix {
    let result: number[] = []
    for (let i = 0; i < matrix.dimensions[1]; i++) {
        result = result.concat(Array.from(matrix.getColumn(i)))
    }
    return new Matrix(result, matrix.dimensions[0], matrix.dimensions[1])
}

/**
 * This function calculates the determinant of a matrix.
 * The operation is trivial for 2x2 matrices but becomes recursive from 3x3 and up
 * @param matrix - matrix to find determinant of
 * @throws - TypeError when trying to calculate determinant for non-square matrices
 * @example
 * ```
 * const matrix = new Matrix([1, 5, -3, 2], 2, 2)
 * matrixDeterminant(matrix) //-> 17
 * ``` 
 */
function matrixDeterminant(matrix: Matrix): number {
    if (matrix.dimensions[0] !== matrix.dimensions[1]) {
        throw TypeError(`Cannot calculate determinant for non-square matrices, this matrix is a ${matrix.dimensions[0]}x${matrix.dimensions[1]} matrix`)
    } else {
        if (matrix.dimensions[0] === 2) { // 2x2 matrix determinant
            return (matrix[0] * matrix[3]) - (matrix[1] * matrix[2])
        } else {
            let result = 0
            for (let c = 0; c < matrix.dimensions[0]; c++) {
                result += matrix.elementAt(0, c) * matrixCofactor(matrix, 0, c)
            }
            return result
        }
    }
    return 0
}

/**
 * This function returns a new sub matrix with repect to the original row and column given. It is usefult for cofactors and matrix minors
 * @param matrix - matrix to get submatrix from
 * @param row - row to exclude from sub matrix
 * @param column - column to exclude from sub matrix
 * 
 * @throws TypeError - if any component of matrix dimension (row, column) is less than 3
 * @example
 * ```
 * const matrix1 = new Matrix([1, 5, 0, -3, 2, 7, 0, 6, -3], 3, 3)
 * subMatrix(matrix1, 0, 2) //-> Matrix([-3, 2, 
 *                                        0, 6], 2, 2)
 * ```
 */
function subMatrix(matrix: Matrix, row: number, column: number): Matrix {
    if (matrix.dimensions[0] < 3 || matrix.dimensions[1] < 3) {
        throw TypeError(`Cannot calculate submatrix for matrices with a dimension less than 3, this matrix is a ${matrix.dimensions[0]}x${matrix.dimensions[1]} matrix`)
    }
    const result = []
    for (let r = 0; r < matrix.dimensions[0]; r++) {
        for (let c = 0; c < matrix.dimensions[1]; c++) {
            if (r != row && c != column) {
                result.push(matrix.elementAt(r, c))
            }
        }
    }

    return new Matrix(result, matrix.dimensions[0] - 1, matrix.dimensions[1] - 1)
}

/**
 * This function finds the matrix minor at a given row and column
 * @param matrix - matrix to find minor from
 * @param row - row to exclude from minor calculation
 * @param column - column to exclude from minor calculation
 * 
 * @remarks A minor is the determinant of the submatrix with that particular row and column excluded
 * @throws TypeError - if any component of matrix dimension (row, column) is less than 3
 * @example
 * ```
 * const matrix = new Matrix([3, 5, 0,
 *                            2, -1, -7,
 *                            6, -1, 5], 3, 3)
 * matrixMinor(matrix, 1, 0) //-> 25
 * ```
 */
function matrixMinor(matrix: Matrix, row: number, column: number): number {
    if (matrix.dimensions[0] < 3 || matrix.dimensions[1] < 3) {
        throw TypeError(`Cannot calculate minor for matrices with a dimension less than 3, this matrix is a ${matrix.dimensions[0]}x${matrix.dimensions[1]} matrix`)
    }
    const sub = subMatrix(matrix, row, column)

    return matrixDeterminant(sub) //a minor is the determinant of the subMatrix 
}

/**
 * This function finds the matrix cofactor at a given row and column
 * @param matrix - matrix to find cofactor from
 * @param row - row to exclude from cofactor calculation
 * @param column -column to exclude from cofactor calculation
 * @example
 * ```
 * const matrix = new Matrix([3, 5, 0,
 *                            2, -1, -7,
 *                            6, -1, 5], 3, 3)
 * matrixCofactor(matrix, 0, 0) //-> -12
 * ```
 */
function matrixCofactor(matrix: Matrix, row: number, column: number): number {
    //using 0 index
    //if row is even then odd cols change the signs
    //if row is odd then even cols change the signs
    //therefore, if row + col is odd, sign changes else sign stays the same

    return ((row + column) % 2 ? -1 : 1) * matrixMinor(matrix, row, column)

}

/**
 * This function is a simple utility function to check whether a matrix has an inverse
 * 
 * @remarks
 * A matrix doesn't have an inverse if it's determinant is 0
 * @param matrix - matrix to check for invertability
 * @example
 * ```
 * const matrix1 = new Matrix([6, 4, 4, 4,
 *                             5, 5, 7, 6,
 *                             4, -9, 3, -7, 
 *                             9, 1, 7, -6], 4, 4)
 * const matrix2 = new Matrix([-4, 2, -2, -3, 
 *                              9, 6, 2, 6,
 *                              0, -5, 1, -5, 
 *                              0, 0, 0, 0], 4, 4)
 * canInvertMatrix(matrix1) //-> true
 * canInvertMatrix(matrix2) //-> false
 * ```
 */
function canInvertMatrix(matrix: Matrix): boolean {
    return matrixDeterminant(matrix) ? true : false
}

/**
 * This function returns a new matrix (B) that is the inverse of the given matrix (A), i.e. A * B = Identity matrix 
 * @param matrix - Matrix to find inverse of
 * @example
 * ```
 * const matrix = new Matrix([-5, 2, 6, -8,
 *                             1, -5, 1, 8, 
 *                             7, 7, -6, -7, 
 *                             1, -3, 7, 4], 4, 4)
 *  matrixInverse(matrix) 
 *  -> Matrix([0.21805..., 0.45113..., 0.24060..., -0.04511...,
 *             -0.80827..., -1.45677..., -0.44361..., 0.52068...,
 *             -0.07895..., -0.22368..., -0.05263..., 0.19737..., 
 *             -0.52256..., -0.81391..., -0.30075..., 0.30639...])
 * ```
 */
function matrixInverse(matrix: Matrix): Matrix {
    const det = matrixDeterminant(matrix)
    if (det ? false : true) {
        throw Error("This matrix cannot be inverted, check if it's determinant is 0")
    }
    //matrix of cofactors
    const cofactorList = []
    for (let row = 0; row < matrix.dimensions[0]; row++) {
        for (let column = 0; column < matrix.dimensions[1]; column++) {
            cofactorList.push(matrixCofactor(matrix, row, column))
        }
    }

    const cofactorMatrix = new Matrix(cofactorList, matrix.dimensions[0], matrix.dimensions[1])
    const cofactorTranspose = matrixTranspose(cofactorMatrix)

    matrix = new Matrix(Array.from(cofactorTranspose).map(element => element / det), matrix.dimensions[0], matrix.dimensions[1])

    return matrix
}

/**
 * Creates a translation matrix that can cause a change in position of points
 * @param x - Value to translate by in the x-axis
 * @param y - Value to translate by in the y-axis
 * @param z - Value to translate by in the z-axis
 * @returns 
 */
function translation(x: number, y: number, z: number): Matrix {
    const translationMatrix = new Matrix(Array.from(new IdentityMatrix(4, 4)), 4, 4)
    translationMatrix.setElementAt(x, 0, 3)
    translationMatrix.setElementAt(y, 1, 3)
    translationMatrix.setElementAt(z, 2, 3)
    return translationMatrix
}

/**
 * Creates a scaling matrix that can scale a point or vector
 * @param x Value to scale by in the x-axis
 * @param y Value to scale by in the y-axis
 * @param z Value to scale by in the z-axis
 * @returns 
 */
function scaling(x: number, y: number, z: number): Matrix {
    const scalingMatrix = new Matrix(Array.from(new IdentityMatrix(4, 4)), 4, 4)
    scalingMatrix.setElementAt(x, 0, 0)
    scalingMatrix.setElementAt(y, 1, 1)
    scalingMatrix.setElementAt(z, 2, 2)
    return scalingMatrix
}

export {
    Matrix,
    IdentityMatrix,
    matrixMultiply,
    matrixTranspose,
    matrixDeterminant,
    subMatrix,
    matrixMinor,
    matrixCofactor,
    canInvertMatrix,
    matrixInverse,
    translation,
    scaling
}