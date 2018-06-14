import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Shuffle from 'shufflejs'
import queryString from 'query-string';

import './ProjectListPage.css';
import './ProjectListPageProjectGrid.css';

import {fetchProjects, fetchProjectTags, fetchActiveFooter} from 'websiteApi.js';
import routes from 'globals/routes';
import {getProjectCategoriesAndItsIdNamePairs, getProjectTagsAndItsProjectTagIdNamePairs} from 'utils/mapProjectCategoryAndTagNames';
import {createSlugIdPairs, createIdSlugPairs} from 'utils/generalMapper';

import Footer from 'containers/Footer';


function ProjectCategoryButton(props) {
  /* Note: ProjectCategoryButton's props structure is designed such that the 'ALL' button can fit in. */
  return (
    <li
        className={props.categoryItemClassName}
        onClick={props.onClick}>
        {props.categoryName}<span>{props.categoryCount}</span>
    </li>
  );
}


class ProjectCategories extends Component {
  constructor(props) {
    super(props);
    this.projectCategoryIdSlugPairs = [];
    this.state = {
      selectedCategoryId: props.selectAllCategoryId
    };
    this.handleCategoryButtonClick = this.handleCategoryButtonClick.bind(this);
    this.getProjectCategoryIdSlugPairs = this.getProjectCategoryIdSlugPairs.bind(this);
  }

  // http://busypeoples.github.io/post/react-component-lifecycle/
  componentWillReceiveProps(nextProps) {
    if (nextProps.oneTimeCategoryFilterIdFromQuery) {
      this.setState({
        selectedCategoryId: nextProps.oneTimeCategoryFilterIdFromQuery
      });
    }
  }

  handleCategoryButtonClick(categoryId) {
    this.props.handleFilterClick(categoryId);

    const categoryFilterSlug = this.getProjectCategoryIdSlugPairs()[categoryId] || 'all';
    //this.props.history.push(routes.projectsByCategory(categoryFilterSlug));
    
    this.setState({
      selectedCategoryId: categoryId
    });
  }

  getProjectCategoryIdSlugPairs() {
    if (this.projectCategoryIdSlugPairs.length === 0) {
      this.projectCategoryIdSlugPairs = createIdSlugPairs(this.props.categories);
    }
    return this.projectCategoryIdSlugPairs;
  }

  render() {
    const state = this.state;
    const props = this.props;

    const selectedItemClass = 'filter-active';

    const categoryItems = props.categories.map((category) => {
      let categoryItemClassName = '';
      if (state.selectedCategoryId === category.id) {
        categoryItemClassName += ' ' + selectedItemClass;
      }
      return (
        <ProjectCategoryButton key={category.id} 
          categoryItemClassName={categoryItemClassName} 
          onClick={() => this.handleCategoryButtonClick(category.id)}
          categoryName={category.name}
          categoryCount={category.count} />
      );
    });

    let allCategoryClassName = '';
    if (state.selectedCategoryId === props.selectAllCategoryId) {
      allCategoryClassName += ' ' + selectedItemClass;
    }

    const allCategoryProjectCount = props.categories.reduce((sum, currentCategory) => {
      return sum + currentCategory.count;
    }, 0);

    return (
      <div className="col-lg-12 ">
        <ul id="portfolio-flters">          
          <ProjectCategoryButton
            categoryItemClassName={allCategoryClassName} 
            onClick={() => this.handleCategoryButtonClick(props.selectAllCategoryId)} 
            categoryName='ALL'
            categoryCount={allCategoryProjectCount} />
          {categoryItems}
        </ul>
      </div>
    );
  }
}


