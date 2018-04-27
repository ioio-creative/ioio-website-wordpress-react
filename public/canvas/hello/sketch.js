function setup() {
  var canvas = createCanvas(windowWidth/2,500);
  canvas.parent('homepage-canvas');
  console.log(canvas)

}

function draw() {
  background(200);
  // Set colors
  noStroke();
  fill(0, 0, 0);
ellipseMode(CENTER)
  rect(mouseX, mouseY, 40, 120);


  ellipse(mouseX + 140, mouseY+60, 80, 80);

  rect(mouseX + 200, mouseY, 40, 120);

  ellipse(mouseX + 340, mouseY+60, 80, 80);

}
