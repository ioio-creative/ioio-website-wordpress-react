import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl} from 'react-intl';

import routes from 'globals/routes';
import {getAbsoluteUrlFromRelativeUrl} from 'utils/setStaticResourcesPath';

import Footer from 'containers/footer/Footer';
import ProjectCategories from 'containers/projectList/ProjectCategories';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import $ from 'jquery';

//import P5Wrapper from 'react-p5-wrapper';

import {fetchActiveHomePage, fetchProjectCategories, fetchProjects} from 'websiteApi';
import {createIdSlugPairs} from 'utils/generalMapper';

import './HomePage.css';
import './HomePageSE.css';
//import sketch from './sketch';

import Modal from 'react-modal';

import {Player} from 'video-react';
import "./video-react.css";

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.75)';


function HighlightedProjects(props) {
  // Important notes:
  // the WordPress projects api contains slug names of each project,
  // the WordPress homepage.highlightedProjects api do not

  const allProjectIdSlugPairs = createIdSlugPairs(props.allProjects);

  const projectItems = props.highlightedProjects.map((project, idx) => {
    const projectDetailRoutePath = routes.projectBySlugWithValue(allProjectIdSlugPairs[project.id]);

    if (idx === 0) {
      return (
        <div className="col-md-12" key={project.id}>
          <Link to={projectDetailRoutePath}>{props.name}
            <div className="portfolio-wrap">
              <div className="img-container">
                <img src={project.thumbnail.guid} alt="alt"/>
                <div className="img-hover-color"></div>
              </div>
              <div className="portfolio-info">
                <h4>
                  {project.project_name}
                </h4>
                <p>
                  {/* 20181119: HUNG edited */}
                  {project.project_categories.map((cat, idx) => {
                    return props.categories.find(pC => pC.id == cat.pod_item_id).name;
                  })}
                </p>
              </div>
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="col-md-6 wrap-this" key={project.id}>
          <Link to={projectDetailRoutePath}>{props.name}
            <div className="portfolio-wrap">
              <div className="img-container">
                <img src={project.thumbnail.guid} alt="alt"/>
                <div className="img-hover-color"></div>
              </div>
              <div className="portfolio-info">
                <h4>
                  {project.project_name}
                </h4>
                <p>
                  {/* 20181119: HUNG edited */}
                  {project.project_categories.map((cat, idx) => {
                    return props.categories.find(pC => pC.id == cat.pod_item_id).name;
                  })}
                </p>
              </div>
            </div>
          </Link>
        </div>
      );
    }
  });

  return (
    <div className="row container-fluid">
      {projectItems}
    </div>
  );
}

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

    this.handleLoad = this.handleLoad.bind(this);
    this.handleCanvasMessage = this.handleCanvasMessage.bind(this);

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
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad);
    window.removeEventListener('message', this.handleCanvasMessage);
  }

  handleLoad() {
    $('.wrap-this').wrapAll('<div class="row container-fluid"></div>');

    /*
      $(document).ready(function(){
        console.log($('.iframe-p5').attr("width"))
        $('.iframe-p5').attr("width","2500");
        $('.iframe-p5').attr("height","500");
        console.log($('.iframe-p5').attr("width"));
      });
    */
  }

  handleCanvasMessage(e) {
    switch (e.data) {
      case 'canvas_activated':
        $('#root').addClass('canvas_activated');
        break;
      case 'canvas_deactivated':
        $('#root').removeClass('canvas_activated');
        break;
      default:
        // unknown msg, do nth
    }
  }

  render() {
    const props = this.props;

    const home = this.state.homepage;
    const pC = this.state.projectCategories;
    const allProjects = this.state.allProjects;

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

    const canvasURL = getAbsoluteUrlFromRelativeUrl('canvas/1/index.html');
    // use inline svg instead of img
    // const svgURL = getAbsoluteUrlFromRelativeUrl('img/Play_btn-14.svg');

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
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

    return (<div>

      <section id="homepage-top" className="section-bg wow fadeIn" data-wow-delay="0.5s">
        <div className="homepage-top-logo-div">
          <h4 id="homepage-top-logo">
            <FormattedMessage
              id="HomePage.companyName"
              defaultMessage="IOIO CREATIVE"
            />            
          </h4>
        </div>
        <div className="container-fluid iframe-p5-div-mobile">
          <h1>
            <FormattedMessage
              id="HomePage.shortCompanyNameInTopCanvas"
              defaultMessage="IOIO"
            />
          </h1>
        </div>
        <div className="container-fluid iframe-p5-div">
          <div className="row">
            <div className="col-md-12">
              <div className="iframe-p5-inside-div">
                <iframe className="iframe-p5" frameBorder={0} scrolling="no" src={canvasURL}/>
              </div>
              <Link to="#" onClick={this.openModal} id="pop-up-vid" >
                <div className="homepage-showreel">
                  <h4 className="homepage-showreel-text">{home.page_title}
                  </h4>
                  <svg className="homepage-showreel-img" viewBox="0 0 30 30">
                    <polygon points="17.8,15 13.1,12.3 13.1,17.7"/>
                    <circle cx="15" cy="15" r="10"/>
                  </svg>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
              </Link>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </section>

      <section id="homepage-selected-project" className="section-bg wow fadeInUp">
        <ProjectCategories 
          categories={pC}
          allCategoryName={formatMessage('HomePage.allCategoryLabel', 'We Do')}
        />                
        <HighlightedProjects
          categories={pC}
          highlightedProjects={home.highlighted_projects}
          allProjects={allProjects}
        />
      </section>

      <section id="homepage-core-value">
        <div className="container">
          <Link to={routes.about(true)}>
            <Items abouts={home}/>
          </Link>
        </div>
      </section>

      <section id="homepage-lab" className="section-bg wow fadeInUp">
        <div className="row container-fluid">
          <div className="col-md-4 text-left">
            <a href="#">
              <p>
                <FormattedMessage
                  id="HomePage.labItemTitle"
                  defaultMessage="Tapping"
                /> 
              </p>
            </a>
          </div>
          <div className="col-md-8 text-left">
            <a href="#">
              <p>
                <FormattedMessage
                  id="HomePage.sharingItemTitle"
                  defaultMessage="Bible Consipiracy"
                /> 
              </p>
            </a>
          </div>
        </div>
      </section>

      <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="Showreel Modal" style={customStyles}>
        <button className="video-close-btn" ion-button="ion-button" round="round" onClick={this.closeModal}>
          <i className="ion ion-android-close"></i>
        </button>
        <div className="vid-player">
          <Player poster="/assets/poster.png" src={home.showreel_video.guid} autoPlay={true} fluid={true} volume={1} preload={'auto'}/>
        </div>
      </Modal>

      <Footer />
    </div>);
  }
}

export default injectIntl(HomePage);
