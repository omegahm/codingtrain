let blocks = []
let rows = 200
let columns = 200

let blockWidth = 5, blockHeight = 5

function setup() {
  createCanvas(rows*blockWidth, columns*blockHeight)
  background(51)
  colorMode(HSL, 360);
  stroke(255)

  for(let i = 0; i < rows; i++) {
    blocks[i] = []
    for(let j = 0; j < columns; j++) {
      blocks[i][j] = noise(i * rows + j)
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      fill(map(blocks[i][j], 0, 1, 0, 360), 500, 255)
      rect(i * blockWidth, j * blockHeight, blockWidth, blockHeight)
    }
  }
}

function swap(k, i, j) {
  var tmp = blocks[k][i];
  blocks[k][i] = blocks[k][j];
  blocks[k][j] = tmp;

  fill(map(blocks[k][i], 0, 1, 0, 360), 500, 255)
  rect(k * blockWidth, i * blockHeight, blockWidth, blockHeight)
  fill(map(blocks[k][j], 0, 1, 0, 360), 500, 255)
  rect(k * blockWidth, j * blockHeight, blockWidth, blockHeight)
}

function bubbleSort() {
  let sorted = true
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns-1; j++) {
      if (blocks[i][j] > blocks[i][j + 1]) {
        sorted = false
        swap(i, j, j+1)
        break;
      }
    }
  }
  return sorted
}


function draw() {
  let run = true
  for (let i = 0; i < 5; i++) {
    run = run && !bubbleSort()
  }

  if (!run) {
    noLoop()
  }
}
