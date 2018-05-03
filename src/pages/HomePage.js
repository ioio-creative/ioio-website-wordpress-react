import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import routes from 'globals/routes';

import {getProjectIdSlugPairs} from 'utils/mapProjectIdToSlugNames';

import Footer from 'containers/Footer';
import scriptjs from 'scriptjs';
import $ from 'jquery'

import P5Wrapper from 'react-p5-wrapper';

import {fetchHighlightedProjects, fetchHomePage, fetchProjectCategories, fetchActiveFooter} from 'websiteApi';
import {getProjectCategoryNameById, getProjectTagNameById} from 'utils/mapProjectCategoryAndTagNames';

import './HomePage.css';
import sketch from './sketch';

function HighlightedProjects(props) {
  const projectIdSlugPairs = props.projIdSlugPairs;

  const project_items = props.projectlist.map((project, id) => {
    let tagIds = "col-lg-6 col-md-6 portfolio-item ";
    for (let i = 0; i < project.project_tags.length; i++) {
      tagIds += "filter-" + project.project_tags[i] + " "
    }

    const tagsCorrespondingToProj = project.project_tags.map((tagId, index) => {

      let tagName = "";
      if (index >= 1) {
        tagName = " / " + getProjectTagNameById(tagId)
      } else {
        tagName = getProjectTagNameById(tagId)
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
            <figure>
              <img src={project.thumbnail.guid} className="img-fluid" alt="alt"/>
            </figure>
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
            <figure>
              <img src={project.thumbnail.guid} className="img-fluid" alt="alt"/>
            </figure>
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
  console.log(props.abouts)
  let a = props.abouts
  return (<div className="row">
    <div className="col-md-6 about-section-left">
      <h4 className="core-value-title text-left">{a.about_section_title_left}</h4>
      <div className="text-center">
        <img src={a.about_section_picture_left.guid} alt="alt" className="img-fluid core-value-img"/>
      </div>
      <p className="description text-center"></p>
    </div>
    <div className="col-md-6 about-section-right">
      <h4 className="core-value-title  text-left">{a.about_section_title_right}</h4>
      <div className="text-center">
        <img src={a.about_section_picture_right.guid} alt="alt" className="img-fluid core-value-img"/>
      </div>
      <div className="text-center about-section-right-p-div">
      <p className="description text-center">{a.about_section_desc}</p>
      </div>
    </div>
  </div>);
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.selectAllCategoryId = -1;
    this.state = {
      projects: [],
      projectCategories: [],
      homepage: [],
      footer: null,
      selectedCategoryId: this.selectAllCategoryId,
      projectIdSlugPairs: null
    }

  }

  async componentDidMount() {
    fetchHighlightedProjects((projects) => {
      this.setState({projects: projects});
    });

    fetchHomePage((homepage) => {
      this.setState({homepage: homepage});
    });

    fetchProjectCategories((categories) => {
      this.setState({projectCategories: categories});
    });

    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });

    const projIdSlugPairs = await getProjectIdSlugPairs(); //TODO
    this.setState({projectIdSlugPairs: projIdSlugPairs});

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
          console.log($('.iframe-p5').attr("width"))

    });
*/
    const publicUrl = process.env.PUBLIC_URL;
    /*
    var loadScriptsAsync = ['canvas/hello/p5.min.js'].map((relativeUrl) => {
      return publicUrl + "/" + relativeUrl;
    });
    var loadScriptsLater = ['canvas/hello/p5.sound.min.js', 'canvas/hello/p5.dom.min.js'].map((relativeUrl) => {
      return publicUrl + "/" + relativeUrl;
    });

    scriptjs(loadScriptsAsync, () => {
      scriptjs(loadScriptsLater, 'bundle')
    });
    scriptjs.ready('bundle', function() {
      scriptjs(publicUrl + "/" + 'canvas/hello/sketch.js');
    })
*/
  }
  render() {

    const p = this.state.projects;
    const h = this.state.homepage;
    const footer = this.state.footer;

    if (footer === null) {
      return null;
    }
    if (p === null) {
      return null;
    }
    if (p.length == 0) {
      return null;
    }
    if (h.length == 0) {
      return null;
    }

    if (this.state.projectIdSlugPairs === null) {
      return null;
    }

    console.log(h[0])
    const publicUrl = process.env.PUBLIC_URL;

    const finalURL = publicUrl + '/canvas/hello/index.html';

    return (<div>
      <section id="homepage-top" className="section-bg wow fadeInUp">
        <div className="iframe-p5-div container-fluid">
          <iframe className="iframe-p5" frameBorder={0} src={finalURL}/>
        </div>
        <div>
          <Link to={h[0].showreel_video.guid} id="pop-up-vid">
            <h4 className="homepage-showreel wow slideInLeft">TO IDENTIFY THE ALTERNATIVES&nbsp;
              <i className="ion ion-android-arrow-dropright-circle"></i>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </h4>
          </Link>
        </div>
      </section>

      <section id="homepage-selected-project" className="section-bg wow fadeInUp">

        <HighlightedProjects projectlist={h[0].highlighted_projects} projIdSlugPairs={this.state.projectIdSlugPairs}/>

      </section>
      <section id="homepage-core-val" className="section-bg wow fadeInUp">
        <div className="row container">

          <div className="col-md-6 text-center"></div>
          <div className="col-md-6 text-center"></div>

        </div>
      </section>

      <section id="homepage-core-value">
        <div className="container">
          <Items abouts={h[0]}/>
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
      <Footer
        //Section: Footer
        footer={footer}/>
    </div>);
  }
}

export default HomePage;
