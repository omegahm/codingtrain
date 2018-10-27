function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;
let iterations = 1000;

function setup() {
  createCanvas(1280, 800);

  cols = floor(width / resolution);
  rows = floor(height / resolution);

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell();
    }
  }
}

function draw() {
  background(255);

  let x, y, cell;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      x = i * resolution;
      y = j * resolution;
      cell = grid[i][j];

      if (cell.alive) {
        fill(cell.age, 0, 0);
      } else if (cell.age < 0) {
        fill(0, 255 + cell.age, 0);
      } else {
        fill(255);
      }

      stroke(0);
      rect(x, y, resolution, resolution);
    }
  }

  let next = make2DArray(cols, rows);

  let live, sum, neighbors;
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cell = grid[i][j];
      live = grid[i][j].alive ? 1 : 0;

      // Count live neighbors!
      sum = 0;
      neighbors = countNeighbors(grid, i, j);

      if (!cell.alive && neighbors == 3) {
        live = 1;
      } else if (cell.alive && (neighbors < 2 || neighbors > 3)) {
        live = 0;
      }

      next[i][j] = new Cell();
      next[i][j].alive = live;
      if (cell.alive) {
        next[i][j].age = cell.age + 1;
      } else if (!next[i][j].alive) {
        next[i][j].age = cell.age - 1;
      }
    }
  }

  grid = next;

  if (iterations == 0) {
    noLoop();
  }
  iterations -= 1;
}


function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row].alive ? 1 : 0;
    }
  }
  sum -= grid[x][y].alive ? 1 : 0;
  return sum;
}
