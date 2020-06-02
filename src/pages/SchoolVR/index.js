import React, { useEffect, useState } from 'react';
import TweenMax, { Power3, Power2, Elastic } from 'gsap';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';
import './schoolVR.css';
import smoothScroll from './scroll';
import Flickity from 'flickity';
import pjImage01 from '../../images/schoolVR/project01.png';
import pjImage02 from '../../images/schoolVR/project02.png';
import layerImage01 from '../../images/schoolVR/layer01.png';
import layerImage02 from '../../images/schoolVR/layer02.png';
import layerImage03 from '../../images/schoolVR/layer03.png';
import layerImage04 from '../../images/schoolVR/layer04.png';
import layerImage05 from '../../images/schoolVR/layer05.png';
import ftnImage01 from '../../images/schoolVR/function01.png';
import ftnImage02 from '../../images/schoolVR/function02.png';
import ftnImage03 from '../../images/schoolVR/function03.png';
import ftnImage04 from '../../images/schoolVR/function04.png';
import ftnImage05 from '../../images/schoolVR/function05.png';
import ftnImage06 from '../../images/schoolVR/function06.png';
import ftnImage07 from '../../images/schoolVR/function07.png';
import ftnImage08 from '../../images/schoolVR/function08.png';
let vrIcon = null;
let svrIcon = null;
// let sschoolvrIcon = null;
// let iconTimeout = null;
let pageNum = null;
let pageNumSpan = null;
// let logo = null;
let copyright = null;
let copyrightWrap = null;
let pages = null;
let section01wrap = null;
let section04bg = null;
let f = null;
let mobileContact = null;
let mobileContactBtn = null;
let mobileContactCloseBtn = null;
let mobileContactBg = null;

let page = 0;
let smooth = null;

