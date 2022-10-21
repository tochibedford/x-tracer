import { colorAdd, colorSubtract, Color, colorScalarProduct, coloMultiply } from "../index";

describe("Check that colors are red green and blue", ()=>{
    test("check that a color object is create properly", ()=>{
        const c = new Color(-0.5, 0.4, 1.7)
        expect(c.toArray()).toEqual([-0.5, 0.4, 1.7])
    })
})

describe("Color operations", ()=>{
    test("Adding Colors", ()=>{
        const color1 = new Color(0.9, 0.6, 0.75)
        const color2 = new Color(0.7, 0.1, 0.25)
        expect(colorAdd(color1, color2).toArray()).toEqual([1.6, 0.7, 1.0])
    })

    test("Subtracting Colors", ()=>{
        const color1 = new Color(0.9, 0.6, 0.75)
        const color2 = new Color(0.7, 0.1, 0.25)
        expect(colorSubtract(color1, color2).toArray()).toEqual([0.9-0.7, 0.6-0.1, 0.75-0.25])
    })

    test("Product of a scalar value and a color", ()=>{
        const color = new Color(0.2, 0.3, 0.4)
        expect(colorScalarProduct(color, 2).toArray()).toEqual([0.2*2, 0.3*2, 0.4*2])
    })

    test("Multiplying 2 colors: Hadamard/Schur Product", ()=>{
        const color1 = new Color(1, 0.2, 0.4)
        const color2 = new Color(0.9, 1, 0.1)

        expect(coloMultiply(color1, color2).toArray()).toEqual([0.9*1, 0.2*1, 0.4*0.1])
    })
})