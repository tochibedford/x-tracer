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
function addColors(color1, color2) {
    return new Color(color1.red + color2.red, color1.green + color2.green, color1.blue + color2.blue);
}
function subtractColors(color1, color2) {
    return new Color(color1.red - color2.red, color1.green - color2.green, color1.blue - color2.blue);
}
export { Color, addColors, subtractColors };
//# sourceMappingURL=index.js.map