function ProjectGrid(props) {
  const projectCategoryIdNamePairs = props.projCategoryIdNamePairs;
  const projectTagIdNamePairs = props.projTagIdNamePairs;

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

    this.shuffleRef = null;
    this.projectShuffleSelectorClass = 'portfolio-item';
    this.shuffle = null;

    this.handleFilterButtonClick = this.handleFilterButtonClick.bind(this);
    this.filterProjects = this.filterProjects.bind(this);
    this.setShuffleRef = this.setShuffleRef.bind(this);

    this.setFirstFilterFromQuery = this.setFirstFilterFromQuery.bind(this);

    this.state = {
      oneTimeCategoryFilterIdFromQuery: null
    };
  }

  componentDidMount() {
    // The elements are in the DOM, initialize a shuffle instance.
    this.shuffle = new Shuffle(this.shuffleRef, {
      // https://vestride.github.io/Shuffle/#options
      // overrideable options
      itemSelector: '.' + this.projectShuffleSelectorClass,

      buffer: 0, // Useful for percentage based heights when they might not always be exactly the same (in pixels).
      columnThreshold: 0.01, // Reading the width of elements isn't precise enough and can cause columns to jump between values.
      columnWidth: 0, // A static number or function that returns a number which tells the plugin how wide the columns are (in pixels).
      delimiter: null, // If your group is not json, and is comma delimeted, you could set delimiter to ','.
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // CSS easing function to use.
      filterMode: Shuffle.FilterMode.ANY, // When using an array with filter(), the element passes the test if any of its groups are in the array. With "all", the element only passes if all groups are in the array.
      group: Shuffle.ALL_ITEMS, // Initial filter group.
      gutterWidth: 0, // A static number or function that tells the plugin how wide the gutters between columns are (in pixels).
      initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method.
      isCentered: false, // Attempt to center grid items in each row.
      itemSelector: '*', // e.g. '.picture-item'.
      roundTransforms: true, // Whether to round pixel values used in translate(x, y). This usually avoids blurriness.
      sizer: null, // Element or selector string. Use an element to determine the size of columns and gutters.
      speed: 250, // Transition/animation speed (milliseconds).
      staggerAmount: 15, // Transition delay offset for each item in milliseconds.
      staggerAmountMax: 150, // Maximum stagger delay in milliseconds.
      //throttle: throttle, // By default, shuffle will throttle resize events. This can be changed or removed.
      throttleTime: 300, // How often shuffle can be called on resize (in milliseconds).
      useTransforms: true, // Whether to use transforms or absolute positioning.
    });

    this.setFirstFilterFromQuery();
  }

  componentDidUpdate() {
    // Notify shuffle to dump the elements it's currently holding and consider
    // all elements matching the `itemSelector` as new.
    this.shuffle.resetItems();
  }

  componentWillUnmount() {
    // Dispose of shuffle when it will be removed from the DOM.
    this.shuffle.destroy();
    this.shuffle = null;
  }

  setFirstFilterFromQuery() {
    const projectCategorySlugIdPairs = createSlugIdPairs(this.props.categories);      
    const categoryIdToFilter = projectCategorySlugIdPairs[this.props.categoryFilterSlugFromQuery];
    if (categoryIdToFilter) {
      this.filterProjects(categoryIdToFilter);
      this.setState({
        oneTimeCategoryFilterIdFromQuery: categoryIdToFilter
      })
    }
  }

  handleFilterButtonClick(categoryId, tagId) {
    this.filterProjects(categoryId, tagId);
  }

  filterProjects(categoryId, tagId) {
    /*
      Important: Do not call this.setState() here.
      Calling this.setState() here would make the animation effect
      of this.shuffle.filter() not working.
    */

    if (categoryId === this.selectAllCategoryId) {
      this.shuffle.filter(Shuffle.ALL_ITEMS);
    } else {
      // https://vestride.github.io/Shuffle/#advanced-filters
      this.shuffle.filter((projectItem) => {
        const projItemCategoryIds = projectItem.getAttribute('data-project-category-ids').split(',').map((id) => { return parseInt(id); });
        return projItemCategoryIds.includes(categoryId);
      });
    }
  }

  setShuffleRef(element) {
    this.shuffleRef = element;
  }

  render() {
    return (
      <div>
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
                                     handleFilterClick={this.handleFilterButtonClick}
                                     categoryFilterSlug={this.props.categoryFilterSlug}
                                     oneTimeCategoryFilterIdFromQuery={this.state.oneTimeCategoryFilterIdFromQuery}
                                     history={this.props.history} />
                </div>
                <ProjectGrid projects={this.props.projects}
                             projectShuffleSelectorClass={this.projectShuffleSelectorClass}
                             setShuffleRefFunc={this.setShuffleRef}
                             projCategoryIdNamePairs={this.props.projCategoryIdNamePairs}
                             projTagIdNamePairs={this.props.projTagIdNamePairs} />
              </div>
              <div className="col-md-1" />
            </div>
          </div>
        </section>
        <Footer
          //Section: Footer
          footer={this.props.footerInfo} />
      </div>
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
      projectCategoryIdNamePairs: [], 
      projectTags: [],
      projectTagIdNamePairs: [],
      footer: null,      
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

    getProjectCategoriesAndItsIdNamePairs((projCategories, projCategoryIdNamePairs) => {
      this.setState({
        projectCategories: projCategories,
        projectCategoryIdNamePairs: projCategoryIdNamePairs
      });
    });

    getProjectTagsAndItsProjectTagIdNamePairs((projTags, projTagIdNamePairs) => {
      this.setState({
        projectTags: projTags,
        projectTagIdNamePairs: projTagIdNamePairs,
      });
    });

    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
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
    const state = this.state;
    const props = this.props;
    
    const pC = state.projectCategories;
    const projectCategoryIdNamePairs = state.projectCategoryIdNamePairs;
    const pT = state.projectTags;
    const projectTagIdNamePairs = state.projectTagIdNamePairs;
    const p = state.projects;
    const footer = state.footer;

    // not working if using p === []
    if (p.length === 0) {
      return null;
    }
    
    if (pC.length === 0) {
      return null;
    }

    if (projectCategoryIdNamePairs.length === 0) {
      return null;
    }

    if (pT.length === 0) {
      return null;
    }

    if (projectTagIdNamePairs.length === 0) {
      return null;
    }
    
    if (footer === null) {
      return null;
    }
    
    const parsedQuery = queryString.parse(this.props.history.location.search);
    const categoryFilterSlugFromQuery = parsedQuery.category || null;

    return (
      <ProjectListWithShuffle projects={p}
        categoryFilterSlugFromQuery={categoryFilterSlugFromQuery}
        categories={pC}
        projCategoryIdNamePairs={projectCategoryIdNamePairs}
        tags={pT}
        projTagIdNamePairs={projectTagIdNamePairs}
        footerInfo={footer}
        history={props.history} />
    );
  }
}

export default ProjectListPage;
