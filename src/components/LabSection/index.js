import React, {useEffect,useRef} from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import {EffectComposer} from './EffectComposer';
import {ShaderPass} from './postprocessing/ShaderPass';
import {TexturePass} from './postprocessing/TexturePass';
import {ClearPass} from './postprocessing/ClearPass';
import {MaskPass, ClearMaskPass} from './postprocessing/MaskPass';
import {CopyShader} from './shaders/CopyShader';

const LabSection = props => {
  const labSection = useRef(null);

  useEffect(()=>{

    let scene, sceneMask, camera, renderer, composer, rtMain, rtMask,
        w = labSection.current.offsetWidth,
        h = labSection.current.offsetHeight,
        box=null;

    const options = {
        cameraZ:{ value:5, min:0, max:20 },
        scale:{ value:10, min:0, max:50 }
    }

    // const TextureMaskShader = {

    //   uniforms: {
  
    //       "textureA": { type: "t", value: null },
    //       "textureB": { type: "t", value: null }
  
    //   },
  
    //   vertexShader: [
  
    //       "varying vec2 vUv;",
  
    //       "void main() {",
  
    //           "vUv = uv;",
    //           "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
  
    //       "}"
  
    //   ].join("\n"),
  
    //   fragmentShader: [
  
    //       "uniform float opacity;",
  
    //       "uniform sampler2D textureA;",
    //       "uniform sampler2D textureB;",
  
    //       "varying vec2 vUv;",
  
    //       "void main() {",
  
    //           "vec4 texelA = texture2D( textureA, vUv );",
    //           "vec4 texelB = texture2D( textureB, vUv );",
    //           "vec4 background = vec4(1.0, 1.0, 1.0, 0.0);",
  
    //           // just textureA
    //           "gl_FragColor = texelA;",
  
    //           // just textureB
    //           //"gl_FragColor = texelB;",
  
    //           // textureB masking textureA 
    //           // "gl_FragColor = mix( background, texelA,);",
  
    //       "}"
  
    //   ].join("\n")
    // };

    const init = function(){
        const fov = 60;
        const near = 0.1;
        const far = 1000;

        scene = new THREE.Scene();
        sceneMask = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( fov, w / h, near, far );
        camera.position.z = options.cameraZ.value;

        renderer = new THREE.WebGLRenderer({premultipliedAlpha:false,antialias: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( w, h );
        renderer.setClearColor( 0x000000, 0.0);
        // renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        labSection.current.appendChild( renderer.domElement );
        renderer.setAnimationLoop(function(){
          update();
          render();
        })

        initLights();
        initMesh();

        // const shaderMask = new ShaderPass( TextureMaskShader );
        // shaderMask.renderToScreen = true;
        // rtMain = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter } );
        // rtMask = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter } );
        // shaderMask.uniforms[ "textureA" ].value = rtMain.texture;
        // shaderMask.uniforms[ "textureB" ].value = rtMask.texture;

        // var texture = new THREE.TextureLoader().load( 'https://threejs.org/examples/textures/758px-Canestra_di_frutta_(Caravaggio).jpg' );
        // texture.minFilter = THREE.LinearFilter;
        const video = document.getElementById( 'video' );
				video.play();
        var texture =  new THREE.VideoTexture( video );
				var texturePass = new TexturePass( texture );

        const clearPass = new ClearPass();
        const clearMaskPass = new ClearMaskPass();

        var maskPass = new MaskPass( sceneMask, camera );
        var outputPass = new ShaderPass( CopyShader );
        
        var parameters = {
					minFilter: THREE.LinearFilter,
					magFilter: THREE.LinearFilter,
					format: THREE.RGBFormat,
					stencilBuffer: true
				};

				var renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, parameters );

				composer = new EffectComposer( renderer, renderTarget );
				composer.addPass( clearPass );
        // composer.addPass( shaderMask );
        composer.addPass( maskPass );
				composer.addPass( texturePass );
				composer.addPass( clearMaskPass );
        composer.addPass( outputPass );
        
        // initStats();
        // initGUI();

        // event
        // var controls = new OrbitControls( camera );
    }

    const initLights = function(){
        const ambientLight = new THREE.AmbientLight( 0x999999 );
        scene.add( ambientLight );
        const light = new THREE.PointLight( 0xffffff, 1 );
        light.position.set( 5, 10, 7 );
        scene.add(light);
    }

    const initMesh = function(){
      box = generateBox(2);
      sceneMask.add(box);
    }

    const generateBox = function(size = 1){
        const geometry = new THREE.BoxGeometry(size,size,size);
        const material = new THREE.MeshPhongMaterial({color:0xff0000});
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    const draw = function(){
        // const timer = (Date.now() - start) * .0002;
        var time = performance.now() * 0.0005;

        box.position.x = 2*Math.sin(time*2);
        box.rotation.x=time;
        box.rotation.y=time;
        // camera.position.z = options.cameraZ.value;
        camera.lookAt(0,0,0);
    }

    const update = function(){
        draw();
        // stats.update();
    }

    const render = function(){
      renderer.clear();
      composer.render();
    }
    

    
    // others
    // const initStats = function(){
    //     stats = new Stats();
    //     stats.showPanel(0);
    //     stats.domElement.style.position = 'fixed';
    //     stats.domElement.style.top = 0;
    //     document.body.appendChild( stats.domElement );
    // }

    // const initGUI = function(){
    //     const arrayOptions = Object.entries(options);
    //     const gui = new dat.GUI({width: 300});

    //     for(let i=0; i<arrayOptions.length; i++){
    //         const key = arrayOptions[i][0];
    //         if(typeof options[key] === 'function'){
    //             gui.add(options, key);
    //         }
    //         else{
    //             const name = key.charAt(0).toUpperCase() + key.slice(1);
    //             const min = arrayOptions[i][1].min;
    //             const max = arrayOptions[i][1].max;
    //             gui.add(options[key], 'value').min(min).max(max).name(name);
    //         }
    //     }
    // }
    
    const onWindowResize = () => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize( w, h );
        composer.setSize( w, h );
    }

    init();

    window.addEventListener( 'resize', onWindowResize, false );
    return () => {
      window.removeEventListener( 'resize', onWindowResize, false );
    }
  },[labSection])

  return(
    <div ref={labSection} id="labSection" style={{height:500}}>
      <video id="video" loop crossOrigin="anonymous" playsInline style={{display:'none'}}>
        <source src="https://threejs.org/examples/textures/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'/>
        <source src="https://threejs.org/examples/textures/sintel.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
      </video>
    </div>
  )
}

export default LabSection;