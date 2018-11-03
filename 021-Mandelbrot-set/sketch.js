function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  loadPixels();

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var a = map(x, 0, width, -2.0, 0.5);
      var b = map(y, 0, height, -1.25, 1.25);

      var ca = a;
      var cb = b;

      var maxn = 80;
      var z = 0;

      var n;
      for (n = 0; n < maxn; n++) {
        var aa = a ** 2 - b ** 2;
        var bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(a + b) > 2**40) {
          break;
        }
      }

      var bright = map(n, 0, maxn, 0, 255);
      if (n === maxn) {
        bright = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = 25;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}

function draw() {

}
