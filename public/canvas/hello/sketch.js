var a = 0.1;
var w,
  h,
  textPosX,
  textPosY;

  var x=0;
  var y=0;
  var px=0;
  var py=0;
  var easing = 0.08;
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

  //var targetX = mouseX;
   x += (mouseX - px)*easing;
   //var targetY = mouseY;
   y += (mouseY - py)*easing;

   py = y;
   px = x;


  var distance = dist(x, y, w / 2, h / 2);
  stroke(126)
  //line(mouseX, mouseY, w/2, h/2);
  a = a + .01;
  var n = noise(a);

  text.position(textPosX, textPosY)
  var xx = map(x, 0, w, 5, -5);
  var yy = map(y, 0, h, 5, -5);
  var blur = map(distance, 0, w / 2, 0, 28)

  text.style("text-shadow", xx + "px " + yy + "px " + blur + "px #000000");
//  fill(0);
//    ellipse(x,y,59);

}
