class Color {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    toArray() {
        return [this.red, this.green, this.blue];
    }
}
function colorAdd(color1, color2) {
    return new Color(color1.red + color2.red, color1.green + color2.green, color1.blue + color2.blue);
}
function colorSubtract(color1, color2) {
    return new Color(color1.red - color2.red, color1.green - color2.green, color1.blue - color2.blue);
}
function colorScalarProduct(color1, factor) {
    return new Color(color1.red * factor, color1.green * factor, color1.blue * factor);
}
//hadamard product
function coloMultiply(color1, color2) {
    return new Color(color1.red * color2.red, color1.green * color2.green, color1.blue * color2.blue);
}
export { Color, colorAdd, colorSubtract, colorScalarProduct, coloMultiply };
//# sourceMappingURL=index.js.map