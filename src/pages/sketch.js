export default function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(600, 400, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function () {
    p.background(100);
    p.noStroke();
    p.push();
    p.fill(255,0,0)
    p.rect(p.mouseX,p.mouseY,20,20)
    p.rotateY(rotation);
    p.box(100);
    p.pop();
  };
};
