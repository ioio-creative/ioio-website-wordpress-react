import React, {useEffect, useState} from 'react';
import {THREE} from 'aframe';
import Orbitcontrols from 'three-orbitcontrols';
import './schoolVR.css';
import schoolvr_icon from '../images/schoolVR/schoolvr_icon.svg';
import vr_icon from '../images/schoolVR/vr_icon.svg';

const SchoolVR = (props) => {
  const [sceneElem, setSceneElem] = useState(null);

  useEffect(()=>{
    document.getElementById('root').classList.add('schoolVR');

    let onWindowResize = null;

    if(sceneElem){
      let width = window.innerWidth,
          height = window.innerHeight; 
      let scene, camera, renderer;
      let isClicked = false;
      let mouse = {x:0, y:0};
      

      const initScene = () => {
        camera = new THREE.PerspectiveCamera( 55, width / height, 0.1, 1000 );

        camera.position.x = 7;
        camera.position.y = 9;
        camera.position.z = 32;

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( width, height );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setAnimationLoop(render);
        sceneElem.appendChild( renderer.domElement );

        
        const o = new Orbitcontrols( camera, renderer.domElement );
        o.enablePan = false;
        
        initGeometry();
        initLights();
      }

      const initLights = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        //left
        const pointLight = new THREE.PointLight(0xd1898a, 1.3);
        pointLight.position.set( -40, 15, 0 );
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 2048;
        pointLight.shadow.mapSize.height = 2048;
        scene.add(pointLight);

        //right
        const spotLight2 = new THREE.SpotLight(0x29cdfc, 2.5, 60, 40);
        spotLight2.position.set( 30, 15, -5 );
        spotLight2.penumbra = 1;
        spotLight2.castShadow = true;
        spotLight2.shadow.mapSize.width = 2048;
        spotLight2.shadow.mapSize.height = 2048;
        scene.add(spotLight2);

        // back
        const spotLight = new THREE.SpotLight(0x32aace, 1, 60, 30);
        spotLight.position.set( -10, 10, 30 );
        spotLight.penumbra = 1;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        scene.add(spotLight);

        // front
        const spotLight3 = new THREE.SpotLight(0xd1898a, 2, 60, 20);
        spotLight3.position.set( -5, 5, -30 );
        spotLight3.penumbra = 1;
        spotLight3.castShadow = true;
        spotLight3.shadow.mapSize.width = 2048;
        spotLight3.shadow.mapSize.height = 2048;
        scene.add(spotLight3);

        // var spotLightHelper = new THREE.SpotLightHelper( spotLight );
        // scene.add( spotLightHelper );
        // var spotLightHelper = new THREE.SpotLightHelper( spotLight2 );
        // scene.add( spotLightHelper );
        // var spotLightHelper = new THREE.SpotLightHelper( spotLight3 );
        // scene.add( spotLightHelper );
        
        // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        // pointLight.position.set( -5, 15, -23 );
        // scene.add(pointLight);
      }

      const initGeometry = () => {
        var cylindergeometry = new THREE.CylinderBufferGeometry( 2, 2, 11, 32 );
        var cylindermaterial = new THREE.MeshPhongMaterial({color: 0x1b95ba, shininess:70});
        var cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
        cylinder.position.x = -10;
        cylinder.position.z = 3;
        cylinder.castShadow = true;
        // cylinder.receiveShadow = true;
        scene.add( cylinder );

        const spheregeometry = new THREE.SphereBufferGeometry(5, 36,36);
        const spherematerial = new THREE.MeshPhongMaterial({color:0xd1898a, shininess:70});
        const sphere = new THREE.Mesh(spheregeometry, spherematerial);
        sphere.position.x = 5;
        // sphere.position.z = -10;
        sphere.castShadow = true;
        // sphere.receiveShadow = true;
        scene.add(sphere);

        
        const boxgeometry = new THREE.BoxBufferGeometry(70,70,70);
        const boxmaterial = new THREE.MeshPhongMaterial({color:0x283c51, shininess:100, side: THREE.BackSide});
        const box = new THREE.Mesh(boxgeometry, boxmaterial);
        box.position.y = 70/2 - 5;
        box.rotation.y = 45 * Math.PI/180;
        box.castShadow = true;
        box.receiveShadow = true;
        scene.add(box);
      }

      const update = () => {
        camera.lookAt(-1,7,0);
      }

      const render = () => {
        update();
        
				renderer.setRenderTarget( null );
        renderer.render( scene, camera );
      }

      onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }
      window.addEventListener( 'resize', onWindowResize, false );


      const onMousedown = () => { isClicked = true; }
      const onMouseup = () => { isClicked = false; }
      const onMouseMove = (event) => {
        let e = event.touch ? event.touch[0] : event;
        if(isClicked)
          mouse = {x:e.ClientX, y:e.ClientY};
      }
      document.addEventListener('mousedown', onMousedown, false);
      document.addEventListener('mouseup', onMouseup, false);
      document.addEventListener('mousemove', onMouseMove, false);

      initScene();

      return ()=>{
        if(onWindowResize)
            window.removeEventListener( 'resize', onWindowResize, false );
      }
    }
  },[sceneElem]);

  return(
    <div>
      <div id="section01" className="section">
        <div className="wrap">
          <div id="vrIcon"></div>
          <div id="schoolvrIcon"></div>
          {/* <img id="vrIcon" src={vr_icon}></img>
          <img id="schoolvrIcon" src={schoolvr_icon}></img> */}
        </div>
        <div ref={(elem)=>{setSceneElem(elem)}} id="scene3d"></div>
      </div>
    </div>
  )
}

export default SchoolVR;