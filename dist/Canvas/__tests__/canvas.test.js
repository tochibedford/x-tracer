import { addColors, subtractColors, Color } from "../index";
describe("Check that colors are red green and blue", () => {
    test("check that a color object is create properly", () => {
        const c = new Color(-0.5, 0.4, 1.7);
        expect(c.toArray()).toEqual([-0.5, 0.4, 1.7]);
    });
});
describe("Color operations", () => {
    test("Adding Colors", () => {
        const color1 = new Color(0.9, 0.6, 0.75);
        const color2 = new Color(0.7, 0.1, 0.25);
        expect(addColors(color1, color2).toArray()).toEqual([1.6, 0.7, 1.0]);
    });
    test("Subtracting Colors", () => {
        const color1 = new Color(0.9, 0.6, 0.75);
        const color2 = new Color(0.7, 0.1, 0.25);
        expect(subtractColors(color1, color2).toArray()).toEqual([0.9 - 0.7, 0.6 - 0.1, 0.75 - 0.25]);
    });
});
//# sourceMappingURL=canvas.test.js.map