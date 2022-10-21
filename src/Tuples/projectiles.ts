import { Point, tupleSum, Vector } from "./index.js"

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

    constructor(gravity: Vector, wind: Vector) {
        this.gravity = gravity
        this.wind = wind
    }
}

function tick(env: Environment, proj: Projectile): Projectile {
    proj.position = tupleSum(proj.position, proj.velocity) as Point
    proj.velocity = tupleSum(proj.velocity, tupleSum(env.gravity, env.wind)) as Vector
    return proj
}

export {
    Projectile,
    Environment,
    tick
}