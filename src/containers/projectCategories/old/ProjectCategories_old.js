import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import routes from 'globals/routes';

class ProjectCategoryButton extends Component {
  render() {
    /* Note: ProjectCategoryButton's props structure is designed such that the 'ALL' button can fit in. */

    const props = this.props;    

    const selectedItemClass = 'filter-active';

    let projectsByCategoryRoute = routes.projectsAll();
    if (props.categorySlug) {
      projectsByCategoryRoute = routes.projectsByCategory(props.categorySlug);
    }  

    let categoryBtnClassName = '';
    if (props.isSelected) {
      categoryBtnClassName = selectedItemClass;
    }

    return (
      <li className={categoryBtnClassName}>
        <Link to={projectsByCategoryRoute}>
          {props.categoryName}<span>{props.categoryCount}</span>
        </Link>
      </li>
    );
  }  
}

class ProjectCategories extends Component {
  render() {  
    const props = this.props;    

    const categoryItems = props.categories.map((category) => {      
      const isSelected = props.categoryFilterId === category.id;
      return (
        <ProjectCategoryButton key={category.id} 
          isSelected={isSelected}    
          categorySlug={category.slug}
          categoryName={category.name}
          categoryCount={category.count} />
      );
    });

    // if categoryFilterId is undefined, i.e. user enters random category slug
    const isAllCategorySelected =
      !props.categoryFilterId || props.categoryFilterId === props.selectAllCategoryId;      

    const allCategoryProjectCount = props.categories.reduce((sum, currentCategory) => {
      return sum + currentCategory.count;
    }, 0);

    return (
      <div className="col-lg-12">
        <ul id="portfolio-flters">          
          <ProjectCategoryButton
            isSelected={isAllCategorySelected}
            categorySlug={null}
            categoryName={props.allCategoryName}
            categoryCount={allCategoryProjectCount} />
          {categoryItems}
        </ul>
      </div>
    );
  }
}

export default ProjectCategories;