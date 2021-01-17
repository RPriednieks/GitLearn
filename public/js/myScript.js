var image0 = null;
var image1 = null;
var image2 = null;
var image3 = null;
var image4 = null;
var image5 = null;
var output = null;
var canvas;
var input;

function loadImage() {
  input = document.getElementById("browse");
  canvas = document.getElementById("canvas1");
  image0 = new SimpleImage(input);
  image1 = new SimpleImage(input);
  image2 = new SimpleImage(input);
  image3 = new SimpleImage(input);
  image4 = new SimpleImage(input);
  image5 = new SimpleImage(input);
  image6 = new SimpleImage(input);
  image0.drawTo(canvas);
}

function imageIsLoaded(x) {
  if (x == null || !x.complete()) {
    alert("Picture is not loaded");
  } else {
    return true;
  }
}

function doGray() {
  if (imageIsLoaded(image1)) {
    filterGray();
    image1.drawTo(canvas);
  }
}

function filterGray() {
  for (var pixel of image1.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function doRed() {
  if (imageIsLoaded(image2)) {
    filterRed();
    image2.drawTo(canvas);
    image2 = new SimpleImage(input);
  }
}

function filterRed() {
  for (var pixel of image2.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(avg * 2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(avg * 2 - 255);
      pixel.setBlue(avg * 2 - 255);
    }
  }
}

function doColors() {
  if (imageIsLoaded(image3)) {
    filterColors();
    image3.drawTo(canvas);
  }
}

function filterColors() {
  for (var pixel of image3.values()) {
    x = pixel.getX();
    var width = image3.getWidth();
    var pirma = width / 3;
    var tresa = (width / 3) * 2;
    if (x < pirma) {
      pixel.setRed(255);
    } else if (x > tresa) {
      pixel.setBlue(255);
    } else {
      pixel.setGreen(255);
    }
  }
}

function doReset() {
  if (imageIsLoaded(image0)) {
    image0.drawTo(canvas);
    image1 = new SimpleImage(input);
    image2 = new SimpleImage(input);
    image3 = new SimpleImage(input);
    image4 = new SimpleImage(input);
    image5 = new SimpleImage(input);
  }
}

function doRainbow() {
  if (imageIsLoaded(image4)) {
    filterRainbow();
    image4.drawTo(canvas);
    image4 = new SimpleImage(input);
  }
}

function filterRainbow() {
  var height = image4.getHeight();
  var a = height / 7;
  for (var pixel of image4.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

    if (y <= a) {
      if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(avg * 2 - 255);
        pixel.setBlue(avg * 2 - 255);
      }
    } else if (y <= a * 2) {
      if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(0.8 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(avg * 1.2 - 51);
        pixel.setBlue(avg * 2 - 255);
      }
    } else if (y <= a * 3) {
      if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(avg * 2);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(avg * 2 - 255);
      }
    } else if (y <= a * 4) {
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(avg * 2);
        pixel.setBlue(0);
      } else {
        pixel.setRed(avg * 2 - 255);
        pixel.setGreen(255);
        pixel.setBlue(avg * 2 - 255);
      }
    } else if (y <= a * 5) {
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(avg * 2);
      } else {
        pixel.setRed(avg * 2 - 255);
        pixel.setGreen(avg * 2 - 255);
        pixel.setBlue(255);
      }
    } else if (y <= a * 6) {
      if (avg < 128) {
        pixel.setRed(avg * 0.8);
        pixel.setGreen(0);
        pixel.setBlue(avg * 2);
      } else {
        pixel.setRed(1.2 * avg - 51);
        pixel.setGreen(avg * 2 - 255);
        pixel.setBlue(255);
      }
    } else {
      if (avg < 128) {
        pixel.setRed(avg * 1.6);
        pixel.setGreen(0);
        pixel.setBlue(avg * 1.6);
      } else {
        pixel.setRed(0.4 * avg + 153);
        pixel.setGreen(avg * 2 - 255);
        pixel.setBlue(0.4 * avg + 153);
      }
    }
  }
}

function doPicking() {
  if (imageIsLoaded(image5)) {
    filterPicking();
    image5.drawTo(canvas);
    image5 = new SimpleImage(input);
  }
}

function filterPicking() {
  var picker = document.getElementById("htmlPicker");
  var rc = parseInt("0x" + picker.value.slice(1, 3));
  var gc = parseInt("0x" + picker.value.slice(3, 5));
  var bc = parseInt("0x" + picker.value.slice(5, 7));
  for (var pixel of image5.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed((rc / 127.5) * avg);
      pixel.setGreen((gc / 127.5) * avg);
      pixel.setBlue((bc / 127.5) * avg);
    } else {
      pixel.setRed((2 - rc / 127.5) * avg + 2 * rc - 255);
      pixel.setGreen((2 - gc / 127.5) * avg + 2 * gc - 255);
      pixel.setBlue((2 - bc / 127.5) * avg + 2 * bc - 255);
    }
  }
}
