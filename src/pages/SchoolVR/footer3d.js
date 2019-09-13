import React, {useEffect, useState} from 'react';
import {THREE} from 'aframe';
import Orbitcontrols from 'three-orbitcontrols';
import TweenMax from 'gsap';

const Footer3d = (props) => {
  const [sceneElem, setSceneElem] = useState(null);

  useEffect(()=>{
    console.log(props.disable);
    // let onWindowResize = null;

    // if(sceneElem){
    //   let width = window.innerWidth,
    //       height = window.innerHeight; 
    //   let scene, camera, renderer, control;

    //   const initScene = () => {
    //     camera = new THREE.PerspectiveCamera( 55, width / height, 0.1, 1000 );
    //     // camera.position.y = 5;
    //     camera.position.z = 10;

    //     scene = new THREE.Scene();

    //     renderer = new THREE.WebGLRenderer({antialias: true});
    //     renderer.setClearColor(0x000000);
    //     renderer.setPixelRatio( window.devicePixelRatio );
    //     renderer.setSize( width, height );
    //     renderer.shadowMap.enabled = true;
    //     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //     renderer.setAnimationLoop(render);
    //     sceneElem.appendChild( renderer.domElement );

        
    //     control = new Orbitcontrols( camera, renderer.domElement );
    //     control.enableZoom = false;

    //     initGeometry();
    //     initLights();


        
    //   }

    //   const initLights = () => {
    //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    //     scene.add(ambientLight);

    //     const pointLight = new THREE.PointLight(0xd1898a, 0);
    //     pointLight.position.set( -10, 15, 10 );
    //     pointLight.castShadow = true;
    //     pointLight.shadow.mapSize.width = 2048;
    //     pointLight.shadow.mapSize.height = 2048;
    //     scene.add(pointLight);

    //     TweenMax.to(pointLight, 5, {intensity:1});
    //   }

    //   const initGeometry = () => {
    //     const spheregeometry = new THREE.SphereBufferGeometry( 2, 32, 32 );
    //     // spheregeometry.translate(0,2,0);
    //     const spherematerial = new THREE.MeshPhongMaterial({color: 0x990000});
    //     const sphere = new THREE.Mesh( spheregeometry, spherematerial );
    //     sphere.castShadow = true;
    //     scene.add( sphere );

    //     // const planegeometry = new THREE.PlaneBufferGeometry( 50, 20, 1 );
    //     // const planematerial = new THREE.MeshPhongMaterial({color: 0x1b95ba});
    //     // const plane = new THREE.Mesh( planegeometry, planematerial );
    //     // plane.rotation.set(-90*Math.PI/180,0,0);
    //     // plane.receiveShadow = true;
    //     // scene.add( plane );

    //     const wallgeometry = new THREE.PlaneBufferGeometry( 50, 30, 1 );
    //     const wallmaterial = new THREE.MeshPhongMaterial({color: 0x1b95ba});
    //     const wall = new THREE.Mesh( wallgeometry, wallmaterial );
    //     wall.position.set(0,0,-10);
    //     scene.add( wall );
    //   }

    //   const update = () => {
    //     camera.lookAt(0,0,0);
    //   }

    //   const render = () => {
    //     update();
        
		// 		renderer.setRenderTarget( null );
    //     renderer.render( scene, camera );
    //   }

    //   onWindowResize = () => {
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize( window.innerWidth, window.innerHeight );

    //   }
    //   window.addEventListener( 'resize', onWindowResize, false );
      
    //   initScene();

    //   return ()=>{
    //     if(onWindowResize)
    //       window.removeEventListener( 'resize', onWindowResize, false );
    //   }
    // }
  },[sceneElem]);

  return(
    <div id="footer3d">
      <div ref={elem=>{setSceneElem(elem)}} id="scene3d"></div>
      <div id="changeGeoBtn"></div>
    </div>
  )
}
export default Footer3d;