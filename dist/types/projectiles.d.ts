import { Point, Vector } from "./index";
declare type TProjectile = {
    position: Point;
    velocity: Vector;
};
declare type TEnvironment = {
    gravity: Vector;
    wind: Vector;
};
declare class Projectile implements TProjectile {
    position: Point;
    velocity: Vector;
    constructor(position: Point, velocity: Vector);
}
declare class Environment implements TEnvironment {
    gravity: Vector;
    wind: Vector;
    constructor(gravity: Vector, wind: Vector);
}
declare function tick(env: Environment, proj: Projectile): Projectile;
export { Projectile, Environment, tick };
//# sourceMappingURL=projectiles.d.ts.map