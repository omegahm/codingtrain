function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let x, y, dir;

let ANT_UP = 0;
let ANT_RIGHT = 1;
let ANT_DOWN = 2;
let ANT_LEFT = 3;

function setup() {
  createCanvas(window.displayWidth-20, window.displayHeight-200);
  grid = make2DArray(width, height);
  x = width / 2;
  y = height / 2;
  dir = ANT_UP;
  noFill();
  stroke(0);
  rect(0, 0, width - 1, height - 1);
}

function turnRight() {
  dir++;
  dir %= 4;
}

function turnLeft() {
  dir--;
  if (dir < ANT_UP) {
    dir = ANT_LEFT;
  }
}

function moveForward() {
  if (dir == ANT_UP) {
    y--;
  } else if (dir == ANT_RIGHT) {
    x++;
  } else if (dir == ANT_DOWN) {
    y++;
  } else if (dir == ANT_LEFT) {
    x--;
  }

  if (x > width - 1) {
    x = 0;
  } else if (x < 0) {
    x = width - 1;
  }
  if (y > height - 1) {
    y = 0;
  } else if (y < 0) {
    y = height - 1;
  }
}


function draw() {
  strokeWeight(1);

  for (let n = 0; n < 100; n++) {
    if (grid[x][y] == 0) {
      turnRight();
      grid[x][y] = 1;
    } else {
      turnLeft();
      grid[x][y] = 0;
    }

    stroke(color(255));
    if (grid[x][y] == 1) {
      stroke(color(0));
    }

    point(x, y);
    moveForward();
  }
}
