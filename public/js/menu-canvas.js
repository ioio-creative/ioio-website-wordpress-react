function menuCanvas(){
  var w = window.innerWidth;
  var h = window.innerHeight;

  $(".menu-canvas").attr("width",w);
  $(".menu-canvas").attr("height",h);


  var canvas = document.getElementsByClassName("menu-canvas");
  var ctx = canvas.getContext("2d");
  //let cvs = rough.canvas(canvas);

  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Vec = Matter.Vector;
  deg = Math.PI / 180;

  var charI1 = [canvas.width / 8 * 1, 100, 160, 43];
  var charO1 = [canvas.width / 8 * 3, 100, 80];
  var charI2 = [canvas.width / 8 * 5, 100, 160, 43];
  var charO2 = [canvas.width / 8 * 7, 100, 80];
  var engine = Engine.create();
  /*
     var render = Render.create({
               element: document.body,
               engine: engine,
               options: {
                   width: canvas.width,
                   height: canvas.height,
                   wireframes: false
               }
            });
  */
  var boxA = Bodies.rectangle(charI1[0], charI1[1], charI1[2], charI1[3]);
  var boxB = Bodies.rectangle(charI2[0], charI2[1], charI2[2], charI2[3]);
  var ballA = Bodies.circle(charO1[0], charO1[1], charO1[2]);
  var ballB = Bodies.circle(charO2[0], charO2[1], charO2[2]);
  var ground = Bodies.rectangle(canvas.width / 2, canvas.height + 5, canvas.width, 10, {
      isStatic: true
  });
  var groundLeft = Bodies.rectangle(-5, canvas.height / 2, 10, canvas.height, {
      isStatic: true
  });
  var groundRight = Bodies.rectangle(canvas.width + 5, canvas.height / 2, 10, canvas.height, {
      isStatic: true
  });
  var groundTop = Bodies.rectangle(canvas.width / 2, -5, canvas.width, 10, {
      isStatic: true
  });

  ballA.friction = 0.5;
  ballA.restitution = 0.8;

  ballB.friction = 0.5;
  ballB.restitution = 0.8;

  boxA.friction = 0.01;
  boxA.restitution = 0.6;

  boxB.friction = 0.01;
  boxB.restitution = 0.6;

  Body.rotate(boxA, 90 * deg);
  Body.rotate(boxB, 90 * deg);


  var MouseConstraint = Matter.MouseConstraint
  var Mouse = Matter.Mouse
  // add mouse control
  var mouse = Mouse.create(canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.05,
              render: {
                  visible: false
              }
          }
      });

  World.add(engine.world, mouseConstraint);

  World.add(engine.world, [boxA, boxB, ballA, ballB, ground, groundLeft, groundRight, groundTop]);

  Engine.run(engine);

  setInterval(function() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(ballA.position.x, ballA.position.y, ballA.circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ballA.position.x, ballA.position.y, ballA.circleRadius * 0.5, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ballB.position.x, ballB.position.y, ballB.circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ballB.position.x, ballB.position.y, ballB.circleRadius * 0.5, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(boxA.vertices[0].x, boxA.vertices[0].y);
      ctx.lineTo(boxA.vertices[1].x, boxA.vertices[1].y);
      ctx.lineTo(boxA.vertices[2].x, boxA.vertices[2].y);
      ctx.lineTo(boxA.vertices[3].x, boxA.vertices[3].y);
      ctx.lineTo(boxA.vertices[0].x, boxA.vertices[0].y);
      ctx.fillStyle = "white";
      ctx.fill();
      //ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(boxB.vertices[0].x, boxB.vertices[0].y);
      ctx.lineTo(boxB.vertices[1].x, boxB.vertices[1].y);
      ctx.lineTo(boxB.vertices[2].x, boxB.vertices[2].y);
      ctx.lineTo(boxB.vertices[3].x, boxB.vertices[3].y);
      ctx.lineTo(boxB.vertices[0].x, boxB.vertices[0].y);
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

  }, 20)


  function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setInterval(function() {

    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    engine.world.bounds.max.x = w;
    engine.world.bounds.max.y = h;

    ground.vertices[0].x = 0;
    ground.vertices[0].y = h-10;
    ground.vertices[1].x = w*2;
    ground.vertices[1].y = h-10;
    ground.vertices[2].x = w*2;
    ground.vertices[2].y = h;
    ground.vertices[3].x = 0;
    ground.vertices[3].y = h;

    Body.setVertices(ground, ground.vertices);

    Body.setPosition(boxA, (Vec.create(canvas.width / 8 * 1, 100)));
    Body.setPosition(ballA, (Vec.create(canvas.width / 8 * 3, 100)));
    Body.setPosition(boxB, (Vec.create(canvas.width / 8 * 5, 100)));
    Body.setPosition(ballB, (Vec.create(canvas.width / 8 * 7, 100)));

    Body.setAngle(boxA, 90 * deg);
    Body.setAngle(boxB, 90 * deg);
    Body.setVelocity(ballB, (Vec.create(rand(-5, 5), rand(-5, 5))));
    Body.setVelocity(ballA, (Vec.create(rand(-5, 5), rand(-5, 5))));
    Body.setVelocity(boxA, (Vec.create(rand(-5, 5), rand(-5, 5))));
    Body.setVelocity(boxB, (Vec.create(rand(-5, 5), rand(-5, 5))));

  }, 6000)


  function canvas_resize(){
    w = window.innerWidth;
    h = window.innerHeight;

    $(".menu-canvas").attr("width",w);
    $(".menu-canvas").attr("height",h);

    canvas.width = w;
    canvas.height = h;
  }
}
