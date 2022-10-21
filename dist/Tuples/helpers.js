const EPS = 0.0001;
function fEqual(a, b) {
    if (Math.abs(a - b) < EPS) {
        return true;
    }
    else {
        return false;
    }
}
export { fEqual };
//# sourceMappingURL=helpers.js.map