let seedPoints = [];
let x, y;

function setup() {
  createCanvas(800, 800);
  background(51);

  for (var i = 0; i < 3; i++) {
    seedPoints.push([
      random(width),
      random(height)
    ]);
  }

  stroke(255);
  strokeWeight(5);
  for (var seed of seedPoints) {
    point(seed[0], seed[1]);
  }

  x = random(width);
  y = random(height);
}

function draw() {
  strokeWeight(2);
  stroke(255, 0, 255);

  for(var i = 0; i < 10; i++) {
    point(x, y);
    let r = floor(random(seedPoints.length));
    x = lerp(x, seedPoints[r][0], 0.5);
    y = lerp(y, seedPoints[r][1], 0.5);
  }
}
