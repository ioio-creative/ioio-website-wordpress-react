import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import routes from 'globals/routes';

import {getProjectIdSlugPairs} from 'utils/mapProjectIdToSlugNames';

import Footer from 'containers/Footer';
import scriptjs from 'scriptjs';
import $ from 'jquery';

import P5Wrapper from 'react-p5-wrapper';

import {fetchHighlightedProjects, fetchProjectCategories, fetchActiveFooter, fetchHomePage} from 'websiteApi';
import {getProjectCategoriesAndItsIdNamePairs, getProjectTagsAndItsProjectTagIdNamePairs} from 'utils/mapProjectCategoryAndTagNames';

import './HomePage.css';
import sketch from './sketch';

import Modal from 'react-modal';

import {Player} from 'video-react';
import "./video-react.css";

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.75)';

function ProjectCategoryButton(props) {
  /* Note: ProjectCategoryButton's props structure is designed such that the 'ALL' button can fit in. */

  let projectsByCategoryRoute = routes.projectsAll();
  if (props.categorySlug) {
    projectsByCategoryRoute = routes.projectsByCategory(props.categorySlug);
  } 

  return (
    <li>
      <Link to={projectsByCategoryRoute}>
        {props.categoryName}<span>{props.categoryCount}</span>
      </Link>
    </li>
  );
}

function ProjectCategories(props) {
  const categoryItems = props.categories.map((category) => {
    return (
      <ProjectCategoryButton key={category.id} 
        categorySlug={category.slug}
        categoryName={category.name}
        categoryCount={category.count} />
    );
  });

  const allCategoryProjectCount = props.categories.reduce((sum, currentCategory) => {
    return sum + currentCategory.count;
  }, 0);

  return (
    <div className="col-lg-12 ">
      <ul id="portfolio-flters">
        <ProjectCategoryButton
          categorySlug={null}
          categoryName='We Do'
          categoryCount={allCategoryProjectCount} />
        {categoryItems}
      </ul>
    </div>
  );
}

function HighlightedProjects(props) {
  const projectIdSlugPairs = props.projIdSlugPairs;
  const projectTagIdNamePairs = props.projTagIdNamePairs;

  const project_items = props.projectlist.map((project, id) => {
    let tagIds = "col-lg-6 col-md-6 portfolio-item ";
    for (let i = 0; i < project.project_tags.length; i++) {
      tagIds += "filter-" + project.project_tags[i] + " "
    }

    const tagsCorrespondingToProj = project.project_tags.map((tagId, index) => {
      let tagName = projectTagIdNamePairs[tagId];
      if (index > 0) {
        tagName = " / " + tagName;
      }
      return (<span key={index}>
        {tagName}
      </span>);
    });

    /*
    let s = project.link;
    cutString(s);
    function cutString(s) {
      let cut = s.indexOf('/projects');
      if (cut === -1)
        return s;
      return s.substr(cut)
    }
    let d = cutString(s);
    */

    const projectDetailRoutePath = routes.projectBySlugWithValue(projectIdSlugPairs[project.id]);

    if (id == 0) {
      return (<div className="col-md-12" key={id}>
        <Link to={projectDetailRoutePath}>{props.name}
          <div className="portfolio-wrap">
            <div className="img-container">
              <img src={project.thumbnail.guid} alt="alt"/>
            </div>
            <div className="portfolio-info">
              <h4>
                {project.project_name}
              </h4>
              <p>{project.project_short_description}</p>
            </div>
          </div>
        </Link>
      </div>);
    } else {
      return (<div className="col-md-6 wrap-this" key={id}>
        <Link to={projectDetailRoutePath}>{props.name}
          <div className="portfolio-wrap">
            <div className="img-container">
              <img src={project.thumbnail.guid} alt="alt"/>
            </div>
            <div className="portfolio-info">
              <h4>
                {project.project_name}
              </h4>
              <p>{project.project_short_description}</p>
            </div>
          </div>
        </Link>
      </div>);
    }

  });

  return (<div className="row container-fluid">
    {project_items}
  </div>);
}

