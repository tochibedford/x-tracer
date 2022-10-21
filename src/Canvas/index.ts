type TColor = {
    red: number
    green: number
    blue: number
}

class Color implements TColor {
    red: number
    green: number
    blue: number
    constructor(red: number, green: number, blue: number) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    toArray(): number[]{
        return [this.red, this.green, this.blue]
    } 
}

function colorAdd(color1: Color, color2: Color) {
    return new Color(color1.red + color2.red, color1.green + color2.green, color1.blue + color2.blue)
}

function colorSubtract(color1: Color, color2: Color) {
    return new Color(color1.red - color2.red, color1.green - color2.green, color1.blue - color2.blue)
}

function colorScalarProduct(color1: Color, factor: number) {
    return new Color(color1.red * factor, color1.green * factor, color1.blue * factor)
}

//hadamard product
function coloMultiply(color1: Color, color2: Color){
    return new Color(color1.red * color2.red, color1.green * color2.green, color1.blue * color2.blue)
}

export {
    Color,
    colorAdd,
    colorSubtract,
    colorScalarProduct,
    coloMultiply
}