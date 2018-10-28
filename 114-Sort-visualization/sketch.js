var elements = [];
var lines;
var sel, btn, speedSlide, sliderP, lineWidthSlide;
var done = false;

function setup() {
  createCanvas(window.displayWidth - 20, window.displayHeight - 300);
  colorMode(HSL, 360);

  createP();
  btn = createButton("Reset");
  btn.mousePressed(reset);
  createSpan(" ");
  sel = createSelect();
  sel.option("bubble");
  sel.option("selection");
  sel.changed(reset);
  createP();
  sliderP = createDiv("Speed: 1");
  speedSlide = createSlider(1, 100, 1);
  sliderL = createDiv("Line width: 2");
  lineWidthSlide = createSlider(1, 100, 5);
  lineWidthSlide.mousePressed(stop);
  lineWidthSlide.changed(reset);
  reset();
}

function stop() {
  done = true;
}

function reset() {
  done = false;
  selectionAlreadySortedIdx = -1;

  lines = floor(width / lineWidthSlide.value());
  console.log(`${lines} lines to sort.`)

  elements = [];
  for (var i = 0; i < lines; i++) {
    elements.push(random(height));
  }
  loop();
}

function draw() {
  background(51);
  stroke(0);
  strokeWeight(1);

  sliderP.html(`Speed: ${speedSlide.value()}  `);
  sliderL.html(`Line width: ${lineWidthSlide.value()}  `);

  for (var i = 0; i < elements.length; i++) {
    fill(elements[i] / height * 360, 500, 255);
    rect(i * lineWidthSlide.value(), height, lineWidthSlide.value(), -elements[i]);
  }

  for (var i = 0; i < speedSlide.value(); i++) {
    if (!done) {
      sortStep(sel.value());
    }
  }
}

function sortStep(type) {
  switch (type) {
    case "selection":
      selectionSort();
      break;
    case "bubble":
      bubbleSort();
      break;
  }
}

function swap(i, j) {
  var tmp = elements[i];
  elements[i] = elements[j];
  elements[j] = tmp;
}
