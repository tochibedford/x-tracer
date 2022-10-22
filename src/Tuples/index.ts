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
    components: () => number[],
    equals: (other: Ttuple) => boolean
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
     * @remarks This method returns 4 numbers, the first 3 representing the current position of the x,y,z coordinate system and a 4th number 'w' representing the fact that it is a Point and not a {@link Vector}
     * @returns An array containing of numbers representing the current state/position of the Point instance
     */
    components = () => {
        return [this.x, this.y, this.z, this.w]
    }

    /**
     * This method checks if the current point instance is identical to some other given point instance and that the other point is an instance of {@link Point}
     * @param other
     */
    equals = (other: Ttuple) => {
        if (this.x === other.x && this.y === other.y && this.z === other.z && other instanceof Point) {
            return true
        } else {
            return false
        }
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

    components = () => {
        return [this.x, this.y, this.z, this.w]
    }

    cross = (other: Ttuple) => {
        return new Vector((this.y * other.z - this.z * other.y), -(this.x * other.z - this.z * other.x), (this.x * other.y - this.y * other.x))
    }

    dot = (other: Ttuple): number => {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w
    }

    equals = (other: Ttuple) => {
        if (this.x === other.x && this.y === other.y && this.z === other.z && other instanceof Vector) {
            return true
        } else {
            return false
        }
    }

    negate = () => {
        this.x = -this.x
        this.y = -this.y
        this.z = -this.z
    }
}

function tuple(x: number, y: number, z: number, w: 0 | 1): Ttuple {
    if (w === 1) {
        return new Point(x, y, z)
    } else {
        return new Vector(x, y, z)
    }
}

function tupleSum(tuple1: Ttuple, tuple2: Ttuple): Ttuple {
    if (tuple1 instanceof Point && tuple2 instanceof Point) {
        throw RangeError("Cannot add 2 Points; w becomes > 1")
    }
    return tuple(tuple1.x + tuple2.x, tuple1.y + tuple2.y, tuple1.z + tuple2.z, Math.abs(tuple1.w + tuple2.w) as 0 | 1)
}

function tupleSubtract(tuple1: Ttuple, tuple2: Ttuple): Ttuple {
    if (tuple1 instanceof Vector && tuple2 instanceof Point) {
        throw RangeError("Cannot subtract Point from Vector; w becomes -1")
    }
    return tuple(tuple1.x - tuple2.x, tuple1.y - tuple2.y, tuple1.z - tuple2.z, Math.abs(tuple1.w - tuple2.w) as 0 | 1)
}

function negateTuple(tuple1: Ttuple): Ttuple {
    return tuple(-tuple1.x, -tuple1.y, -tuple1.z, tuple1.w)
}

function scalarMult(tuple1: Ttuple, factor: number) {
    return tuple(tuple1.x * factor, tuple1.y * factor, tuple1.z * factor, tuple1.w)
}

function scalarDiv(tuple1: Ttuple, factor: number) {
    return tuple(tuple1.x / factor, tuple1.y / factor, tuple1.z / factor, tuple1.w)
}

function magnitude(tuple: Ttuple): number {
    return Math.sqrt(tuple.components().reduce((prev, curr) => {
        prev += curr ** 2
        return prev
    }, 0))
}

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
