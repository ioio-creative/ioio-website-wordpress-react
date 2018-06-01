import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectListPage.css';
import './ProjectListPageProjectGrid.css';

import {fetchProjects, fetchProjectCategories, fetchProjectTags, fetchActiveFooter} from 'websiteApi.js';
import routes from 'globals/routes';
import {getAbsoluteUrlFromRelativeUrl, getAbsoluteUrlsFromRelativeUrls} from 'utils/setStaticResourcesPath';
import {getProjectCategoryNameById, getProjectTagNameById} from 'utils/mapProjectCategoryAndTagNames';

import Footer from 'containers/Footer';

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
    // return (
    //   <div key={project.id} className="col-3@xs col-4@sm photo-item"
    //     data-groups={'["' + project.project_categories.join(',') + '"]'}>
    //     <div className="aspect aspect--4x3">
    //       <div className="aspect__inner">
    //         <img src={project.thumbnail.guid} />            
    //       </div>
    //     </div>
    //   </div>
    // );    

    let projItemClassName = 'col-lg-6 col-md-6 ' + props.shuffleSelectorClass + ' ';

    // const tagsCorrespondingToProj = project.project_tags.map((tagId, index) => {
    //   let tagName = '';
    //   if (index >= 1) {
    //     tagName = ' / ' + getProjectTagNameById(tagId)
    //   } else {
    //     tagName = getProjectTagNameById(tagId)
    //   }
    //   return (<span key={index}>
    //     {tagName}
    //   </span>);
    // });

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

    let s = project.link;
    cutString(s);
    function cutString(s) {
      let cut = s.indexOf('/projects');
      if (cut === -1)
        return s;
      return s.substr(cut)
    }
    let d = cutString(s);

    return (
      // data-project-category-ids is made use of in handleFilterButtonClick() of ProjectListWithShffle class
      <div key={project.id}
           className={projItemClassName}           
           data-project-category-ids={project.project_categories.join(',')}>
        <Link to={routes.projectBySlugWithValue(project.slug)}>{props.name}
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

    this.state = {
      photos: [
        { id: 1, src: '' },
        { id: 2, src: '' },
        { id: 3, src: '' },
      ],
      filterTxt: null,
    };

    this.handleFilterTxtChange = this.handleFilterTxtChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    // The elements are in the DOM, initialize a shuffle instance.
    this.shuffle = new Shuffle(this.element, {
      itemSelector: '.photo-item',
      
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
    this.shuffle.resetItems();
  }

  componentWillUnmount() {
    // Dispose of shuffle when it will be removed from the DOM.
    this.shuffle.destroy();
    this.shuffle = null;
  }

  /* event handlers */

  handleFilterTxtChange(event) {
    this.setState({filterTxt: event.target.value});
  }

  handleFilter(event) {
    //alert('A name was submitted: ' + this.state.filterTxt);
    if (this.state.filterTxt) {
      this.shuffle.filter(this.state.filterTxt);
    } else {
      this.shuffle.filter(Shuffle.ALL_ITEMS); // or .filter()
    }
    event.preventDefault();
  }

  /* end of event handlers */

  render() {
    return (
      <div>
        <div>
          References:<br />
          Shuffle with React: https://vestride.github.io/Shuffle/shuffle-with-react<br />
          Shuffle Filters: https://vestride.github.io/Shuffle/<br />
          The only real important thing here is the data-groups attribute.<br />
          Please enter one of the following authors in the textbox.<br />
          Sticker Mule<br />
          Roman Logov<br />
          Richard Nolan<br />
          Wexor Tmg<br />
          Denys Nevozhai<br />
          Aron Van de Pol<br />    
        </div>
        <form onSubmit={this.handleFilter}>
          <label>
            Search:
            <input type="text" value={this.state.filterTxt} onChange={this.handleFilterTxtChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div ref={element => this.element = element} className="row my-shuffle">
          {this.props.projects.map((project) => (
            <div key={project.id} className="col-3@xs col-4@sm photo-item"
              data-groups={'["' + project.slug + '"]'}>
              <div className="aspect aspect--4x3">
                <div className="aspect__inner">
                  <img src={project.thumbnail.guid} />
                </div>
              </div>
            </div>
          ))}          
        </div>
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