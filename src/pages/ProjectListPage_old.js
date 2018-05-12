import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './ProjectListPage.css';

import { fetchProjects, fetchProjectCategories, fetchProjectTags } from 'websiteApi.js';
import routes from 'globals/routes';

// Passing Arguments to Event Handlers
// https://reactjs.org/docs/handling-events.html
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
            selectedCategoryId: this.selectAllCategoryId,
        }

        // https://reactjs.org/docs/handling-events.html
        // This binding is necessary to make `this` work in the callback
        this.handleCategoryButtonClick = this.handleCategoryButtonClick.bind(this);
    }

    componentDidMount() {
        fetchProjects((projects) => {
            this.setState({
                projects: projects
            });
        });
        fetchProjectCategories((categories) => {
            this.setState({
                projectCategories: categories
            });
        });
        fetchProjectTags((tags) => {
            this.setState({
                projectTags: tags
            });
        });
    }

    handleCategoryButtonClick(categoryId) {
        this.setState({
            selectedCategoryId: categoryId
        });
    }

    render() {
        let filteredProjectList;
        if (this.state.selectedCategoryId === this.selectAllCategoryId) {
            filteredProjectList = this.state.projects;
        } else {
            filteredProjectList = this.state.projects
                .filter((project) => project.project_categories.includes(this.state.selectedCategoryId));
        }
        const filteredProjects = filteredProjectList
            .map((filteredProject) => {
                return (
                    <ProjectItem key={filteredProject.my_name}
                        id={filteredProject.id}
                        name={filteredProject.my_name}
                    />
                );
            });

        const allButton = (
            <CategoryButton key={this.selectAllCategoryId}  // key is reserved for React
                id={this.selectAllCategoryId}  // served as id
                value="All"  // for display
                onClick={this.handleCategoryButtonClick}
                isSelected={this.selectAllCategoryId === this.state.selectedCategoryId}
            />
        );

        const projectCategories = this.state.projectCategories.map((category) => {
            return (
                <CategoryButton key={category.id}  // key is reserved for React
                    id={category.id}  // served as id
                    value={category.is_capitalized ? category.name.toUpperCase() : category.name}  // for display
                    onClick={this.handleCategoryButtonClick}
                    isSelected={category.id === this.state.selectedCategoryId}
                />
            );
        });

        const projectTags = this.state.projectTags;

        return (
            <div>
                <h2>Project List Page</h2>
                {allButton}
                {projectCategories}
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={5000}
                    transitionEnterTimeout={5000}
                    transitionLeaveTimeout={5000}>
                    {filteredProjects}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default ProjectListPage;