function Items(props) {
  let a = props.abouts
  return (<div className="row">
    <div className="col-md-1"></div>
    <div className="col-md-5 about-section-left">
      <h4 className="core-value-title text-left">{a.about_section_title_left}</h4>
      <div className="text-center">
        <img src={a.about_section_picture_left.guid} alt="alt" className="img-fluid core-value-img"/>
      </div>
      <p className="description text-center"></p>
    </div>
    <div className="col-md-5 about-section-right">
      <h4 className="core-value-title text-left">{a.about_section_title_right}</h4>
      <div className="text-center">
        <img src={a.about_section_picture_right.guid} alt="alt" className="img-fluid core-value-img"/>
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

    this.selectAllCategoryId = -1;
    this.state = {
      projects: [],
      projectCategories: [],
      homepage: [],
      footer: null,
      selectedCategoryId: this.selectAllCategoryId,
      projectIdSlugPairs: [],
      projectTagIdNamePairs: []
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
    fetchHighlightedProjects((projects) => {
      this.setState({projects: projects});
    });

    fetchHomePage((homepage) => {
      this.setState({homepage: homepage});
    });

    getProjectCategoriesAndItsIdNamePairs((projectCategories, projectCategoryIdNamePairs) => {
      this.setState({projectCategories: projectCategories});
    });

    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });

    getProjectIdSlugPairs((projectIdSlugPairs) => {
      this.setState({projectIdSlugPairs: projectIdSlugPairs});
    });

    getProjectTagsAndItsProjectTagIdNamePairs((projectTags, projectTagIdNamePairs) => {
      this.setState({projectTagIdNamePairs: projectTagIdNamePairs});
    });

    /*
    const publicUrl = process.env.PUBLIC_URL;

    scriptjs(publicUrl + '/canvas/hello/sketch.js')
    */
    console.log('script loaded')

    window.addEventListener('load', this.handleLoad);
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

  render() {
    const p = this.state.projects;
    const h = this.state.homepage;
    const footer = this.state.footer;
    const pC = this.state.projectCategories;
    const projectIdSlugPairs = this.state.projectIdSlugPairs;
    const projectTagIdNamePairs = this.state.projectTagIdNamePairs;

    if (pC.length === 0) {
      return null;
    }

    if (footer === null) {
      return null;
    }

    if (p.length == 0) {
      return null;
    }

    if (h.length == 0) {
      return null;
    }

    if (projectIdSlugPairs.length === 0) {
      return null;
    }

    if (projectTagIdNamePairs.length === 0) {
      return null;
    }

    const publicUrl = process.env.PUBLIC_URL;

    const canvasURL = publicUrl + '/canvas/hello/index.html'
    const svgURL = publicUrl + '/img/Play_btn-14.svg'
    const home = h[0];

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

    return (<div>

      <section id="homepage-top" className="section-bg wow fadeIn" data-wow-delay="0.5s">
        <div className="homepage-top-logo-div">
          <h4 id="homepage-top-logo">IOIO CREATIVE</h4>
        </div>
        <div className="container-fluid iframe-p5-div-mobile">
          <h1>IOIO</h1>
        </div>
        <div className="container-fluid iframe-p5-div">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="iframe-p5-inside-div container-fluid">
                <iframe className="iframe-p5" frameBorder={0} src={canvasURL}/>
              </div>
              <Link to="#" onClick={this.openModal} id="pop-up-vid" >
                <div className="homepage-showreel">
                <h4 className="homepage-showreel-text">{home.page_title}
                </h4>
                <img className="homepage-showreel-img" src={svgURL} alt="showreel"/>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
              </Link>
            </div>
            <div className="col-md-1"></div>

          </div>
        </div>
      </section>

      <section id="homepage-selected-project" className="section-bg wow fadeInUp">
        <ProjectCategories categories={pC}/>
        <HighlightedProjects projectlist={home.highlighted_projects}
          projIdSlugPairs={projectIdSlugPairs}
          projTagIdNamePairs={projectTagIdNamePairs} />
      </section>
      <section id="homepage-core-value">

        <div className="container">
          <Link to={routes.about}>
            <Items abouts={home}/>
          </Link>
        </div>

      </section>
      <section id="homepage-lab" className="section-bg wow fadeInUp">
        <div className="row container-fluid">
          <div className="col-md-4 text-left">
            <a href="#">
              <p>Tapping</p>
            </a>
          </div>
          <div className="col-md-8 text-left">
            <a href="#">
              <p>Bible Consipiracy</p>
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

      <Footer
        footer={footer}/>
    </div>);
  }
}

export default HomePage;
