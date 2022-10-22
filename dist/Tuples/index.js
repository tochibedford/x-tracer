/**
 * A class that implements the {@link Ttuple} base type and represents a literal point a a 3-Dimensional Coordinate system
 *
 * @example
 * ```
 * const point = new Point(4, -4, 3)
 * point.components() // -> [4, -4, 3, 1]
 * ```
 */
class Point {
    constructor(x, y, z) {
        /**
         * This method gives the current state of the point instance
         * @remarks This method returns 4 numbers, the first 3 representing the current position of the x,y,z coordinate system and a 4th number 'w' representing the fact that it is a Point and not a {@link Vector}
         * @returns An array containing of numbers representing the current state/position of the Point instance
         */
        this.components = () => {
            return [this.x, this.y, this.z, this.w];
        };
        /**
         * This method checks if the current point instance is identical to some other given point instance and that the other point is an instance of {@link Point}
         * @param other
         */
        this.equals = (other) => {
            if (this.x === other.x && this.y === other.y && this.z === other.z && other instanceof Point) {
                return true;
            }
            else {
                return false;
            }
        };
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 1;
    }
}
/**
 * A class that implements the {@link Ttuple} base type and represents a Vector a a 3-Dimensional Coordinate system
 */
class Vector {
    constructor(x, y, z) {
        this.components = () => {
            return [this.x, this.y, this.z, this.w];
        };
        this.cross = (other) => {
            return new Vector((this.y * other.z - this.z * other.y), -(this.x * other.z - this.z * other.x), (this.x * other.y - this.y * other.x));
        };
        this.dot = (other) => {
            return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
        };
        this.equals = (other) => {
            if (this.x === other.x && this.y === other.y && this.z === other.z && other instanceof Vector) {
                return true;
            }
            else {
                return false;
            }
        };
        this.negate = () => {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        };
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 0;
    }
}
function tuple(x, y, z, w) {
    if (w === 1) {
        return new Point(x, y, z);
    }
    else {
        return new Vector(x, y, z);
    }
}
function tupleSum(tuple1, tuple2) {
    if (tuple1 instanceof Point && tuple2 instanceof Point) {
        throw RangeError("Cannot add 2 Points; w becomes > 1");
    }
    return tuple(tuple1.x + tuple2.x, tuple1.y + tuple2.y, tuple1.z + tuple2.z, Math.abs(tuple1.w + tuple2.w));
}
function tupleSubtract(tuple1, tuple2) {
    if (tuple1 instanceof Vector && tuple2 instanceof Point) {
        throw RangeError("Cannot subtract Point from Vector; w becomes -1");
    }
    return tuple(tuple1.x - tuple2.x, tuple1.y - tuple2.y, tuple1.z - tuple2.z, Math.abs(tuple1.w - tuple2.w));
}
function negateTuple(tuple1) {
    return tuple(-tuple1.x, -tuple1.y, -tuple1.z, tuple1.w);
}
function scalarMult(tuple1, factor) {
    return tuple(tuple1.x * factor, tuple1.y * factor, tuple1.z * factor, tuple1.w);
}
function scalarDiv(tuple1, factor) {
    return tuple(tuple1.x / factor, tuple1.y / factor, tuple1.z / factor, tuple1.w);
}
function magnitude(tuple) {
    return Math.sqrt(tuple.components().reduce((prev, curr) => {
        prev += Math.pow(curr, 2);
        return prev;
    }, 0));
}
function normalize(tuple) {
    const tupleMag = magnitude(tuple);
    const [nX, nY, nZ] = tuple.components().map(component => {
        return component / tupleMag;
    });
    return new Vector(nX, nY, nZ);
}
export { tuple, tupleSum, tupleSubtract, negateTuple, scalarMult, scalarDiv, magnitude, normalize, Point, Vector, };
//# sourceMappingURL=index.js.map