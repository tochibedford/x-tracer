import { tupleSum } from "./index";
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
export { Projectile, Environment, tick };
//# sourceMappingURL=projectiles.js.map