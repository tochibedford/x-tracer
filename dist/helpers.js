const EPS = 0.0001;
function fEqual(a, b) {
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
export { fEqual, replaceAt };
//# sourceMappingURL=helpers.js.map