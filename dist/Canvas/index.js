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
function colorMultiply(color1, color2) {
    return new Color(color1.red * color2.red, color1.green * color2.green, color1.blue * color2.blue);
}
class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.state = Array(this.height).fill(Array(this.width).fill(new Color(0, 0, 0)));
    }
    toArray() {
        return this.state.map(row => {
            return row.map(color => {
                return color.toArray();
            });
        });
    }
    toPPM() {
    }
    writePixel(x, y, color) {
        this.state[y][x] = color; // y is height-wise i.e rows of the array
    }
    pixelAt(x, y) {
        return this.state[y][x];
    }
}
export { Color, Canvas, colorAdd, colorSubtract, colorScalarProduct, colorMultiply };
//# sourceMappingURL=index.js.map