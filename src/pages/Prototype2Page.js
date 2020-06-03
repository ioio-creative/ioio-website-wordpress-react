import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { fetchLabDetailPageById, fetchProjectByIdAsync } from 'websiteApi';

import { getLabDetailPageIdBySlugAsync } from 'utils/mapLabDetailPageSlugNameToIds';
import { Redirect } from 'react-router-dom';
import routes from 'globals/routes';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

//import {Player} from 'video-react'; todo Remove video-react
import './video-react.css'; // import css

import './LabDetailPage.css';
import './LabDetailPageM.css';

import Footer from 'containers/footer/Footer';

import LabTemp01 from 'containers/labDetail/LabTemp01'; //photomontage - 3 images
import LabTemp02 from 'containers/labDetail/LabTemp02'; //slideshow - Image on Left, Text on right
import LabTemp03 from 'containers/labDetail/LabTemp03'; //slideshow - Image on Right, Text on Left
import LabTemp04 from 'containers/labDetail/LabTemp04'; //photomontage - One Image
import LabTemp05 from 'containers/labDetail/LabTemp05'; //slideshow - Image only
import LabTemp06 from 'containers/labDetail/LabTemp06'; //photomontage - 2-column Image and caption
import LabTemp07 from 'containers/labDetail/LabTemp07'; //photomontage - One Video
import LabTemp08 from 'containers/labDetail/LabTemp08'; //Full Width One Imgae
import LabTemp09 from 'containers/labDetail/LabTemp09'; //centre text

// for displaying hopping
import LabTemp10 from 'containers/labDetail/LabTemp10'; // image with a short description

const labTemplateMap = {
  1: LabTemp01,
  2: LabTemp02,
  3: LabTemp03,
  4: LabTemp04,
  5: LabTemp05,
  6: LabTemp06,
  7: LabTemp07,
  8: LabTemp08,
  9: LabTemp09
};

const publicUrl = process.env.PUBLIC_URL;

function VideoLanding(props) {
  //const publicUrl = process.env.PUBLIC_URL;

  return (
    <section
      id='video-landing'
      className='section-bg wow fadeIn'
      data-wow-delay='0.8s'
    >
      <div className='video-landing-div'>
        <div className='container-fluid'>
          <div className='player-wrapper'>
            {/*
            <video className="react-player" width={'100%'} height={'auto'} poster={poster_url} autoPlay={"autoPlay"} loop={"loop"} muted="muted" playsInline={"playsInline"}>
            <source className="wow fadeIn" src={video_url} type="video/mp4"/>
          </video>
          */}
            <img
              className='wow fadeIn'
              src={props.lab.cover_thumbnail.guid}
              alt='cover thumbnail'
            />
          </div>
          {/* <ReactPlayer className='react-player' playing={true} loop={true} playsinline={true} volume={0} muted={true} width='100%' height='auto' url={full_url} /> */}
        </div>
      </div>
      <div className='cover-bg wow fadeIn'></div>
    </section>
  );
}

function VideoLandingDesc(props) {
  const bg = {
    backgroundColor: props.lab.background_mood_color
  };
  var str = props.lab.project_date;
  var res = str.split('-');

  return (
    <section
      id='video-landing-caption'
      className='project-section-bg'
      style={bg}
    >
      <div className='container-fluid'>
        <div className='row video-landing-title'>
          <div className='col-md-1'></div>
          <div className='col-md-2 additional-info'>
            <ul>
              <li className='date'>
                {res[2]}/{res[1]}
              </li>
              <li className='year'>{res[0]}</li>
            </ul>
          </div>
          <div className='col-md-8'>
            <div className='cover-text'>
              <h1 className='container-fluid'>HOPPING</h1>
              <h2 className='container-fluid'>{props.lab.project_name}</h2>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className='row video-landing-detail'>
          <div className='col-md-1'></div>
          <div className='col-md-2 additional-info'>
            <ul>
              <li>{props.lab.left_column_description}</li>
            </ul>
          </div>
          <div className='col-md-8'>
            <p className='lab-key-message'>
              {props.lab.key_message.replace(/p2/gi, 'Hopping')}
            </p>
            <p className='lab-overview'>
              {props.lab.overview.replace(/p2/gi, 'Hopping')}
            </p>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    </section>
  );
}

