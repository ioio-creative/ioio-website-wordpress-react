import React, { Component } from 'react';

import { fetchProjectById } from 'websiteApi'
import { getProjectIdBySlug } from 'utils/mapProjectSlugNameToIds';
import { Redirect } from 'react-router-dom'
import routes from 'globals/routes';

import ProjectTemp01 from 'containers/projectDetail/ProjectTemp01';
import ProjectTemp02 from 'containers/projectDetail/ProjectTemp02';
import ProjectTemp03 from 'containers/projectDetail/ProjectTemp03';

// Choosing the React Element Type at Runtime
// https://reactjs.org/docs/jsx-in-depth.html
const projectTemplateMap = {
    1: ProjectTemp01,
    2: ProjectTemp02,
    3: ProjectTemp03,
};


function VideoLanding(props) {
  return(
    <section id="video-landing" class="section-bg">
      <div class="video-landing-div">
        <div class="container-fluid ">
          <div id="block2" data-vide-bg="mp4: video/ocean, webm: video/ocean, ogv: http://vodkabears.github.io/vide/video/ocean, poster: video/ocean" data-vide-options="position: 0% 50%">
          </div>
          <div class="video-text wow fadeIn">
            <h1 class="container-fluid">Fashion Presentation & FFF Showreel</h1>
            <h2 class="container-fluid">Fashion Presentation</h2>
            <a href="#"><i class="ion ion-android-arrow-dropright-circle"></i> SHOWREEL</a>
          </div>
        </div>
      </div>
    </section>
  )
}

class ProjectDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: null,
            isReturnNotFound: false
        }
    }

    componentDidMount() {               
        const projectSlugFromQuery =
            this.props.match.params.projectSlug;
        const projectId = parseInt(getProjectIdBySlug(projectSlugFromQuery), 10);

        // if no corresponding project id entry for the slug got from query
        if (isNaN(projectId)) {
            this.setState({
                isReturnNotFound: true
            });
            return;
        }

        fetchProjectById(
            projectId,
            (aProject) => {
                if (aProject === null) {
                    this.setState({
                        isReturnNotFound: true
                    });
                } else {
                    this.setState({
                        project: aProject
                    });
                }
            }
        );
    }

    render() {
        const state = this.state;
        const project = state.project;

        // should check isReturnNotFound first
        // before checking project === null
        if (state.isReturnNotFound) {
            return (
                <Redirect to={routes.notFound} />
            );
        }

        if (project === null) {
            return null;                
        }

        console.log(state.isReturnNotFound);
        console.log(project);

        const projectTemplates = project.project_templates;
        const projectTemplateContainer =
            projectTemplates.map((templateData) => {
                const templateType =
                    parseInt(templateData.my_type, 10);
                const TemplateToUse = projectTemplateMap[templateData.my_type];
                return <TemplateToUse {...templateData} />
            });

        return (

            <div>
          <VideoLanding />
                <h2>Project Detail Page</h2>
                {project.my_name}
                {projectTemplateContainer}
            </div>
        );
    }
}


export default ProjectDetailPage;
