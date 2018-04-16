import React, { Component } from 'react';

import { fetchProjectById } from 'websiteApi'

class ProjectDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: null,
        }
    }

    componentDidMount() {       
        // 10 here means decimal number system
        const idFromQuery = 
            parseInt(this.props.match.params.uniqId, 10);

        if (idFromQuery === NaN) {
            this.setState({
                project: null,
            });
            return;
        }
        
        fetchProjectById(
            idFromQuery,
            (aProject) => {
                this.setState({
                    project: aProject
                });
            }
        );
    }

    render() {
        const project = this.state.project;
        if (project === null) {
            return (
                <div>404 Project Not Found!</div>
            );
        }
        return (
            <div>
                <h2>Project Detail Page</h2>
                {project.my_name}
            </div>
        );
    }
}

export default ProjectDetailPage;
