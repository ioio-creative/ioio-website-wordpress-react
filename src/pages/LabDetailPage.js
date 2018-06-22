import React, {Component} from 'react';

import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import routes from 'globals/routes';

import {Player} from 'video-react'; //todo Remove video-react
import "./video-react.css"; // import css

import Footer from 'containers/DarkFooter';
import {fetchActiveFooter} from 'websiteApi';

import LabTemp01 from 'containers/labDetail/LabTemp01'; //photomontage - 3 images
import LabTemp02 from 'containers/labDetail/LabTemp02'; //slideshow - Image on Left, Text on right
import LabTemp03 from 'containers/labDetail/LabTemp03'; //slideshow - Image on Right, Text on Left
import LabTemp04 from 'containers/labDetail/LabTemp04'; //photomontage - One Image

const labTemplateMap = {
  1: LabTemp01,
  2: LabTemp02,
  3: LabTemp03,
  4: LabTemp04
};

function VideoLanding(props) {
  const video_url = props.project.cover_video.guid;
  const poster_url = props.project.thumbnail.guid;
  const video_webm_url = props.project.cover_video.guid;

  const full_url = [video_url, 'https://i.gifer.com/3hmW.gif'];
  const video_url_shorten = video_url.replace(".mp4", "") //TODO use replace ''
  const data_vid = 'mp4:' + video_url_shorten + ', webm: video/ocean, ogv:' + video_url_shorten + ', poster: video/ocean" data-vide-options="position: 0% 50%'

  const publicUrl = process.env.PUBLIC_URL;
  const svgURL = publicUrl + '/img/Play_btn-14.svg'

  return (<section id="video-landing" className="section-bg wow fadeIn" data-wow-delay="0.8s">
    <div className="video-landing-div">
      <div className="container-fluid">
        <div className="player-wrapper">
          <video className="react-player" width={'100%'} height={'auto'} poster={poster_url} autoPlay={"autoPlay"} loop={"loop"} muted="muted" playsInline={"playsInline"}>
            <source className="wow fadeIn" src={video_url} type="video/mp4"/> {/* //TODO add webm <source src="https://multicdn.synq.fm/projects/bb/56/bb56f28429b942c08dc5128e4b7ba48c/derivatives/videos/71/43/71439ccd73c74ecc8bbab7abd3bb98bc/webm_720/71439ccd73c74ecc8bbab7abd3bb98bc_webm_720.webm" type="video/webm"/> */}
            <img className="wow fadeIn" src={poster_url} title="Your browser does not support the <video> tag"/>
          </video>
        </div>
        {/* <ReactPlayer className='react-player' playing={true} loop={true} playsinline={true} volume={0} muted={true} width='100%' height='auto' url={full_url} /> */}
        <div className="video-text wow fadeIn">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <h1 className="container-fluid">{props.project.project_title}</h1>
              <h2 className="container-fluid">{props.project.project_subtitle}</h2>
            </div>
            <div className="col-md-5 pop-up-vid-div">
              <Link to="#" onClick={props.modalClick} id="pop-up-vid">
                <img className="projectlist-showreel-img" src={svgURL} alt="showreel"/>
                SHOWREEL&nbsp;</Link>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
  </section>); } function VideoLandingDesc(props) {
    const bg = {
      backgroundColor: props.project.background_mood_color
    };
    return (<section id="video-landing-caption" className="project-section-bg" style={bg}>
      <div className="container-fluid">
        <div className="row video-landing-text">
          <div className="col-md-1"></div>
          <div className="col-md-4 wow fadeIn">
            <p className="video-landing-text-l">{props.project.key_message}</p>
          </div>

          <div className="col-md-2"></div>
          <div className="col-md-4 wow fadeIn">
            <p className="video-landing-text-r">{props.project.overview}</p>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </section>);
  }

  class LabDetailPage extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    componentDidMount() {}
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

      const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0)',
          border: '0px'
        }
      };
      //    console.log(state.isReturnNotFound);
      //    console.log(project);

      const projectTemplates = project.project_sections;
      const projectTemplateContainer = projectTemplates.map((templateData) => {
        const templateType = parseInt(templateData.template_type, 10);
        const TemplateToUse = labTemplateMap[templateData.template_type];
        return <TemplateToUse {...templateData}/>
      });

      return (<div className="wow fadeIn">
        <VideoLanding project={project} modalClick={this.openModal}/>
        <VideoLandingDesc project={project}/> {/*
        <ReactPlayer className='react-player' controls playing loop playsinline volume='1' width='100%' url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        <Player canBeClicked="false" playsInline="playsInline" poster="/assets/poster.png" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" autoPlay="true" fluid="true" muted="true" preload="auto" />
    */
        }
        {projectTemplateContainer}
        <Footer
          //Section: Footer
          footer={footer}/>
      </div>);
    }

  }

  export default LabDetailPage;
