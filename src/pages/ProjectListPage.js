import React, {Component} from 'react';

import './ProjectListPage.css';

import {fetchProjects, fetchProjectCategories, fetchProjectTags} from 'websiteApi.js';
import getSearchObjectFromHistory from 'utils/queryString/getSearchObjectFromHistory';

import Footer from 'containers/footer/Footer';
import CategoriesAndItemsWithShuffle, {CategoriesAndItemsMode} from 'components/CategoriesAndItemsWithShuffle';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import withShuffle from 'components/WithShuffle';


class ProjectCategoriesAndItemsWithShuffle extends Component {
  render() {
    const props = this.props;
    
    return (
      <CategoriesAndItemsWithShuffle
        mode={CategoriesAndItemsMode.Projects}
        shuffleSelectorClass='portfolio-item'
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
        <ProjectCategoriesAndItemsWithShuffleAdded projects={projects}
          categoryFilterSlugFromQuery={categoryFilterSlugFromQuery}
          categories={pC}
          tags={pT} />
        <Footer />
      </div>
    );
  }
}

export default ProjectListPage;
