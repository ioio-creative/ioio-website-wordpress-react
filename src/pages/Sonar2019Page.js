import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Matter from 'matter-js';
import MatterWrap from 'matter-wrap';
import {TweenMax} from 'gsap';
import routes from 'globals/routes';
import './Sonar2019Page.css';
import board1ImgPath from 'images/first@2x.png';
import board2ImgPath from 'images/second@2x.png';
import board3ImgPath from 'images/third@2x.png';
import board4ImgPath from 'images/fourth@2x.png';
import photo1ImgPath from 'images/image_1.jpg';
import photo2ImgPath from 'images/image_2.jpg';
import photo3ImgPath from 'images/image_3.jpg';
import photo4ImgPath from 'images/image_4.jpg';
import photo5ImgPath from 'images/image_5.jpg';
import photo6ImgPath from 'images/image_6.jpg';
import photo7ImgPath from 'images/image_7.jpg';
import bg3Path from 'images/bg3.png';
// import logo1 from 'images/IOIO_logo.svg';
import logo1 from 'images/WEB-Logo-2019-01B 2.svg';
import logo2 from 'images/WEB-Logo-2019-02B 2.svg';
const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Body = Matter.Body;
const Common = Matter.Common;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
Matter.use(
  MatterWrap
);

const slidesPhoto = [
  photo1ImgPath,
  photo2ImgPath,
  photo3ImgPath,
  photo4ImgPath,
  photo5ImgPath,
  photo6ImgPath,
  photo7ImgPath
]
function isTouchSupport() {
  try {
    document.createEvent('TouchEvent');
  } catch (e) {
    return false;
  }
  return true;
}
class Sonar2019Maze1 extends Component {
  constructor(props) {
    super(props);
    this.enableDrag = false;
    this.engine = null;
    this.mazeWrapper = null;
    this.canvasLayer = null;
    this.checkIfOrientationEnabled = null;
    this.initMatterjs = this.initMatterjs.bind(this);
    this.handleDeviceRotate = this.handleDeviceRotate.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleMazeTilt = this.handleMazeTilt.bind(this);
    this.resetMazeTilt = this.resetMazeTilt.bind(this);
    this.createPlatforms = this.createPlatforms.bind(this);
    this.createBalls = this.createBalls.bind(this);
    this.state = {
      orientationEnabledCounter: 0
    }
  }
  componentDidMount() {
    this.initMatterjs();
    this.checkIfOrientationEnabled = setTimeout(() => {
      // alert('Enable device orientation in Settings > Safari > Motion & Orientation Access.')
      // no deviceorientation
      this.mazeWrapper.addEventListener('touchstart', this.handleTouchStart);
      this.mazeWrapper.addEventListener('touchmove', this.handleMazeTilt, {passive: false});
      this.mazeWrapper.addEventListener('touchend', this.resetMazeTilt);
      this.mazeWrapper.addEventListener('mousedown', this.handleTouchStart);
      document.addEventListener('mousemove', this.handleMazeTilt, {passive: false});
      document.addEventListener('mouseup', this.resetMazeTilt);
      window.removeEventListener("deviceorientation", this.handleDeviceRotate);
    }, 500);
    window.addEventListener("deviceorientation", this.handleDeviceRotate);
  }
  initMatterjs() {
    const self = this;
    const engine = Engine.create();
    this.engine = engine;
    const world = engine.world;
    const render = Render.create({
        element: this.canvasLayer,
        engine: engine,
        options: {
          width: 600,
          height: 680,
          background: 'none',
          wireframes: false,
          showAngleIndicator: false
        }
    });
    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    this.createPlatforms(world, render);
    this.createBalls(world, render);

  }
  handleTouchStart(event) {
    if (event.target === this.mazeWrapper) {
      // event.preventDefault();
      const boxPosition = this.mazeWrapper.getBoundingClientRect();
      let pointer = event;
      if (event.changedTouches && event.changedTouches[0]) {
        pointer = event.changedTouches[0];
      }
      const forceX = (pointer.clientX - boxPosition.x - boxPosition.width / 2) / boxPosition.width;
      const forceY = (pointer.clientY - boxPosition.y - boxPosition.height / 2) / boxPosition.height;
      this.engine.world.gravity.x = forceX;
      this.engine.world.gravity.y = forceY;
      TweenMax.to(this.canvasLayer, 0.1, {
        rotationX: -forceY * 30,
        rotationY: forceX * 30
      })
      this.enableDrag = true;
    }
  }
  handleMazeTilt(event) {
    if (this.enableDrag) {
      event.preventDefault();
      const boxPosition = this.mazeWrapper.getBoundingClientRect();
      let pointer = event;
      if (event.changedTouches && event.changedTouches[0]) {
        pointer = event.changedTouches[0];
      }
      const forceX = (pointer.clientX - boxPosition.x - boxPosition.width / 2) / boxPosition.width;
      const forceY = (pointer.clientY - boxPosition.y - boxPosition.height / 2) / boxPosition.height;
      this.engine.world.gravity.x = forceX;
      this.engine.world.gravity.y = forceY;
      TweenMax.to(this.canvasLayer, 0.1, {
        rotationX: -forceY * 30,
        rotationY: forceX * 30
      })
    }
  }
  resetMazeTilt(event) {
    this.enableDrag = false;
    this.engine.world.gravity.x = 0;
    this.engine.world.gravity.y = 0;
    TweenMax.to(this.canvasLayer, 0.1, {
      rotationX: 0,
      rotationY: 0
    })
  }
  handleDeviceRotate(event) {
    // this.canvasLayer.innerHTML = JSON.stringify({
    //   event: event,
    //   alpha: event.alpha,
    //   beta: event.beta,
    //   gamma: event.gamma
    // },' ');
    // return;
    this.setState(prevState => {
      return {
        orientationEnabledCounter: prevState.orientationEnabledCounter + 1
      }
    }, _=> {
      if (this.state.orientationEnabledCounter > 2) {
        if (this.checkIfOrientationEnabled)
          clearTimeout(this.checkIfOrientationEnabled);
        console.log('it works !!!');
      }
    })
    const beta = event.beta;
    const gamma = event.gamma;

    const xForce = Math.sin(gamma * Math.PI / 180);
    const yForce = Math.sin(beta * Math.PI / 180) * Math.cos(gamma * Math.PI / 180);

    this.engine.world.gravity.x = xForce;
    this.engine.world.gravity.y = yForce;
  }
  createPlatforms(world, render) {
    const maze = [
      [0,0,0,0,0,1,1,2,1,1,0,0,0,0,0],
      [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
      [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
      [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1],
      [1,0,1,0,0,0,0,0,1,0,1,0,0,0,1],
      [1,0,1,0,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
    const borderWidth = 40;
    const boxArray = [];
    maze.forEach((col, yIdx) => {
      col.forEach((cell, xIdx) => {
        if (cell === 1) {
          boxArray.push(
            Bodies.rectangle((xIdx + 0.5) * borderWidth, (yIdx + 0.5) * borderWidth, borderWidth, borderWidth, { render: { fillStyle: '#FFF' }, isStatic: true })
          )
        } else if (cell === 2) {
          boxArray.push(
            Bodies.rectangle((xIdx + 0.5) * borderWidth, (yIdx + 0.5) * borderWidth, borderWidth, borderWidth, { 
              render: { fillStyle: '#FFF' }, 
              isStatic: true,
              collisionFilter: {
                mask: 0x0002
              }
            })
          )
        } else {
          // boxArray.push(
          //   Bodies.rectangle((xIdx + 0.5) * borderWidth, (yIdx + 0.5) * borderWidth, borderWidth, borderWidth, { 
          //     render: { fillStyle: '#ccc' }, 
          //     isStatic: true,
          //     collisionFilter: {
          //       mask: 0x0002
          //     }
          //   })
          // )
        }
      })
    })
    World.add(world, boxArray);
  }
  createBalls(world, render) {
    const borderWidth = 40;
    // x: 6, y: 8
    var ball = Bodies.circle(5.5 * borderWidth, 7.5 * borderWidth, borderWidth / 2, { 
      friction: 0.00001, 
      restitution: 0.35, 
      density: 0.001,
      render: { fillStyle: '#F00' }
    });
    World.add(world, ball);
  }
  componentWillUnmount() {
    this.mazeWrapper.removeEventListener('touchstart', this.handleTouchStart);
    this.mazeWrapper.removeEventListener('touchmove', this.handleMazeTilt);
    this.mazeWrapper.removeEventListener('touchend', this.resetMazeTilt);
    this.mazeWrapper.removeEventListener('mousedown', this.handleTouchStart);
    document.removeEventListener('mousemove', this.handleMazeTilt);
    document.removeEventListener('mouseup', this.resetMazeTilt);
    window.removeEventListener("deviceorientation", this.handleDeviceRotate);
  }
  render() {
    return <div class="maze-wrapper" ref={ref=>this.mazeWrapper=ref}>
      <div class="maze" ref={ref=>this.canvasLayer=ref} />
      <div class="maze-hints">Play!</div>
    </div>
  }
}
class Sonar2019Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBallsIdx: []
    }
    this.engine = null;
    // this.checkScrollPosition = null;
    this.initMatterjs = this.initMatterjs.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSlidesDragStart = this.handleSlidesDragStart.bind(this);
    this.handleSlidesDragMove = this.handleSlidesDragMove.bind(this);
    this.handleSlidesDragEnd = this.handleSlidesDragEnd.bind(this);
    this.animateTriggerActive = this.animateTriggerActive.bind(this);
    this.syncForegroundBackgroundHeight = this.syncForegroundBackgroundHeight.bind(this);
    this.lastPointerX = 0;
    this.lastSliderX = 0;
  }
  componentDidMount() {
    const self = this;
    document.getElementById('root').classList.add('sonar-2019-page');
    this.initMatterjs();

    this.pageWrapper.addEventListener('scroll', this.handleScroll);
    // this.checkScrollPosition = window.requestAnimationFrame(this.handleScroll);
    // console.log('touch support: ', isTouchSupport());
    this.photoSlidesWrapper.addEventListener('mousedown', this.handleSlidesDragStart);
    this.photoSlidesWrapper.addEventListener('touchstart', this.handleSlidesDragStart);

    const rotatingTextEls = document.querySelectorAll('.rotating-text');
    rotatingTextEls.forEach(rotatingTextEl => {
      const rotatingTextElText = rotatingTextEl.innerHTML;
      rotatingTextEl.innerHTML = '';
      rotatingTextElText.split('').forEach((char, idx) => {
        const textEl = document.createElement('span');
        textEl.innerHTML = (char === ' '? '&nbsp;': char);
        TweenMax.set(textEl, {
          transform: `rotate(${idx * 360 / rotatingTextElText.length}DEG) translate(-4px, -${4 / Math.sin(Math.PI / rotatingTextElText.length / 2) - 27}px)`
        })
        rotatingTextEl.append(textEl)
      })
    })
    this.syncForegroundBackgroundHeight();
    setTimeout(this.syncForegroundBackgroundHeight, 500);
    window.addEventListener("resize", this.syncForegroundBackgroundHeight);
  }
  syncForegroundBackgroundHeight() {
    this.sectionWrapper.querySelectorAll('.section').forEach(el => {
      const classList = [...el.classList];
      classList.splice(classList.indexOf('section'), 1);
      const targetClass = classList[0];
      const targetEl = this.backgroundColorLayer.querySelector(`.${targetClass}`);
      if (targetEl) {
        // console.log(el.offsetHeight, el.getBoundingClientRect().height);
        TweenMax.set(targetEl, {
          height: el.offsetHeight
        })
      }
    })
  }
  handleScroll(event) {
    // console.log(event);
    // check screen width
    const backgroundMaxScrollOffset = (window.innerWidth < 768 ? 0: -window.innerHeight)
    TweenMax.set(this.canvasLayer, {
      y: Math.max(-this.pageWrapper.scrollTop, backgroundMaxScrollOffset)
    })
    // TweenMax.set(this.backgroundColorLayer, {
    //   y: -this.pageWrapper.scrollTop
    // })
    if (this.pageWrapper.scrollTop > window.innerHeight * (window.innerWidth < 768? 0.5: 1.5)) {
      TweenMax.set(this.canvasLayer, {
        filter: 'blur(20px)'
      })
    } else {
      TweenMax.set(this.canvasLayer, {
        filter: ''
      })
    }
    // this.checkScrollPosition = window.requestAnimationFrame(this.handleScroll);
  }
  handleSlidesDragStart(event) {
    let pointer = event;
    if (event.changedTouches) {
      pointer = event.changedTouches[0];
    }
    this.lastPointerX = pointer.pageX;
    // this.lastSliderX = pointer.pageX;
    document.addEventListener('mousemove', this.handleSlidesDragMove);
    document.addEventListener('mouseup', this.handleSlidesDragEnd);
    document.addEventListener('touchmove', this.handleSlidesDragMove);
    document.addEventListener('touchend', this.handleSlidesDragEnd);
  }
  handleSlidesDragMove(event) {
    let pointer = event;
    if (event.changedTouches) {
      pointer = event.changedTouches[0];
    }
    const percentDiff = (pointer.pageX - this.lastPointerX) / this.photoSlides.offsetWidth * 100;
    // console.log(this.lastSliderX + percentDiff);
    TweenMax.set(this.photoSlides, {
      x: this.lastSliderX + percentDiff + '%'
    })
  }
  handleSlidesDragEnd(event) {
    document.removeEventListener('mousemove', this.handleSlidesDragMove);
    document.removeEventListener('mouseup', this.handleSlidesDragEnd);
    document.removeEventListener('touchmove', this.handleSlidesDragMove);
    document.removeEventListener('touchend', this.handleSlidesDragEnd);
    let pointer = event;
    if (event.changedTouches) {
      pointer = event.changedTouches[0];
    }
    let percentDiff = (pointer.pageX - this.lastPointerX) / this.photoSlides.offsetWidth * 100;
    if (Math.abs(percentDiff) > 30) {
      percentDiff = Math.sign(percentDiff) * 100
    }
    this.lastSliderX = Math.min(
      Math.max(
        -this.photoSlides.childElementCount + 1, 
        Math.round((this.lastSliderX + percentDiff) / 100)
      ),
      0
    ) * 100;
    const percentRemain = Math.min(Math.abs(percentDiff), 100) / 100;
    // console.log(percentRemain);
    TweenMax.to(this.photoSlides, 0.4 * percentRemain, {
      x: this.lastSliderX + '%'
    })
  }
  initMatterjs() {
    const self = this;
    const engine = Engine.create();
    this.engine = engine;
    const world = engine.world;
    const render = Render.create({
        element: this.canvasLayer,
        engine: engine,
        options: {
          width: 800,
          height: 1200,
          background: 'none',
          wireframes: false,
          showAngleIndicator: false
        }
    });
    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    
    this.createPlatforms(world, render);
    // this.createPlatforms2(world, render);
    // createPlatforms2
    // Render.lookAt(render, Composite.allBodies(world));
    this.createBalls(world, render);
    // this.createBalls2(world, render);

    // Events.on(engine, 'collisionStart', function(event) {
    //   var pairs = event.pairs;

    //   // change object colours to show those starting a collision
    //   for (var i = 0; i < pairs.length; i++) {
    //     var pair = pairs[i];
    //     pair.bodyA.render.fillStyle = '#FFF';
    //     pair.bodyB.render.fillStyle = '#FFF';
    //   }
    // });
    Events.on(engine, 'beforeUpdate', function(event) {
      var bodies = Composite.allBodies(engine.world);

      for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        if (!body.isStatic) {
          // console.log(body.id);
          const radius = body.circleRadius;
          if (body.position.x >= 600 - 15 - radius && body.position.x <= 600 + 15 + radius &&
            body.position.y >= 800 - 15 - radius && body.position.y <= 800 + 15 + radius
          ) {
            if (!self.state.activeBallsIdx.includes(body.id)) {
              self.setState((prevState) => {
                const activeBallsIdx = [...prevState.activeBallsIdx, body.id];
                return {
                  activeBallsIdx: activeBallsIdx
                }
              }, _=> {
                self.animateTriggerActive(world);
              })
            }
          } else {
            const searchIdx = self.state.activeBallsIdx.indexOf(body.id);
            if (searchIdx !== -1) {
              self.setState((prevState) => {
                const activeBallsIdx = [...prevState.activeBallsIdx];
                activeBallsIdx.splice(searchIdx, 1);
                return {
                  activeBallsIdx: activeBallsIdx
                }
              })
            }
          }
        }
      }
    });
    // Events.on(engine, 'collisionEnd', function(event) {
    //   var pairs = event.pairs;

    //   // change object colours to show those ending a collision
    //   for (var i = 0; i < pairs.length; i++) {
    //     var pair = pairs[i];

    //     pair.bodyA.render.fillStyle = '#0FF';
    //     pair.bodyB.render.fillStyle = '#0FF';
    //   }
    // });
    // console.log(render.bounds);
  }
  animateTriggerActive(world) {
    const circleRadius = [65, 90, 120, 150, 200];
    const circleFillColor = [
      '#606060',
      'transparent',
      'transparent',
      'transparent',
      'transparent'
    ];
    const circleBorderColor = [
      '#FFF',
      '#F00',
      '#0FF',
      '#3B7979',
      '#3B7979'
    ]
    const circleBorderWidth = [
      0,
      5,
      2,
      1,
      1
    ]
    circleRadius.forEach((radius, idx) => {
      const circleAni = Bodies.circle(600, 800, radius, { 
        render: { 
          fillStyle: circleFillColor[idx],
          strokeStyle: circleBorderColor[idx],
          lineWidth: circleBorderWidth[idx]
        },
        isStatic: true,
        collisionFilter: {
          category: 0x0002
        }
      });
      TweenMax.delayedCall(idx * 0.15, 
        _=> {
          World.add(world, [
            circleAni
          ])
        }
      );
      TweenMax.delayedCall((idx + 1) * 0.15, _=> {
        Composite.remove(world, circleAni)
      })
    })
  }
  createPlatforms(world, render) {
    const size = {
      width: render.bounds.max.x - render.bounds.min.x,
      height: render.bounds.max.y - render.bounds.min.y
    };
    World.add(world, [
      // border left
      Bodies.rectangle(0, 600, 10, 1200, { render: { fillStyle: '#000' }, isStatic: true }),
      // border right
      Bodies.rectangle(800, 600, 10, 1200, { render: { fillStyle: '#000' }, isStatic: true }),
      // platform
      // yellow
      Bodies.rectangle(730, 30, 280, 40, { render: { fillStyle: '#FFD800' }, isStatic: true, angle: Math.PI * -12 / 180 }),
      // red
      Bodies.rectangle(525, 168, 190, 40, { render: { fillStyle: '#F00' }, isStatic: true, angle: Math.PI * 16 / 180 }),
      // blue
      Bodies.rectangle(300, 302, 200, 40, { render: { fillStyle: '#0FF' }, isStatic: true, angle: Math.PI * -12 / 180 }),
      // dark
      Bodies.rectangle(185, 460, 455, 40, { render: { fillStyle: '#242424' }, isStatic: true, angle: Math.PI * 15 / 180 }),

      Bodies.rectangle(782, 281, 300, 40, { render: { fillStyle: '#242424' }, isStatic: true, angle: Math.PI * -15 / 180 }),

      Bodies.rectangle(145, 191, 150, 40, { render: { fillStyle: '#242424' }, isStatic: true, angle: Math.PI * -15 / 180 }),

      Bodies.rectangle(275, 0, 150, 40, { render: { fillStyle: '#242424' }, isStatic: true, angle: Math.PI * 30 / 180 }),



      Bodies.circle(600, 800, 65, { 
        render: { 
          fillStyle: '#414141'
        },
        isStatic: true,
        collisionFilter: {
          category: 0x0002
        }
      }),
      Bodies.circle(600, 800, 45, { 
        render: { 
          fillStyle: 'transparent',
          strokeStyle: '#000',
          lineWidth: 5
        },
        isStatic: true,
        collisionFilter: {
          category: 0x0002
        }
      })
    ]);
  }

