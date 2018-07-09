import React, {Component} from 'react';

import './ProjectListPage.css';

import {fetchProjects, fetchProjectCategories, fetchProjectTags} from 'websiteApi.js';
import getSearchObjectFromHistory from 'utils/queryString/getSearchObjectFromHistory';
import trackProjectListPageFilterByCategory from 'utils/reactGa/trackProjectListPageFilterByCategory';

import CategoriesAndItemsWithShuffle from 'components/CategoriesAndItemsWithShuffle';
import ProjectCategories from 'containers/projectList/ProjectCategories';
import ProjectItems from 'containers/projectList/ProjectItems';
import Footer from 'containers/footer/Footer';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

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
      <CategoriesAndItemsWithShuffle
        categoriesAndItemsComponent={ProjectCategoriesAndItemsContainer}
        itemsComponent={ProjectItems}
        categoriesComponent={ProjectCategories}
        shuffleSelectorClass='portfolio-item'
        allCategoryName='All'
        items={props.projects}
        categories={props.categories}
        categoryFilterSlugFromQuery={props.categoryFilterSlugFromQuery}
        shuffle={props.shuffle}
        setShuffleRefFunc={props.setShuffleRefFunc}
        setWithShuffleParamsFunc={props.setWithShuffleParamsFunc}        
      />
    );
  }
}


// https://reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method
const ProjectCategoriesAndItemsWithShuffleAdded = withShuffle(ProjectCategoriesAndItemsWithShuffle);


// filter implementation reference
// https://reactjs.org/docs/thinking-in-react.html
class ProjectListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      projectCategories: [],
      projectTags: [],
      categoryFilterSlugFromQuery: null
    }

    this._whenProjectsLoaded = this._whenProjectsLoaded.bind(this);
  }

  componentDidMount() {
    fetchProjects((projects) => {
      /*
        TODO: 
        Chris disabled the use of _whenProjectsLoaded() function for now
        because blank white screen shown for a long time 
        when loading images from projects for the first time.
      */
      // this._whenProjectsLoaded(projs)
      //   .then((loadedProjects) => {
      //     this.setState({projects: loadedProjects});
      //   });
      this.setState({
        projects: projects
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

  componentWillReceiveProps(nextProps) {
    const nextCategoryFilterSlugFromQuery = getSearchObjectFromHistory(nextProps.history).category || null;
    if (this.state.categoryFilterSlugFromQuery !== nextCategoryFilterSlugFromQuery) {
      trackProjectListPageFilterByCategory(nextCategoryFilterSlugFromQuery);
      this.setState({
        categoryFilterSlugFromQuery: nextCategoryFilterSlugFromQuery
      });
    }
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

    //const props = this.props;
    const { projects, projectCategories, projectTags, categoryFilterSlugFromQuery } = this.state;    

    if (projects.length === 0) {
      //console.log('ProjectListPage: projects length === 0');      
      //return null;
      return (<MyFirstLoadingComponent />);
    }
      
    if (projectCategories.length === 0) {
      //console.log('ProjectListPage: projectCategories length === 0');
      //return null;
      return (<MyFirstLoadingComponent />);      
    }

    if (projectTags.length === 0) {
      //console.log('ProjectListPage: projectTags length === 0');
      //return null;
      return (<MyFirstLoadingComponent />);      
    }

    return (
      <div>
        <ProjectCategoriesAndItemsWithShuffleAdded 
          projects={projects}
          categoryFilterSlugFromQuery={categoryFilterSlugFromQuery}
          categories={projectCategories}
          tags={projectTags} />
        <Footer />
      </div>
    );
  }
}

export default ProjectListPage;
