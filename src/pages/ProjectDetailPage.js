import React, {Component} from 'react';

import {fetchProjectById} from 'websiteApi'
import {getProjectIdBySlugAsync} from 'utils/mapProjectSlugNameToIds';
import {Redirect} from 'react-router-dom'
import routes from 'globals/routes';

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

import {Player} from 'video-react';
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
  console.log("public url: " + JSON.stringify(process.env));
  const publicUrl = process.env.PUBLIC_URL;

  scriptjs(publicUrl + '/lib/jqueryvide/jquery.vide.js');
  scriptjs(publicUrl + '/js/slideshow-carousel.js');

  console.log("loadJSFiles In project detail page");

}

function VideoLanding(props) {
  const video_url = props.project.showreel.guid;
  const video_url_shorten = video_url.substring(0, video_url.length - 4);
  const data_vid = 'mp4:' + video_url_shorten + ', webm: video/ocean, ogv:' + video_url_shorten + ', poster: video/ocean" data-vide-options="position: 0% 50%'

  return (<section id="video-landing" className="section-bg">
    <div className="video-landing-div">
      <div className="container-fluid ">
        <div id="block2" data-vide-bg={data_vid}></div>
        <div className="video-text wow fadeIn">
          <h1 className="container-fluid">{props.project.my_title}</h1>
          <h2 className="container-fluid">{props.project.subtitle}</h2>
          <a href="#">
            <i className="ion ion-android-arrow-dropright-circle"></i>
            SHOWREEL</a>
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
          <p className="video-landing-text-l">{props.project.primary_desc}</p>
        </div>
        <div className="col-lg-5 wow fadeInUp">
          <p className="video-landing-text-r">{props.project.secondary_desc}</p>
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
      project: null,
      isReturnNotFound: false
    }
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

    const projectTemplates = project.project_templates;
    const projectTemplateContainer = projectTemplates.map((templateData) => {
      const templateType = parseInt(templateData.my_type, 10);
      const TemplateToUse = projectTemplateMap[templateData.my_type];
      return <TemplateToUse {...templateData}/>
    });

    return (<div>
      <VideoLanding project={project}/>
      <VideoLandingDesc project={project}/> {
        /*
        <Player playsInline="playsInline" poster="/assets/poster.png" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" autoPlay="true" fluid="true" muted="true" preload="auto"/>
        */
      }

      {projectTemplateContainer}

      <Footer
        //Section: Footer
        footer={footer}/> {loadJSFiles()}
    </div>);
  }
}

export default ProjectDetailPage;
