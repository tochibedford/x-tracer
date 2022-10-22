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

/**
 * Class representing a color
 * @remarks It holds 3 number values ( preferrably in the range "0-1", but you can use any predetermined scale you want), corresponding to red, blue and green
 * @example 
 * ```
 * const redColor = new Color(1, 0, 0)
 * redColor.toArray() // -> [1,0,0] 
 * ```
 */
class Color implements TColor {
    red: number
    green: number
    blue: number
    constructor(red: number, green: number, blue: number) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    /**
     * Converts the Color object instance to an array
     * @returns an array of numbers representing the current state of the color instance
     */
    toArray(): number[] {
        return [this.red, this.green, this.blue]
    }
}

/**
 * Sums 2 color objects
 * @param color1 
 * @param color2 
 * @returns A new color object thats the sum of color1 and color2
 * 
 * @example
 * ```
 * const color1 = new Color(0.9, 0.6, 0.75)
 * const color2 = new Color(0.7, 0.1, 0.25)
 * colorAdd(color1, color2).toArray() // -> [1.6, 0.7, 1.0]
 * ```
 */
function colorAdd(color1: Color, color2: Color) {
    return new Color(color1.red + color2.red, color1.green + color2.green, color1.blue + color2.blue)
}

/**
 * Finds the difference of 2 color objects 
 * @param color1 
 * @param color2 
 * @returns A new color object thats the difference of color1 and color2
 * 
 * @example
 * const color1 = new Color(0.5, 0.6, 0.75)
 * const color2 = new Color(0.1, 0.1, 0.25)
 * colorSubtract(color1, color2).toArray() // -> [0.4, 0.5, 0.5]
 */
function colorSubtract(color1: Color, color2: Color) {
    return new Color(color1.red - color2.red, color1.green - color2.green, color1.blue - color2.blue)
}

/**
 * Scalar multiplication of a Color object by a factor
 * @param color1 
 * @param factor 
 * @returns A new color object thats been scaled by the given factor
 * 
 * @example
 * ```
 * const color = new Color(0.2, 0.3, 0.4)
 * colorScalarProduct(color, 2).toArray() // -> [0.4, 0.6, 0.8]
 * ```
 */
function colorScalarProduct(color1: Color, factor: number) {
    return new Color(color1.red * factor, color1.green * factor, color1.blue * factor)
}

/**
 * Finds the Hadamard/Schur product of 2 colors
 * @param color1 
 * @param color2 
 * @returns A new color object thats the result of the Hadamard/Schur product of the 2 Colors
 * 
 * @example
 * ```
 * const color1 = new Color(0.5, 0.2, 0.4)
 * const color2 = new Color(0.9, 1, 0.3)
 *  
 * colorMultiply(color1, color2).toArray() // -> [0.45, 0.2, 0.12]
 * ```
 */
function colorMultiply(color1: Color, color2: Color) {
    return new Color(color1.red * color2.red, color1.green * color2.green, color1.blue * color2.blue)
}

/**
 * Class representing a canvas
 * A canvas is a simply a collection of pixels/colors.
 * It may be more accurate to think of this canvas class as a container for a 2D array of colors, where each color represents a pixel that will display in a image.
 * @remarks It is instantiated with  width and height and an optional default color for every pixel. Leaving the initial pixel value unset, will fall back on a default of Color(0, 0, 0)/black for every pixel.
 * @example We can instantiate a 2 x 2 canvas like so:
 * ```
 * const canvas = new Canvas(2, 2)
 * canvas.toArray() 
 * 
 * ///output
 * [
 *  [[0,0,0], [0,0,0]], 
 *  [[0,0,0], [0,0,0]]
 * ]
 * ```
 * When you look at it in this array form it actually looks more like a 3D array with the dimension 2 x 2 x 3. The third Dimension '3' is actually for the R, G & B channel values
 */
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
    
    /**
     * Th `toArray` Method converts the Canvas to a 3D array with dimension `width x height x 3`
     * @returns A 3-dimensional number array. 
     */
    toArray(): number[][][] {
        return this.state.map(row => {
            return row.map(color => {
                return color.toArray()
            })
        })
    }

    /**
     * Converts the canvas to a string formatted according to the [PPM Netpbm color image format](https://netpbm.sourceforge.net/doc/ppm.html) formatted
     * @remarks The flavour of PPM used here is plain P3 and not the P6 format.You can read more about the PPM format [here](https://netpbm.sourceforge.net/doc/ppm.html) 
     * @returns A string formatted in the PPM P3 flavour that can be directly output to a file.
     */
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

    /**
     * Writes a color value to a pixel at the given x, y coordinate
     * @param x - X coordinate value
     * @param y - X coordinate value
     * @param color - Color object to write to the Canvas pixel
     */
    writePixel(x: number, y: number, color: Color) {
        this.state[y][x] = color // y is height-wise i.e rows of the array
    }

    /**
     * Reads the color value at a given coordinate value
     * @param x - X coordinate value to read from
     * @param y - Y coordinate value to read from
     * @returns A {@link Color} object
     */
    pixelAt(x: number, y: number) {
        return this.state[y][x]
    }

}

export {
    TCanvas,
    TColor,
    Color,
    Canvas,
    colorAdd,
    colorSubtract,
    colorScalarProduct,
    colorMultiply
}