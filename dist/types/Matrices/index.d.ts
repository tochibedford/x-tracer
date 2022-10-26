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
    equals(matrix: Matrix): boolean;
    /**
     * The dimensions of the matrix in the format [rows, columns]
     */
    get dimensions(): [number, number];
}
export { Matrix };
//# sourceMappingURL=index.d.ts.map