  createBalls(world, render) {
    const size = {
      width: render.bounds.max.x - render.bounds.min.x,
      height: render.bounds.max.y - render.bounds.min.y
    };
    var stack = Composites.stack(0, 1, 3, 1, size.width / 10, 0, function(x, y) {
      return Bodies.circle(x, y, 30, { 
        friction: 0.00001, 
        restitution: 0.35, 
        density: 0.001,
        render: { fillStyle: '#FFF' },
        collisionFilter: {
          mask: 0x0001
        }
      });
    });
    World.add(world, stack);
    for (var i = 0; i < stack.bodies.length; i += 1) {
      stack.bodies[i].plugin.wrap = {
        min: { x: render.bounds.min.x, y: render.bounds.min.y },
        max: { x: render.bounds.max.x, y: render.bounds.max.y }
        // min: { x: 0, y: 0 },
        // max: { x: window.innerWidth, y: window.innerHeight }
      };
      // Events.on(stack.bodies[i].
    }
  }
  componentWillUnmount() {
    document.getElementById('root').classList.remove('sonar-2019-page');
    window.removeEventListener("resize", this.syncForegroundBackgroundHeight);
    this.pageWrapper.removeEventListener('scroll', this.handleScroll);
    this.photoSlidesWrapper.removeEventListener('mousedown', this.handleSlidesDragStart);
    this.photoSlidesWrapper.removeEventListener('touchstart', this.handleSlidesDragStart);
    document.removeEventListener('mousemove', this.handleSlidesDragMove);
    document.removeEventListener('mouseup', this.handleSlidesDragEnd);
    document.removeEventListener('touchmove', this.handleSlidesDragMove);
    document.removeEventListener('touchend', this.handleSlidesDragEnd);
    // if (this.checkScrollPosition)
    //   window.cancelAnimationFrame(this.checkScrollPosition);
  }
  render() {
    const state = this.state;
    return <div id="sonar-2019" ref={ref=>this.pageWrapper=ref}>
      <div className="background-layer" ref={ref=>this.backgroundLayer=ref}>
        <div className="canvas-wrapper" ref={ref=>this.canvasLayer=ref}>

        </div>
        <div className="background-color-layer" ref={ref=>this.backgroundColorLayer=ref}>
          <div className="bg section-title"></div>
          <div className="bg section-general"></div>
          <div className="bg section-board">
            <img src={bg3Path} />
          </div>
          <div className="bg section-explore"></div>
          <div className="bg section-about"></div>
          <div className="bg section-special"></div>
        </div>
        {/* <div className="trigger-point" ref={ref=>this.triggerPointEl=ref}>
          {state.activeBallsIdx.map(idx => {
            return <div className={`circle circle-${idx}`} key={idx} />
          })}
        </div> */}
      </div>
      <div className="foreground-layer">
        <div className="logo container">
          <Link to={routes.lab(false)} className="company-link">IOIO Creative</Link>
        </div>
        <div className="container" ref={ref=>this.sectionWrapper=ref}>
          <div className="section section-title">
            <div className="title">Polar Polar</div>
            <div className="rotating-text-wrapper">
              <div className="rotating-text-size-wrapper">
                <div className="rotating-text">SCROLL DOWN TO EXPLORE MORE PLEASE </div>
              </div>
            </div>
          </div>
          <div className="section section-general">
            <div className="title">
              <span className="highlight">Polar Polar</span> is a playable artefact creating temporary topographic images with audible elements through player’s motor input. 
            </div>
            <div className="description">
              <p>Each set consists of a miniature speaker array, placed above a semi-opaque maze structure attached to a spinning mechanism. While the permanent magnet is eliminated in the loudspeaker units, Polar Polar turns this component into a variable factor that players navigate the <u>Ball-in-a-maze puzzle</u> with a magnetic ball. The sound generated on one hand serves the semantic means of completing the game, whereas the artefact turns into a <u>musical instrument</u> through the act of playing. </p>
              <p>With disrupting the conventional mechanism of the loudspeaker, Polar Polar recreates a familiar, yet alienated experience through the investigation of how a technological medium could possibly be appeared.</p>
            </div>
          </div>
          <div className="section section-board">
            <div className="top-column">
              <div className="title">
                Distributing the magnetic energy with the rotary design to temporarily bring the speakers alive
              </div>
              <div className="line"></div>
              <div className="description">
                Geometric path reinforces motion dynamics;<br />
                Speaker Coils notate the rhythms;<br />
                Revolving to define the tempo;<br />
                Disruption brings forth the audible experience
              </div>
            </div>
            <div className="bottom-column">
              <ul className="boards">
                <li className="board">
                  <div className="board-image">
                    <img src={board1ImgPath} alt=""/>
                  </div>
                  <div className="board-name">Kevin</div>
                </li>
                <li className="board">
                  <div className="board-image">
                    <img src={board2ImgPath} alt=""/>
                  </div>
                  <div className="board-name">Mary</div>
                </li>
                <li className="board">
                  <div className="board-image">
                    <img src={board3ImgPath} alt=""/>
                  </div>
                  <div className="board-name">David</div>
                </li>
                <li className="board">
                  <div className="board-image">
                    <img src={board4ImgPath} alt=""/>
                  </div>
                  <div className="board-name">Susan</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="section section-explore">
            <div className="top-column">
              <div className="title">
                Re: construction
              </div>
            </div>
            <div className="bottom-column">
              <div className="slides-wrapper" ref={ref=>this.photoSlidesWrapper=ref}>
                <ul className="photos" ref={ref=>this.photoSlides=ref}>
                  {slidesPhoto.map((photoPath, idx) => {
                    return <li className="photo" key={idx}>
                      <img src={photoPath} />
                    </li>
                  })}
                </ul>
              </div>
            </div>
            <div className="background-text">Re: construction</div>
          </div>
          <div className="section section-about">
            <p><Link to={routes.about(false)} className="highlight">ABOUT US</Link> - IOIO is a group of artists, engineers and designers that resides in the intersection between virtuality and physicality. We pull elements from their usual habitat and put it in the other side, the unfamiliar habitat, in the hope to find a novel perspective to see things we thought we are familiar with. It is through the disruption of this network of many things that lives in virtual world, physical world or as a bridge between two worlds, we try to create new nodes in the network, new meaning of interaction, new perspective to see. We believe this is a rich and refreshing way to tell old story, an exciting and promising way to create new story.</p>
            {/* <div className="footer-text">Finding Polar Polar at Sónar Hong Kong 2019</div> */}
              <div className="logo-wrapper">
                <img src={logo1} alt="sonar2019"/>
                <img src={logo2} alt="sonar2019"/>
              </div>
            <div className="rotating-text-wrapper">
              <a  href="https://sonarhongkong.com/en/2019/artists/new-media-arts-polar-polar" target="_blank"
                className="rotating-text">FINDING POLAR POLAR AT SÓNAR HONG KONG 2019   </a>
            </div>
          </div>
          <div className="section section-special">
            <Sonar2019Maze1 />
          </div>
        </div>
      </div>
    </div>
  }
}
export default Sonar2019Page;