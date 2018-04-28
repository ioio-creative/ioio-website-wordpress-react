import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import routes from 'globals/routes';

import Footer from 'containers/Footer';
import scriptjs from 'scriptjs';
import $ from 'jquery'

import P5Wrapper from 'react-p5-wrapper';

import {fetchHighlightedProjects, fetchProjectCategories, fetchActiveFooter} from 'websiteApi';
import {getProjectCategoryNameById, getProjectTagNameById} from 'utils/mapProjectCategoryAndTagNames';

import './HomePage.css';
import sketch from './sketch';



function HighlightedProjects(props) {

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

    if (id == 0) {
      return (<div className="col-md-12" key={id}>
        <Link to={routes.projectBySlugWithValue(project.slug)}>{props.name}
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
        <Link to={routes.projectBySlugWithValue(project.slug)}>{props.name}
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.selectAllCategoryId = -1;
    this.state = {
      projects: [],
      projectCategories: [],

      footer: null,
      selectedCategoryId: this.selectAllCategoryId
    }

  }

  componentDidMount() {
    fetchHighlightedProjects((projects) => {
      this.setState({projects: projects});
    });

    fetchProjectCategories((categories) => {
      this.setState({projectCategories: categories});
    });

    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
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

    console.log(p[0])
const publicUrl = process.env.PUBLIC_URL;

const finalURL = publicUrl + '/canvas/hello/index.html'
    console.log(p[0].projects)
    return (<div>
      <section id="homepage-top" className="section-bg wow fadeInUp">
        <div className="iframe-p5-div container-fluid">
        <iframe className="iframe-p5" frameBorder={0} src={finalURL}/>
        </div>
      </section>

      <section id="homepage-selected-project" className="section-bg wow fadeInUp">

        <HighlightedProjects projectlist={p[0].projects}/>

      </section>
      <section id="homepage-core-val" className="section-bg wow fadeInUp">
        <div className="row container">

          <div className="col-md-6 text-center"></div>
          <div className="col-md-6 text-center"></div>

        </div>
      </section>
      <section id="homepage-lab" className="section-bg wow fadeInUp">
        <div className="row container-fluid">
          <div className="col-md-4 text-center">
            <a href="#"><p>Tapping</p></a>
          </div>
          <div className="col-md-8 text-center">
            <a href="#"><p>Bible Consipiracy</p></a>
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