class Prototype2Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReturnNotFound: false,
      lab: null,
      relatedProjects: []
    };
  }

  async componentDidMount() {
    const labSlugFromQuery = 'prototype2'; // this.props.match.params.labSlug;
    const labIdStr = await getLabDetailPageIdBySlugAsync(labSlugFromQuery);
    const labIdNum = parseInt(labIdStr, 10);

    // if no corresponding project id entry for the slug got from query
    if (isNaN(labIdNum)) {
      this.setState({ isReturnNotFound: true });
      return;
    }

    fetchLabDetailPageById(labIdNum, aLab => {
      if (aLab === null) {
        this.setState({ isReturnNotFound: true });
      } else {
        this.setState({ lab: aLab });
        if (aLab.related_projects && aLab.related_projects > 0) {
          const relatedProjectPromises = aLab.related_projects.map(
            async relatedProj => {
              const relatedProjWhole = await fetchProjectByIdAsync(
                relatedProj.id
              );
              return relatedProjWhole;
            }
          );

          Promise.all(relatedProjectPromises).then(relatedProjectObjs => {
            this.setState({ relatedProjects: relatedProjectObjs });
          });
        }
      }
    });
  }

  render() {
    const state = this.state;
    const lab = state.lab;
    const relatedProjects = state.relatedProjects;

    // should check isReturnNotFound first
    // before checking lab === null
    if (state.isReturnNotFound) {
      return <Redirect to={routes.notFound} />;
    }

    if (lab === null) {
      return <MyFirstLoadingComponent isLoading={true} />;
      // return null;
    }

    // const customStyles = {
    //   content: {
    //     top: '50%',
    //     left: '50%',
    //     right: 'auto',
    //     bottom: 'auto',
    //     marginRight: '-50%',
    //     transform: 'translate(-50%, -50%)',
    //     backgroundColor: 'rgba(0,0,0,0)',
    //     border: '0px'
    //   }
    // };

    const labTemplates = lab.sections;
    const labTemplateContainer = labTemplates.map((templateData, index) => {
      const templateType = parseInt(templateData.template_type, 10);
      const TemplateToUse = labTemplateMap[templateType];

      /* insert between block 4 and block 5 */
      if (index == 4) {
        const newSection1 = {
          shortDesc: 'Captured Output: Animated Walking Cycle',
          width: '50%',
          images: [
            {
              guid: publicUrl + '/img/Loop4.gif'
            }
          ]
        };
        const newSection2 = {
          shortDesc: 'Animated Walking Cycle (Skeleton Tracking mode)',
          width: '100%',
          images: [
            {
              guid: publicUrl + '/img/Loop4 skeleton 8fps.gif'
            }
          ]
        };
        return (
          <Fragment key={Date.now()}>
            <TemplateToUse key={templateData.id} {...templateData} />
            <LabTemp10 {...newSection1} />
            <LabTemp10 {...newSection2} />
          </Fragment>
        );
      } else {
        return <TemplateToUse key={templateData.id} {...templateData} />;
      }
    });

    const isDisplayRelatedProjects = relatedProjects.length > 0;
    const relatedProjectElements = relatedProjects.map(relatedProject => {
      return (
        <Link
          key={relatedProject.id}
          to={routes.projectBySlugWithValue(relatedProject.slug)}
          className='related-hover'
        >
          <h1>Related Projects</h1>
          <h3>{relatedProject.project_name}</h3>
        </Link>
      );
    });

    return (
      <div className='wow fadeIn'>
        <VideoLanding lab={lab} />
        <VideoLandingDesc lab={lab} />
        <div className='container-fluid'>
          <div className='row '>
            <div className='col-md-1'></div>
            <div className='col-md-10'>{labTemplateContainer}</div>
            <div className='col-md-1'></div>
          </div>
        </div>
        {isDisplayRelatedProjects && (
          <section id='lab-related-project'>{relatedProjectElements}</section>
        )}
        <Footer />
      </div>
    );
  }
}

export default Prototype2Page;
