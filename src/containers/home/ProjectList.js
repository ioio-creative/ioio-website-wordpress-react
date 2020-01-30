import './ProjectList.scss';

import React, {useRef, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import routes from 'globals/routes';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';

import ReturnIcon from 'components/ReturnIcon';


function ProjectListReturnIcon(props) {
  return (
    <ReturnIcon
      color='#000'
      beforeWidth='2.43vw'
      beforeHeight='1.5vw'
      arrowSize='1vw'
    />
  );
}


function Project(props) {
  const {
    project,
    projectClassName
  } = props;

  const projectReturnIconContainerRef = useRef(null);

  const [projectReturnIconContainerWidth, setProjectReturnIconContainerWidth] = useState(56);

  useEffect(_ => {
    function handleWindowResize() {
      const returnIconContainerRefWidth = projectReturnIconContainerRef.current.getBoundingClientRect().width;
      setProjectReturnIconContainerWidth(returnIconContainerRefWidth);
    }

    if (project) {
      handleWindowResize();

      window.addEventListener('resize', handleWindowResize);
    }

    return _ => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [project]);

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

  const projectCategoryStyle = {
    paddingLeft: projectReturnIconContainerWidth
  };

  const projectNameStyle = {
    width: `calc(100% - ${projectReturnIconContainerWidth + 1}px)`
  };

  return (    
    <div className={`project ${projectClassName}`}>
      <Link to={detailRoutePath}>      
        <img src={imgSrc} alt={name} />
      </Link>
      <Link to={detailRoutePath}>
        <div className="project-name clearfix">
          <span className='project-return-icon-container' ref={projectReturnIconContainerRef}>
            <ProjectListReturnIcon />
          </span>
          <p
            style={projectNameStyle} 
            dangerouslySetInnerHTML={{__html: name}}
          />
        </div>
      </Link>
      <div className="project-category" style={projectCategoryStyle}>{categoriesCorrespondingToProj}</div>      
    </div>
  );
}


function ProjectList(props) {
  const { 
    projects,
    sectionDesc,
    sectionInteractionHint,  
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
        <div className='section-text-container'>
          <div className='section-desc'>
            {sectionDesc}
          </div>
          <Link to={routes.about(true)}>
            <div className="section-interaction-hint">
              <span className='interaction-hint-return-icon-container'>
                <ProjectListReturnIcon />
              </span>
              <span>{sectionInteractionHint}</span>
            </div>
          </Link>
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