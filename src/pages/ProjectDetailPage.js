import React, { Component } from 'react';

import { fetchProjectWithNextIdById } from 'websiteApi';

import { getProjectIdBySlugAsync } from 'utils/mapProjectSlugNameToIds';
import { Redirect } from 'react-router-dom';
import routes from 'globals/routes';
import { Link } from 'react-router-dom';

//import ReactPlayer from 'react-player';

import ProjectTemp01 from 'containers/projectDetail/ProjectTemp01'; //photomontage - 3 images
import ProjectTemp02 from 'containers/projectDetail/ProjectTemp02'; //slideshow - Image on Left, Text on right
import ProjectTemp03 from 'containers/projectDetail/ProjectTemp03'; //slideshow - Image on Right, Text on Left
import ProjectTemp04 from 'containers/projectDetail/ProjectTemp04'; //photomontage - One Image
import ProjectTemp05 from 'containers/projectDetail/ProjectTemp05'; //slideshow - Image only
import ProjectTemp06 from 'containers/projectDetail/ProjectTemp06'; //photomontage - 2-column Image and caption
import ProjectTemp07 from 'containers/projectDetail/ProjectTemp07'; //photomontage - One Video
import ProjectTemp08 from 'containers/projectDetail/ProjectTemp08'; //Full Width One Image
import ProjectTemp09 from 'containers/projectDetail/ProjectTemp09'; //centre text
import ProjectTemp10 from 'containers/projectDetail/ProjectTemp10'; //videomontage - One Video
import ProjectTemp11 from 'containers/projectDetail/ProjectTemp11'; //scrollable png sequences template
// import ProjectTemp12 from 'containers/projectDetail/ProjectTemp12'; //scrollable png sequences template

import Footer from 'containers/footer/Footer';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import './ProjectDetailPage.css';

import $ from 'jquery';

import Modal from 'react-modal';

import { Player } from 'video-react'; //todo Remove video-react
import './video-react.css'; // import css
import { FormattedMessage } from 'react-intl';

