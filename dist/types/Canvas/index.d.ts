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
declare class Canvas implements TCanvas {
    width: number;
    height: number;
    state: Color[][];
    constructor(width: number, height: number, initalPixelValue?: {
        r: number;
        g: number;
        b: number;
    });
    toArray(): number[][][];
    toPPM(): string;
    writePixel(x: number, y: number, color: Color): void;
    pixelAt(x: number, y: number): Color;
}
export { TCanvas, TColor, Color, Canvas, colorAdd, colorSubtract, colorScalarProduct, colorMultiply };
//# sourceMappingURL=index.d.ts.map