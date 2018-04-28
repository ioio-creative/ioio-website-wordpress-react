var a = 0.1;
var w,
  h,
  textPosX,
  textPosY;
var text;
var letterSpacing = 70;
var smallScreen = false;
var fontSize = 400;
function windowResized() {
  w = windowWidth;
  h = 500;
  resizeCanvas(w, h);
  initSetup();

}

function initSetup() {

  if (windowWidth < 768) {
    smallScreen = true;
  } else {
    smallScreen = false;
  }
  if (smallScreen) {
    fontSize = 100;
    var letterSpacing = 35;
  } else {
    fontSize = 400;
    letterSpacing = 70;
  }

  fontSize = map(windowWidth, 0, 2000, 25, 400)
  letterSpacing = map(windowWidth, 0, 2000, 20, 70)
  textPosX = map(windowWidth, 0, 2000, -60, 420)
  textPosY = map(windowWidth, 0, 2000,250 , 0)
  text.style("font-size", fontSize + "px");
  text.style("letter-spacing", letterSpacing + "px");
}
function setup() {
  w = windowWidth;
  h = 500;
  var canvas = createCanvas(w, h);

  text = createDiv('IOIO').addClass('text');;
  text.style("font-family", '"FuturaLT",Gadget, sans-serif');
  text.style("color", "#FFFFFF");
  text.style("text-align", "center");

  text.style("align-items", "center");
  text.style("width", "50%");
  text.style("height", "50%");
  text.style("font-weight", "bold");
  initSetup();

  text.center();
  console.log(canvas)
  smooth();

}

function draw() {
  background(255);

  //textPosX = w / 2 - w / 4 + letterSpacing / 2 - 200;

  var distance = dist(mouseX, mouseY, w / 2, h / 2);
  stroke(126)
  //line(mouseX, mouseY, w/2, h/2);
  a = a + .01;
  var n = noise(a);

  text.position(textPosX, textPosY)
  var x = map(mouseX, 0, w, 5, -5);
  var y = map(mouseY, 0, h, 5, -5);
  var blur = map(distance, 0, w / 2, 0, 28)

  text.style("text-shadow", x + "px " + y + "px " + blur + "px #000000");

}
