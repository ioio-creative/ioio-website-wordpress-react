import React from 'react';
import {Link} from 'react-router-dom';

import routes from 'globals/routes';

import './ProjectItems.css';

export default function ProjectItems(props) {
  //console.log('ProjectItems: render');

  const projectCategoryIdNamePairs = props.categoryIdNamePairs;

  const project_items = props.items.map((project) => {
    let projItemClassName = 'col-lg-6 col-md-6 ' + props.shuffleSelectorClass + ' ';

    const categoriesCorrespondingToProj = project.project_categories.map((categoryId, index) => {
      let categoryName = projectCategoryIdNamePairs[categoryId];
      if (index >= 1) {
        categoryName = ' / ' + categoryName;
      }
      return (<span key={index}>
        {categoryName}
      </span>);
    });

    return (
      // data-category-ids is made use of in handleFilterButtonClick() of ProjectListWithShffle class
      <div key={project.id}
          className={projItemClassName}
          data-category-ids={project.project_categories.join(',')}>
        <Link to={routes.projectBySlugWithValue(project.slug)}>
          <div className="portfolio-wrap">
            <div className="img-container">
              <img src={project.thumbnail.guid} className="img-fluid" alt="alt"/>
            </div>
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