import React, {Component} from 'react';
import {injectIntl} from 'react-intl';

import routes from 'globals/routes';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
import LabSection from 'components/LabSection';
import ReturnIcon from 'components/ReturnIcon';

import ProjectList from 'containers/home/ProjectList';
import ClientList from 'containers/home/ClientList';
import Footer from 'containers/footer/Footer';

import TweenMax, { TimelineMax, Elastic } from 'gsap';

import {fetchActiveHomePage, fetchProjects} from 'websiteApi';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';
import firstOrDefault from 'utils/js/array/firstOrDefault';
import {createIdSlugPairs} from 'utils/generalMapper';
import {getAbsoluteUrlFromRelativeUrl} from 'utils/setStaticResourcesPath';

import './HomePage.scss';
import './HomePageSE.css';

import Modal from 'react-modal';

//import {Player} from 'video-react';
import "./video-react.css";

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.75)';


class HomePage extends Component {
  constructor(props) {
    super(props);

    // refs
    this.featuredVideo = null;
    this.setFeaturedVideo = element => this.featuredVideo = element;
    this.popupVideo = null;
    this.setPopupVideo = element => this.popupVideo = element;
    this.cursor = null;
    this.setCursor = element => this.cursor = element;

    this.state = {      
      isOpenVideo: false,
      homepageData: null,
      allProjects: [],
      highlightedProjects: [], 
    };

    [
      // methods
      'isDataFetchComplete',
      'parseHomepageData',         

      // event handlers
      'onMouseEnter',
      'onMouseLeave',
      'onMouseMove',
      'onClickVideo',
      'onCloseVideo',
      'handleFetchCallback',
    ].forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });   
  }


  /* react lifecycles */

  componentDidMount() {
    fetchActiveHomePage((homepage) => {
      this.setState({
        homepageData: homepage
      }, this.handleFetchCallback);      
    });

    fetchProjects((projects) => {
      this.setState({
        allProjects: projects
      }, this.handleFetchCallback);
    });     

    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {    
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  componentDidUpdate() {    
    if (this.isDataFetchComplete()) {
      this.featuredVideo.addEventListener('mouseenter', this.onMouseEnter);
      this.featuredVideo.addEventListener('mouseleave', this.onMouseLeave);
    }
  }  

  /* end of react lifecycles */


  /* methods */

  isDataFetchComplete() {
    const {
      homepageData,      
      allProjects,      
    } = this.state;
    return homepageData !== null && isNonEmptyArray(allProjects);
  }

  parseHomepageData(homepageData, allProjects) {
    const {
      highlighted_project_1,
      highlighted_project_2,      
      highlighted_project_3,
      highlighted_project_4,
      highlighted_project_5,
      highlighted_project_6,     
    } = homepageData;
    
    const projectIdSlugPairs = createIdSlugPairs(allProjects);    

    const highlightedProjects = [
      highlighted_project_1,
      highlighted_project_2,
      highlighted_project_3,
      highlighted_project_4,
      highlighted_project_5,
      highlighted_project_6
    ].map(highlighted_project => {  
      const highlightedProject = firstOrDefault(highlighted_project);
      if (!highlightedProject) {
        return null;
      }
      
      const { project_name, image, referred_project } = highlightedProject;
      // TODO: referred_project in json has strange relationship structure, maybe related to "Allow Add New" option in Pods (WordPress plugin)
      //console.log(referred_project);

      const referredProject = firstOrDefault(referred_project);
      const detailRoutePath = referredProject ? 
        routes.projectBySlugWithValue(projectIdSlugPairs[referredProject.id]) : null;

      return {
        name: project_name,
        imgSrc: image.guid,
        referredProject: referredProject,
        detailRoutePath: detailRoutePath
      };
    });

    this.setState({
      highlightedProjects: highlightedProjects,    
    });  
  }
  
  /* end of methods */


  /* event handlers */

  onMouseEnter(){
    if (this.cursor) {
      var tl = new TimelineMax({delay:.1});
      tl.to(this.cursor.querySelector('span:nth-child(1)'), 1, {width:70,height:70,ease:Elastic.easeOut.config(1.5, .5)});
      tl.to(this.cursor.querySelector('span:nth-child(2)'), 1, {width:50,height:50,ease:Elastic.easeOut.config(1.2, .5)},'-=.9');
    }
  }

  onMouseLeave(){
    if (this.cursor) {
      TweenMax.to(this.cursor.querySelectorAll('span'), .6, {width:0,height:0,ease:'Power4.easeOut'}); 
    }
  }

  onMouseMove(e){
    if (this.cursor) {
      TweenMax.to(this.cursor, .6, {x: e.clientX - this.featuredVideo.offsetLeft, y: e.clientY + window.pageYOffset, ease:'Power4.easeOut'});
    }
  }  

  onClickVideo(){
    this.setState({isOpenVideo: true});
  }

  onCloseVideo(){
    this.setState({isOpenVideo: false});
    if (this.popupVideo && !this.popupVideo.paused) {
      this.popupVideo.pause();
    }
  }

  handleFetchCallback() {    
    if (this.isDataFetchComplete()) {
      const {
        homepageData, allProjects
      } = this.state;
      this.parseHomepageData(homepageData, allProjects);
    }     
  }

  /* end of event handlers */


  render() {
    const {      
      isOpenVideo,
      homepageData,
      highlightedProjects,
    } = this.state;        

    if (!this.isDataFetchComplete()) {
      return <MyFirstLoadingComponent isLoading={true} />;    
    }

    const {
      showreel_video_company_name: showreelVideoCompanyName,
      showreel_video_background_video: showreelVideoBackgroundVideo,
      showreel_video_popup_video: showreelVideoPopupVideo,
      showreel_video_title: showreelVideoTitle,
      showreel_video_interaction_hint: showreelVideoInteractionHint,
      showreel_video_button: showreelVideoButton,
      highlighted_project_section_desc: highlightedProjectSectionDesc,
      highlighted_project_section_interaction_hint: highlightedProjectSectionInteractionHint,
      lab_section_title: labSectionTitle,
      lab_section_desc: labSectionDesc,
      lab_section_interaction_hint: labSectionInteractionHint,
      highlighted_clients: highlightedClients,
    } = homepageData;    

    return (
      <div>
        <div id="popupVideo" className={isOpenVideo ? '' : 'hide'}>
          <div className="videoWrap">
            <video ref={this.setPopupVideo} controls>
              <source src={showreelVideoPopupVideo.guid} type="video/mp4"/>              
            </video>
            <button className="popup-video-close" onClick={this.onCloseVideo}>
              X
            </button>
          </div>
          <div className="bg" onClick={this.onCloseVideo} />
        </div>
        <div id="homepage" className="section-bg wow fadeIn" data-wow-delay="0.5s">
          <div ref={this.setFeaturedVideo} id="featuredVideo" onClick={this.onClickVideo}>
            <video muted autoPlay loop playsInline>
              {/* <source src="https://player.vimeo.com/external/340322136.hd.mp4?s=718521cadf91addeb9b0ce9bb300306b7b86479a&amp;profile_id=175" type='video/mp4;'/> */}
              <source src={showreelVideoBackgroundVideo.guid} type="video/mp4" />
            </video>
            <div ref={this.setCursor} id="cursor">
              <span />
              <span>{showreelVideoButton}</span>
            </div>
            <div className="companyLogo">{showreelVideoCompanyName}</div>
            <div className="videoDescription">
              <div className="videoTitle"
                dangerouslySetInnerHTML={{
                  __html: showreelVideoTitle
                }}
              />
              <div className="scrollHint">
                <span className='top-video-scrollHint-return-icon-container'>
                  <ReturnIcon
                    color='#FFF'
                    beforeWidth='1em'
                    beforeHeight='1.5em'
                    arrowSize='0.75em'
                  />
                </span>
                {showreelVideoInteractionHint}
              </div>
            </div>
          </div>         
          <section id="highlighted-project">
            <ProjectList 
              projects={highlightedProjects}
              sectionDesc={highlightedProjectSectionDesc}
              sectionInteractionHint={highlightedProjectSectionInteractionHint}              
            />
          </section>
          <LabSection            
            title={labSectionTitle}
            desc={labSectionDesc}
            interactionHint={labSectionInteractionHint}
            backgroundVideoSrc={getAbsoluteUrlFromRelativeUrl('video/tapping.mp4')}
          />      
          {
            isNonEmptyArray(highlightedClients) &&
            <section id="clients">
              <ClientList                      
                clients={highlightedClients}
              />
            </section>
          }          
          <Footer />
        </div>        
      </div>
    );
  }
}

export default injectIntl(HomePage);