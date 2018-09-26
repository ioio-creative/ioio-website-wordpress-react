import React, {Component} from 'react';

import './ProjectListPage.css';

import {fetchProjectListOrderByProjectDateDesc, fetchProjectCategories, fetchProjectTags} from 'websiteApi.js';
import getSearchObjectFromHistory from 'utils/queryString/getSearchObjectFromHistory';
import trackProjectListPageFilterByCategoryIfNotNull from 'utils/reactGa/trackProjectListPageFilterByCategoryIfNotNull';

import CategoriesAndItemsWithShuffle from 'components/CategoriesAndItemsWithShuffle';
import ProjectCategories from 'containers/projectList/ProjectCategories';
import ProjectItems from 'containers/projectList/ProjectItems';
import Footer from 'containers/footer/Footer';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
import LanguageContextMessagesConsumer from 'components/i18n/LanguageContextMessagesConsumer';

import withShuffle from 'components/WithShuffle';


class ProjectCategoriesAndItemsContainer extends Component {
  render() {
    const props = this.props;

    return (
      <section id="portfolio" className="section-bg wow fadeIn">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <header className="section-header">
                <h3 className="section-title">Case Studies</h3>
              </header>              
              {props.categories}
              {props.items}
            </div>
            <div className="col-md-1" />
          </div>
        </div>
      </section>
    );
  }
}


class ProjectCategoriesAndItemsWithShuffle extends Component {
  render() {
    const props = this.props;
    return (
      <LanguageContextMessagesConsumer
        render={(messages) => {
          return (
            <CategoriesAndItemsWithShuffle
              categoriesAndItemsComponent={ProjectCategoriesAndItemsContainer}
              itemsComponent={ProjectItems}
              categoriesComponent={ProjectCategories}
              shuffleSelectorClass='portfolio-item'
              allCategoryName={messages['ProjectListPage.allCategoryLabel']}
              items={props.projects}
              categories={props.categories}
              categoryFilterSlugFromQuery={props.categoryFilterSlugFromQuery}
              setShuffleRefFunc={props.setShuffleRefFunc}
              setWithShuffleParamsFunc={props.setWithShuffleParamsFunc}        
            />
          );
        }}
      />
    );
  }
}


// https://reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method
const ProjectCategoriesAndItemsWithShuffleAdded = withShuffle(ProjectCategoriesAndItemsWithShuffle);

const loadingElement = (<MyFirstLoadingComponent isLoading={true} />);


// filter implementation reference
// https://reactjs.org/docs/thinking-in-react.html
class ProjectListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      projectCategories: [],
      projectTags: [],
      categoryFilterSlugFromQuery: null,      
    }

    this.isRenderFirstTime = true;

    this._whenProjectsLoaded = this._whenProjectsLoaded.bind(this);
    this.getCategoryFilterSlugFromQuery = this.getCategoryFilterSlugFromQuery.bind(this);
  }

  componentDidMount() {
    // fetchProjects((projects) => {
    //   /*
    //     TODO: 
    //     Chris disabled the use of _whenProjectsLoaded() function for now
    //     because blank white screen shown for a long time 
    //     when loading images from projects for the first time.
    //   */
    //   // this._whenProjectsLoaded(projs)
    //   //   .then((loadedProjects) => {
    //   //     this.setState({projects: loadedProjects});
    //   //   });
    //   const trimmedProjectList = projects.filter((project) => {        
    //     return project.is_excluded_from_project_list !== "1";
    //   })
    //   this.setState({
    //     projects: trimmedProjectList
    //   })
    // });

    fetchProjectListOrderByProjectDateDesc((projects) => {
      this.setState({
        projects: projects
      });
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

  componentWillReceiveProps(nextProps) {
    const nextCategoryFilterSlugFromQuery = this.getCategoryFilterSlugFromQuery(nextProps.history);
    if (nextCategoryFilterSlugFromQuery && this.state.categoryFilterSlugFromQuery !== nextCategoryFilterSlugFromQuery) {
      trackProjectListPageFilterByCategoryIfNotNull(nextCategoryFilterSlugFromQuery);      
      this.setState({
        categoryFilterSlugFromQuery: nextCategoryFilterSlugFromQuery
      });
    }
  }

  getCategoryFilterSlugFromQuery(history) {
    return getSearchObjectFromHistory(history).category || null;
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

    const props = this.props;
    const { projects, projectCategories, projectTags, categoryFilterSlugFromQuery } = this.state;    

    if (projects.length === 0) {
      //console.log('ProjectListPage: projects length === 0');      
      //return null;
      return loadingElement;
    }
      
    if (projectCategories.length === 0) {
      //console.log('ProjectListPage: projectCategories length === 0');
      //return null;
      return loadingElement;      
    }

    if (projectTags.length === 0) {
      //console.log('ProjectListPage: projectTags length === 0');
      //return null;
      return loadingElement;      
    }

    /* 
      null check is needed for categoryFilterSlugFromQuery
      as componentWillReceiveProps() will not run before 
      first render() call
    */

    let categoryFilterSlugToUse = categoryFilterSlugFromQuery;
    if (this.isRenderFirstTime) {
      this.isRenderFirstTime = false;

      if (!categoryFilterSlugToUse) {
        categoryFilterSlugToUse = this.getCategoryFilterSlugFromQuery(props.history);
        trackProjectListPageFilterByCategoryIfNotNull(categoryFilterSlugToUse);
      }      
    }
    
    return (
      <div>
        <ProjectCategoriesAndItemsWithShuffleAdded 
          projects={projects}          
          categoryFilterSlugFromQuery={categoryFilterSlugToUse}
          categories={projectCategories}
          tags={projectTags} />
        <Footer />
      </div>
    );
  }
}

export default ProjectListPage;
