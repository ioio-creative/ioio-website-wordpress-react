import React, {Component} from 'react';

import {fetchProjectById} from 'websiteApi'
import {getProjectIdBySlugAsync} from 'utils/mapProjectSlugNameToIds';
import {Redirect} from 'react-router-dom'
import routes from 'globals/routes';
import {Link} from 'react-router-dom'

import ReactDOM from 'react-dom';
import Modal from 'react-modal';


import ReactPlayer from 'react-player'


import ProjectTemp01 from 'containers/projectDetail/ProjectTemp01'; //photomontage - 3 images
import ProjectTemp02 from 'containers/projectDetail/ProjectTemp02'; //slideshow - Image on Left, Text on right
import ProjectTemp03 from 'containers/projectDetail/ProjectTemp03'; //slideshow - Image on Right, Text on Left
import ProjectTemp04 from 'containers/projectDetail/ProjectTemp04'; //photomontage - One Image
import ProjectTemp05 from 'containers/projectDetail/ProjectTemp05'; //slideshow - Image only
import ProjectTemp06 from 'containers/projectDetail/ProjectTemp06'; //photomontage - 2-column Image and caption

import './ProjectDetailPage.css';

import Footer from 'containers/Footer';
import {fetchActiveFooter} from 'websiteApi';

import scriptjs from 'scriptjs'
import $ from 'jquery';

import {Player} from 'video-react';  //todo Remove video-react
import "./video-react.css"; // import css

// Choosing the React Element Type at Runtime
// https://reactjs.org/docs/jsx-in-depth.html
const projectTemplateMap = {
  1: ProjectTemp01,
  2: ProjectTemp02,
  3: ProjectTemp03,
  4: ProjectTemp04,
  5: ProjectTemp05,
  6: ProjectTemp06
};

function loadJSFiles() {
/*
  console.log("public url: " + JSON.stringify(process.env));
  const publicUrl = process.env.PUBLIC_URL;

  //const publicUrl = process.env.PUBLIC_URL;
  var loadScriptsAsync = ['lib/jquery/jquery.min.js'].map((relativeUrl) => {
    return publicUrl + "/" + relativeUrl;
  });
  var loadScriptsLater = ['/lib/jqueryvide/jquery.vide.js'].map((relativeUrl) => {
    return publicUrl + "/" + relativeUrl;
  });
  scriptjs(loadScriptsAsync, () => {
    scriptjs(loadScriptsLater,'bundle')
  });

*/
/*
  console.log("public url: " + JSON.stringify(process.env));
  const publicUrl = process.env.PUBLIC_URL;

  scriptjs(publicUrl + '/lib/jqueryvide/jquery.vide.js');
  scriptjs(publicUrl + 'lib/lightbox/js/lightbox.min.js');

*/
  console.log("loadJSFiles In project detail page");

}


const customStyles = {
  content : {
    width                   : '80%',
    margin                  : '0 auto',
    transition              : 'all 0.4s',
    'z-index'                 : '999'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


function VideoLanding(props) {
  const video_url = props.project.cover_video.guid;
  const full_url = video_url;
  const video_url_shorten = video_url.replace(".mp4", "") //TODO use replace ''
  const data_vid = 'mp4:' + video_url_shorten + ', webm: video/ocean, ogv:' + video_url_shorten + ', poster: video/ocean" data-vide-options="position: 0% 50%'

  return (<section id="video-landing" className="section-bg">
    <div className="video-landing-div">
      <div className="container-fluid ">
        <div className="player-wrapper"><ReactPlayer className='react-player' playing loop playsinline volume='0' muted  width='100%' height='auto' url={full_url} /></div>
        <div className="video-text wow fadeIn">
          <h1 className="container-fluid">{props.project.project_title}</h1>
          <h2 className="container-fluid">{props.project.project_subtitle}</h2>

          <Link to="#" onClick={props.modalClick} id="pop-up-vid">

            <i className="ion ion-android-arrow-dropright-circle"></i>
            SHOWREEL</Link>
        </div>
      </div>
    </div>
  </section>);
}

function VideoLandingDesc(props) {
  return (<section id="video-landing-caption" className="section-bg">
    <div className="container-fluid">
      <div className="row video-landing-text">
        <div className="col-lg-1"></div>
        <div className="col-lg-5 wow fadeInUp">
          <p className="video-landing-text-l">{props.project.key_message}</p>
        </div>
        <div className="col-lg-5 wow fadeInUp">
          <p className="video-landing-text-r">{props.project.overview}</p>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  </section>);
}

class ProjectDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
     modalIsOpen: false
   };
   this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      project: null,
      isReturnNotFound: false
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
  async componentDidMount() {
    const projectSlugFromQuery = this.props.match.params.projectSlug;
    const projectIdStr = await getProjectIdBySlugAsync(projectSlugFromQuery);
    const projectIdNum = parseInt(projectIdStr, 10);

    // if no corresponding project id entry for the slug got from query
    if (isNaN(projectIdNum)) {
      this.setState({isReturnNotFound: true});
      return;
    }

    fetchProjectById(projectIdNum, (aProject) => {
      if (aProject === null) {
        this.setState({isReturnNotFound: true});
      } else {
        this.setState({project: aProject});
      }
    });
    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });
    loadJSFiles()
  }






  render() {
    const state = this.state;
    const project = state.project;

    // should check isReturnNotFound first
    // before checking project === null
    if (state.isReturnNotFound) {
      return (<Redirect to={routes.notFound}/>);
    }

    if (project === null) {
      return null;
    }

    const footer = this.state.footer;
    if (footer === null) {
      return null;
    }

    //    console.log(state.isReturnNotFound);
    //    console.log(project);

    const projectTemplates = project.project_sections;
    const projectTemplateContainer = projectTemplates.map((templateData) => {
      const templateType = parseInt(templateData.template_type, 10);
      const TemplateToUse = projectTemplateMap[templateData.template_type];
      return <TemplateToUse {...templateData}/>
    });


    return (<div>

      <VideoLanding project={project} modalClick={this.openModal}/>
      <VideoLandingDesc project={project}/>

{/*
  <ReactPlayer className='react-player' controls playing loop playsinline volume='1' width='100%' url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />

        <Player canBeClicked="false" playsInline="playsInline" poster="/assets/poster.png" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" autoPlay="true" fluid="true" muted="true" preload="auto" />
*/
}



      {projectTemplateContainer}

      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}

        contentLabel="Example Modal">

        <button className="video-close-btn"ion-button round onClick={this.closeModal}>
          <i className="ion ion-android-close"></i>
  </button>
  <div className="vid-player">
    <Player canBeClicked="false" playsInline="playsInline" poster="/assets/poster.png" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" autoPlay="true" fluid="true" volume="1" preload="auto" />

        </div>
      </Modal>

      <Footer
        //Section: Footer
        footer={footer}/>

    </div>);
  }
}

export default ProjectDetailPage;
