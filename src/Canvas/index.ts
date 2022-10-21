type TColor = {
    red: number
    green: number
    blue: number
    toArray: ()=>number[]
}

type TCanvas = {
    width: number
    height: number
    toArray: ()=>number[][][]
    toPPM: ()=>void
    pixelAt: (x: number, y: number)=>Color
    writePixel: (x: number, y: number, color: Color) => void
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

    toArray(): number[] {
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
function colorMultiply(color1: Color, color2: Color) {
    return new Color(color1.red * color2.red, color1.green * color2.green, color1.blue * color2.blue)
}

class Canvas implements TCanvas {
    width: number
    height: number
    state: Color[][]

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.state = Array(this.height).fill(Array(this.width).fill(new Color(0, 0, 0)))
    }

    toArray(): number[][][] {
        return this.state.map(row => {
            return row.map(color => {
                return color.toArray()
            })
        })
    }

    toPPM () {
        return `P3\n${this.width} ${this.height}\n255\n`
    }
    
    writePixel(x: number, y: number, color: Color) {
        this.state[y][x] = color // y is height-wise i.e rows of the array
    }

    pixelAt(x: number, y: number) {
        return this.state[y][x]
    }
    
}

export {
    Color,
    Canvas,
    colorAdd,
    colorSubtract,
    colorScalarProduct,
    colorMultiply
}