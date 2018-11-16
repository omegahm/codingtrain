let streams = [];
let symbolSize = 50;

class Stream {
  constructor(x) {
    this.x = x;
    this.y = -random(10, 30);
    this.rainSpeed = random(1, 5);
    this.symbols = [];
    let symbolsCount = floor(random(5, height/symbolSize));

    for (var i = 0; i < symbolsCount; i++) {
      let symbol = new Symbol(this.x, this.y - i * symbolSize, this.rainSpeed, i == 0);
      this.symbols.push(symbol);
    }
  }

  show() {
    for (let symbol of this.symbols) {
      symbol.show();
    }
  }

  update() {
    for (let symbol of this.symbols) {
      symbol.update();
    }
  }
}

class Symbol {
  constructor(x, y, rainSpeed, first) {
    this.x = x;
    this.y = y;
    this.char;
    this.rainSpeed = rainSpeed;
    this.first = first;
    this.symbolChangeSpeed = floor(random(5, 20))
    this.updateChar();
  }

  updateChar() {
    let start = 0x30a0;
    let num = 96;
    this.char = String.fromCharCode(floor(random(start, start + num)));
  }

  update() {
    if (frameCount % this.symbolChangeSpeed == 0) {
      this.updateChar();
    }
    if (this.y > height + symbolSize) {
      this.y = 0;
    } else {
      this.y += this.rainSpeed;
    }
  }

  show() {
    if (this.first) {
      fill(30, 197, 3);
    } else {
      fill(30, 197, 3, 127);
    }
    text(this.char, this.x, this.y);
  }
}

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  textSize(symbolSize);

  for (var i = 0; i < width/symbolSize; i++) {
    let x = symbolSize * i;
    streams.push(new Stream(x));
  }
}

function draw() {
  background(10, 10, 10, 100);

  for (let stream of streams) {
    stream.show();
    stream.update();
  }
}
