class Point {
    x;
    y;
    z;
    w;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 1;
    }
    components = () => {
        return [this.x, this.y, this.z, this.w];
    };
    equals = (other) => {
        if (this.x === other.x && this.y === other.y && this.z === other.z && other instanceof Point) {
            return true;
        }
        else {
            return false;
        }
    };
}
class Vector {
    x;
    y;
    z;
    w;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 0;
    }
    components = () => {
        return [this.x, this.y, this.z, this.w];
    };
    cross = (other) => {
        return new Vector((this.y * other.z - this.z * other.y), -(this.x * other.z - this.z * other.x), (this.x * other.y - this.y * other.x));
    };
    dot = (other) => {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    };
    equals = (other) => {
        if (this.x === other.x && this.y === other.y && this.z === other.z && other instanceof Vector) {
            return true;
        }
        else {
            return false;
        }
    };
    negate = () => {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    };
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
        prev += curr ** 2;
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