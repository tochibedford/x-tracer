import { replaceAt } from "../helpers.js"

type TColor = {
    red: number
    green: number
    blue: number
    toArray: () => number[]
}

type TCanvas = {
    width: number
    height: number
    toArray: () => number[][][]
    toPPM: () => void
    pixelAt: (x: number, y: number) => Color
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

    constructor(width: number, height: number, initalPixelValue: { r: number, g: number, b: number } = { r: 0, g: 0, b: 0 }) {
        this.width = width
        this.height = height
        this.state = []
        //filling up the canvas state array
        for (let j = 0; j < this.height; j++) {
            const row = []
            for (let i = 0; i < this.width; i++) {
                row.push(new Color(initalPixelValue.r, initalPixelValue.g, initalPixelValue.b))
            }
            this.state.push(row)
        }
    }

    toArray(): number[][][] {
        return this.state.map(row => {
            return row.map(color => {
                return color.toArray()
            })
        })
    }

    toPPM() {
        const ppmHeader = `P3\n${this.width} ${this.height}\n255\n`
        let ppmData = ""
        this.state.forEach((row: Color[]) => { // creates a new row unlimited line of ppm data and concatenates it to the main data
            let rowString = ""
            row.forEach((color: Color, index: number) => {
                if (index != row.length - 1) {
                    rowString += color.toArray().map((colorComponent: number) => {
                        return Math.max(0, Math.min(Math.round(colorComponent * 255), 255))
                    }).join(" ") + " "
                } else {
                    rowString += color.toArray().map((colorComponent: number) => {
                        return Math.max(0, Math.min(Math.round(colorComponent * 255), 255))
                    }).join(" ")

                }
            })
            rowString += "\n"
            ppmData += rowString
        })

        //ensures each line is 70 chars or below, and if the line is above 70 chars, it splits it without breaking a number
        const ppmMaxLineWidth = 70
        const ppmSplit = ppmData.split("\n")
        for (let i = 0; i < ppmSplit.length; i++) {
            if (ppmSplit[i].length > ppmMaxLineWidth) {
                ppmSplit[i] = replaceAt(ppmSplit[i], ppmSplit[i].lastIndexOf(" ", 70), "\n")
            }
        }

        ppmData = ppmSplit.join("\n")

        return ppmHeader + ppmData
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