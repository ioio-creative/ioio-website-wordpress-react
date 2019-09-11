import React, {useEffect, useState} from 'react';
import {THREE} from 'aframe';
import Orbitcontrols from 'three-orbitcontrols';
import './schoolVR.css';

const SchoolVR = (props) => {
  const [sceneElem, setSceneElem] = useState(null);
  let svrIcon = null;

  useEffect(()=>{
    document.getElementById('root').classList.add('schoolVR');

    let onWindowResize = null;
    let onWindowScroll = null;
    const baseFontRatio = 16 / 1440;
    const fontMultiplier = 0.84375;

    if(sceneElem){
      let width = window.innerWidth,
          height = window.innerHeight; 
      let scene, camera, renderer, control;
      let isClicked = false;
      

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

        
        control = new Orbitcontrols( camera, renderer.domElement );
        control.enablePan = false;
        control.enableZoom = false;
        control.maxPolarAngle = 90 * Math.PI/180;
        
        initGeometry();
        initLights();
      }

      const initLights = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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
        var cylindermaterial = new THREE.MeshPhongMaterial({color: 0x1b95ba, shininess:40});
        var cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
        cylinder.position.x = -10;
        cylinder.position.z = 3;
        cylinder.castShadow = true;
        // cylinder.receiveShadow = true;
        scene.add( cylinder );

        const spheregeometry = new THREE.SphereBufferGeometry(5, 36,36);
        const spherematerial = new THREE.MeshPhongMaterial({color:0xd1898a, shininess:40});
        const sphere = new THREE.Mesh(spheregeometry, spherematerial);
        sphere.position.x = 5;
        // sphere.position.z = -10;
        sphere.castShadow = true;
        // sphere.receiveShadow = true;
        scene.add(sphere);

        
        const boxgeometry = new THREE.BoxBufferGeometry(70,100,70);
        const boxmaterial = new THREE.MeshPhongMaterial({color:0x283c51, shininess:50, side: THREE.BackSide});
        const box = new THREE.Mesh(boxgeometry, boxmaterial);
        box.position.y = 100/2 - 5;
        box.rotation.y = 45 * Math.PI/180;
        box.castShadow = true;
        box.receiveShadow = true;
        scene.add(box);
      }

      const update = () => {
        camera.lookAt(-1,8,0);
        // control.update();
      }

      const render = () => {
        update();
        
				renderer.setRenderTarget( null );
        renderer.render( scene, camera );
      }


      const adjustSize = function(){
        var width = window.innerWidth;
        var roundNumber = Math.round(baseFontRatio * width * fontMultiplier);
        if(roundNumber >= 16) //roundNumber = 16;
            document.documentElement.style.fontSize = roundNumber + 'px';
        else
            document.documentElement.style.fontSize = '';
      }
      onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

        adjustSize();
      }
      window.addEventListener( 'resize', onWindowResize, false );

      adjustSize();

      onWindowScroll = (e) => {
        let y = window.pageYOffset;

        if(y>80)
          document.querySelector('#logo').className = 'w';
        else
          document.querySelector('#logo').className = '';

        if(y >= height){
          svrIcon.className = '';
        }
        else{
          svrIcon.className = 'hide';
        }
      }
      window.addEventListener('scroll',onWindowScroll);
      

      // const onMousedown = () => { isClicked = true; }
      // const onMouseup = () => { isClicked = false; }
      // const onMouseMove = (event) => {
      //   let e = event.touch ? event.touch[0] : event;
      //   if(isClicked)
      //     mouse = {x:e.ClientX, y:e.ClientY};
      // }
      // document.addEventListener('mousedown', onMousedown, false);
      // document.addEventListener('mouseup', onMouseup, false);
      // document.addEventListener('mousemove', onMouseMove, false);

      initScene();

      return ()=>{
        if(onWindowResize)
          window.removeEventListener( 'resize', onWindowResize, false );
        // if(onWindowScroll)
      }
    }
  },[sceneElem]);

  return(
    <div>

      <div ref={(elem)=>{svrIcon = elem}} id="svrIcon" className="hide">
        <p className="s">School VR</p><span></span>
      </div>
      <div id="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.81 30.87">
          <path d="M8.11.09H5.83v4.82H.05v2.28h5.78v6.7h2.28v-6.7h5.77V4.91H8.11V.09zM25.13 2.49h5.22v11.35h2.27V2.49h6.34V.22H25.13v2.27z"/><path d="M35.94 5.25v2.9l2.93.01-.01-2.92-2.92.01zM90.75 9.3h-5.42V7.55h5.42V5.66h-5.42V3.74h5.42V1.86h-6.37V.01h-1.89v2.47l-1.66 2.07V2.91l1-1.36.25-.33-1.16-.89-.34-.25-3.45 4.72-.24.33 1.16.87.34.25.56-.76v8.47h1.88V4.69l1.41 1.13 1.2-1.52v9.66h1.89v-2.77h5.42V9.3zM60.28 1.84h1.59v9.63h-1.59z"/><path d="M62.77.05v12.34h-2.5v1.59h4.08V.05h-1.58zM58.25 2.67c-.65-.51-1.32-1-1.91-1.51V0h-1.59v1.16l-3.64 3 1 1.23.21-.18V9l-1.12 5.1H53l.72-3.67v3.69h5.18V9.91h-5.12l.07-.36h5.07v-4.3l.22.17 1-1.22L60 4c-.55-.4-1.16-.87-1.75-1.33zm-3.1 10v-1.3h2.29v1.25zm2.18-5V8H54v-.43zm0-2V6H54v-.45zM53.9 4l1.65-1.38L57.3 4zM0 23.41h1.84v7.33H0zM8 23.29c-2.25 0-3.25 1.17-3.25 3.78s1 3.8 3.25 3.8 3.23-1.14 3.23-3.8a4.32 4.32 0 0 0-.75-2.85A3 3 0 0 0 8 23.29zm0 5.94c-1 0-1.37-.32-1.37-2.16S7 24.93 8 24.93s1.35.3 1.35 2.14-.44 2.16-1.35 2.16zM14.09 23.41h1.84v7.33h-1.84zM22.05 23.29c-2.24 0-3.24 1.17-3.24 3.78s1 3.8 3.24 3.8 3.24-1.14 3.24-3.8a4.38 4.38 0 0 0-.75-2.85 3 3 0 0 0-2.49-.93zm1.36 3.78c0 1.84-.41 2.16-1.35 2.16s-1.36-.32-1.36-2.16c0-1.51.19-2.14 1.35-2.14.95 0 1.36.3 1.36 2.14zM37.11 29a3.57 3.57 0 0 1-1.35.26c-1.11 0-1.64-.33-1.64-2.21 0-1.61.38-2.11 1.61-2.11a4.08 4.08 0 0 1 1.36.23l.13.05.18-1.59h-.07a5.34 5.34 0 0 0-1.69-.3 3.27 3.27 0 0 0-2.58 1 4.06 4.06 0 0 0-.83 2.67c0 2.59 1.08 3.85 3.31 3.85a4.53 4.53 0 0 0 1.82-.4h.06l-.18-1.52zM45.53 25.72c0-1.56-.9-2.31-2.75-2.31h-2.72v7.32h1.82v-2.65h.83L44 30.73h2.12l-1.69-3a2 2 0 0 0 1.1-2.01zm-1.88.07c0 .67-.21.88-.89.88h-.88v-1.73h.91c.66 0 .86.2.86.85zM50.23 27.72h2.63v-1.49h-2.63v-1.2h3.12l-.03-1.62h-4.9v7.32h5.05l.04-1.6h-3.28v-1.41zM60.12 23.41h-2l-2.54 7.32h1.92l.4-1.38h2.42l.4 1.38h2l-2.53-7.25zm-1 1.67l.11.41.64 2.31H58.3l.7-2.31zM63.9 23.41l-.04 1.65h1.91v5.67h1.82v-5.67h1.92l-.04-1.65H63.9zM72.09 23.41h1.84v7.33h-1.84zM80.02 28.3l-.1.41-.11-.41-1.4-4.89h-1.99l2.47 7.25.02.07h1.93l2.5-7.32h-1.89l-1.43 4.89zM87.53 29.13v-1.41h2.63v-1.49h-2.63v-1.2h3.13l-.04-1.62h-4.9v7.32h5.05l.04-1.6h-3.28z"/>
        </svg>
      </div>


      <div id="section01" className="section">
        <div className="wrap">
          <div className="row"><div id="vrIcon"></div></div>
          <div className="row"><div id="schoolvrIcon"></div></div>
          <div className="row des">Innovation Lab for your first VR world</div>
        </div>
        <div ref={(elem)=>{setSceneElem(elem)}} id="scene3d"></div>
      </div>
      <div id="section02" className="section">
        <div className="wrap">
          <p className="bigTitle">The Interactive<br/>Learning Experience</p>
          <p className="h4">
            3D world, 360 video and Virtual reality (VR) technology is revolutionising  
            the way of education, schools would provide students with engaging  
            learning experiences that help them observe, create and communicate,  
            thus to maximise students’ potential in the path of learning and development.  
            <br/><br/>
            OGCIO plans to implement the “IT Innovation Lab in Secondary Schools” initiative under the existing “Enriched IT Programme in Secondary Schools”  
            to provide funding support. 
          </p>
        </div>
      </div>
      <div id="section03" className="section">
        <div className="content">
          <h1>Benefits</h1>
          <div className="wrap">
            <div className="title">For teachers</div>
            <ul className="h4">
              <li>STEM elements in everyday class</li>
              <li>Easy preparation for interesting tutorial</li>
              <li>Suitable for all subjects</li>
            </ul>
          </div>
          <div className="wrap">
            <div className="title">For Students</div>
            <ul className="h4">
              <li>Story-telling, 3D environment building and Animation Concepts</li>
              <li>Effective learning through immersive and interactive experience</li>
              <li>A much more memorable presentation using 3D media content over 2D media content</li>
            </ul>
          </div>
        </div>
      </div>
      <div id="section04" className="section">
        <div className="content">
          <h2>Just 5 steps</h2>
          <div className="outerGroupWrap">
            <div className="groupWrap">
              <div className="wrap">
                <div className="col"><svg viewBox="0 0 25 30"><text y="28">1</text></svg></div>
                <div className="col">
                  <div className="t h4">Insert & Edit Elements</div>
                  <div className="s">Adding all sorts of materials for the VR presentation, including texts, photos, videos, 3D objects, 360 background and 360 videos. Users can edit position, size and colour of materials.</div>
                </div>
              </div>
              <div className="wrap">
                <div className="col"><svg viewBox="0 0 25 30"><text y="28">2</text></svg></div>
                <div className="col">
                  <div className="t h4">Create Animation</div>
                  <div className="s">There is a timeline for animation creation. Users can create continuous sequence of all objects.</div>
                </div>
              </div>
              <div className="wrap">
                <div className="col"><svg viewBox="0 0 25 30"><text y="28">3</text></svg></div>
                <div className="col">
                  <div className="t h4">Navigation</div>
                  <div className="s">Users can create a new slide with navigator. When the presentation change slides, the point of view will jump to a new location.</div>
                </div>
              </div>
            </div>
            <div className="groupWrap">
              <div className="wrap">
                <div className="col"><svg viewBox="0 0 25 30"><text y="28"></text></svg></div>
                <div className="col">
                  <div className="t h4"></div>
                  <div className="s"></div>
                </div>
              </div>
              <div className="wrap">
                <div className="col"><svg viewBox="0 0 25 30"><text y="28">4</text></svg></div>
                <div className="col">
                  <div className="t h4">Camera Placement</div>
                  <div className="s">The last step before wrapping up, user can edit the location of camera to control the first look of each slide.</div>
                </div>
              </div>
              <div className="wrap">
                <div className="col"><svg viewBox="0 0 25 30"><text y="28">5</text></svg></div>
                <div className="col">
                  <div className="t h4">Share</div>
                  <div className="s">The final step is to share your <br/>presentation to fellow students.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolVR;