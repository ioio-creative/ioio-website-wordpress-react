import './ProjectList.css';

import React from 'react';
import {Link} from 'react-router-dom';

import routes from 'globals/routes';

import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';


function Project(props) {
  const {
    project,
    projectClassName,
    projectCategoryIdNamePairs
  } = props;

  if (!project) {
    return null;
  }

  const {
    name, imgSrc, referredProject, detailRoutePath
  } = project;

  const categoriesCorrespondingToProj = referredProject.project_categories.map((category, idx) => {
      let categoryName = category.name;
      if (idx !== 0) {
        categoryName = ' / ' + categoryName;
      }
      return (
        <span key={categoryName}>
          {categoryName}
        </span>
      );
    }); 

  return (    
    <div className={`project ${projectClassName}`}>
      <Link to={detailRoutePath}>      
        <img src={imgSrc} alt={name} />
      </Link>
      <Link to={detailRoutePath}>
        <div className="project-name clearfix">
          <span className="return-icon" />
          <p dangerouslySetInnerHTML={{__html: name}}></p>
        </div>
      </Link>
      <div className="project-category">{categoriesCorrespondingToProj}</div>      
    </div>
  );
}


function ProjectList(props) {
  const { 
    projects,
    sectionDesc,    
  } = props;

  const project1 = isNonEmptyArray(projects) ? projects[0] : null;
  const project2 = isNonEmptyArray(projects) ? projects[1] : null;
  const project3 = isNonEmptyArray(projects) ? projects[2] : null;
  const project4 = isNonEmptyArray(projects) ? projects[3] : null;
  const project5 = isNonEmptyArray(projects) ? projects[4] : null;
  const project6 = isNonEmptyArray(projects) ? projects[5] : null;

  return (
    <div className='home-project-list'>
      <div className='row-2'>
        <Project
          project={project1}
          projectClassName='project-1'      
        />
        <Project
          project={project2}
          projectClassName='project-2'          
        />      
      </div>
      <div className='row-2'>
        <div className='section-desc'>
          {sectionDesc}
        </div>
        <Project
          project={project3}
          projectClassName='project-3'          
        />
      </div>
      <div className='row-2'>
        <Project
          project={project4}
          projectClassName='project-4'          
        />
        <Project
          project={project5}
          projectClassName='project-5'          
        />
      </div>
      <div className='row-1-right'>
        <Project
          project={project6}
          projectClassName='project-6'          
        />
      </div>
    </div>
  );
}


export default ProjectList;