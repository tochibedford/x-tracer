import { fEqual } from "../helpers"

/**
 * The tuple, is a base type for {@link Point}'s & {@link Vector}'s which are the building blocks for the classes in this module
 * @remarks It contains 4 components. x, y & z hold information to the coordinate system and w represents whether the tuple 
 * is a {@link Point} or a {@link Vector}, where w=1 in {@link Point} and w=0 in a {@link Vector}
 */
type Ttuple = {
    x: number
    y: number
    z: number
    w?: 0 | 1
    components: () => number[]
    equals: (other: Ttuple) => boolean
    negate: () => void
}

/**
 * A class that implements the {@link Ttuple} base type and represents a literal point a a 3-Dimensional Coordinate system
 * 
 * @example
 * ```
 * const point = new Point(4, -4, 3)
 * point.components() // -> [4, -4, 3, 1]
 * ```
 */
class Point implements Ttuple {
    x: number
    y: number
    z: number
    w: 1

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
        this.w = 1
    }

    /**
     * This method gives the current state of the point instance
     * @remarks This method returns 4 numbers, the first 3 representing the current position in the x,y,z coordinate system and a 4th number 'w' representing the fact that it is a Point and not a {@link Vector}
     * @returns An array containing of numbers representing the current state/position of the Point instance
     */
    components = () => {
        return [this.x, this.y, this.z, this.w]
    }

    /**
     * This method checks if the current point instance is identical to some other given point instance and that the other point is an instance of {@link Point}
     * @param other
     */
    equals = (other: Ttuple, EPS: number = 0.000001) => {
        const components = this.components()
        const otherComponents = other.components()
        if (other instanceof Point) {
            for (let i = 0; i < this.components().length; i++) {
                if (!fEqual(components[i], otherComponents[i], EPS)) {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    }

    /**
     * Negates the values of the components of the Point, except for component w
     */
    negate = () => {
        this.x = -this.x
        this.y = -this.y
        this.z = -this.z
    }
}

/**
 * A class that implements the {@link Ttuple} base type and represents a Vector a a 3-Dimensional Coordinate system
 */
class Vector implements Ttuple {
    x: number
    y: number
    z: number
    w: 0

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
        this.w = 0
    }

    /**
     * This method gives the current state of the vector instance
     * @remarks This method returns 4 numbers, the first 3 representing the current values of the x,y,z directions and a 4th number 'w' representing the fact that it is a Vector and not a {@link Point}
     * @returns An array containing of numbers representing the current state of the Vector instance
     */
    components = () => {
        return [this.x, this.y, this.z, this.w]
    }

    /**
     * Performs a cross multiplication of two tuples, mostly vectors
     * @param other The second tuple to cross multiply with
     * @returns A new vector that is the cross product of the other two vectors
     */
    cross = (other: Ttuple) => {
        return new Vector((this.y * other.z - this.z * other.y), -(this.x * other.z - this.z * other.x), (this.x * other.y - this.y * other.x))
    }

    /**
     * Performs a dot product operation on two tuples.
     * @param other The second tuple to peform a dot product with
     * @returns A number that is the result of the dot product of the two tuples
     */
    dot = (other: Ttuple): number => {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w
    }

    /**
     * Checks if the current vector instance is identical to some other given vector instance and that the other vector is an instance of {@link Vector}
     * @param other - Another tuple (Vector) to check for equality 
     */
    equals = (other: Ttuple, EPS: number = 0.000001) => {
        const components = this.components()
        const otherComponents = other.components()
        if (other instanceof Vector) {
            for (let i = 0; i < this.components().length; i++) {
                if (!fEqual(components[i], otherComponents[i], EPS)) {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    }

    /**
     * Negates the values of the components of the Vector, except for component w
     */
    negate = () => {
        this.x = -this.x
        this.y = -this.y
        this.z = -this.z
    }
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
function tuple(x: number, y: number, z: number, w: 0 | 1): Ttuple {
    if (w === 1) {
        return new Point(x, y, z)
    } else {
        return new Vector(x, y, z)
    }
}

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
function tupleSum(tuple1: Ttuple, tuple2: Ttuple): Ttuple {
    if (tuple1 instanceof Point && tuple2 instanceof Point) {
        throw RangeError("Cannot add 2 Points; w becomes > 1")
    }
    return tuple(tuple1.x + tuple2.x, tuple1.y + tuple2.y, tuple1.z + tuple2.z, Math.abs(tuple1.w + tuple2.w) as 0 | 1)
}

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
function tupleSubtract(tuple1: Ttuple, tuple2: Ttuple): Ttuple {
    if (tuple1 instanceof Vector && tuple2 instanceof Point) {
        throw RangeError("Cannot subtract Point from Vector; w becomes -1")
    }
    return tuple(tuple1.x - tuple2.x, tuple1.y - tuple2.y, tuple1.z - tuple2.z, Math.abs(tuple1.w - tuple2.w) as 0 | 1)
}

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
function negateTuple(tuple1: Ttuple): Ttuple {
    return tuple(-tuple1.x, -tuple1.y, -tuple1.z, tuple1.w)
}

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
function scalarMult(tuple1: Ttuple, factor: number) {
    return tuple(tuple1.x * factor, tuple1.y * factor, tuple1.z * factor, tuple1.w)
}

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
function scalarDiv(tuple1: Ttuple, factor: number) {
    return tuple(tuple1.x / factor, tuple1.y / factor, tuple1.z / factor, tuple1.w)
}

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
function magnitude(tuple: Ttuple): number {
    return Math.sqrt(tuple.components().reduce((prev, curr) => {
        prev += curr ** 2
        return prev
    }, 0))
}

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
function normalize(tuple: Ttuple): Ttuple {
    const tupleMag = magnitude(tuple)
    const [nX, nY, nZ] = tuple.components().map(component => {
        return component / tupleMag
    })
    return new Vector(nX, nY, nZ)
}

export {
    Ttuple,
    tuple,
    tupleSum,
    tupleSubtract,
    negateTuple,
    scalarMult,
    scalarDiv,
    magnitude,
    normalize,
    Point,
    Vector,
}
