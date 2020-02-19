import './ProjectList.scss';

import React, {useRef, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import routes from 'globals/routes';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';

import ReturnIcon from 'components/ReturnIcon';
import LazyProgressiveImage from 'components/LazyProgressiveImage';


function ProjectListReturnIcon(props) {
  const { scale } = props;
  return (
    <ReturnIcon
      color='#000'
      paddingRight='1.5vw'
      beforeWidth='2.43em'
      beforeHeight='1.5em'
      arrowSize='1em'
      scale={scale || 1}
    />
  );
}


function Project(props) {
  const {
    project,
    projectClassName,
    imgPlaceHolderAspectRatio,
    imgPlaceHolderAspectRatioForMobile
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
        {/* <img src={imgSrc} alt={name} /> */}
        <LazyProgressiveImage
          src={imgSrc}
          isRequirePaddingTopForPlaceHolder={true}
          placeHolderAspectRatio={imgPlaceHolderAspectRatio}
          placeHolderAspectRatioForMobile={imgPlaceHolderAspectRatioForMobile}
          isForceUsePlaceHolderAspectRatioAfterLoad={true}
          imgContainerClassName='special-img-hover'
        />
      </Link>
      <Link to={detailRoutePath}>
        <div className='project-name clearfix'>
          <span className='project-return-icon-container' ref={projectReturnIconContainerRef}>
            <ProjectListReturnIcon />
          </span>
          <p style={projectNameStyle}>{name}</p>
        </div>
      </Link>
      <div className='project-category' style={projectCategoryStyle}>{categoriesCorrespondingToProj}</div>      
    </div>
  );
}


function ProjectList(props) {
  const projectImgPlaceholderHorizontalAspectRatio = 4 / 3;
  const projectImgPlaceholderVerticalAspectRatio = 3 / 4;
  const projectImgPlaceholderSquareAspectRatio = 1;

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
          imgPlaceHolderAspectRatio={projectImgPlaceholderVerticalAspectRatio}
          imgPlaceHolderAspectRatioForMobile={projectImgPlaceholderSquareAspectRatio} 
        />
        <Project
          project={project2}
          projectClassName='project-2'
          imgPlaceHolderAspectRatio={projectImgPlaceholderSquareAspectRatio}
          imgPlaceHolderAspectRatioForMobile={projectImgPlaceholderSquareAspectRatio}
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
                <ProjectListReturnIcon
                  scale={0.65}
                />
              </span>
              <span className='interaction-hint-text'>{sectionInteractionHint}</span>
            </div>
          </Link>
        </div>
        <Project
          project={project3}
          projectClassName='project-3'
          imgPlaceHolderAspectRatio={projectImgPlaceholderVerticalAspectRatio}
          imgPlaceHolderAspectRatioForMobile={projectImgPlaceholderHorizontalAspectRatio}
        />
      </div>
      <div className='row-2'>
        <Project
          project={project4}
          projectClassName='project-4'
          imgPlaceHolderAspectRatio={projectImgPlaceholderVerticalAspectRatio}
          imgPlaceHolderAspectRatioForMobile={projectImgPlaceholderHorizontalAspectRatio}
        />
        <Project
          project={project5}
          projectClassName='project-5'
          imgPlaceHolderAspectRatio={projectImgPlaceholderSquareAspectRatio}
          imgPlaceHolderAspectRatioForMobile={projectImgPlaceholderHorizontalAspectRatio}
        />
      </div>
      <div className='row-1-right'>
        <Project
          project={project6}
          projectClassName='project-6'
          imgPlaceHolderAspectRatio={projectImgPlaceholderHorizontalAspectRatio}
          imgPlaceHolderAspectRatioForMobile={projectImgPlaceholderHorizontalAspectRatio}
        />
      </div>
    </div>
  );
}


export default ProjectList;