declare type Ttuple = {
    x: number;
    y: number;
    z: number;
    w: 0 | 1;
    components: () => number[];
    equals: (other: Ttuple) => boolean;
};
declare class Point implements Ttuple {
    x: number;
    y: number;
    z: number;
    w: 1;
    constructor(x: number, y: number, z: number);
    components: () => number[];
    equals: (other: Ttuple) => boolean;
}
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
export { tuple, tupleSum, tupleSubtract, negateTuple, scalarMult, scalarDiv, magnitude, normalize, Point, Vector, };
//# sourceMappingURL=index.d.ts.map