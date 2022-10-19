const EPS = 0.0001
function fEqual (a: number, b: number) { // comparing 2 floating point numbers
    if (Math.abs(a-b) < EPS){
        return true
    }else {
        return false
    }
}

export {
    fEqual
}