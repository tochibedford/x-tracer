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
    return new Color(+(color1.red + color2.red).toFixed(4), +(color1.green + color2.green).toFixed(4), +(color1.blue + color2.blue).toFixed(4));
}
function subtractColors(color1, color2) {
    return new Color(+(color1.red - color2.red).toFixed(4), +(color1.green - color2.green).toFixed(4), +(color1.blue - color2.blue).toFixed(4));
}
export { Color, addColors, subtractColors };
//# sourceMappingURL=index.js.map