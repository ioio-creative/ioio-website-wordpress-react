import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './ProjectListPage.css';

import {fetchProjects, fetchProjectCategories, fetchProjectTags} from 'websiteApi.js';
import routes from 'globals/routes';
import {getProjectCategoryNameById, getProjectTagNameById} from 'utils/mapProjectCategoryAndTagNames';

// Passing Arguments to Event Handlers
// https://reactjs.org/docs/handling-events.html

/*
function CategoryButton(props) {
    return (
        <button
            className={props.isSelected ? "red-font" : "nothing"}
            onClick={(e) => {
                props.onClick(props.id, e);
            }}
        >
            {props.value}
        </button>
    );
}

function ProjectItem(props) {
    return (
        <div className="theItems">
            <Link to={routes.projectByIdWithValue(props.id)}>{props.name}</Link>
        </div>
    );
}
*/

function ProjectTags(props) {
  const tag_item = props.tags.map((tag, id) => {
    var tagId = ".filter-" + tag.id
    return (
      <li data-filter={tagId}>{tag.name}</li>
    );
  });
  return (<div className="col-lg-12 ">
    <ul id="portfolio-flters">
      <li data-filter="*" className="filter-active">All</li>
      {tag_item}
    </ul>
  </div>);
}

function AllProjects(props) {
  const tag_item = props.tags.map((tag, id) => {
    var tt = ".filter-" + tag.id
    return (<div>
      <li data-filter={tt}>{tag.name}</li>
    </div>);
  });


  const project_items = props.projectlist.map((project, id) => {
    let tagIds = "col-lg-4 col-md-6 portfolio-item wow fadeInUp ";
    for (let i = 0; i < project.project_tags.length; i++) {
      tagIds += "filter-" + project.project_tags[i] + " "
    }

    const tagsCorrespondingToProj = project.project_tags.map((tagId) => {
        return (
            <span>
                {getProjectTagNameById(tagId, props.tags)}
            </span>
        );
    });

    return (<div className={tagIds}>
      <a href={project._links.self}>
        <div className="portfolio-wrap">
          <figure>
              <img src={project.cover_image.guid} className="img-fluid" alt="alt"/>
          </figure>
          <div className="portfolio-info">
            <h4>
              <a href="#">{project.my_name}</a>
            </h4>
            <p>{tagsCorrespondingToProj}</p>
          </div>
        </div>
      </a>
    </div>);
  });

  return (<div className="row portfolio-container">
    {project_items}
  </div>);
}

// filter implementation reference
// https://reactjs.org/docs/thinking-in-react.html
class ProjectListPage extends Component {
  constructor(props) {
    super(props);
    this.selectAllCategoryId = -1;
    this.state = {
      projects: [],
      projectCategories: [],
      projectTags: [],
      selectedCategoryId: this.selectAllCategoryId
    }

    // https://reactjs.org/docs/handling-events.html
    // This binding is necessary to make `this` work in the callback
    this.handleCategoryButtonClick = this.handleCategoryButtonClick.bind(this);
  }

  componentDidMount() {
    fetchProjects((projects) => {
      this.setState({projects: projects});
    });
    fetchProjectCategories((categories) => {
      this.setState({projectCategories: categories});
    });
    fetchProjectTags((tags) => {
      this.setState({projectTags: tags});
    });
  }

  handleCategoryButtonClick(categoryId) {
    this.setState({selectedCategoryId: categoryId});
  }

  handleAdd() {}

  handleRemove() {}

  render() {
    /*
    let filteredProjectList;
    if (this.state.selectedCategoryId === this.selectAllCategoryId) {
      filteredProjectList = this.state.projects;
    } else {
      filteredProjectList = this.state.projects.filter((project) => project.project_categories.includes(this.state.selectedCategoryId));
    }
    const filteredProjects = filteredProjectList.map((filteredProject) => {
      return (<ProjectItem key={filteredProject.my_name} id={filteredProject.id} name={filteredProject.my_name}/>);
    });

    const allButton = (<CategoryButton key={this.selectAllCategoryId}
      // key is reserved for React
      id={this.selectAllCategoryId}
      // served as id
      value="All"
      // for display
      onClick={this.handleCategoryButtonClick} isSelected={this.selectAllCategoryId === this.state.selectedCategoryId}/>);

    const projectCategories = this.state.projectCategories.map((category) => {
      return (<CategoryButton key={category.id}
        // key is reserved for React
        id={category.id}
        // served as id
        value={category.is_capitalized
          ? category.name.toUpperCase()
          : category.name}
        // for display
        onClick={this.handleCategoryButtonClick} isSelected={category.id === this.state.selectedCategoryId}/>);
    });
*/
    const t = this.state.projectTags;
    const p = this.state.projects;

    return (<section id="portfolio" className="section-bg">
      <div className="container-fluid">
        <header className="section-header">
          <h3 className="section-title">Case Studies</h3>
        </header>
        <div className="row">
          <ProjectTags tags={t}/>
        </div>

        <AllProjects projectlist={p} tags={t}/>
      </div>
    </section>);
  }
}

export default ProjectListPage;