const SchoolVR = props => {
  const [sceneElem, setSceneElem] = useState(null);
  // const [footerSceneElem, setFooterSceneElem] = useState(null);
  // const [disable, setDisable] = useState(false);

  useEffect(() => {
    document.getElementById('root').classList.add('schoolVR');

    let onWindowResize = null;
    let onWindowScroll = null;
    let onChangeGeo = null;
    let onScroll = null;
    const baseFontRatio = 16 / 1440;
    const fontMultiplier = 0.84375;
    let fgroup = null;
    let num = 0;
    let degree;
    let dir = '';
    let dragSpeed = 0;
    let rotateYease = 0;
    let clicked = false;
    let startPos = 0;
    let done = false;

    if (sceneElem) {
      let width = window.innerWidth,
        height = window.innerHeight;
      let scene, scenef, camera, cameraf, renderer, control, geoGroup;

      const initScene = () => {
        camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
        camera.position.x = 7;
        camera.position.y = 32;
        camera.position.z = 1;

        // cameraf = new THREE.PerspectiveCamera( 55, width / height, 0.1, 1000 );
        // cameraf.position.y = 20;
        // cameraf.position.z = 10;

        scene = new THREE.Scene();
        // scenef = new THREE.Scene();

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setAnimationLoop(render);
        sceneElem.appendChild(renderer.domElement);

        // new Orbitcontrols( cameraf, renderer.domElement );
        control = new Orbitcontrols(camera, renderer.domElement);
        control.enablePan = false;
        control.enableZoom = false;
        control.minPolarAngle = (10 * Math.PI) / 180;
        control.maxPolarAngle = (90 * Math.PI) / 180;
        control.enableDamping = true;
        control.dampingFactor = 0.05;
        control.rotateSpeed = 0.05;
        control.autoRotate = true;
        control.autoRotateSpeed = 0.1;

        TweenMax.to(camera.position, 3, {
          delay: 1,
          y: 9,
          z: window.innerWidth <= 1024 ? 50 : 32,
          ease: 'Sine.easeInOut'
        });
        TweenMax.to(control, 3, {
          delay: 1,
          autoRotateSpeed: 0.02,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            done = true;
          }
        });
        TweenMax.staggerFromTo(
          [
            '#vrIcon',
            '#schoolvrIcon',
            '#section01 .des',
            '#section01 #video',
            '#section01 #sd',
            '#section01 #sd_icon'
          ],
          1,
          { autoAlpha: 0, y: 15 },
          {
            force3D: true,
            delay: 1.6,
            autoAlpha: 1,
            y: 0,
            ease: Power3.easeOut
          },
          0.2
        );

        initGeometry();
        initLights();
      };

      const initLights = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        //left
        const pointLight = new THREE.PointLight(0xd1898a, 1.3);
        pointLight.position.set(-40, 15, 0);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 2048;
        pointLight.shadow.mapSize.height = 2048;
        scene.add(pointLight);

        //right
        const spotLight2 = new THREE.SpotLight(0x29cdfc, 2.5, 60, 40);
        spotLight2.position.set(30, 15, -5);
        spotLight2.penumbra = 1;
        spotLight2.castShadow = true;
        spotLight2.shadow.mapSize.width = 2048;
        spotLight2.shadow.mapSize.height = 2048;
        scene.add(spotLight2);

        // const ambientLight2 = new THREE.AmbientLight(0xffffff, 1);
        // scenef.add(ambientLight2);

        // const pointLight2 = new THREE.PointLight(0xffffff, .7);
        // pointLight2.position.set( -10, 20, 10 );
        // pointLight2.castShadow = true;
        // scenef.add(pointLight2);
      };

      const initGeometry = () => {
        geoGroup = new THREE.Group();
        var cylindergeometry = new THREE.CylinderBufferGeometry(2, 2, 11, 32);
        var cylindermaterial = new THREE.MeshPhongMaterial({
          color: 0x1b95ba,
          shininess: 40
        });
        var cylinder = new THREE.Mesh(cylindergeometry, cylindermaterial);
        cylinder.position.x = -10;
        cylinder.position.z = 3;
        cylinder.castShadow = true;
        geoGroup.add(cylinder);

        const spheregeometry = new THREE.SphereBufferGeometry(5, 36, 36);
        const spherematerial = new THREE.MeshPhongMaterial({
          color: 0xd18980,
          shininess: 40
        });
        const sphere = new THREE.Mesh(spheregeometry, spherematerial);
        sphere.position.x = 5;
        sphere.castShadow = true;
        geoGroup.add(sphere);

        const boxgeometry = new THREE.BoxBufferGeometry(70, 100, 70);
        const boxmaterial = new THREE.MeshPhongMaterial({
          color: 0x283c51,
          side: THREE.BackSide
        });
        const box = new THREE.Mesh(boxgeometry, boxmaterial);
        box.position.y = 100 / 2 - 5;
        box.rotation.y = (45 * Math.PI) / 180;
        box.castShadow = true;
        box.receiveShadow = true;
        geoGroup.add(box);

        scene.add(geoGroup);

        // footer
        // fgroup = new THREE.Group();
        // const fspheregeometry = new THREE.SphereBufferGeometry( 1.5, 22, 22 );
        // const fspherematerial = new THREE.MeshPhongMaterial({color: 0x1b95ba});
        // const fsphere = new THREE.Mesh( fspheregeometry, fspherematerial );
        // fgroup.add( fsphere );

        // const fboxgeometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
        // const fboxmaterial = new THREE.MeshPhongMaterial({color: 0xd18980});
        // const fbox = new THREE.Mesh( fboxgeometry, fboxmaterial );
        // fgroup.add( fbox );

        // const fsphere2 = new THREE.Mesh( fspheregeometry, fspherematerial );
        // fgroup.add( fsphere2 );

        // const fbox2 = new THREE.Mesh( fboxgeometry, fboxmaterial );
        // fgroup.add( fbox2 );

        // const fsphere3 = new THREE.Mesh( fspheregeometry, fspherematerial );
        // fgroup.add( fsphere3 );

        // const fbox3 = new THREE.Mesh( fboxgeometry, fboxmaterial );
        // fgroup.add( fbox3 );

        // fgroup.position.z = 10;

        // degree = 360 / fgroup.children.length;
        // for(let i=0; i<fgroup.children.length; i++){
        //   fgroup.children[i].position.set(10*Math.sin(i*degree * Math.PI/180), 0, 10*Math.cos(i*degree * Math.PI/180));
        // }

        // scenef.add(fgroup);

        // const wallgeometry = new THREE.PlaneBufferGeometry( 50, 30, 1 );
        // const wallmaterial = new THREE.MeshPhongMaterial({color: 0x142326});
        // const wall = new THREE.Mesh( wallgeometry, wallmaterial );
        // wall.position.set(0,0,-10);
        // scenef.add( wall );
      };

      let a = 0;
      let b = 0;
      const update = () => {
        // if(page > 1){
        //   cameraf.lookAt(0,0,0);
        // }

        // if(clicked){
        //   rotateYease += (-dragSpeed - rotateYease) * .1;
        //   a += rotateYease * Math.PI/180;
        // }
        // else{
        //   a += ((Math.round((fgroup.rotation.y* 180/Math.PI) / degree)*degree*Math.PI/180) - a) * .1;
        // }

        // fgroup.rotation.y = a;

        control.update();
        if (window.innerWidth <= 1024) {
          if (page > 0) {
            camera.lookAt(-2, 18, 0);
            geoGroup.scale.set(0.8, 0.8, 0.8);
          } else {
            camera.lookAt(-1, 8, 0);
            geoGroup.scale.set(1, 1, 1);
          }
        } else {
          camera.lookAt(-1, 8, 0);
        }
      };

      const render = () => {
        update();

        if (
          (window.innerWidth <= 1024 && page <= 0) ||
          (window.innerWidth > 1024 && page <= 1)
        )
          renderer.render(scene, camera);
        // else
        //   renderer.render( scenef, cameraf );
      };

      // onChangeGeo = () => {
      // const _num = num++ % 2;
      // if(_num === 0){
      //   TweenMax.to(fbox.scale, .6, {x:1,y:1,z:1, delay:.5, ease:Power4.easeInOut});
      //   TweenMax.to(fsphere.scale, .6, {x:0.001,y:0.001,z:0.001, ease:Power4.easeInOut});
      // }
      // else{
      //   TweenMax.to(fsphere.scale, .6, {x:1,y:1,z:1, delay:.5, ease:Power4.easeInOut});
      //   TweenMax.to(fbox.scale, .6, {x:0.001,y:0.001,z:0.001, ease:Power4.easeInOut});
      // }
      // }
      // document.querySelector('#bookingBtn').addEventListener('click',onChangeGeo);

      document.querySelector('#sd').addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          TweenMax.to('#scroll', 1, {
            scrollTop: window.innerHeight,
            ease: Power2.easeInOut
          });
        } else {
          smooth.to(-window.innerHeight + 1);
        }
      });

      const adjustSize = function () {
        var width = window.innerWidth;
        var roundNumber = Math.round(baseFontRatio * width * fontMultiplier);
        if (roundNumber >= 16)
          document.documentElement.style.fontSize = roundNumber + 'px';
        else document.documentElement.style.fontSize = '';
      };

      onWindowResize = () => {
        document.querySelector('#section01').style.height =
          window.innerHeight + 'px';
        document.querySelector('#section02').style.height =
          window.innerHeight + 'px';
        // document.querySelector('#section02').style.marginTop = window.innerHeight+'px';
        document.querySelector('#section08').style.height =
          window.innerHeight + 'px';
        document.querySelector('#mobileContact').style.height =
          window.innerHeight + 'px';
        // document.querySelector('#scroll #section01').style.height = window.innerHeight+'px';
        // document.querySelector('#section09').style.height = window.innerHeight+'px';
        document.querySelector('#section01 #scene3d').style.height =
          window.innerHeight + 'px';
        // document.querySelector('#section09 #scene3d').style.height = window.innerHeight+'px';

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        // cameraf.aspect = window.innerWidth / window.innerHeight;
        // cameraf.updateProjectionMatrix();
        renderer.setSize(
          window.innerWidth,
          document.querySelector('#scene3d').offsetHeight
        );
        adjustSize();

        if (window.innerWidth <= 1024) {
          page = Math.round(window.pageYOffset / window.innerHeight);

          section01wrap.style.transform = '';

          if (!f) {
            document.querySelector('#item08');
            f = new Flickity('#section05 .wrap', {
              prevNextButtons: false,
              arrowShape: {
                x0: 10,
                x1: 60,
                y1: 50,
                x2: 70,
                y2: 40,
                x3: 30
              },
              cellAlign: 'left'
            });
          }
          // if(page > 1){
          //   if(renderer.domElement.className !== 'active'){
          //     renderer.domElement.className = 'active';
          //     renderer.domElement.style.transform = `translate3d(0,${document.querySelector('#section09').offsetTop}px,0)`;
          //   }
          // }
          // else{
          //   if(renderer.domElement.className === 'active'){
          //     renderer.domElement.className = '';
          //     renderer.domElement.style.transform = `translate3d(0,0,0)`;
          //   }
          // }
        } else {
          if (f) {
            f.destroy();
            f = null;
          }
        }
      };

      onWindowScroll = () => {
        const s =
          document.querySelector('#section02').getBoundingClientRect().top -
          window.innerHeight;
        const s4 = document.querySelector('#section04').getBoundingClientRect()
          .top;
        const sm = document
          .querySelector('#scroll #mobileContact')
          .getBoundingClientRect().top;
        page = Math.floor((-s + 1) / window.innerHeight);

        if (window.innerWidth <= 1024) {
          // pageNum.style.transform = `translate3d(0,${-pageNumSpan.offsetHeight * page}px,0)`;

          // if(page > 1){
          //   if(renderer.domElement.className !== 'active'){
          //     renderer.domElement.className = 'active';
          //     renderer.domElement.style.transform = `translate3d(0,${document.querySelector('#section09').offsetTop}px,0)`;
          //   }
          // }
          // else{
          //   if(renderer.domElement.className === 'active'){
          //     renderer.domElement.className = '';
          //     renderer.domElement.style.transform = `translate3d(0,0,0)`;
          //   }
          // }

          // iconTimeout = setTimeout(()=>{
          //   vrIcon.className = '';
          //   iconTimeout = null;
          // },1000);

          // if(page > 0){
          // logo.className = 'w';
          // copyright.className = 'w';
          // }
          // else{
          // logo.className = '';
          // copyright.className = '';
          // }

          if (page > 0) {
            svrIcon.className = '';
            document.querySelector('#video').className = 'btn hide';
            document.querySelector('#sd').className = 'btn hide';
            // camera.position.z = 50;
            //   copyrightWrap.style.transform = `translate3d(0,0,0)`;
          } else {
            svrIcon.className = 'hide';
            document.querySelector('#video').className = 'btn';
            document.querySelector('#sd').className = 'btn';
            // camera.position.z = 32;
            //   copyrightWrap.style.transform = `translate3d(-${pages.offsetWidth + 15}px,0,0)`;
          }

          if (sm <= 100) {
            mobileContactBtn.className = 'active big';
            TweenMax.to(mobileContactBtn, 0.6, {
              x: '50%',
              width: 188 / 16 + 'rem',
              right: '50%',
              ease: 'Power2.easeOut'
            });
          } else {
            // mobileContactBtn.className = 'active';
            if (page > 0 && page < 9) {
              if (mobileContactBtn.className !== 'active') {
                mobileContactBtn.className = 'active';
                TweenMax.to(mobileContactBtn, 1, {
                  scale: 1,
                  ease: Elastic.easeOut.config(1, 0.4)
                });
                TweenMax.to(mobileContactBtn, 0.6, {
                  x: '0%',
                  width: 58 / 16 + 'rem',
                  right: 30,
                  ease: 'Power2.easeOut'
                });
              }
            } else if (page < 1) {
              if (mobileContactBtn.className === 'active') {
                mobileContactBtn.className = '';
                TweenMax.to(mobileContactBtn, 0.3, {
                  scale: 0,
                  ease: 'Power3.easeInOut'
                });
              }
            }
          }

          if (s4 <= window.innerHeight / 2) {
            if (section04bg.className !== 'active')
              section04bg.className = 'active';
            // svrIcon.className = 'small blue';
            // sschoolvrIcon.className = 'small blue';
          } else {
            if (section04bg.className === 'active') section04bg.className = '';

            // if(s < -10){
            // svrIcon.className = 'hide';
            // sschoolvrIcon.className = 'small';
            // }
            // else{
            // svrIcon.className = '';
            // sschoolvrIcon.className = '';
            // }
          }
        }
      };
      window.addEventListener('resize', onWindowResize, false);
      document
        .querySelector('#scroll')
        .addEventListener('scroll', onWindowScroll, false);
      document.onload = () => {
        onWindowResize();
      };

      initScene();
      onWindowResize();

      onScroll = (s, y, h) => {
        page = Math.round(-y / window.innerHeight);

        section01wrap.style.transform = `translate3d(-50%,${y * 0.4}px,0)`;

        if (-y > 50) {
          // logo.className = 'w';
          copyright.className = 'w';
        } else {
          // logo.className = '';
          copyright.className = '';
        }

        pageNum.style.transform = `translate3d(0,${
          -pageNumSpan.offsetHeight * page
        }px,0)`;

        if (page > 1) {
          // if(renderer.domElement.className !== 'active'){
          //   renderer.domElement.className = 'active';
          //   renderer.domElement.style.transform = `translate3d(0,${document.querySelector('#section09').offsetTop}px,0)`;
          // }
          if (page === 3) {
            if (section04bg.className !== 'active')
              section04bg.className = 'active';
          } else if (section04bg.className === 'active')
            section04bg.className = '';
        }

        if (page >= 0 && page < 8) {
          if (page >= 7) {
            if (mobileContactBtn.className !== 'active big') {
              mobileContactBtn.className = 'active big';
              TweenMax.to(mobileContactBtn, 0.6, {
                width: 188 / 16 + 'rem',
                ease: 'Power2.easeOut'
              });
            }
          } else if (page >= 0 && page < 7) {
            if (mobileContactBtn.className !== 'active') {
              mobileContactBtn.className = 'active';
              TweenMax.to(mobileContactBtn, 1, {
                scale: 1,
                ease: Elastic.easeOut.config(1, 0.4)
              });
              TweenMax.to(mobileContactBtn, 0.6, {
                width: 58 / 16 + 'rem',
                ease: 'Power2.easeOut'
              });
            }
          }
        } else if (page < 1) {
          if (mobileContactBtn.className === 'active') {
            mobileContactBtn.className = '';
            TweenMax.to(mobileContactBtn, 0.3, {
              scale: 0,
              ease: 'Power3.easeInOut'
            });
          }
        }

        // else{
        //   if(renderer.domElement.className === 'active'){
        //     renderer.domElement.className = '';
        //     renderer.domElement.style.transform = `translate3d(0,0,0)`;
        //   }
        // }

        if (page > 0) {
          svrIcon.className = '';
          copyrightWrap.style.transform = `translate3d(0,0,0)`;
        } else {
          svrIcon.className = 'hide';
          copyrightWrap.style.transform = `translate3d(-${
            pages.offsetWidth + 15
          }px,0,0)`;
        }
      };

      smooth = new smoothScroll('#scroll', (s, y, h) => {
        onScroll(s, y, h);
      });
      smooth.showScrollBar();
      if (window.innerWidth > 1024) {
        smooth.on();
      }

      TweenMax.to('#section02Cir01', 6, {
        force3D: true,
        rotation: 360,
        transformOrigin: '50% 50%',
        repeat: -1,
        ease: Power3.easeInOut
      });
      TweenMax.to('#section02Cir02', 6, {
        force3D: true,
        rotation: 360,
        transformOrigin: '50% 50%',
        repeat: -1,
        delay: 0.3,
        ease: Power3.easeInOut
      });

      mobileContactBtn.addEventListener('click', () => {
        if (mobileContact.className === 'section fixed') {
          mobileContact.className = 'section fixed active';
          mobileContactBg.className = 'active';
        }
      });
      mobileContactCloseBtn.addEventListener('click', () => {
        if (mobileContact.className !== 'section fixed') {
          mobileContact.className = 'section fixed';
          mobileContactBg.className = '';
        }
      });

      mobileContactBg.addEventListener('click', () => {
        if (mobileContact.className !== 'section fixed') {
          mobileContact.className = 'section fixed';
          mobileContactBg.className = '';
        }
      });

      svrIcon.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          TweenMax.to('#scroll', 1, { scrollTop: 0, ease: Power2.easeInOut });
        }
      });

      // const onMouseDown = (event) =>{
      //   const e = event.touches ? event.touches[0] : event;
      //   clicked = true;
      //   startPos = e.clientX;
      //   dragSpeed = 0;
      // }
      // const onMouseUp = () =>{
      //   clicked = false;
      //   startPos = 0;
      //   dragSpeed = 0;
      //   rotateYease = 0;
      // }
      // const onMouseMove = (event) =>{
      //   if(clicked){
      //     const e = event.touches ? event.touches[0] : event;
      //     dragSpeed = (e.clientX - startPos) * .01;
      //   }
      // }
      // document.querySelector('#section09 #scene3d').addEventListener('mousedown',onMouseDown);
      // document.querySelector('#section09 #scene3d').addEventListener('mouseup',onMouseUp);
      // document.querySelector('#section09 #scene3d').addEventListener('mousemove',onMouseMove);
      // document.querySelector('#section09 #scene3d').addEventListener('touchstart',onMouseDown);
      // document.querySelector('#section09 #scene3d').addEventListener('touchend',onMouseUp);
      // document.querySelector('#section09 #scene3d').addEventListener('touchmove',onMouseMove);

      return () => {
        if (onWindowResize)
          window.removeEventListener('resize', onWindowResize, false);

        if (onWindowScroll)
          window.removeEventListener('scroll', onWindowScroll, false);

        // if(onChangeGeo)
        //   document.querySelector('#bookingBtn').removeEventListener( 'click', onChangeGeo);
        smooth.off();
      };
    }
  }, [sceneElem]);

  return (
    <div>
      <div
        ref={elem => {
          svrIcon = elem;
        }}
        id='svrIcon'
        className='hide'
      >
        <p className='s'>
          <span>School VR</span>
        </p>
        <span></span>
      </div>
      {/* <div ref={elem => sschoolvrIcon = elem} id="sschoolvrIcon"><span></span></div> */}
      {/* <a ref={(elem) => logo = elem} id="logo" href="https://ioiocreative.com" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.81 30.87">
          <path d="M8.11.09H5.83v4.82H.05v2.28h5.78v6.7h2.28v-6.7h5.77V4.91H8.11V.09zM25.13 2.49h5.22v11.35h2.27V2.49h6.34V.22H25.13v2.27z"/><path d="M35.94 5.25v2.9l2.93.01-.01-2.92-2.92.01zM90.75 9.3h-5.42V7.55h5.42V5.66h-5.42V3.74h5.42V1.86h-6.37V.01h-1.89v2.47l-1.66 2.07V2.91l1-1.36.25-.33-1.16-.89-.34-.25-3.45 4.72-.24.33 1.16.87.34.25.56-.76v8.47h1.88V4.69l1.41 1.13 1.2-1.52v9.66h1.89v-2.77h5.42V9.3zM60.28 1.84h1.59v9.63h-1.59z"/><path d="M62.77.05v12.34h-2.5v1.59h4.08V.05h-1.58zM58.25 2.67c-.65-.51-1.32-1-1.91-1.51V0h-1.59v1.16l-3.64 3 1 1.23.21-.18V9l-1.12 5.1H53l.72-3.67v3.69h5.18V9.91h-5.12l.07-.36h5.07v-4.3l.22.17 1-1.22L60 4c-.55-.4-1.16-.87-1.75-1.33zm-3.1 10v-1.3h2.29v1.25zm2.18-5V8H54v-.43zm0-2V6H54v-.45zM53.9 4l1.65-1.38L57.3 4zM0 23.41h1.84v7.33H0zM8 23.29c-2.25 0-3.25 1.17-3.25 3.78s1 3.8 3.25 3.8 3.23-1.14 3.23-3.8a4.32 4.32 0 0 0-.75-2.85A3 3 0 0 0 8 23.29zm0 5.94c-1 0-1.37-.32-1.37-2.16S7 24.93 8 24.93s1.35.3 1.35 2.14-.44 2.16-1.35 2.16zM14.09 23.41h1.84v7.33h-1.84zM22.05 23.29c-2.24 0-3.24 1.17-3.24 3.78s1 3.8 3.24 3.8 3.24-1.14 3.24-3.8a4.38 4.38 0 0 0-.75-2.85 3 3 0 0 0-2.49-.93zm1.36 3.78c0 1.84-.41 2.16-1.35 2.16s-1.36-.32-1.36-2.16c0-1.51.19-2.14 1.35-2.14.95 0 1.36.3 1.36 2.14zM37.11 29a3.57 3.57 0 0 1-1.35.26c-1.11 0-1.64-.33-1.64-2.21 0-1.61.38-2.11 1.61-2.11a4.08 4.08 0 0 1 1.36.23l.13.05.18-1.59h-.07a5.34 5.34 0 0 0-1.69-.3 3.27 3.27 0 0 0-2.58 1 4.06 4.06 0 0 0-.83 2.67c0 2.59 1.08 3.85 3.31 3.85a4.53 4.53 0 0 0 1.82-.4h.06l-.18-1.52zM45.53 25.72c0-1.56-.9-2.31-2.75-2.31h-2.72v7.32h1.82v-2.65h.83L44 30.73h2.12l-1.69-3a2 2 0 0 0 1.1-2.01zm-1.88.07c0 .67-.21.88-.89.88h-.88v-1.73h.91c.66 0 .86.2.86.85zM50.23 27.72h2.63v-1.49h-2.63v-1.2h3.12l-.03-1.62h-4.9v7.32h5.05l.04-1.6h-3.28v-1.41zM60.12 23.41h-2l-2.54 7.32h1.92l.4-1.38h2.42l.4 1.38h2l-2.53-7.25zm-1 1.67l.11.41.64 2.31H58.3l.7-2.31zM63.9 23.41l-.04 1.65h1.91v5.67h1.82v-5.67h1.92l-.04-1.65H63.9zM72.09 23.41h1.84v7.33h-1.84zM80.02 28.3l-.1.41-.11-.41-1.4-4.89h-1.99l2.47 7.25.02.07h1.93l2.5-7.32h-1.89l-1.43 4.89zM87.53 29.13v-1.41h2.63v-1.49h-2.63v-1.2h3.13l-.04-1.62h-4.9v7.32h5.05l.04-1.6h-3.28z"/>
        </svg>
      </a> */}
      <div ref={elem => (copyright = elem)} id='copyright'>
        <div ref={elem => (copyrightWrap = elem)} className='copyrightWrap'>
          <div ref={elem => (pages = elem)} className='pages bold h5'>
            {/* <span>P</span> */}
            <div className='pageNumWrap'>
              <span ref={elem => (pageNum = elem)} className='pageNum'>
                <span ref={elem => (pageNumSpan = elem)}>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
              </span>
            </div>
          </div>
          <span className='s'>
            Copyright © {new Date().getFullYear()} IOIO Limited
          </span>
        </div>
      </div>

      <div id='scroll'>
        <div id='section01' className='section'>
          <div ref={elem => (section01wrap = elem)} className='wrap'>
            <div className='row'>
              <div ref={elem => (vrIcon = elem)} id='vrIcon'></div>
            </div>
            <div className='row'>
              <div id='schoolvrIcon'></div>
            </div>
            <div className='row des'>
              Innovation Lab for your first VR world
            </div>
          </div>
          <div
            ref={elem => {
              setSceneElem(elem);
            }}
            id='scene3d'
          ></div>
          <div id='video' className='btn'>
            <div>Watch the Video</div>
          </div>
          <div id='sd' className='btn'>
            <div>More details</div>
          </div>
          <div id='sd_icon'></div>
        </div>
        <div id='section02' className='section'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1634.25 801.48'>
            <defs>
              <linearGradient
                id='a'
                x1='683.97'
                y1='117.51'
                x2='117.35'
                y2='684.13'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0' stopColor='#ff94ae' />
                <stop offset='1' />
              </linearGradient>
              <linearGradient
                id='b'
                x1='1634.25'
                y1='400.66'
                x2='832.93'
                y2='400.66'
                xlinkHref='#a'
              />
            </defs>
            <g>
              <g>
                <circle
                  id='section02Cir01'
                  cx='400.66'
                  cy='400.82'
                  r='400.66'
                  fill='url(#a)'
                  opacity='.29'
                />
                <circle
                  id='section02Cir02'
                  cx='1233.59'
                  cy='400.66'
                  r='400.66'
                  fill='url(#b)'
                  opacity='.29'
                />
              </g>
            </g>
          </svg>
          <div className='wrap'>
            <p className='bigTitle'>
              The Interactive
              <br />
              Learning Experience
            </p>
            <p className='h4'>
              3D world, 360 video and Virtual Reality (VR) technology is
              revolutionising the way of education, schools would provide
              students with engaging learning experiences that help them
              observe, create and communicate, thus to maximise students’
              potential in the path of learning and development.
              <br />
              <br />
              OGCIO plans to implement the “IT Innovation Lab in Secondary
              Schools” initiative under the existing “Enriched IT Programme in
              Secondary Schools” to provide funding support.
            </p>
          </div>
        </div>
        <div id='section03' className='section'>
          <div className='content'>
            <h1>Benefits</h1>
            <div className='wrap'>
              <div className='title'>For teachers</div>
              <ul className='h4'>
                <li>STEM elements in everyday class</li>
                <li>Easy preparation for interesting tutorial</li>
                <li>Suitable for all subjects</li>
              </ul>
            </div>
            <div className='wrap'>
              <div className='title'>For Students</div>
              <ul className='h4'>
                <li>
                  Story-telling, 3D environment building and Animation Concepts
                </li>
                <li>
                  Effective learning through immersive and interactive
                  experience
                </li>
                <li>
                  A much more memorable presentation using 3D media content over
                  2D media content
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id='section04' className='section'>
          <div ref={elem => (section04bg = elem)} id='bg'>
            <img id='_01' src={layerImage01} />
            <img id='_02' src={layerImage02} />
            <img id='_04' src={layerImage04} />
            <img id='_05' src={layerImage05} />
            <img id='_03' src={layerImage03} />
          </div>
          <div className='content'>
            <h2>Just 5 steps</h2>
            <div className='outerGroupWrap'>
              <div className='groupWrap'>
                <div className='wrap'>
                  <div className='col'>
                    <svg viewBox='0 0 25 30'>
                      <text y='28'>1</text>
                    </svg>
                  </div>
                  <div className='col'>
                    <div className='t h4 bold'>Insert & Edit Elements</div>
                    <div className='s'>
                      Adding all sorts of materials for the VR presentation,
                      including texts, photos, videos, 3D objects, 360
                      background and 360 videos. Users can edit position, size
                      and colour of materials.
                    </div>
                  </div>
                </div>
                <div className='wrap'>
                  <div className='col'>
                    <svg viewBox='0 0 25 30'>
                      <text y='28'>2</text>
                    </svg>
                  </div>
                  <div className='col'>
                    <div className='t h4 bold'>Create Animation</div>
                    <div className='s'>
                      There is a timeline for animation creation. Users can
                      create continuous sequence of all objects.
                    </div>
                  </div>
                </div>
                <div className='wrap'>
                  <div className='col'>
                    <svg viewBox='0 0 25 30'>
                      <text y='28'>3</text>
                    </svg>
                  </div>
                  <div className='col'>
                    <div className='t h4 bold'>Navigation</div>
                    <div className='s'>
                      Users can create a new slide with navigator. When the
                      presentation change slides, the point of view will jump to
                      a new location.
                    </div>
                  </div>
                </div>
              </div>
              <div className='groupWrap'>
                <div className='wrap empty'>
                  <div className='col'>
                    <svg viewBox='0 0 25 34'>
                      <text y='28'></text>
                    </svg>
                  </div>
                  <div className='col'>
                    <div className='t h4'></div>
                    <div className='s'></div>
                  </div>
                </div>
                <div className='wrap'>
                  <div className='col'>
                    <svg viewBox='0 0 25 30'>
                      <text y='28'>4</text>
                    </svg>
                  </div>
                  <div className='col'>
                    <div className='t h4 bold'>
                      The Virtual Camera Placement
                    </div>
                    <div className='s'>
                      The last step before wrapping up, user can edit the
                      location of camera to control the first look of each
                      slide.
                    </div>
                  </div>
                </div>
                <div className='wrap'>
                  <div className='col'>
                    <svg viewBox='0 0 25 30'>
                      <text y='28'>5</text>
                    </svg>
                  </div>
                  <div className='col'>
                    <div className='t h4 bold'>Share</div>
                    <div className='s'>
                      The final step is to share your <br />
                      presentation to fellow students.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='section05' className='section'>
          <div className='content'>
            <h2>Functions</h2>
            <div className='wrap'>
              {/* <div id="col01" className="col">
                <div className="itemWrap"> */}
              <div id='item01' className='item'>
                <img src={ftnImage01} />
                <div className='des half'>
                  <div className='h4 bold'>3D Objects</div>
                  <div className='s'>
                    Use 3D object to curate and construct your space with just
                    one click.
                  </div>
                </div>
              </div>
              <div id='item02' className='item'>
                <div className='half'>
                  <img src={ftnImage04} />
                  <div className='des'>
                    <div className='h4 bold'>Adjustment Panel</div>
                    <div className='s'>
                      Simple yet sufficient effects to construct your 3D world.
                    </div>
                  </div>
                </div>
              </div>
              <div id='item03' className='item'>
                <img src={ftnImage06} />
                <div className='des'>
                  <div className='h4 bold'>Camera</div>
                  <div className='s'>
                    Pick the best angle to present your great idea.
                  </div>
                </div>
              </div>
              <div id='item04' className='item'>
                <img src={ftnImage02} />
                <div className='des half'>
                  <div className='h4 bold'>Media</div>
                  <div className='s'>
                    Make use of 2D and 3D photos and videos as an immersive
                    storytelling method.
                  </div>
                </div>
              </div>
              {/* </div>
              </div>
              <div id="col02" className="col">
                <div className="itemWrap"> */}

              <div id='item05' className='item'>
                <img src={ftnImage05} />
                <div className='des'>
                  <div className='h4 bold'>Timeline</div>
                  <div className='s'>
                    Go beyond 3D. A glimpse on the use of motion and production
                    of animation.
                  </div>
                </div>
              </div>
              {/* </div>
              </div>
              <div id="col03" className="col">
                <div className="itemWrap"> */}
              <div id='item06' className='item'>
                <img src={ftnImage07} />
                <div className='des'>
                  <div className='h4 bold'>Preview/ Share</div>
                  <div className='s'>
                    Share the 3D world in a presentation space that sits
                    everyone in the same network.
                  </div>
                </div>
              </div>
              <div id='item07' className='item'>
                <div className='half'>
                  <img src={ftnImage03} />
                  <div className='des'>
                    <div className='h4 bold'>Navigation</div>
                    <div className='s'>
                      Easy wiring method for better story organisation.
                    </div>
                  </div>
                </div>
              </div>
              <div id='item08' className='item'>
                <img src={ftnImage08} />
                <div className='des'>
                  <div className='h4 bold'>Real Time View</div>
                  <div className='s'>See who’s with you.</div>
                </div>
              </div>
              {/* </div>
              </div> */}
            </div>
          </div>
        </div>
        <div id='section06' className='section'>
          <div className='content'>
            <h2>
              Product <br />
              Outcome
            </h2>
            <div className='wrap'>
              <img src={pjImage01} />
              <div className='des s'>
                <p>
                  A simple example for 3D space building. Making use with basic
                  3D objects and effects, students are able to build a 3D
                  campus, exploring along the way and curate their own
                  exhibition. More creation and surprises to be seen within this
                  imaginary space.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id='section07' className='section'>
          <div className='content'>
            <h2>
              Product <br />
              Outcome
            </h2>
            <div className='wrap'>
              <img src={pjImage02} />
              <div className='des s'>
                <p>
                  Making use of 360 materials collected, it is an easy example
                  of how a VR field trip presentation works. Students are able
                  to tell stories with their own method, it can be a map, a
                  timeline, multi-senses and more. Students can make good use of
                  the navigation function to transfer between different spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id='section08' className='section'>
          <div className='content halfWrap'>
            <div className='half'>
              <h2>Specification</h2>
              <ul className='specList h5'>
                <li className='t h4 bold'>Windows 10 64-bit</li>
                <li>CPU: i5 @3.2GHz * 4</li>
                <li>RAM: 8GB min</li>
                <li>GPU: NVIDIA GTX 1050; AMD RX560</li>
                <li>Browser: Firefox / Chrome</li>
              </ul>
            </div>
            <div className='contact half'>
              <h2>Contact</h2>
              <ul className='h6'>
                <li>
                  <div className='t h4 bold'>Let’s Create Together!</div>
                  <p>
                    IOIO is a cross-media studio for experience innovation. We
                    are a team of designers, computer engineers, media artists,
                    project managers and researchers. Our target is to create
                    new nodes in the network between physical and virtual, new
                    meaning of interaction, new perspective to see.
                  </p>
                </li>
                <li>
                  <p>
                    {'20A1, Galaxy Factory Building,'.toUpperCase()}
                    <br />
                    {'25 Luk Hop St, San Po Kong,'.toUpperCase()}
                    <br />
                    HONG KONG
                  </p>
                  <p>
                    (852) 3709 8437
                    <br />
                    <a href='https://www.ioiocreative.com' target='_blank'>
                      www.ioiocreative.com
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id='mobileContact' className='section'>
          <div className='content'>
            <h1>Let’s Create Together!</h1>
            <div className='wrap'>
              <a
                className='ioio bold'
                href='https://www.ioiocreative.com'
                target='_blank'
              >
                www.ioiocreative.com
              </a>
              <div>
                <a href='tel:+85237098437'>(852) 3709 8437</a>
              </div>
            </div>
            <div className='wrap'>
              <p className='address s'>
                {'20A1, Galaxy Factory Building, 25 Luk Hop St, San Po Kong, Hong Kong'.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        {/* <div id="section09">
          <div id="footer3d">
            <div id="scene3d"></div>
            <div id="bookingBtn"><div className="wrap"><span className="h4 bold">Booking</span></div></div>
          </div>
        </div> */}
      </div>
      <div ref={elem => (mobileContactBg = elem)} id='mobileContactBg'></div>
      <div
        ref={elem => (mobileContact = elem)}
        id='mobileContact'
        className='section fixed'
      >
        <div
          ref={elem => (mobileContactCloseBtn = elem)}
          id='mobileContactCloseBtn'
        ></div>
        <div className='content'>
          <h1>Let’s Create Together!</h1>
          <div className='wrap'>
            <a
              className='ioio bold'
              href='https://www.ioiocreative.com'
              target='_blank'
            >
              www.ioiocreative.com
            </a>
            <div>
              <a href='tel:+85237098437'>(852) 3709 8437</a>
            </div>
          </div>
          <div className='wrap'>
            <p className='address s'>
              {'20A1, Galaxy Factory Building, 25 Luk Hop St, San Po Kong, Hong Kong'.toUpperCase()}
            </p>
          </div>
          <a className='btn' href='mailto:'>
            <div>Enquiry</div>
          </a>
        </div>
      </div>
      <div
        ref={elem => (mobileContactBtn = elem)}
        id='mobileContactBtn'
        className='hide'
      >
        <span></span>
        <a className='btn'>
          <div>Enquiry</div>
        </a>
      </div>
    </div>
  );
};

export default SchoolVR;
