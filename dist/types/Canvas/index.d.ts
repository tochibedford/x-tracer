declare type TColor = {
    red: number;
    green: number;
    blue: number;
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
declare function coloMultiply(color1: Color, color2: Color): Color;
export { Color, colorAdd, colorSubtract, colorScalarProduct, coloMultiply };
//# sourceMappingURL=index.d.ts.map