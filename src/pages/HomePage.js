import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import fscreen from 'fscreen';
import TweenMax, { TimelineMax, Elastic } from 'gsap';

import routes from 'globals/routes';

//import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
import LabSection from 'components/LabSection';

import ProjectList from 'containers/home/ProjectList';
import ClientList from 'containers/home/ClientList';
import Footer from 'containers/footer/Footer';

import { fetchActiveHomePage, fetchProjects } from 'websiteApi';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';
import firstOrDefault from 'utils/js/array/firstOrDefault';
import { createIdSlugPairs } from 'utils/generalMapper';
import { isMobileBrowser } from 'utils/getIsMobileBrowser';
import viewport from 'utils/ui/viewport';

import './HomePage.scss';
import './HomePageSE.css';

import Modal from 'react-modal';

//import {Player} from 'video-react';
import './video-react.css';

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.75)';

class HomePage extends Component {
  constructor(props) {
    super(props);

    // constants
    this.isMakePopupVideoFullScreenOnFirstClick = true;

    // refs
    this.featuredVideoContainer = null;
    this.setFeaturedVideoContainer = element =>
      (this.featuredVideoContainer = element);
    this.featuredVideo = null;
    this.setFeaturedVideo = element => (this.featuredVideo = element);
    this.popupVideo = null;
    this.setPopupVideo = element => (this.popupVideo = element);
    this.cursor = null;
    this.setCursor = element => (this.cursor = element);

    this.state = {
      isOpenPopupVideo: false,
      homepageData: null,
      allProjects: [],
      highlightedProjects: []
    };

    [
      // methods
      'isDataFetchComplete',
      'parseHomepageData',
      'openPopupVideo',
      'closePopupVideo',

      // event handlers
      'handleFeaturedVideoMouseEnter',
      'handleFeaturedVideoMouseLeave',
      'handleFeaturedVideoMouseMove',
      'handleFeaturedVideoClick',
      'handlePopupVideoOpenButtonClick',
      'handlePopupVideoCloseButtonClick',
      'handlePopupVideoBackgroundClick',
      'handleFetchCallback',
      'handleFullScreenChange',
      'handleFullScreenError'
    ].forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }

  /* react lifecycles */

  componentDidMount() {
    fetchActiveHomePage(homepage => {
      this.setState(
        {
          homepageData: homepage
        },
        this.handleFetchCallback
      );
    });

    fetchProjects(projects => {
      this.setState(
        {
          allProjects: projects
        },
        this.handleFetchCallback
      );
    });
  }

  /* end of react lifecycles */

  /* methods */

  isDataFetchComplete() {
    const { homepageData, allProjects } = this.state;
    return homepageData !== null && isNonEmptyArray(allProjects);
  }

  parseHomepageData(homepageData, allProjects) {
    const {
      highlighted_project_1,
      highlighted_project_2,
      highlighted_project_3,
      highlighted_project_4,
      highlighted_project_5,
      highlighted_project_6
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
      const detailRoutePath = referredProject
        ? routes.projectBySlugWithValue(projectIdSlugPairs[referredProject.id])
        : null;

      return {
        name: project_name,
        imgSrc: image.guid,
        referredProject: referredProject,
        detailRoutePath: detailRoutePath
      };
    });

