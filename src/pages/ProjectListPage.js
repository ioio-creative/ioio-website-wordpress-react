import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './ProjectListPage.css';
import './ProjectListPageProjectGrid.css';

import {fetchProjects, fetchProjectCategories, fetchProjectTags} from 'websiteApi.js';
import routes from 'globals/routes';
import {createIdNamePairs, createSlugIdPairs, createIdSlugPairs} from 'utils/generalMapper';
import getSearchObjectFromHistory from 'utils/queryString/getSearchObjectFromHistory';
import createDefaultShuffle from 'utils/shuffle/createDefaultShuffle';

import Footer from 'containers/footer/Footer';
import ProjectCategories from 'containers/projectCategories/ProjectCategories';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';


function ProjectGrid(props) {
  //console.log('ProjectGrid: render');

  const projectCategoryIdNamePairs = props.projCategoryIdNamePairs;

  const project_items = props.projects.map((project) => {
    let projItemClassName = 'col-lg-6 col-md-6 ' + props.projectShuffleSelectorClass + ' ';

    const categoryCorrespondingToProj = project.project_categories.map((categoryId, index) => {
      let categoryName = projectCategoryIdNamePairs[categoryId];
      if (index >= 1) {
        categoryName = ' / ' + categoryName;
      }
      return (<span key={index}>
        {categoryName}
      </span>);
    });

    return (
      // data-project-category-ids is made use of in handleFilterButtonClick() of ProjectListWithShffle class
      <div key={project.id}
          className={projItemClassName}
          data-project-category-ids={project.project_categories.join(',')}>
        <Link to={routes.projectBySlugWithValue(project.slug)}>
          <div className="portfolio-wrap">
            <div className="img-container">
              <img src={project.thumbnail.guid} className="img-fluid" alt="alt"/>
            </div>
            <div className="portfolio-info">
              <h4>
                {project.project_name}
              </h4>
              <p>{categoryCorrespondingToProj}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div ref={props.setShuffleRefFunc} className="row portfolio-container wow fadeIn my-shuffle">
      {project_items}
    </div>
  );
}


class ProjectListWithShuffle extends Component {
  constructor(props) {
    super(props);

    this.selectAllCategoryId = -1;
    this.selectedCategoryClass = 'filter-active';

    this.filterProjectsByQueryFromUrl = this.filterProjectsByQueryFromUrl.bind(this);
    this.filterProjects = this.filterProjects.bind(this);
    this.setShuffleRef = this.setShuffleRef.bind(this);

    this.getProjectCategoryIdNamePairs = this.getProjectCategoryIdNamePairs.bind(this);
    this.getProjectCategoryIdSlugPairs = this.getProjectCategoryIdSlugPairs.bind(this);
    this.getProjectCategorySlugIdPairs = this.getProjectCategorySlugIdPairs.bind(this);

    this.projectCategoryIdNamePairs = [];
    this.projectCategoryIdSlugPairs = [];
    this.projectCategorySlugIdPairs = [];
  }

  componentDidMount() {
    // The elements are in the DOM, initialize a shuffle instance.
    this.shuffle = createDefaultShuffle(this.shuffleRef, this.projectShuffleSelectorClass);

    // for first visiting of the page
    this.filterProjectsByQueryFromUrl();
  }

  // http://busypeoples.github.io/post/react-component-lifecycle/
  componentDidUpdate() {
    // Notify shuffle to dump the elements it's currently holding and consider
    // all elements matching the `itemSelector` as new.
    this.shuffle.resetItems();

    this.filterProjectsByQueryFromUrl();
  }

  componentWillUnmount() {
    // Dispose of shuffle when it will be removed from the DOM.
    this.shuffle.destroy();
    this.shuffle = null;
  }

  getProjectCategoryIdNamePairs() {
    if (this.projectCategoryIdNamePairs.length === 0) {
      this.projectCategoryIdNamePairs = createIdNamePairs(this.props.categories);
    }
    return this.projectCategoryIdNamePairs;
  }

  getProjectCategoryIdSlugPairs() {
    if (this.projectCategoryIdSlugPairs.length === 0) {
      this.projectCategoryIdSlugPairs = createIdSlugPairs(this.props.categories);
    }
    return this.projectCategoryIdSlugPairs;
  }

  getProjectCategorySlugIdPairs() {
    if (this.projectCategorySlugIdPairs.length === 0) {
      this.projectCategorySlugIdPairs = createSlugIdPairs(this.props.categories);
    }
    return this.projectCategorySlugIdPairs;
  }

  filterProjectsByQueryFromUrl() {
    // cater for filter ALL case
    const categoryIdToFilter =
      this.getProjectCategorySlugIdPairs()[this.props.categoryFilterSlugFromQuery]
      || this.selectAllCategoryId;
    this.filterProjects(categoryIdToFilter);
  }

  filterProjects(categoryId, tagId) {
    /*
      Important: Do not call this.setState() here.
      Calling this.setState() here would make the animation effect
      of this.shuffle.filter() not working.
    */

    if (categoryId === this.selectAllCategoryId) {
      this.shuffle.filter();
    } else {
      // https://vestride.github.io/Shuffle/#advanced-filters
      this.shuffle.filter((projectItem) => {
        const projItemCategoryIds = projectItem.getAttribute('data-project-category-ids').split(',').map((id) => {
          return parseInt(id, 10);
        });
        return projItemCategoryIds.includes(categoryId);
      });
    }
  }

  setShuffleRef(element) {
    this.shuffleRef = element;
  }

  render() {
    //console.log('ProjectListWithShuffle: render');

    const categoryIdToFilter = this.getProjectCategorySlugIdPairs()[this.props.categoryFilterSlugFromQuery];

    return (
      <section id="portfolio" className="section-bg wow fadeIn">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <header className="section-header">
                <h3 className="section-title">Case Studies</h3>
              </header>
              <div className="row">
                {/* <ProjectTags tags={t}/> */}
                <ProjectCategories categories={this.props.categories}
                                    selectAllCategoryId={this.selectAllCategoryId}
                                    selectedItemClass={this.selectedCategoryClass}
                                    categoryFilterId={categoryIdToFilter}
                                    allCategoryName='All' />
              </div>
              <ProjectGrid projects={this.props.projects}
                            projectShuffleSelectorClass={this.projectShuffleSelectorClass}
                            setShuffleRefFunc={this.setShuffleRef}
                            projCategoryIdNamePairs={this.getProjectCategoryIdNamePairs()} />
            </div>
            <div className="col-md-1" />
          </div>
        </div>
      </section>        
    );
  }
}


// filter implementation reference
// https://reactjs.org/docs/thinking-in-react.html
class ProjectListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      projectCategories: [],
      projectTags: [],
    }

    this._whenProjectsLoaded = this._whenProjectsLoaded.bind(this);
  }

  componentDidMount() {
    fetchProjects((projects) => {
      this._whenProjectsLoaded(projects)
        .then((loadedProjects) => {
          this.setState({projects: loadedProjects});
        })
    });

    fetchProjectCategories((projCategories) => {
      this.setState({
        projectCategories: projCategories
      });
    });

    fetchProjectTags((projTags) => {
      this.setState({
        projectTags: projTags
      });
    });
  }

  // https://vestride.github.io/Shuffle/shuffle-with-react
  /**
   * Resolve a promise when all the photos in an array have loaded.
   * @param {Object[]} photos Photos to load.
   * @return {Promise.<Object[]>} Loaded images.
   */
  _whenProjectsLoaded(projects) {
    return Promise.all(projects.map(project => new Promise((resolve) => {
      // dummy html element for browser to load the image from url
      // not attached to anything to the DOM
      const image = document.createElement('img');
      image.src = project.thumbnail.guid;

      if (image.naturalWidth > 0 || image.complete) {
        resolve(project);
      } else {
        image.onload = () => {
          resolve(project);
        };
      }
    })));
  }

  render() {
    //console.log('ProjectListPage: render');

    const state = this.state;
    //const props = this.props;

    const pC = state.projectCategories;
    const pT = state.projectTags;
    const projects = state.projects;

    if (projects.length === 0) {
      //console.log('ProjectListPage: projects length === 0');
      return (<MyFirstLoadingComponent />);
    }
      
    if (pC.length === 0) {
      //console.log('ProjectListPage: projectCategories length === 0');
      return (<MyFirstLoadingComponent />);
    }

    if (pT.length === 0) {
      //console.log('ProjectListPage: projectTags length === 0');
      return (<MyFirstLoadingComponent />);
    }
     
    const categoryFilterSlugFromQuery = getSearchObjectFromHistory(this.props.history).category || null;

    return (
      <div>
        <ProjectListWithShuffle projects={projects}
          categoryFilterSlugFromQuery={categoryFilterSlugFromQuery}
          categories={pC}
          tags={pT} />
        <Footer />
      </div>
    );
  }
}

export default ProjectListPage;
