import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl} from 'react-intl';

import routes from 'globals/routes';
import {getAbsoluteUrlFromRelativeUrl} from 'utils/setStaticResourcesPath';

import Footer from 'containers/footer/Footer';
import ProjectCategories from 'containers/projectList/ProjectCategories';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import $ from 'jquery';
import TweenMax, { TimelineLite, TimelineMax, Elastic } from 'gsap';

//import P5Wrapper from 'react-p5-wrapper';

import {fetchActiveHomePage, fetchProjectCategories, fetchProjects} from 'websiteApi';
import {createIdSlugPairs} from 'utils/generalMapper';
import LabSection from '../components/LabSection';

import './HomePage.css';
import './HomePageSE.css';
//import sketch from './sketch';

import Modal from 'react-modal';

import {Player} from 'video-react';
import "./video-react.css";

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.75)';

function Items(props) {
  const a = props.abouts;
  return (<div className="row">
    <div className="col-md-1"></div>
    <div className="col-md-5 about-section-left">
      <h4 className="core-value-title text-left">{a.about_section_title_left}</h4>
      <div className="text-center">
        <img src={a.about_section_picture_left.guid} className="img-fluid core-value-img"/>
        <img src={a.about_section_picture_left_hover.guid} className="img-fluid core-value-img hover-img"/>
      </div>
      <p className="description text-center"></p>
    </div>
    <div className="col-md-5 about-section-right">
      <h4 className="core-value-title text-left">{a.about_section_title_right}</h4>
      <div className="text-center">
        <img src={a.about_section_picture_right.guid} className="img-fluid core-value-img"/>
        <img src={a.about_section_picture_right_hover.guid} className="img-fluid core-value-img hover-img"/>
      </div>
      <div className="text-center about-section-right-p-div">
        <p className="description">{a.about_section_desc}</p>
      </div>
    </div>
    <div className="col-md-1"></div>
  </div>);
}

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
    
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.featuredVideo = null;
    this.cursor = null;

    // this.handleLoad = this.handleLoad.bind(this);
    // this.handleCanvasMessage = this.handleCanvasMessage.bind(this);

    this.state = {
      homepage: null,
      projectCategories: [],
      allProjects: [],
    }    
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onMouseEnter(){
    if(this.cursor){
      var tl = new TimelineMax({delay:.1});
      tl.to(this.cursor.querySelector('span:nth-child(1)'), 1, {width:70,height:70,ease:Elastic.easeOut.config(1.5, .5)});
      tl.to(this.cursor.querySelector('span:nth-child(2)'), 1, {width:50,height:50,ease:Elastic.easeOut.config(1.2, .5)},'-=.9');
    }
  }
  onMouseLeave(){
    if(this.cursor){
      TweenMax.to(this.cursor.querySelectorAll('span'), .6, {width:0,height:0,ease:'Power4.easeOut'}); 
    }
  }
  onMouseMove(e){
    if(this.cursor){
      TweenMax.to(this.cursor, .6, {x: e.clientX - this.featuredVideo.offsetLeft, y: e.clientY + window.pageYOffset, ease:'Power4.easeOut'});
    }
  }

  componentDidMount() {
    fetchActiveHomePage((homepage) => {
      this.setState({homepage: homepage});
    });

    fetchProjectCategories((projectCategories) => {
      this.setState({projectCategories: projectCategories});
    });

    fetchProjects((projects) => {
      this.setState({allProjects: projects});
    });

    /*
      const publicUrl = process.env.PUBLIC_URL;
      scriptjs(publicUrl + '/canvas/hello/sketch.js');
      console.log('script loaded');
    */

    window.addEventListener('load', this.handleLoad);
    // $('iframe.iframe-p5').contents()
    //   .find('canvas').on('click',function(){
    //     console.log('click');
    // })
    window.addEventListener('message', this.handleCanvasMessage);

    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentDidUpdate(){
    // console.log(this.state.homepage && this.state.projectCategories.length && this.state.allProjects.length)
    if(this.state.homepage && this.state.projectCategories.length && this.state.allProjects.length){
      this.featuredVideo.addEventListener('mouseenter', this.onMouseEnter);
      this.featuredVideo.addEventListener('mouseleave', this.onMouseLeave);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad);
    window.removeEventListener('message', this.handleCanvasMessage);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  render() {
    const props = this.props;

    const home = this.state.homepage;
    const pC = this.state.projectCategories;
    const allProjects = this.state.allProjects;
    const highlightedProjects = home ? home.highlighted_projects : [];


    if (allProjects.length === 0) {
      return <MyFirstLoadingComponent isLoading={true} />;
      // return null;
    }

    if (pC.length === 0) {
      return <MyFirstLoadingComponent isLoading={true} />;
      // return null;
    }

    if (home === null) {
      return <MyFirstLoadingComponent isLoading={true} />;
      // return null;
    }

    const allProjectIdSlugPairs = createIdSlugPairs(allProjects);
    const canvasURL = getAbsoluteUrlFromRelativeUrl('canvas/1/index.html');
    // use inline svg instead of img
    // const svgURL = getAbsoluteUrlFromRelativeUrl('img/Play_btn-14.svg');

    const customStyles = {
      content : {
        // top                   : '50%',
        // left                  : '50%',
        // right                 : 'auto',
        // bottom                : 'auto',
        // marginRight           : '-50%',
        top                   : 0,
        left                  : 0,
        right                 : 0,
        bottom                : 0,
        padding               : 0,
        // transform             : 'translate(-50%, -50%)',
        backgroundColor       : 'rgba(0,0,0,0)',
        border                : '0px'
      }
    };
        
    const formatMessage = (msgId, defaultMsg) => {
      return props.intl.formatMessage({
        id: msgId,
        defaultMessage: defaultMsg
      });
    };

    return (
      <div>
        <section id="homepage" className="section-bg wow fadeIn" data-wow-delay="0.5s">
          <div ref={elem => this.featuredVideo = elem} id="featuredVideo">
            <video muted autoPlay loop playsInline>
              {/* <source src="https://player.vimeo.com/external/340322136.hd.mp4?s=718521cadf91addeb9b0ce9bb300306b7b86479a&amp;profile_id=175" type='video/mp4;'/> */}
              <source src="./video/website_video_s.mp4" type="video/mp4"/>
            </video>
            <div ref={elem => this.cursor = elem} id="cursor"><span></span><span>view</span></div>
            <div className="companyLogo">IOIO</div>
            <div className="videoDescription">
              <div className="videoTitle">A transmedia studio<br/>for experience innovation</div>
              <div className="scrollHint"><span class="returnIcon"></span>Scroll to explore</div>
            </div>
          </div>
          <div id="featuredProjects">
            <ul className="clearfix">
              {
                highlightedProjects.map((project,idx)=>{
                  const projectDetailRoutePath = routes.projectBySlugWithValue(allProjectIdSlugPairs[project.id]);

                  return <li key={idx} className={idx === 2 ? 'full' : ''}>
                      <Link to={projectDetailRoutePath}>
                        <img src={project.thumbnail.guid} alt="" />
                        <p>{project.project_name}</p>
                      </Link>
                    </li>
                })
              }
            </ul>
            <ul className="others">
              <li>
                
                <img src="https://admin.ioiocreative.com/wp-content/uploads/2018/04/K11_cover_loop.gif" alt="" />
                <p>K11藝術基金會 「Emerald City」展覽</p>
              </li>
              <li>
                <img src="https://admin.ioiocreative.com/wp-content/uploads/2019/06/thumbnail_19.gif" alt="" />
                <p>Hong Kong FinTech Week 2018</p>
              </li>
              <li className="big">
                <img src="https://admin.ioiocreative.com/wp-content/uploads/2018/04/FFF_thumb.jpg" alt="" />
                <p>FFFriday 時裝發佈會</p>
              </li>
            </ul>
          </div>
        </section>
        <LabSection />
        <section id="homepage-core-value">
          <div className="container">
            <Link to={routes.about(true)}>
              <Items abouts={home}/>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default injectIntl(HomePage);
