import { Vector, Point } from "../../dist/Tuples/index.js";
import { Projectile, Environment, tick } from "../../dist/Tuples/projectiles.js"


const p = new Projectile(new Point(0,1,0), new Vector(1,1,0))
const e = new Environment(new Vector(0,-0.1,0), new Vector(-0.01,0,0))

for (let i=0; i<100; i++) {
    console.log(p.position)
    tick(e, p) // moves in the form of a projectile
} 