function fEqual(a, b, EPS = 0.0001) {
    if (Math.abs(a - b) < EPS) {
        return true;
    }
    else {
        return false;
    }
}
function replaceAt(original, index, replacement) {
    return original.substring(0, index) + replacement + original.substring(index + replacement.length);
}
function dotProduct(array1, array2) {
    if (array1.length !== array2.length) {
        throw Error("Both tuples/Arrays have to be the same length");
    }
    let sum = 0;
    array1.forEach((num, index) => {
        sum += num * array2[index];
    });
    return sum;
}
export { fEqual, replaceAt, dotProduct };
//# sourceMappingURL=helpers.js.map