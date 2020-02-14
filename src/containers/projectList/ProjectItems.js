import './ProjectItems.scss';

import React from 'react';
import {Link} from 'react-router-dom';

import 'components/LazyProgressiveImage';

import routes from 'globals/routes';
import LazyProgressiveImage from 'components/LazyProgressiveImage';

export default function ProjectItems(props) {
  //console.log('ProjectItems: render');

  const projectCategoryIdNamePairs = props.categoryIdNamePairs;

  const project_items = props.items.map((project) => {
    let projItemClassName = 'col-lg-6 col-md-6 ' + props.shuffleSelectorClass + ' ';

    const categoriesCorrespondingToProj = project.project_categories.map((categoryId, idx) => {
      let categoryName = projectCategoryIdNamePairs[categoryId];
      if (idx !== 0) {
        categoryName = ' / ' + categoryName;
      }
      return (
        <span key={categoryId}>
          {categoryName}
        </span>
      );
    });

    return (
      // data-category-ids is made use of in handleFilterButtonClick() of ProjectListWithShffle class
      <div key={project.id}
        className={projItemClassName}
        data-category-ids={project.project_categories.join(',')}>
        <Link to={routes.projectBySlugWithValue(project.slug)}>
          <div className="portfolio-wrap">
            {/* <div className="img-container">              
              <img src={project.thumbnail.guid} className="img-fluid" alt={project.project_name} />
            </div> */}
            <LazyProgressiveImage
              imgContainerClassName='img-container special-img-hover'
              imgClassName='img-fluid'
              src={project.thumbnail.guid}
              isRequirePaddingTopForPlaceHolder={false}    
            />
            <div className="portfolio-info">
              <h4>
                {project.project_name}
              </h4>
              <p>{categoriesCorrespondingToProj}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div ref={props.setShuffleRefFunc} className="row portfolio-container wow fadeIn my-shuffle">
      {project_items}
    </div>
  );
};