Modal.setAppElement('#root');
// Choosing the React Element Type at Runtime
// https://reactjs.org/docs/jsx-in-depth.html
const projectTemplateMap = {
  1: ProjectTemp01,
  2: ProjectTemp02,
  3: ProjectTemp03,
  4: ProjectTemp04,
  5: ProjectTemp05,
  6: ProjectTemp06,
  7: ProjectTemp07,
  8: ProjectTemp08,
  9: ProjectTemp09,
  10: ProjectTemp10,
  11: ProjectTemp11
  // 12: ProjectTemp12,
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

function VideoLanding(props) {
  const video_url = props.project.cover_video.guid;
  //const poster_url = props.project.thumbnail.guid;
  const poster_url = props.project.cover_video_screenshot.guid;
  //const video_webm_url = props.project.cover_video.guid;

  //const full_url = [video_url, 'https://i.gifer.com/3hmW.gif'];
  //const video_url_shorten = video_url.replace(".mp4", "") //TODO use replace ''
  //const data_vid = 'mp4:' + video_url_shorten + ', webm: video/ocean, ogv:' + video_url_shorten + ', poster: video/ocean" data-vide-options="position: 0% 50%'

  const publicUrl = process.env.PUBLIC_URL;
  const svgURL = publicUrl + '/img/Play_btn-14.svg';

  return (
    <section
      id='video-landing'
      className='section-bg wow fadeIn'
      data-wow-delay='0.8s'
    >
      <div className='video-landing-div'>
        <div className='container-fluid'>
          <div className='player-wrapper'>
            <video
              className='react-player'
              width={'100%'}
              height={'auto'}
              poster={poster_url}
              autoPlay={'autoPlay'}
              loop={'loop'}
              muted='muted'
              playsInline={'playsInline'}
            >
              <source className='wow fadeIn' src={video_url} type='video/mp4' />{' '}
              {/* // TODO: add webm <source src="https://multicdn.synq.fm/projects/bb/56/bb56f28429b942c08dc5128e4b7ba48c/derivatives/videos/71/43/71439ccd73c74ecc8bbab7abd3bb98bc/webm_720/71439ccd73c74ecc8bbab7abd3bb98bc_webm_720.webm" type="video/webm"/> */}
              <img
                className='wow fadeIn'
                src={poster_url}
                title='Your browser does not support the <video> tag'
                alt='Your browser does not support the <video> tag'
              />
            </video>
          </div>
          {/* <ReactPlayer className='react-player' playing={true} loop={true} playsinline={true} volume={0} muted={true} width='100%' height='auto' url={full_url} /> */}
          <div className='video-text wow fadeIn'>
            <div className='row'>
              <div className='offset-md-1 col-md-11 project-title-div'>
                <div className='col-md-5'>
                  <h1 className='container-fluid'>
                    {props.project.project_title}
                  </h1>
                  <h2 className='container-fluid'>
                    {props.project.project_subtitle}
                  </h2>
                </div>
                {props.project.showreel.guid && (
                  <div className='pop-up-vid-div'>
                    <Link to='#' onClick={props.modalClick} id='pop-up-vid'>
                      <img
                        className='projectlist-showreel-img'
                        src={svgURL}
                        alt='showreel'
                      />
                      <FormattedMessage
                        id='ProjectDetailPage.showreelButton'
                        defaultMessage='SHOWREEL'
                      />
                    </Link>
                  </div>
                )}
              </div>
              <div className='col-md-1' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoLandingDesc(props) {
  const bg = {
    backgroundColor: props.project.background_mood_color
  };
  return (
    <section
      id='video-landing-caption'
      className='project-section-bg'
      style={bg}
    >
      <div className='container-fluid'>
        <div className='row video-landing-text'>
          <div className='col-md-1'></div>
          <div className='col-md-4 wow fadeIn'>
            <p className='video-landing-text-l'>{props.project.key_message}</p>
          </div>

          <div className='col-md-2'></div>
          <div className='col-md-4 wow fadeIn'>
            <p className='video-landing-text-r'>{props.project.overview}</p>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className='clearfix'></div>
      </div>
    </section>
  );
}

class ProjectDetailPage extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      modalIsOpen: false,
      project: null,
      isReturnNotFound: false
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  async componentDidMount() {
    const projectSlugFromQuery = this.props.match.params.projectSlug;
    const projectIdStr = await getProjectIdBySlugAsync(projectSlugFromQuery);
    const projectIdNum = parseInt(projectIdStr, 10);

    // if no corresponding project id entry for the slug got from query
    if (isNaN(projectIdNum)) {
      this.setState({ isReturnNotFound: true });
      return;
    }

    fetchProjectWithNextIdById(projectIdNum, aProject => {
      if (aProject === null) {
        this.setState({ isReturnNotFound: true });
      } else {
        this.setState({ project: aProject });
      }
    });

    window.setTimeout(function () {
      //$('html, body').scrollTop(0);
      $('html, body').animate({ scrollTop: '0' });
    }, 0);

    $('#root').addClass('project-details-page');
  }

  componentWillUnmount() {
    $('#root').removeClass('project-details-page');
  }

  render() {
    const state = this.state;
    const project = state.project;

    // should check isReturnNotFound first
    // before checking project === null
    if (state.isReturnNotFound) {
      return <Redirect to={routes.notFound(false)} />;
    }

    if (project === null) {
      return <MyFirstLoadingComponent isLoading={true} />;
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

    const projectTemplates = project.project_sections;
    const projectTemplateContainer = projectTemplates.map(
      (templateData, idx) => {
        const TemplateToUse =
          projectTemplateMap[parseInt(templateData.template_type, 10)];
        if (TemplateToUse)
          return (
            <TemplateToUse
              key={idx + '_' + templateData.id}
              {...templateData}
            />
          );
        else return null;
      }
    );

    return (
      <div className='wow fadeIn'>
        <VideoLanding project={project} modalClick={this.openModal} />
        <VideoLandingDesc project={project} />{' '}
        {/*
          <ReactPlayer className='react-player' controls playing loop playsinline volume='1' width='100%' url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
          <Player canBeClicked="false" playsInline="playsInline" poster="/assets/poster.png" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" autoPlay="true" fluid="true" muted="true" preload="auto" />
      */}
        {/* <ProjectTemp11 /> */}
        {projectTemplateContainer}
        <section id='project-info' className='project-section-bg'>
          <div className='container-fluid'>
            <div className='row video-landing-text'>
              <div className='col-md-1' />
              <div className='col-md-10 wow fadeIn'>
                <div id='summary' className='wrap'>
                  <div className='title'>{project.project_summary_label}</div>
                  <div className='content'>
                    {project.project_summary_rows.map((s, idx) => {
                      return (
                        <div key={idx} className='item'>
                          <span>{s.header}</span>
                          <span>{s.content}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div id='tag' className='wrap'>
                  <div className='title'>Tech Tag</div>
                  <div className='content'>
                    {project.tags.map((t, idx) => {
                      return <span key={idx}>{t.name}</span>;
                    })}
                  </div>
                </div>
              </div>
              <div className='col-md-1'></div>
            </div>
            <div className='clearfix'></div>
          </div>
        </section>
        <div id='project-detail-page-space-buffer'></div>
        {/* next project link, maybe useful for "scroll down and load next" */}
        {/*
        <div className="next-project-block">
          <Link to={routes.projectBySlugWithValue(project.next_project.slug)}>Next Project</Link>
        </div>
        */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel='Showreel Modal'
          style={customStyles}
        >
          <button
            className='video-close-btn'
            ion-button='ion-button'
            round='round'
            onClick={this.closeModal}
          >
            <i className='ion ion-android-close'></i>
          </button>
          <div className='vid-player'>
            <Player
              poster='/assets/poster.png'
              src={project.showreel.guid}
              autoPlay={true}
              fluid={true}
              volume={1}
              preload={'auto'}
            />
          </div>
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default ProjectDetailPage;