    this.setState({
      highlightedProjects: highlightedProjects
    });
  }

  openPopupVideo(isRequireFullScreen = false) {
    this.setState({ isOpenPopupVideo: true }, _ => {
      if (fscreen.fullscreenEnabled) {
        /**
         * Note:
         * handleFullScreenChange() seems not called if full screen is not
         * triggered by fscreen.requestFullscreen()
         * https://stackoverflow.com/questions/21103478/fullscreenchange-event-not-firing-in-chrome
         */
        fscreen.addEventListener(
          'fullscreenchange',
          this.handleFullScreenChange,
          false
        );
        fscreen.addEventListener(
          'fullscreenerror',
          this.handleFullScreenError,
          false
        );

        if (isRequireFullScreen) {
          fscreen.requestFullscreen(this.popupVideo);
        }
      }
      this.popupVideo.play();
    });
  }

  closePopupVideo() {
    if (this.popupVideo && !this.popupVideo.paused) {
      this.popupVideo.pause();
    }
    if (fscreen.fullscreenEnabled) {
      if (fscreen.fullscreenElement !== null) {
        fscreen.exitFullscreen();
      }
      fscreen.removeEventListener(
        'fullscreenchange',
        this.handleFullScreenChange,
        false
      );
      fscreen.removeEventListener(
        'fullscreenerror',
        this.handleFullScreenError,
        false
      );
    }
    this.setState({ isOpenPopupVideo: false });
  }

  /* end of methods */

  /* event handlers */

  handleFeaturedVideoMouseEnter() {
    if (this.cursor) {
      var tl = new TimelineMax({ delay: 0.1 });
      tl.to(this.cursor.querySelector('span:nth-child(1)'), 1, {
        width: 70,
        height: 70,
        ease: Elastic.easeOut.config(1.5, 0.5)
      });
      tl.to(
        this.cursor.querySelector('span:nth-child(2)'),
        1,
        { width: 50, height: 50, ease: Elastic.easeOut.config(1.2, 0.5) },
        '-=.9'
      );
    }
  }

  handleFeaturedVideoMouseLeave() {
    if (this.cursor) {
      TweenMax.to(this.cursor.querySelectorAll('span'), 0.6, {
        width: 0,
        height: 0,
        ease: 'Power4.easeOut'
      });
    }
  }

  handleFeaturedVideoMouseMove(e) {
    if (this.cursor) {
      TweenMax.to(this.cursor, 0.6, {
        x: e.clientX - this.featuredVideoContainer.offsetLeft,
        y: e.clientY + window.pageYOffset,
        ease: 'Power4.easeOut'
      });
    }
  }

  handleFeaturedVideoClick() {
    if (!viewport.isSmallerThanOrEqualToSmallViewport()) {
      this.openPopupVideo(this.isMakePopupVideoFullScreenOnFirstClick);
    }
  }

  handlePopupVideoOpenButtonClick() {
    this.openPopupVideo(this.isMakePopupVideoFullScreenOnFirstClick);
  }

  handlePopupVideoCloseButtonClick() {
    this.closePopupVideo();
  }

  handlePopupVideoBackgroundClick() {
    this.closePopupVideo();
  }

  handleFetchCallback() {
    if (this.isDataFetchComplete()) {
      const { homepageData, allProjects } = this.state;
      this.parseHomepageData(homepageData, allProjects);
    }
  }

  handleFullScreenChange() {
    if (fscreen.fullscreenElement !== null) {
      console.log('Entered fullscreen mode');
    } else {
      if (this.state.isOpenPopupVideo) {
        this.closePopupVideo();
      }
      console.log('Exited fullscreen mode');
    }
  }

  handleFullScreenError(err) {
    console.error(err);
  }

  /* end of event handlers */

  render() {
    const { isOpenPopupVideo, homepageData, highlightedProjects } = this.state;

    if (!this.isDataFetchComplete()) {
      //return <MyFirstLoadingComponent isLoading={true} />;
      return (
        <div className='home-page-container'>
          <div className='loading'>
            <div className='spinner' />
          </div>
        </div>
      );
    }

    const {
      showreel_video_company_name: showreelVideoCompanyName,
      showreel_video_background_video: showreelVideoBackgroundVideo,
      showreel_video_background_video_for_mobile: showreelVideoBackgroundVideoForMobile,
      showreel_video_popup_video: showreelVideoPopupVideo,
      showreel_video_popup_video_for_mobile: showreelVideoPopupVideoForMobile,
      showreel_video_title: showreelVideoTitle,
      showreel_video_interaction_hint: showreelVideoInteractionHint,
      showreel_video_button: showreelVideoButton,
      showreel_video_button_for_mobile: showreelVideoButtonForMobile,
      highlighted_project_section_desc: highlightedProjectSectionDesc,
      highlighted_project_section_interaction_hint: highlightedProjectSectionInteractionHint,
      lab_section_title: labSectionTitle,
      lab_section_background_video: labSectionBackgroundVideo,
      lab_section_background_video_for_mobile: labSectionBackgroundVideoForMobile,
      lab_section_desc: labSectionDesc,
      lab_section_interaction_hint: labSectionInteractionHint,
      highlighted_clients: highlightedClients
    } = homepageData;

    return (
      <div className='home-page-container'>
        {/*
            Note:  
            remove .popup-video visibility: hidden, before video fullscreen can be triggered 
          */}
        <div className={`popup-video ${isOpenPopupVideo ? '' : 'hide'}`}>
          <div className='videoWrap'>
            <video ref={this.setPopupVideo} controls>
              {isMobileBrowser ? (
                <>
                  <source src={showreelVideoPopupVideoForMobile.guid} />
                  <source src={showreelVideoPopupVideo.guid} />
                </>
              ) : (
                <>
                  <source src={showreelVideoPopupVideo.guid} />
                  <source src={showreelVideoPopupVideoForMobile.guid} />
                </>
              )}
            </video>
            <button
              className='popup-video-close-button'
              onClick={this.handlePopupVideoCloseButtonClick}
            />
          </div>
          <div
            className='popup-video-bg'
            onClick={this.handlePopupVideoBackgroundClick}
          />
        </div>
        {/* <div className="home-page section-bg wow fadeIn" data-wow-delay="0.5s"> */}
        <div className='home-page'>
          <div
            ref={this.setFeaturedVideoContainer}
            className='featured-video-container'
            onClick={this.handleFeaturedVideoClick}
            onMouseEnter={this.handleFeaturedVideoMouseEnter}
            onMouseLeave={this.handleFeaturedVideoMouseLeave}
            onMouseMove={this.handleFeaturedVideoMouseMove}
          >
            <video ref={this.setFeaturedVideo} muted autoPlay loop playsInline>
              {/* <source src="https://player.vimeo.com/external/340322136.hd.mp4?s=718521cadf91addeb9b0ce9bb300306b7b86479a&amp;profile_id=175" type='video/mp4;'/> */}
              {isMobileBrowser ? (
                <>
                  <source src={showreelVideoBackgroundVideoForMobile.guid} />
                  <source src={showreelVideoBackgroundVideo.guid} />
                </>
              ) : (
                <>
                  <source src={showreelVideoBackgroundVideo.guid} />
                  <source src={showreelVideoBackgroundVideoForMobile.guid} />
                </>
              )}
            </video>
            <div ref={this.setCursor} id='cursor'>
              <span />
              <span>{showreelVideoButton}</span>
            </div>
            <div className='companyLogo' style={{"width": "100px","fill": "#fff"}}>
              <svg width={"100%"} height={"100%"} viewBox="0 0 525.2 298.9">
                <g>
                  <path d="M48.6,78.4H78c0.8,0,1.4-0.6,1.4-1.4V45.8c0-0.8-0.6-1.4-1.4-1.4H48.6c-0.8,0-1.4,0.6-1.4,1.4v31.2
                    C47.2,77.7,47.8,78.4,48.6,78.4z"/>
                  <path d="M94.2,251.8L79,243.1c-0.5-0.3-0.7-0.7-0.7-1.3V108.6c0-1.1-1.1-1.8-2.1-1.3l-41.8,19.5c-1.2,0.6-1.1,2.3,0.2,2.7l17,5.1
                    c0.6,0.2,1,0.7,1,1.4v105.9c0,0.5-0.3,1-0.7,1.2l-14.6,8.6c-1.3,0.8-0.7,2.7,0.7,2.7h55.5C95,254.5,95.5,252.5,94.2,251.8z"/>
                  <path d="M221.5,118.9c-11-7-23.1-10.9-36-11.6c-12.7-0.7-25.1,1.9-36.6,7.9c-11.6,6-20.8,14.6-27.5,25.5
                    c-6.8,11-10.6,23.1-11.3,36.2c-0.7,13,2.1,25.8,8.3,37.8c6.4,12.2,15.4,22,26.5,29.3c11.2,7.3,23.6,11.4,36.6,12.3
                    c12.9,0.9,25.3-1.6,36.9-7.6c11.6-6,20.7-14.8,27.3-25.8c6.7-11.2,10.3-23.7,10.7-37c0.4-13.3-2.5-26.2-8.9-38.5
                    C241.3,135.4,232.4,125.9,221.5,118.9z M234.4,211.4c-0.8,14.7-7.2,25.3-19.1,31.5c-12,6.3-24.4,5.4-37-2.3
                    c-12.2-7.5-23.3-20.7-33.1-39.7c-9.7-18.5-13.9-34.8-12.9-48.6c1-14.4,7.6-24.8,19.6-31.1c12-6.3,24.3-5.5,36.7,2
                    c11.9,7.2,22.7,20,32.3,38.3C230.8,180.5,235.3,197.1,234.4,211.4z"/>
                  <path d="M287.8,78.4h29.4c0.8,0,1.4-0.6,1.4-1.4V45.8c0-0.8-0.6-1.4-1.4-1.4h-29.4c-0.8,0-1.4,0.6-1.4,1.4v31.2
                    C286.3,77.7,287,78.4,287.8,78.4z"/>
                  <path d="M333.4,251.8l-15.2-8.6c-0.5-0.3-0.7-0.7-0.7-1.3V108.6c0-1.1-1.1-1.8-2.1-1.3l-41.8,19.5c-1.2,0.6-1.1,2.3,0.2,2.7l17,5.1
                    c0.6,0.2,1,0.7,1,1.4v105.9c0,0.5-0.3,1-0.7,1.2l-14.6,8.6c-1.3,0.8-0.7,2.7,0.7,2.7h55.5C334.2,254.5,334.7,252.5,333.4,251.8z"/>
                  <path d="M486.7,147.5c-6.3-12-15.1-21.6-26-28.5c-11-7-23.1-10.9-36-11.6c-12.7-0.7-25.1,1.9-36.6,7.9c-11.6,6-20.8,14.6-27.5,25.5
                    c-6.8,11-10.6,23.1-11.3,36.2c-0.7,13,2.1,25.8,8.3,37.8c6.4,12.2,15.4,22,26.5,29.3c11.2,7.3,23.6,11.4,36.6,12.3
                    c12.9,0.9,25.3-1.6,36.9-7.6c11.6-6,20.7-14.8,27.3-25.8c6.7-11.2,10.3-23.7,10.7-37C496,172.7,493.1,159.7,486.7,147.5z
                    M473.6,211.4c-0.8,14.7-7.2,25.3-19.1,31.5c-12,6.3-24.4,5.4-37-2.3c-12.2-7.5-23.3-20.7-33.1-39.7c-9.7-18.5-13.9-34.8-12.9-48.6
                    c1-14.4,7.6-24.8,19.6-31.1c12-6.3,24.3-5.5,36.7,2c11.9,7.2,22.7,20,32.3,38.3C469.9,180.5,474.4,197.1,473.6,211.4z"/>
                </g>
              </svg>
            </div>
            <div className='videoDescription'>
              <div className='videoTitle'>{showreelVideoTitle}</div>
              <div className='scrollHint'>
                <span className='top-video-scrollHint-return-icon-container' />
                {showreelVideoInteractionHint}
              </div>
            </div>
          </div>
          <div className='pop-up-video-open-container'>
            <div className='popup-video-open'>
              <div
                className='popup-video-open-button'
                onClick={this.handlePopupVideoOpenButtonClick}
              >
                <div className='popup-video-open-button-text'>
                  {showreelVideoButtonForMobile}
                </div>
                <div className='popup-video-open-play-icon'>
                  <div className='popup-video-open-play-icon-triangle-container'>
                    <div className='popup-video-open-play-icon-triangle'>
                      {/* &#9658; */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section id='highlighted-project'>
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
            backgroundVideoSrc={labSectionBackgroundVideo.guid}
            backgroundVideoSrcForMobile={
              labSectionBackgroundVideoForMobile.guid
            }
          />
          {isNonEmptyArray(highlightedClients) && (
            <section id='clients'>
              <ClientList clients={highlightedClients} />
            </section>
          )}
          <Footer />
        </div>
      </div>
    );
  }
}

export default injectIntl(HomePage);
