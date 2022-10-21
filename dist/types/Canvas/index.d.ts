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
declare function addColors(color1: Color, color2: Color): Color;
declare function subtractColors(color1: Color, color2: Color): Color;
export { Color, addColors, subtractColors };
//# sourceMappingURL=index.d.ts.map