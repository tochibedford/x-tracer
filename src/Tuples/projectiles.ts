import { Point, tupleSum, Vector } from "./index"

type TProjectile = {
    position: Point,
    velocity: Vector
}

type TEnvironment = {
    gravity: Vector,
    wind: Vector
}

class Projectile implements TProjectile {
    position: Point
    velocity: Vector

    constructor(position: Point, velocity: Vector) {
        this.position = position
        this.velocity = velocity
    }
}

class Environment implements TEnvironment {
    gravity: Vector
    wind: Vector
    
    constructor(gravity: Vector, wind: Vector){
        this.gravity = gravity
        this.wind = wind 
    }
}

function tick(env: Environment, proj: Projectile): Projectile { 
    proj.position =  tupleSum(proj.position, proj.velocity) as Point
    proj.velocity = tupleSum(proj.velocity, tupleSum(env.gravity, env.wind)) as Vector
    return proj
}

const p = new Projectile(new Point(0,1,0), new Vector(1,1,0))
const e = new Environment(new Vector(0,-0.1,0), new Vector(-0.01,0,0))

for (let i=0; i<100; i++) {
    tick(e, p)
    console.log()
} 