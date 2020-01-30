var a = 0.1;
var w,
  h,
  textPosX,
  textPosY;

var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = 0.08;
var text;
var letterSpacing = 70;
var smallScreen = false;
var fontSize = 400;
var maxBlur = 28;
function windowResized() {

  h = windowHeight;
  w = windowHeight * 16 / 9;
  initSetup();
  resizeCanvas(w, h);

}

function initSetup() {

  if (windowWidth < 768) {
    smallScreen = true;
  } else {
    smallScreen = false;
  }
  if (smallScreen) {} else {}

  var changeFactor = windowHeight;

  if (windowWidth < 600) {
    changeFactor = windowWidth * 0.85;
  }
  x = w / 2;
  y = h / 2;
  px = w / 2;
  py = h / 2;

  text.center();
  /*
  fontSize = map(changeFactor, 0, 2000, 25, 400)
  letterSpacing = map(changeFactor, 0, 2000, 20, 70)
  textPosX = map(changeFactor, 0, 2000, -55, 420)
  textPosY = map(changeFactor, 0, 2000, 250, 0)
  maxBlur = map(changeFactor, 0, 2000, 6, 12)
*/
  /* textPosX = map(windowWidth, 0, 2000, 200, 420)
textPosY = map(windowHeight, 0, 526, 0, 100)
maxBlur = map(changeFactor, 0, 2000, 6, 12) */
  letterSpacing = map(changeFactor, 0, 2000, 20, 40)
  fontSize = map(changeFactor, 0, 2000, 25, 600)
  text.style("font-size", fontSize + "px");
  text.style("letter-spacing", letterSpacing + "px");

}
function setup() {
  h = windowHeight;
  w = windowHeight * 16 / 9;

  var canvas = createCanvas(w, h);

  text = createDiv('IOIO').addClass('text');;
  text.style("font-family", '"FuturaLT",Gadget, sans-serif');
  text.style("color", "#000000");
  text.style("text-align", "center");

  text.style("align-items", "center");
  //  text.style("width", "50%");
  //  text.style("height", "50%");
  text.style("font-weight", "bold");
  initSetup();

  console.log("canvas loaded")
  smooth();

}

function draw() {
  background(255);
  /*
 console.log("windowHeight")
 console.log(windowHeight)

 console.log("windowWidth")
  console.log(windowWidth)

  console.log("w")
  console.log(w)
  */
  //var targetX = mouseX;
  x += (mouseX - px) * easing;
  //var targetY = mouseY;
  y += (mouseY - py) * easing;

  py = y;
  px = x;

  var distance = dist(x, y, w / 2, h / 2);
  stroke(126)
  //line(mouseX, mouseY, w/2, h/2);
  a = a + .01;
  var n = noise(a);

  text.center();
  var xx = map(x, 0, w, 8, -8);
  var yy = map(y, 0, h, 8, -8);
  var blur = map(distance, 0, w / 2, 0, maxBlur)
  //console.log(maxBlur)
  var op = 1 - abs(map(x, 0, w, -0.5, 0.5));

  //  text.style("text-shadow", xx + "px " + yy + "px " + blur + "px rgba(0,0,0," + op + ")"); TODO
}
