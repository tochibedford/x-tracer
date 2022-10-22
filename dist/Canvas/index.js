import { replaceAt } from "../helpers.js";
/**
 * Class representing a color
 * @remarks It holds 3 number values ( preferrably in the range "0-1", but you can use any predetermined scale you want), corresponding to red, blue and green
 * @example
 * ```
 * const redColor = new Color(1, 0, 0)
 * redColor.toArray() // -> [1,0,0]
 * ```
 */
class Color {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    /**
     * Converts the Color object instance to an array
     * @returns an array of numbers representing the current state of the color instance
     */
    toArray() {
        return [this.red, this.green, this.blue];
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
function colorAdd(color1, color2) {
    return new Color(color1.red + color2.red, color1.green + color2.green, color1.blue + color2.blue);
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
function colorSubtract(color1, color2) {
    return new Color(color1.red - color2.red, color1.green - color2.green, color1.blue - color2.blue);
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
function colorScalarProduct(color1, factor) {
    return new Color(color1.red * factor, color1.green * factor, color1.blue * factor);
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
function colorMultiply(color1, color2) {
    return new Color(color1.red * color2.red, color1.green * color2.green, color1.blue * color2.blue);
}
class Canvas {
    constructor(width, height, initalPixelValue = { r: 0, g: 0, b: 0 }) {
        this.width = width;
        this.height = height;
        this.state = [];
        //filling up the canvas state array
        for (let j = 0; j < this.height; j++) {
            const row = [];
            for (let i = 0; i < this.width; i++) {
                row.push(new Color(initalPixelValue.r, initalPixelValue.g, initalPixelValue.b));
            }
            this.state.push(row);
        }
    }
    toArray() {
        return this.state.map(row => {
            return row.map(color => {
                return color.toArray();
            });
        });
    }
    toPPM() {
        const ppmHeader = `P3\n${this.width} ${this.height}\n255\n`;
        let ppmData = "";
        this.state.forEach((row) => {
            let rowString = "";
            row.forEach((color, index) => {
                if (index != row.length - 1) {
                    rowString += color.toArray().map((colorComponent) => {
                        return Math.max(0, Math.min(Math.round(colorComponent * 255), 255));
                    }).join(" ") + " ";
                }
                else {
                    rowString += color.toArray().map((colorComponent) => {
                        return Math.max(0, Math.min(Math.round(colorComponent * 255), 255));
                    }).join(" ");
                }
            });
            rowString += "\n";
            ppmData += rowString;
        });
        //ensures each line is 70 chars or below, and if the line is above 70 chars, it splits it without breaking a number
        const ppmMaxLineWidth = 70;
        const ppmSplit = ppmData.split("\n");
        for (let i = 0; i < ppmSplit.length; i++) {
            if (ppmSplit[i].length > ppmMaxLineWidth) {
                ppmSplit[i] = replaceAt(ppmSplit[i], ppmSplit[i].lastIndexOf(" ", 70), "\n");
            }
        }
        ppmData = ppmSplit.join("\n");
        return ppmHeader + ppmData;
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