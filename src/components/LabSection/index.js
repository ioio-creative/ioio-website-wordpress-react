import './index.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
//import OrbitControls from 'three-orbitcontrols';
import { EffectComposer } from './EffectComposer';
import { ShaderPass } from './postprocessing/ShaderPass';
import { TexturePass } from './postprocessing/TexturePass';
import { ClearPass } from './postprocessing/ClearPass';
import { MaskPass, ClearMaskPass } from './postprocessing/MaskPass';
import { GlitchPass } from './postprocessing/GlitchPass';
import { CopyShader } from './shaders/CopyShader';

import ReturnIcon from 'components/ReturnIcon';

import routes from 'globals/routes';
import { isMobileBrowser } from 'utils/getIsMobileBrowser';

const LabSection = props => {
  const {
    title,
    desc,
    interactionHint,
    backgroundVideoSrc,
    backgroundVideoSrcForMobile
  } = props;

  const labSection = useRef(null);
  const labVideo = useRef(null);

  useEffect(
    _ => {
      let scene,
        sceneMask,
        camera,
        renderer,
        composer,
        rtMain,
        rtMask,
        w = labSection.current.offsetWidth,
        h = labSection.current.offsetHeight,
        ioio = [];

      const rotateDir = [];
      const speed = [];
      const options = {
        cameraZ: { value: 7, min: 0, max: 20 },
        scale: { value: 10, min: 0, max: 50 }
      };

      const init = function () {
        const fov = 40;
        const near = 0.1;
        const far = 1000;

        scene = new THREE.Scene();
        sceneMask = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(fov, w / h, near, far);
        camera.position.z = options.cameraZ.value;

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0.0);
        // renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        labSection.current.appendChild(renderer.domElement);
        renderer.setAnimationLoop(function () {
          update();
          render();
        });

        initLights();
        initMesh();

        var effectGlitch = new GlitchPass(10);
        effectGlitch.uniforms.col_s.value = 0;
        // console.log(effectGlitch)

        const video = labVideo.current;
        // if(video)
        // video.play();
        var texture = new THREE.VideoTexture(video);
        var texturePass = new TexturePass(texture);

        const clearPass = new ClearPass();
        const clearMaskPass = new ClearMaskPass();

        var maskPass = new MaskPass(sceneMask, camera);
        var outputPass = new ShaderPass(CopyShader);

        var parameters = {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBFormat,
          stencilBuffer: true
        };

        var renderTarget = new THREE.WebGLRenderTarget(
          window.innerWidth,
          window.innerHeight,
          parameters
        );

        composer = new EffectComposer(renderer, renderTarget);
        composer.addPass(clearPass);
        composer.addPass(maskPass);
        composer.addPass(texturePass);
        composer.addPass(clearMaskPass);
        composer.addPass(effectGlitch);
        composer.addPass(outputPass);

        // initStats();
        // initGUI();

        // event
        // var controls = new OrbitControls( camera );
      };

      const initLights = function () {
        const ambientLight = new THREE.AmbientLight(0x999999);
        scene.add(ambientLight);
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(5, 10, 7);
        scene.add(light);
      };

      const initMesh = function () {
        const size = 1.5;
        const pos = [
          { x: -4, y: -1 },
          { x: -2.3, y: 1.1 },
          { x: -0.3, y: 0 },
          { x: 2, y: -1 }
        ];
        ioio.push(generateO(size - 0.4));
        ioio.push(generateI(size - 0.85, size + 0.1));
        ioio.push(generateO(size - 0.4));
        ioio.push(generateI(size - 0.85, size + 0.1));
        for (let i = 0; i < ioio.length; i++) {
          rotateDir[i] = {
            x: Math.random() * 0.5 + 0.5,
            y: Math.random() * 0.5 + 0.5
          };
          speed[i] = {
            x: Math.random() * 0.03 - 0.015,
            y: Math.random() * 0.03 - 0.015
          };
          ioio[i].position.x = Math.random() * 8 - 4;
          ioio[i].position.y = Math.random() * 2 - 1;
          sceneMask.add(ioio[i]);
        }
      };

      const generateI = (size = 1, height = 1) => {
        const group = new THREE.Group();
        const cgeometry = new THREE.CylinderGeometry(size, size, height, 50);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });

        const stgeometry = new THREE.SphereGeometry(size, 32, 32);
        stgeometry.translate(0, height / 2, 0);
        const stmesh = new THREE.Mesh(stgeometry, material);
        const sbgeometry = new THREE.SphereGeometry(size, 32, 32);
        sbgeometry.translate(0, -height / 2, 0);
        const sbmesh = new THREE.Mesh(sbgeometry, material);

        stmesh.updateMatrix();
        cgeometry.merge(stmesh.geometry, stmesh.matrix);
        stmesh.updateMatrix();
        cgeometry.merge(sbmesh.geometry, sbmesh.matrix);

        const cmesh = new THREE.Mesh(cgeometry, material);

        group.add(cmesh);
        return group;
      };

      const generateO = (size = 1) => {
        const geometry = new THREE.TorusGeometry(size, size / 1.9, 30, 50);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
      };

      const draw = function () {
        var time = performance.now() * 0.0005;

        for (let i = 0; i < ioio.length; i++) {
          ioio[i].position.x += speed[i].x;
          ioio[i].position.y += speed[i].y;
          if (ioio[i].position.x > 7.5) ioio[i].position.x = -7.5;
          else if (ioio[i].position.x < -7.5) ioio[i].position.x = 7.5;
          if (ioio[i].position.y > 4) ioio[i].position.y = -4;
          else if (ioio[i].position.y < -4) ioio[i].position.y = 4;
          ioio[i].rotation.x = time * rotateDir[i].x;
          ioio[i].rotation.y = time * rotateDir[i].y;
        }

        camera.lookAt(0, 0, 0);
      };

      const update = function () {
        draw();
        // stats.update();
      };

      const render = function () {
        renderer.clear();
        composer.render();
      };

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
        w = labSection.current.offsetWidth;
        h = labSection.current.offsetHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer.setSize(w, h);
      };

      init();

      window.addEventListener('resize', onWindowResize, false);
      return _ => {
        window.removeEventListener('resize', onWindowResize, false);
      };
    },
    [labSection, labVideo]
  );

  const interactionHintElement = (
    <Link to={routes.lab(true)}>
      <div className='interaction-hint'>
        <span className='interaction-hint-return-icon-container'>
          <ReturnIcon
            color='#FFF'
            beforeWidth='1em'
            beforeHeight='1.5em'
            arrowSize='0.75em'
          />
        </span>
        {interactionHint}
      </div>
    </Link>
  );

  return (
    <div className='lab-section-container'>
      <div className='title'>{title}</div>
      <div ref={labSection} className='lab-section'>
        <video
          ref={labVideo}
          className='lab-video'
          loop
          crossOrigin='anonymous'
          playsInline
          autoPlay
          muted
          controls
        >
          {isMobileBrowser ? (
            <>
              <source src={backgroundVideoSrcForMobile} />
              <source src={backgroundVideoSrc} />
            </>
          ) : (
            <>
              <source src={backgroundVideoSrc} />
              <source src={backgroundVideoSrcForMobile} />
            </>
          )}
          <source src={backgroundVideoSrc} />
        </video>
        <div className='video-text-outer-container'>
          <div className='video-text-inner-container'>
            <div className='desc-container'>
              <div className='desc'>{desc}</div>
              <div className='interation-hint-container'>
                {interactionHintElement}
              </div>
            </div>
            <div className='interation-hint-container-for-mobile'>
              {interactionHintElement}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabSection;
