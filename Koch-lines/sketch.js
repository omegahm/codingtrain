class KochLine {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.color = color(random(1, 255), random(1, 255), random(1, 255));
  }

  show() {
    stroke(this.color);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  split() {
    // Find the five new points
    let a = this.start.copy();
    let b = p5.Vector.sub(this.end, this.start).div(3).add(this.start);
    let c = p5.Vector.sub(this.end, this.start).div(3).rotate(radians(-60)).add(b);
    let d = p5.Vector.sub(this.end, this.start).div(3).mult(2).add(this.start);
    let e = this.end.copy();
    return [a, b, c, d, e];
  }
}

var kochlines = [];
var iterations = 0;

function setup() {
  createCanvas(windowWidth-10, windowHeight-20);
  kochlines.push(new KochLine(createVector(width / 8, 3 * height / 4), createVector(7 * width / 8, 3 * height / 4)));
}

function keyPressed(event) {
  if (event.key === " ") {
    iterations++;

    var newKochlines = [];
    if (iterations % 5 == 0) {
      newKochlines.push(new KochLine(createVector(width / 8, 3 * height / 4), createVector(7 * width / 8, 3 * height / 4)));
    } else {
      for (k of kochlines) {
        let sp = k.split();
        newKochlines.push(new KochLine(sp[0], sp[1]));
        newKochlines.push(new KochLine(sp[1], sp[2]));
        newKochlines.push(new KochLine(sp[2], sp[3]));
        newKochlines.push(new KochLine(sp[3], sp[4]));
      }
    }

    kochlines = newKochlines;
  }
}

function draw() {
  background(51);
  strokeWeight(5);
  for (k of kochlines) {
    k.show();
  }
}
