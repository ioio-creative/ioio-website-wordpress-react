if (!Detector.webgl)
  Detector.addGetWebGLMessage();
THREE.Cache.enabled = true;

var materialShaderNormal,
  materialShaderBlack;
var materialBlack,
  materialNormal,
  materialGround;
var mesh,
  ground;

var shadowCameraHelper;

var dirLight;

var container,
  stats;
var camera,
  cameraTarget,
  scene,
  renderer,
  composer;

var group;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

//Mouse / Touch
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;

var mouseXOnMouseDown = 0;
var pressState;

var cursorX = windowHalfX;
var cursorY = windowHalfY;
var pCursorX = windowHalfX;
var pCursorY = windowHalfY;

var smoothedX = windowHalfX;
var smoothedY = cursorY;

var shaderOffsetPressed = 6000;
var prevTime,
  currTime;

var bloomPass;

var paramsPressed = {
  exposure: 1.0,
  bloomStrength: 1.0,
  bloomThreshold: 0,
  bloomRadius: 0.8
};

var paramsReleased = {
  exposure: 1.0,
  bloomStrength: 0,
  bloomThreshold: 0,
  bloomRadius: 0
};

var isCursorEntered = false;
var prevRotation;
var timeToGoBack = false;

var renderScale = 1.0;

var effectFXAA,
  copyPass;

var lightColor = 0;
//RUN
init();
animate();

