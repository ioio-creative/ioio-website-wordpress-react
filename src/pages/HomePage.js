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
            <div className='companyLogo'>{showreelVideoCompanyName}</div>
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
