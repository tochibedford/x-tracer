declare type TColor = {
    red: number;
    green: number;
    blue: number;
    toArray: () => number[];
};
declare type TCanvas = {
    width: number;
    height: number;
    toArray: () => number[][][];
    toPPM: () => void;
    pixelAt: (x: number, y: number) => Color;
    writePixel: (x: number, y: number, color: Color) => void;
};
/**
 * Class representing a color
 * @remarks It holds 3 number values ( preferrably in the range "0-1", but you can use any predetermined scale you want), corresponding to red, blue and green
 * @example
 * ```
 * const redColor = new Color(1, 0, 0)
 * redColor.toArray() // -> [1,0,0]
 * ```
 */
declare class Color implements TColor {
    red: number;
    green: number;
    blue: number;
    constructor(red: number, green: number, blue: number);
    /**
     * Converts the Color object instance to an array
     * @returns an array of numbers representing the current state of the color instance
     */
    toArray(): number[];
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
declare function colorAdd(color1: Color, color2: Color): Color;
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
declare function colorSubtract(color1: Color, color2: Color): Color;
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
declare function colorScalarProduct(color1: Color, factor: number): Color;
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
declare function colorMultiply(color1: Color, color2: Color): Color;
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
declare class Canvas implements TCanvas {
    width: number;
    height: number;
    state: Color[][];
    constructor(width: number, height: number, initalPixelValue?: {
        r: number;
        g: number;
        b: number;
    });
    /**
     * Th `toArray` Method converts the Canvas to a 3D array with dimension `width x height x 3`
     * @returns A 3-dimensional number array.
     */
    toArray(): number[][][];
    /**
     * Converts the canvas to a string formatted according to the [PPM Netpbm color image format](https://netpbm.sourceforge.net/doc/ppm.html) formatted
     * @remarks The flavour of PPM used here is plain P3 and not the P6 format.You can read more about the PPM format [here](https://netpbm.sourceforge.net/doc/ppm.html)
     * @returns A string formatted in the PPM P3 flavour that can be directly output to a file.
     */
    toPPM(): string;
    /**
     * Writes a color value to a pixel at the given x, y coordinate
     * @param x - X coordinate value
     * @param y - X coordinate value
     * @param color - Color object to write to the Canvas pixel
     */
    writePixel(x: number, y: number, color: Color): void;
    /**
     * Reads the color value at a given coordinate value
     * @param x - X coordinate value to read from
     * @param y - Y coordinate value to read from
     * @returns A {@link Color} object
     */
    pixelAt(x: number, y: number): Color;
}
export { TCanvas, TColor, Color, Canvas, colorAdd, colorSubtract, colorScalarProduct, colorMultiply };
//# sourceMappingURL=index.d.ts.map