//SETUP
function init() {
  if (window.innerWidth < 800) {
    renderScale = convertRange(window.innerWidth, [
      0, 1000
    ], [0.2, 1])
    //renderScale = 0.1;
    // console.log("renderScale" + renderScale)
  }
  container = document.createElement('div');
  container.setAttribute('id', 'canvasWrapper');
  document.body.appendChild(container);

  // CAMERA
  camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000);
  //camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3500);
  camera.position.set(0, 0, 1000);
  cameraTarget = new THREE.Vector3(0, 0, 0);

  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFFFFF);
  scene.fog = new THREE.Fog(0x000000, 0, 5000);
  // LIGHTS

  dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setRGB(1, 1, 1);
  dirLight.position.set(0, 0, 250);
  //dirLight.position.multiplyScalar( 60 );
  scene.add(dirLight);
  dirLight.castShadow = false;
  dirLight.shadow.mapSize.x = 8192;
  dirLight.shadow.mapSize.y = 8192;
  var d = 6000;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  dirLight.shadow.camera.far = 10000;
  dirLight.shadow.bias = -0.0001;
  dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
  //scene.add(dirLightHeper);

  // GROUND
  var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
  materialGround = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff});
  materialGround.color.setRGB(1, 1, 1);
  ground = new THREE.Mesh(groundGeo, materialGround);
  ground.rotation.x = 0;
  ground.position.y = -2000;
  scene.add(ground);

  ground.receiveShadow = false;

  group = new THREE.Group();
  group.position.y = 0;
  scene.add(group);

  materialBlack = new THREE.MeshPhongMaterial({color: 0x000000, specular: 0x000000});

  //var materialWire = new MeshLineMaterial();
  materialNormal = new THREE.MeshNormalMaterial();
  materialBlack.onBeforeCompile = function(shader) {
    // console.log( shader )
    shader.uniforms.time = {
      value: 0
    };
    shader.uniforms.val = {
      value: 0
    };
    shader.vertexShader = 'uniform float time;\n' + 'uniform float val;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', [
      'float theta = sin( time + position.y ) / val;',
      'float c = cos( theta );',
      'float s = sin( theta );',
      'mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );',
      'vec3 transformed = vec3( position ) * m;',
      'vNormal = vNormal * m;'
    ].join('\n'));
    materialShaderBlack = shader;
  };

  materialNormal.onBeforeCompile = function(shader) {
    // console.log( shader )
    shader.uniforms.time = {
      value: 0
    };
    shader.uniforms.val = {
      value: 0
    };
    shader.vertexShader = 'uniform float time;\n' + 'uniform float val;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', [
      'float theta = sin( time + position.y ) / val;',
      'float c = cos( theta );',
      'float s = sin( theta );',
      'mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );',
      'vec3 transformed = vec3( position ) * m;',
      'vNormal = vNormal * m;'
    ].join('\n'));
    materialShaderNormal = shader;
  };

  // model
  var loader = new THREE.FBXLoader();
  loader.load('models/fbx/IOIO.fbx', function(geometry) {

    var selectedGeometry = geometry.children[0].geometry;

    mesh = new THREE.Mesh(selectedGeometry, materialBlack);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    //  console.log(geometry.children[0].geometry)
    // console.log(materialBlack)

    materialBlack.reflectivity = 1;
    materialNormal.wireframe = true;

    materialNormal.wireframeLinewidth = 0.5;
    geometry.scale.setScalar(2)
    scene.add(mesh);
    group.add(mesh);
  });
  group.scale.x = 1 * renderScale
  group.scale.y = 1 * renderScale
  group.scale.z = 1 * renderScale

  /*
var loader = new THREE.JSONLoader();
loader.load( 'models/animated/flamingo.js', function( geometry ) {
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 20, morphTargets: true, vertexColors: THREE.FaceColors, flatShading: true } );
  var mesh = new THREE.Mesh( geometry, material );
  var s = 0.35;
  mesh.scale.set( s, s, s );
  mesh.position.y = 15;
  mesh.rotation.y = -1;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add( mesh );
  var mixer = new THREE.AnimationMixer( mesh );
  mixer.clipAction( geometry.animations[ 0 ] ).setDuration( 1 ).play();
  mixers.push( mixer );
} );
*/
  // RENDERER
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.7;

  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // softer shadows
  container.appendChild(renderer.domElement);

  //Create Shader Passes
  var renderScene = new THREE.RenderPass(scene, camera);

  copyPass = new THREE.ShaderPass(THREE.CopyShader);
  copyPass.renderToScreen = true;

  bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.renderToScreen = true;
  bloomPass.threshold = paramsPressed.bloomThreshold;
  bloomPass.strength = paramsPressed.bloomStrength;
  bloomPass.radius = paramsPressed.bloomRadius;

  effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
  effectFXAA.renderToScreen = false;
  var width = window.innerWidth || 2;
  var height = window.innerHeight || 2;
  effectFXAA.uniforms['resolution'].value.set(1 / width, 1 / height);

  composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderScene);

  composer.addPass(effectFXAA);
  composer.addPass(bloomPass);
  composer.addPass(copyPass);
  //console.log(composer);
  // STATS
  stats = new Stats();
  //container.appendChild( stats.dom );
  // EVENTS
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mouseover', onDocumentMouseOver, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchend', onDocumentTouchEnd, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  //  document.addEventListener('keypress', onDocumentKeyPress, false);
  //  document.addEventListener('keydown', onDocumentKeyDown, false);

  window.addEventListener('resize', onWindowResize, false);
  document.body.style.cssText = "cursor:move; cursor:-webkit-grab; cursor:-moz-grab; cursor:grab;";
  

}
function onDocumentMouseOver(e) {
  isCursorEntered = true;
}

