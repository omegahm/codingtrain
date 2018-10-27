var points = [];
var current;
var scl = 20;

function setup() {
  createCanvas(1280, 960);

  current = createVector(height / 2, width / 2);
  points.push(current);
}

function draw() {
  background(51);

  stroke(50, 150, 255);
  strokeWeight(scl / 2);
  noFill();
  beginShape();
  points.forEach((p) => vertex(p.x, p.y));
  endShape();

  current = createVector(current.x, current.y);
  var dir = floor(random(4));
  switch (dir) {
    case 0:
      current.y -= scl;
      break;
    case 1:
      current.x += scl;
      break;
    case 2:
      current.y += scl;
      break;
    case 3:
      current.x -= scl;
      break;
  }

  current.x = constrain(current.x, 0, width);
  current.y = constrain(current.y, 0, height);

  fill(255, 0, 0);
  noStroke();
  ellipse(current.x, current.y, scl / 2, scl / 2);

  points.push(current);
}
