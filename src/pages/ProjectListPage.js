import React, { Component } from 'react';

import { fetchProjects, fetchProjectCategories, fetchProjectTags } from 'websiteApi.js';

// Passing Arguments to Event Handlers
// https://reactjs.org/docs/handling-events.html
function CategoryButton(props) {
    return (        
        <button onClick={(e) => props.onClick(props.id, e)}>
            {props.value}
        </button>
    );
}

function ProjectItem(props) {
    return (
        <div>
            {props.projectName}
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
        const projects;
        if (this.state.selectedCategoryId === -1) {
            projects = this.state.projects;
        } else {        
            projects = this.state.projects
                .filter((project) => project.categories.includes(selectedCategoryId))
                .map((filteredProject) => {
                    return (
                        <ProjectItem key={filteredProject.my_name}
                            projectName={filteredProject.my_name}
                        />
                    );        
            });
        }

        const projectCategories = this.state.projectCategories.map((category) => {        
            return (
                <CategoryButton key={category.name}  // key is reserved for React
                    id={category.id}  // served as id
                    value={category.is_capitalized ? category.name.toUpperCase() : category.name}  // for display
                    onClick={this.handleCategoryButtonClick}    
                />
            );
        });

        const projectTags = this.state.projectTags;
        
        return (
            <div>
                <h2>Project List Page</h2>
                {projectCategories}
                {projects}
            </div>
        );
    }
}

export default ProjectListPage;
