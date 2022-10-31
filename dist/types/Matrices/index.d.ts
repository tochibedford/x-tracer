import { Ttuple } from "../Tuples";
/**
 * This class represents a matrix and extends the Float64Array type
 */
declare class Matrix extends Float64Array {
    private rows;
    private columns;
    constructor(args: number[], rows: number, columns: number);
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
    elementAt(row: number, column: number): number;
    /**
     * Returns the equivalent index of the given row & column in a flat-array version of the matrix
     * @remarks rows and columns here are 0-indexed
     * @param row The row of the required index
     * @param column The column of the required index
     * @returns
     */
    getIndex(row: number, column: number): number;
    /**
     * Sets the element at a given row & column to the given value
     * @param value - value to set element to
     * @param row - row of the required element
     * @param column - column of the required element
     */
    setElementAt(value: number, row: number, column: number): void;
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
    getRow(row: number): Float64Array;
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
    getColumn(column: number): Float64Array;
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
    equals(matrix: Matrix, EPS?: number): boolean;
    /**
     * Used to produce a fixed digit version of the matrix, same as running element.toFixed(...) on every single element of the matrix
     * @param fractionDigits
     * @returns
     */
    fixed(fractionDigits: number): Matrix;
    /**
     * The dimensions of the matrix in the format [rows, columns]
     */
    get dimensions(): [number, number];
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
declare class IdentityMatrix extends Matrix {
    constructor(rows: number, columns: number);
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
declare function matrixMultiply(matrix1: Matrix | Ttuple, matrix2: Matrix | Ttuple): Matrix | Ttuple;
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
declare function matrixTranspose(matrix: Matrix): Matrix;
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
declare function matrixDeterminant(matrix: Matrix): number;
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
declare function subMatrix(matrix: Matrix, row: number, column: number): Matrix;
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
declare function matrixMinor(matrix: Matrix, row: number, column: number): number;
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
declare function matrixCofactor(matrix: Matrix, row: number, column: number): number;
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
declare function canInvertMatrix(matrix: Matrix): boolean;
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
declare function matrixInverse(matrix: Matrix): Matrix;
/**
 * Creates a translation matrix that can cause a change in position of points
 * @param x - Value to translate by in the x-axis
 * @param y - Value to translate by in the y-axis
 * @param z - Value to translate by in the z-axis
 * @returns
 */
declare function translation(x: number, y: number, z: number): Matrix;
/**
 * Creates a scaling matrix that can scale a point or vector
 * @param x Value to scale by in the x-axis
 * @param y Value to scale by in the y-axis
 * @param z Value to scale by in the z-axis
 * @returns a {@link Matrix} that can scale a point or vector
 */
declare function scaling(x: number, y: number, z: number): Matrix;
/**
 * Creates a Matrix that can rotate a tuple around the X-axis
 * @param angle - This is the anglle (in radians) to rotate the tuple by
 * @param measuredIn - can be either 'rad' or 'deg', defaults to 'rad'
 * @returns - A transformation matrix capable of rotating a tuple about the x-axis
 */
declare function rotationX(angle: number, measuredIn?: 'rad' | 'deg'): Matrix;
/**
 * Creates a Matrix that can rotate a tuple around the Y-axis
 * @param angle - This is the anglle (in radians) to rotate the tuple by
 * @param measuredIn - can be either 'rad' or 'deg', defaults to 'rad'
 * @returns - A transformation matrix capable of rotating a tuple about the y-axis
 */
declare function rotationY(angle: number, measuredIn?: 'rad' | 'deg'): Matrix;
/**
 * Creates a Matrix that can rotate a tuple around the Z-axis
 * @param angle - This is the anglle (in radians) to rotate the tuple by
 * @param measuredIn - can be either 'rad' or 'deg', defaults to 'rad'
 * @returns - A transformation matrix capable of rotating a tuple about the z-axis
 */
declare function rotationZ(angle: number, measuredIn?: 'rad' | 'deg'): Matrix;
export { Matrix, IdentityMatrix, matrixMultiply, matrixTranspose, matrixDeterminant, subMatrix, matrixMinor, matrixCofactor, canInvertMatrix, matrixInverse, translation, scaling, rotationX, rotationY, rotationZ };
//# sourceMappingURL=index.d.ts.map