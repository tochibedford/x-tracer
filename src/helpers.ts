const EPS = 0.0001
function fEqual (a: number, b: number) { // comparing 2 floating point numbers
    if (Math.abs(a-b) < EPS){
        return true
    }else {
        return false
    }
}

function replaceAt(original: string, index: number, replacement: string) {
    return original.substring(0, index) + replacement + original.substring(index + replacement.length);
}

export {
    fEqual,
    replaceAt
}