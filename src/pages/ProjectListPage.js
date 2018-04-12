import React, { Component } from 'react';

import { fetchProjects, fetchProjectCategories, fetchProjectTags } from 'websiteApi.js';

function CategoryButton(props) {
    return (
        <button width="200px" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class ProjectListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            projectCategories: [],
            projectTags: [],
        }
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

    handleCategoryButtonClick() {

    }

    renderCategoryButton(categoryName) {
        return (
            <CategoryButton
                value={categoryName}
                onClick={() => this.handleCategoryButtonClick()}
            />
        );
    }

    render() {
        const projects = this.state.projects.map((project) => {
            return (
                <div>
                    {project.my_name}
                </div>
            );
        });
        const projectCategories = this.state.projects.map((category) => {
            return (
                <div>
                    {this.renderCategoryButton(category.name)}
                </div>
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
