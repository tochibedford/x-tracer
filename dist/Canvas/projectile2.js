import { Point, Vector } from "../Tuples";
import { tick, Environment, Projectile } from "../Tuples/projectiles";
const position = new Point(0, 10, 0);
const velocity = new Vector(5, 0, 0);
const gravity = new Vector(0, -0.98, 0);
const wind = new Vector(-0.7, 0, 0);
const projectile = new Projectile(position, velocity);
const env = new Environment(gravity, wind);
for (let i = 0; i < 100; i++) {
    tick(env, projectile);
    console.log(projectile.position);
}
//# sourceMappingURL=projectile2.js.map