function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  windowHalfX = width / 2;
  windowHalfY = height / 2;
  // camera.aspect = width / height;
  // OrthographicCamera need to define left right top bottom
  camera.left = -windowHalfX;
  camera.right = windowHalfX;
  camera.top = windowHalfY;
  camera.bottom = -windowHalfY;
  // resize the IOIO renderScale on resize
  if (window.innerWidth < 800) {
    renderScale = convertRange(window.innerWidth, [
      0, 1000
    ], [0.2, 1]);
  } else {
    renderScale = 1;
  }
  group.scale.x = 1 * renderScale;
  group.scale.y = 1 * renderScale;
  group.scale.z = 1 * renderScale;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);

}
/*
function onDocumentKeyDown(event) {
  if (firstLetter) {
    firstLetter = false;
    text = "";
  }
  var keyCode = event.keyCode;
  // backspace
  if (keyCode == 8) {
    event.preventDefault();
    text = text.substring(0, text.length - 1);

    return false;
  }
}
function onDocumentKeyPress(event) {
  var keyCode = event.which;
  // backspace
  if (keyCode == 8) {
    event.preventDefault();
  } else {
    var ch = String.fromCharCode(keyCode);
    text += ch;
  }
}
*/
function onDocumentMouseDown(event) {
  pressState = true;
  event.preventDefault();
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  document.addEventListener('mouseout', onDocumentMouseOut, false);
  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDown = targetRotation;
  document.body.style.cssText = "cursor:move; cursor:-webkit-grabbing; cursor:-moz-grabbing; cursor:grabbing;";
  sendToParent('canvas_activated');
}
function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.005;
}
function onDocumentMouseUp(event) {
  pressState = false;

  timeToGoBack = true;

  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
  document.body.style.cssText = "cursor:move; cursor:-webkit-grab; cursor:-moz-grab; cursor:grab;";
  sendToParent('canvas_deactivated');
}
function onDocumentMouseOut(event) {

  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
}
function onDocumentTouchStart(event) {
  pressState = true;

  if (event.touches.length == 1) {
    // event.preventDefault();
    mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }
  sendToParent('canvas_activated');
}
function onDocumentTouchEnd(event) {
  // event.preventDefault();
  pressState = false;

  timeToGoBack = true;
  sendToParent('canvas_deactivated');
}
function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    // event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
  }
  cursorX = event.touches[0].pageX;
  cursorY = event.touches[0].pageY;
}
//
function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}
function render() {
  currTime = performance.now();
  var rotSpeed = group.rotation.y - prevRotation;
  prevRotation = group.rotation.y

  if (Math.abs(rotSpeed) < 0.01 && timeToGoBack == true) {
    prevTime = performance.now()
    timeToGoBack = false;
  }
  if (Math.abs(rotSpeed) < 0.01 && currTime - prevTime > 500 && !pressState) {

    targetRotation = 0;
  }
  //mouseUpdate
  document.onmousemove = function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
  }

  var distX = cursorX - smoothedX;
  var distY = cursorY - smoothedY;

  smoothedX += distX * 0.1;
  smoothedY += distY * 0.1;
  /*//for casting shadow
  var dirLigtPosX = convertRange(smoothedX, [
    0, window.innerWidth
  ], [-250, 250])
*/
  var dirLigtPosX = 1;
  var dirLigtIntensity = 0.8;

  if (!isCursorEntered) {
    shaderOffsetPressed = 6000;
    dirLight.intensity = dirLigtIntensity;
  } else {
    dirLigtIntensity = convertRange(Math.abs(dirLigtPosX), [
      0, 200
    ], [0.7, 2])
    shaderOffsetPressed = 6000;
  }
  dirLight.intensity = dirLigtIntensity;
  //camera
  camera.lookAt(cameraTarget);

  //TEXT ROATAION
  group.rotation.y += (targetRotation - group.rotation.y) * 0.05;

  var rotation = Math.abs(group.rotation.y * 180 / Math.PI % 360);
  if (rotation < 90) {
    rotation = rotation;
  } else if (rotation >= 90 && rotation < 180) {
    rotation = 180 - rotation;
  } else if (rotation >= 180 && rotation < 270) {
    rotation = Math.abs(180 - rotation);
  } else {
    rotation = Math.abs(360 - rotation);
  }
  //if(rotation < 90){
  var groundZPos = convertRange(rotation, [
    0, 90
  ], [15, 450])

  //ground.position.z = -groundZPos;
  ground.position.z = -450;
  //camera.position.x = -cursorX;
  //camera.position.y = cursorY;

  //Light
  dirLight.position.x = dirLigtPosX;

  if (pressState != undefined) {
    if (pressState) {
      //renderer.clear();
      renderer.toneMappingExposure = paramsReleased.exposure;
      bloomPass.threshold = paramsPressed.bloomThreshold;
      bloomPass.strength = paramsPressed.bloomStrength;
      bloomPass.radius = paramsPressed.bloomRadius;

      mesh.material = materialNormal;
      /*
      if(lightColor >0){
        lightColor -= 0.05
      }else{

      }
      */
      lightColor = 0;

      dirLight.color.setRGB(lightColor, lightColor, lightColor);

      effectFXAA.enabled = false;
      copyPass.enabled = false;
      bloomPass.enabled = true;

    } else {

      renderer.toneMappingExposure = paramsReleased.exposure;
      bloomPass.threshold = paramsReleased.bloomThreshold;
      bloomPass.strength = paramsReleased.bloomStrength;
      bloomPass.radius = paramsReleased.bloomRadius;
      //renderer.render(scene, camera);
      mesh.material = materialBlack;
      if (lightColor < 1) {
        lightColor += 0.05
      } else {
        lightColor = 1
      }
      dirLight.color.setRGB(lightColor, lightColor, lightColor);

      effectFXAA.enabled = true;
      copyPass.enabled = true;
      bloomPass.enabled = false;
    }
  } else {
    //renderer.render(scene, camera);
    renderer.toneMappingExposure = paramsReleased.exposure;
    bloomPass.threshold = paramsReleased.bloomThreshold;
    bloomPass.strength = paramsReleased.bloomStrength;
    bloomPass.radius = paramsReleased.bloomRadius;

    effectFXAA.enabled = true;
    copyPass.enabled = true;
    bloomPass.enabled = false;
  }
  composer.render(scene, camera);
  // console.log(lightColor)
  //Shader

  var shaderOffsetY2 = convertRange(smoothedY, [
    0, window.innerHeight
  ], [10, 70])

  var shaderOffsetY3 = convertRange(smoothedY, [
    0, window.innerHeight
  ], [200, 400])

  var shaderOffsetI;
  if (smoothedX >= window.innerWidth / 2) {
    shaderOffsetI = convertRange(smoothedX, [
      window.innerWidth / 2,
      window.innerWidth
    ], [300, 5])
    var shaderOffsetX = convertRange(smoothedX, [
      window.innerWidth / 2,
      window.innerWidth
    ], [0.5, 0.25])
  } else {
    shaderOffsetI = convertRange(smoothedX, [
      0, window.innerWidth / 2
    ], [5, 300])
    var shaderOffsetX = convertRange(smoothedX, [
      0, window.innerWidth / 2
    ], [0.25, 0.5])
  }
  //console.log(shaderOffsetI)
  //Shader
  if (materialShaderBlack) {
    //materialShader.uniforms.time.value = performance.now() / 1000;
    //materialShader.uniforms.val.value = Math.sin(performance.now() / 500) * 60.0;
    materialShaderBlack.uniforms.time.value = performance.now() / 1000;
    materialShaderBlack.uniforms.val.value = Math.sin(shaderOffsetX) * shaderOffsetPressed;
  }
  if (materialShaderNormal) {
    materialShaderNormal.uniforms.time.value = performance.now() / shaderOffsetY3;
    materialShaderNormal.uniforms.val.value = Math.sin(performance.now() / shaderOffsetY3) * shaderOffsetY2;
  }

  pCursorX = cursorX;
  pCursorY = cursorY;

  // try read the color in canvas to set the background color
  // but the effect not good
  // let gl = renderer.domElement.getContext('webgl');
  // let color = new Uint8Array(4);
  // gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,color);
  // console.log(csize);
  // console.log(color);
  // sendToParent({
  //   'backgroundColor': color
  // })
}
//Other Functions

function convertRange(value, r1, r2) {
  return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

function sendToParent(msg) {
  let parent = window.parent;
  if (parent) {
    parent.postMessage( msg , '*');
  }
}
