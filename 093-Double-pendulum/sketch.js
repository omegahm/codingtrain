var x1, y1, x2, y2;
var r1, r2;
var a1, a2;
var a1_v, a2_v;
var a1_a, a2_a;
var m1, m2;
var g = 1;

var px2, py2;

var buffer;
var hu = 0;

var btnReset;
var r1Div, r2Div, r1Slider, r2Slider;
var m1Div, m2Div, m1Slider, m2Slider;

function setup() {
  createCanvas(1280, 900);

  r1Div = createDiv("r1: 100")
  r1Slider = createSlider(1, 300, 100);
  r2Div = createDiv("r2: 100")
  r2Slider = createSlider(1, 300, 100);

  m1Div = createDiv("m1: 10")
  m1Slider = createSlider(1, 50, 10);
  m2Div = createDiv("m2: 10")
  m2Slider = createSlider(1, 50, 10);

  createP();
  btnReset = createButton("Reset");
  btnReset.mousePressed(reset);

  reset();
}

function reset() {
  r1 = r1Slider.value();
  r2 = r2Slider.value();
  a1 = PI / 2;
  a2 = PI / 4;
  m1 = 10;
  m2 = 25;
  a1_v = 0;
  a2_v = 0;
  a1_a = 0;
  a2_a = 0;

  px2 = undefined;
  py2 = undefined;

  buffer = createGraphics(width, height);
  buffer.background(51);
  buffer.translate(width / 2, 100);
  buffer.strokeWeight(1);
  buffer.colorMode(HSL, 360);
}


function draw() {
  r1Div.html("r1: " + r1Slider.value());
  r2Div.html("r2: " + r2Slider.value());
  r1 = r1Slider.value();
  r2 = r2Slider.value();

  m1Div.html("m1: " + m1Slider.value());
  m2Div.html("m2: " + m2Slider.value());
  m1 = m1Slider.value();
  m2 = m2Slider.value();

  var denom = 2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2);
  a1_a = (-g * (2 * m1 + m2) * sin(a1) - m2 * g * sin(a1 - 2 * a2) - 2 * sin(a1 - a2) * m2 * (a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2))) / (r1 * denom);
  a2_a = (2 * sin(a1 - a2) * (a1_v * a1_v * r1 * (m1 + m2) + g * (m1 + m2) * cos(a1) + a2_v * a2_v * r2 * m2 * cos(a1 - a2))) / (r2 * denom);

  image(buffer, 0, 0);
  translate(width / 2, 100);

  x1 = r1 * sin(a1);
  y1 = r1 * cos(a1);

  x2 = x1 + r2 * sin(a2);
  y2 = y1 + r2 * cos(a2);

  stroke(255);
  strokeWeight(5);
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  fill(255, 51, 51);
  ellipse(x1, y1, m1, m1);
  ellipse(x2, y2, m2, m2);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  a1_v *= 0.999;
  a2_v *= 0.999;

  if (px2 != undefined) {
    hu = (hu + 1) % 360;
    buffer.stroke(hu, 500, 255);
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2;
  py2 = y2;
}
