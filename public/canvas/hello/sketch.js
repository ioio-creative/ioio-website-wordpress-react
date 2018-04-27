var canvas;
var once = true;
function setup() {
  canvas = createCanvas(720, 500);
  canvas.parent('homepage-canvas');
  console.log(canvas)

}

function draw() {
  if (once == true) {

    once = false;

  }

  background(200);
  // Set colors
  noStroke();
  fill(0, 0, 0);
  ellipseMode(CENTER)
  rect(mouseX, mouseY, 40, 120);

  ellipse(mouseX + 140, mouseY + 60, 80, 80);

  rect(mouseX + 200, mouseY, 40, 120);

  ellipse(mouseX + 340, mouseY + 60, 80, 80);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
