import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectListPage.css';
//import './ProjectListPageProjectGrid.css';

import {fetchProjects, fetchProjectCategories, fetchProjectTags, fetchActiveFooter} from 'websiteApi.js';
import routes from 'globals/routes';
import {getAbsoluteUrlFromRelativeUrl, getAbsoluteUrlsFromRelativeUrls} from 'utils/setStaticResourcesPath';
import {getProjectCategoryNameById, getProjectTagNameById} from 'utils/mapProjectCategoryAndTagNames';

import Footer from 'containers/BrightFooter';

import Shuffle from 'shufflejs'


// class ProjectTag extends Component {
//   constructor(props) {
//     super(props);
//     this.portfolioIsotope = $('.portfolio-container').isotope({itemSelector: '.portfolio-item', layoutMode: 'fitRows'});
//     this.handleProjectCategoryClick = this.handleProjectCategoryClick.bind(this);
//   }

//   handleProjectCategoryClick(e) {
//     $("#portfolio-flters li").removeClass('filter-active');
//     $(this).addClass('filter-active');

//     this.portfolioIsotope.isotope({filter: $(this).data('filter')});
//   }

//   render() {
//     const tag_items = this.props.tags.map((tag, id) => {
//       let tagId = ".filter-" + tag.id
//       return (<li key={id} data-filter={tagId} onClick={this.handleProjectCategoryClick}>{tag.name}</li>);
//     });
//     return (<div className="col-lg-12 ">
//       <ul id="portfolio-flters">
//         <li data-filter="*" className="filter-active" onClick={this.handleProjectCategoryClick}>All</li>
//         {tag_items}
//       </ul>
//     </div>);
//   }
// }


function ProjectCategories(props) {
  const selectedItemClass = 'filter-active';

  const categoryItems = props.categories.map((category) => {
    let categoryItemClassName = '';
    if (category.id === props.selectedCategoryId) {
      categoryItemClassName += ' ' + selectedItemClass;
    }
    return (
      <li key={category.id}
          className={categoryItemClassName}
          onClick={() => props.handleFilterClick(category.id)}>
          {category.name}<span>{category.count}</span>
      </li>
    );
  });

  let allCategoryClassName = '';
  if (props.selectedCategoryId === props.selectAllCategoryId) {
    allCategoryClassName += ' ' + selectedItemClass;
  }

  return (
    <div className="col-lg-12 ">
      <ul id="portfolio-flters">
        <li className={allCategoryClassName}
            onClick={() => props.handleFilterClick(props.selectAllCategoryId)}>
            All
        </li>
        {categoryItems}
      </ul>
    </div>
  );
}


function ProjectGrid(props) {
  const project_items = props.projectList.map((project) => {
    let projItemClassName = 'col-lg-6 col-md-6 ' + props.shuffleSelectorClass + ' ';

    const categoryCorrespondingToProj = project.project_categories.map((categoryId, index) => {
      let categoryName = '';
      if (index >= 1) {
        categoryName = ' / ' + getProjectCategoryNameById(categoryId)
      } else {
        categoryName = getProjectCategoryNameById(categoryId)
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
    // this ref must be direct parent of {project_items} for shuffle to work
    <div className="row portfolio-container wow fadeIn my-shuffle"
         ref={props.setShuffleRefFunc}>
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

    // https://reactjs.org/docs/handling-events.html
    // This binding is necessary to make `this` work in the callback
    this.handleFilterButtonClick = this.handleFilterButtonClick.bind(this);
    this.setShuffleRef = this.setShuffleRef.bind(this);

    this.state = {
      selectedCategoryId: this.selectAllCategoryId
    }
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
  }

  componentDidUpdate() {
    // Notify shuffle to dump the elements it's currently holding and consider
    // all elements matching the `itemSelector` as new.
    if (this.shuffle) {
      this.shuffle.resetItems();
    }
  }

  componentWillUnmount() {
    // Dispose of shuffle when it will be removed from the DOM.
    if (this.shuffle) {
      this.shuffle.destroy();
    }
    this.shuffle = null;
  }

  handleFilterButtonClick(categoryId, tagId) {
    this.setState({selectedCategoryId: categoryId});

    if (categoryId === this.selectAllCategoryId) {
      this.shuffle.filter(Shuffle.ALL_ITEMS);
    } else {
      // https://vestride.github.io/Shuffle/#advanced-filters
      this.shuffle.filter((projectItem) => {
        const projItemCategoryIds = projectItem.getAttribute('data-category-ids').split(',').map((id) => { return parseInt(id); });
        return projItemCategoryIds.includes(categoryId);
      });
    }
  }

  setShuffleRef(element) {
    this.shuffleRef = element;
  }

  render() {
    const props = this.props;
    const state = this.state;

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
                  <ProjectCategories categories={props.categories}
                    selectAllCategoryId={this.selectAllCategoryId}
                    selectedCategoryId={state.selectedCategoryId}
                    handleFilterClick={this.handleFilterButtonClick} />
                </div>
                <ProjectGrid projectList={props.projects}
                             categories={props.categories}
                             shuffleSelectorClass={this.projectShuffleSelectorClass}
                             setShuffleRefFunc={this.setShuffleRef} />
              </div>
              <div className="col-md-1" />
            </div>
          </div>
        </section>
        <Footer
          //Section: Footer
          footer={props.footerInfo} />
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
      projectTags: [],
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

    fetchProjectCategories((categories) => {
      this.setState({projectCategories: categories});
    });

    fetchProjectTags((tags) => {
      this.setState({projectTags: tags});
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
    const t = this.state.projectTags;
    const pC = this.state.projectCategories;
    const p = this.state.projects;
    const footer = this.state.footer;

    // not working if using p === []
    if (p.length === 0) {
      return null;
    }

    // not working if using pC === []
    if (pC.length === 0) {
      return null;
    }

    if (footer === null) {
      return null;
    }

    return (
      <ProjectListWithShuffle projects={p}
        categories={pC}
        tags={t}
        footerInfo={footer} />
    );
  }
}

export default ProjectListPage;
