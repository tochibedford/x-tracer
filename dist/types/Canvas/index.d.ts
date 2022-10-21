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
declare class Color implements TColor {
    red: number;
    green: number;
    blue: number;
    constructor(red: number, green: number, blue: number);
    toArray(): number[];
}
declare function colorAdd(color1: Color, color2: Color): Color;
declare function colorSubtract(color1: Color, color2: Color): Color;
declare function colorScalarProduct(color1: Color, factor: number): Color;
declare function colorMultiply(color1: Color, color2: Color): Color;
declare class Canvas implements TCanvas {
    width: number;
    height: number;
    state: Color[][];
    constructor(width: number, height: number);
    toArray(): number[][][];
    toPPM(): void;
    writePixel(x: number, y: number, color: Color): void;
    pixelAt(x: number, y: number): Color;
}
export { Color, Canvas, colorAdd, colorSubtract, colorScalarProduct, colorMultiply };
//# sourceMappingURL=index.d.ts.map