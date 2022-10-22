import { colorAdd, colorSubtract, Color, colorScalarProduct, colorMultiply, Canvas } from "../index";
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
        expect(colorAdd(color1, color2).toArray()).toEqual([1.6, 0.7, 1.0]);
    });
    test("Subtracting Colors", () => {
        const color1 = new Color(0.9, 0.6, 0.75);
        const color2 = new Color(0.7, 0.1, 0.25);
        expect(colorSubtract(color1, color2).toArray()).toEqual([0.9 - 0.7, 0.6 - 0.1, 0.75 - 0.25]);
    });
    test("Product of a scalar value and a color", () => {
        const color = new Color(0.2, 0.3, 0.4);
        expect(colorScalarProduct(color, 2).toArray()).toEqual([0.2 * 2, 0.3 * 2, 0.4 * 2]);
    });
    test("Multiplying 2 colors: Hadamard/Schur Product", () => {
        const color1 = new Color(1, 0.2, 0.4);
        const color2 = new Color(0.9, 1, 0.1);
        expect(colorMultiply(color1, color2).toArray()).toEqual([0.9 * 1, 0.2 * 1, 0.4 * 0.1]);
    });
});
describe("Canvas", () => {
    test("Creating a canvas", () => {
        const canvas = new Canvas(2, 2);
        expect(canvas.toArray()).toEqual([[[0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0]]]);
    });
    test("Writing pixels to a canvas", () => {
        const canvas = new Canvas(10, 20);
        const red = new Color(1, 0, 0);
        canvas.writePixel(2, 3, red);
        expect(canvas.pixelAt(2, 3).toArray()).toEqual(red.toArray());
    });
    test("Constructing a PPM header", () => {
        const canvas = new Canvas(5, 3);
        const ppm = canvas.toPPM();
        expect(ppm.split("\n").slice(0, 3)).toEqual(["P3", "5 3", "255"]);
    });
    test("Constructing PPM pixel data", () => {
        const canvas = new Canvas(5, 3);
        const color1 = new Color(1.5, 0, 0);
        const color2 = new Color(0, 0.5, 0);
        const color3 = new Color(-0.5, 0, 1);
        canvas.writePixel(0, 0, color1);
        canvas.writePixel(2, 1, color2);
        canvas.writePixel(4, 2, color3);
        const ppm = canvas.toPPM();
        const expected = "P3\n5 3\n255\n255 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 128 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 255\n";
        expect(ppm).toEqual(expected);
    });
    test("Checking that the line limit is actually 70", () => {
        const canvas = new Canvas(10, 2, { r: 1, g: 0.8, b: 0.6 });
        const ppm = canvas.toPPM();
        const expected = "P3\n10 2\n255\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153\n";
        expect(ppm).toEqual(expected);
    });
    test("Ensure that the ppm file is rterminated by a new line", () => {
        const canvas = new Canvas(5, 3);
        const ppm = canvas.toPPM();
        expect(ppm.charAt(ppm.length - 1)).toEqual("\n");
    });
});
//# sourceMappingURL=canvas.test.js.map