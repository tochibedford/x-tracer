import { Vector, Point } from "../../dist/Tuples/index.js";
import {
  Projectile,
  Environment,
  tick,
} from "../../dist/Tuples/projectiles.js";
import { Color, Canvas } from "../../dist/Canvas/index.js";

function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();
}

const htmlCanvas = document.querySelector(".canvas");
const downloadButton = document.querySelector(".download");

downloadButton.addEventListener("click", () => {
  download("canvas.PPM", canvas.toPPM());
});

const p = new Projectile(new Point(0, 1, 0), new Vector(5, 1, 0));
const e = new Environment(new Vector(0, -0.1, 0), new Vector(-0.01, 0, 0));

const redColor = new Color(1, 0, 0);
const canvas = new Canvas(500, 500);

for (let i = 0; i < 100; i++) {
  canvas.writePixel(
    Math.round(p.position.x),
    Math.abs(500 - (Math.round(p.position.y) + 400)),
    redColor
  );
  tick(e, p); // moves in the form of a projectile
}
