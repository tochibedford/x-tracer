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
     * @remarks This method returns 4 numbers, the first 3 representing the current position of the x,y,z coordinate system and a 4th number 'w' representing the fact that it is a Point and not a {@link Vector}
     * @returns An array containing of numbers representing the current state/position of the Point instance
     */
    components: () => number[];
    /**
     * This method checks if the current point instance is identical to some other given point instance and that the other point is an instance of {@link Point}
     * @param other
     */
    equals: (other: Ttuple) => boolean;
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
    components: () => number[];
    cross: (other: Ttuple) => Vector;
    dot: (other: Ttuple) => number;
    equals: (other: Ttuple) => boolean;
    negate: () => void;
}
declare function tuple(x: number, y: number, z: number, w: 0 | 1): Ttuple;
declare function tupleSum(tuple1: Ttuple, tuple2: Ttuple): Ttuple;
declare function tupleSubtract(tuple1: Ttuple, tuple2: Ttuple): Ttuple;
declare function negateTuple(tuple1: Ttuple): Ttuple;
declare function scalarMult(tuple1: Ttuple, factor: number): Ttuple;
declare function scalarDiv(tuple1: Ttuple, factor: number): Ttuple;
declare function magnitude(tuple: Ttuple): number;
declare function normalize(tuple: Ttuple): Ttuple;
export { Ttuple, tuple, tupleSum, tupleSubtract, negateTuple, scalarMult, scalarDiv, magnitude, normalize, Point, Vector, };
//# sourceMappingURL=index.d.ts.map