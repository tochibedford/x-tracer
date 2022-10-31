/**
 * The tuple, is a base type for {@link Point}'s & {@link Vector}'s which are the building blocks for the classes in this module
 * @remarks It contains 4 components. x, y & z hold information to the coordinate system and w represents whether the tuple
 * is a {@link Point} or a {@link Vector}, where w=1 in {@link Point} and w=0 in a {@link Vector}
 */
declare type Ttuple = {
    x: number;
    y: number;
    z: number;
    w?: 0 | 1;
    components: () => number[];
    equals: (other: Ttuple) => boolean;
    negate: () => void;
};
/**
 * A class that implements the {@link Ttuple} base type and represents a literal point a a 3-Dimensional Coordinate system
 *
 * @example
 * ```
 * const point = new Point(4, -4, 3)
 * point.components() // -> [4, -4, 3, 1]
 * ```
 */
declare class Point implements Ttuple {
    x: number;
    y: number;
    z: number;
    w: 1;
    constructor(x: number, y: number, z: number);
    /**
     * This method gives the current state of the point instance
     * @remarks This method returns 4 numbers, the first 3 representing the current position in the x,y,z coordinate system and a 4th number 'w' representing the fact that it is a Point and not a {@link Vector}
     * @returns An array containing of numbers representing the current state/position of the Point instance
     */
    components: () => number[];
    /**
     * This method checks if the current point instance is identical to some other given point instance and that the other point is an instance of {@link Point}
     * @param other
     */
    equals: (other: Ttuple, EPS?: number) => boolean;
    /**
     * Negates the values of the components of the Point, except for component w
     */
    negate: () => void;
}
/**
 * A class that implements the {@link Ttuple} base type and represents a Vector a a 3-Dimensional Coordinate system
 */
declare class Vector implements Ttuple {
    x: number;
    y: number;
    z: number;
    w: 0;
    constructor(x: number, y: number, z: number);
    /**
     * This method gives the current state of the vector instance
     * @remarks This method returns 4 numbers, the first 3 representing the current values of the x,y,z directions and a 4th number 'w' representing the fact that it is a Vector and not a {@link Point}
     * @returns An array containing of numbers representing the current state of the Vector instance
     */
    components: () => number[];
    /**
     * Performs a cross multiplication of two tuples, mostly vectors
     * @param other The second tuple to cross multiply with
     * @returns A new vector that is the cross product of the other two vectors
     */
    cross: (other: Ttuple) => Vector;
    /**
     * Performs a dot product operation on two tuples.
     * @param other The second tuple to peform a dot product with
     * @returns A number that is the result of the dot product of the two tuples
     */
    dot: (other: Ttuple) => number;
    /**
     * Checks if the current vector instance is identical to some other given vector instance and that the other vector is an instance of {@link Vector}
     * @param other - Another tuple (Vector) to check for equality
     */
    equals: (other: Ttuple, EPS?: number) => boolean;
    /**
     * Negates the values of the components of the Vector, except for component w
     */
    negate: () => void;
}
/**
 * A factory function that creates either a tuple that is either a {@link Vector} or a {@link Point}
 * if w is equal to 1 it returns a point else it will return a vector
 * @param x Component x
 * @param y Component y
 * @param z Component z
 * @param w Component w
 * @returns A tuple that is either a Vector or a Point
 */
declare function tuple(x: number, y: number, z: number, w: 0 | 1): Ttuple;
/**
 * Produces the sum of two tuples, the 2 tuples can be of any kind but both cannot be a {@link Point} at the same time
 * Point + Vector -> Point
 * Vector + Vector -> Vector
 * Point + Point -/- invalid
 *
 * @example
 * ```
 * const point = tuple(3, -2, 5, 1)
 * const vector = tuple(-2, 3, 1, 0)
 * tupleSum(point, vector).components() //->[1,1,6,1]
 * ```
 * @param tuple1 Tuple to sum
 * @param tuple2 Tuple to sum
 * @returns A new tuple that
 * @throws RangeError - Thrown if user attempts to add two Points
 */
declare function tupleSum(tuple1: Ttuple, tuple2: Ttuple): Ttuple;
/**
 * Produces the sum of two tuples, the 2 tuples can be of any kind but a {@link Point} cannot be subtracted from a {@link Vector}
 * Point - Vector -> Point
 * Vector - Vector -> Vector
 * Point - Point -> Vector
 * Vector - Point -/- invalid
 * @example
 * ```
 * const point1 = new Point(3, 2, 1)
 * const point2 = new Point(5, 6, 7)
 * tupleSubtract(point1, point2).components() //-> [-2, -4, -6, 0]
 * ```
 * @param tuple1 Tuple to subtract from
 * @param tuple2 Tuple to subtract
 * @returns A tuple that is the result of the differece between tuple1 & tuple2 (tuple1-tuple2)
 *
 * @throws RangeError - Thrown if user is attempting to subtract a Point from a Vector i.e (Vector-Point)
 */
declare function tupleSubtract(tuple1: Ttuple, tuple2: Ttuple): Ttuple;
/**
 * Negates the values of the components of a tuple, except for component w.
 * This can be used where you do not want the negation to affect the original tuple but rather to produce a new, negated tuple
 * @example
 * ```
 * const vector = tuple(1, -2, 3, 0) as Vector
 * negateTuple(vector).components() // [-1, 2, -3, 0]
 * ```
 * @param tuple1 Tuple to negate
 * @returns A tuple that is the result of negating the components (besides w) of a given tuple
 */
declare function negateTuple(tuple1: Ttuple): Ttuple;
/**
 * Performs a scalar multiplication on a tuple by a given factor.
 * @example
 * ```
 * const vector = tuple(1, -2, 3, 0) as Vector
 * scalarMult(vector, 3.5).components() //-> [3.5, -7, 10.5, 0]
 * ```
 * @param tuple1 Tuple to scale
 * @param factor Factor by which to multiply the components of the tuple
 * @returns A new tuple with its components scaled by a given factor
 */
declare function scalarMult(tuple1: Ttuple, factor: number): Ttuple;
/**
 * Performs a scalar division on a tuple by a given factor.
 * @example
 * ```
 * const vector = tuple(1, -2, 3, 0) as Vector
 * scalarDiv(vector, 2).components() //-> [0.5, -1, 1.5, 0]
 * ```
 * @param tuple1 Tuple to scale
 * @param factor Factor by which to divide the components of the tuple
 * @returns A new tuple with its components scaled by a given factor
 */
declare function scalarDiv(tuple1: Ttuple, factor: number): Ttuple;
/**
 * Produces the magnitude of the given tuple
 * @example
 * ```
 * const vector = new Vector(1, 2, 3)
 * magnitude(vector) //-> 3.7416573867739413
 * ```
 * @param tuple Tuple to find magnitude of
 * @returns A number that represents the magnitude of the given tuple
 */
declare function magnitude(tuple: Ttuple): number;
/**
 * Normalizes the components of a vector such that its magnitude is now 1.
 * @example
 * ```
 * const vector = new Vector(4, 0, 0)
 * normalize(vector1).components() //-> [1, 0, 0, 0]
 * ```
 * @param tuple Tuple to normalize
 * @returns A new normalized Vector
 */
declare function normalize(tuple: Ttuple): Ttuple;
export { Ttuple, tuple, tupleSum, tupleSubtract, negateTuple, scalarMult, scalarDiv, magnitude, normalize, Point, Vector, };
//# sourceMappingURL=index.d.ts.map