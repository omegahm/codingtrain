var elements = [];
var lineWidth = 10;
var lines;
var sel, btn, slider, sliderP;
var done = false;

function setup() {
  createCanvas(1920, 800);

  lines = floor(width / lineWidth);
  console.log(`${lines} lines to sort.`)

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
  slider = createSlider(1, 100, 1);

  reset();
}

function reset() {
  done = false;
  selectionAlreadySortedIdx = -1;
  elements = [];
  for (var i = 0; i < lines; i++) {
    elements.push(random(height));
  }
  loop();
}

function draw() {
  sliderP.html(`Speed: ${slider.value()}  `);

  background(51);

  fill(255, 51, 51);
  for (var i = 0; i < elements.length; i++) {
    rect(i * lineWidth, height, lineWidth, -elements[i]);
  }

  for (var i = 0; i < slider.value(); i++) {
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
  fill(51, 255, 51);
  rect(i * lineWidth, height, lineWidth, -elements[i]);
  fill(51, 51, 255);
  rect(j * lineWidth, height, lineWidth, -elements[j]);

  var tmp = elements[i];
  elements[i] = elements[j];
  elements[j] = tmp;
}
