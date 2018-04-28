var a = 0.1;
var w,
  h;
var text;
var letterSpacing = 70;
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {

  var canvas = createCanvas(windowWidth, windowHeight);

  text = createDiv(' IOIO').addClass('text');;
  text.style("font-family", "FuturaLT");
  text.style("color", "#FFFFFF");
  text.style("text-align", "center");
  text.style("font-size", "400px");
  text.style("align-items", "center");
  text.style("width", "50%");
  text.style("height", "50%");
text.style("font-weight", "bold");


  text.style("letter-spacing", letterSpacing + "px");

  text.center();
  console.log(canvas)
  smooth();
}

function draw() {
    background(255);
  w = windowWidth;
  h = windowHeight;
  textPosX = w / 2 - w/4 + letterSpacing/2 -200;
  textPosY = h / 2 - 250;
  var distance = dist(mouseX, mouseY, w/2, h/2);
  stroke(126)
  //line(mouseX, mouseY, w/2, h/2);
  a = a + .01;
  var n = noise(a);


  text.position(textPosX, textPosY)
  var x = map(mouseX, 0, w, 5, -5);
  var y = map(mouseY, 0, h, 5, -5);
  var blur = map(distance, 0, w/2, 0, 28)

  text.style("text-shadow", x + "px " + y + "px " + blur + "px #000000");

}
