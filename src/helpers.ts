import { Point } from "./Tuples";

function fEqual(a: number, b: number, EPS: number = 0.0001) { // comparing 2 floating point numbers
    if (Math.abs(a - b) < EPS) {
        return true
    } else {
        return false
    }
}

function replaceAt(original: string, index: number, replacement: string) {
    return original.substring(0, index) + replacement + original.substring(index + replacement.length);
}

function dotProduct(array1: number[], array2: number[]) {
    if (array1.length !== array2.length) {
        throw Error("Both tuples/Arrays have to be the same length")
    }
    let sum = 0
    array1.forEach((num, index) => {
        sum += num * array2[index]
    })
    return sum
}

class Sphere {
    position: Point
    constructor() {
        //for now assume every sphere is positioned at origin -> 0,0,0
        this.position = new Point(0, 0, 0)
    }
}

export {
    fEqual,
    replaceAt,
    dotProduct,
    Sphere
}