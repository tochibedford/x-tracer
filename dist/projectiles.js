import { Point, tupleSum, Vector } from "./index";
class Projectile {
    position;
    velocity;
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
}
class Environment {
    gravity;
    wind;
    constructor(gravity, wind) {
        this.gravity = gravity;
        this.wind = wind;
    }
}
function tick(env, proj) {
    proj.position = tupleSum(proj.position, proj.velocity);
    proj.velocity = tupleSum(proj.velocity, tupleSum(env.gravity, env.wind));
    return proj;
}
const p = new Projectile(new Point(0, 1, 0), new Vector(1, 1, 0));
const e = new Environment(new Vector(0, -0.1, 0), new Vector(-0.01, 0, 0));
for (let i = 0; i < 100; i++) {
    tick(e, p);
    console.log();
}
//# sourceMappingURL=projectiles.js.map