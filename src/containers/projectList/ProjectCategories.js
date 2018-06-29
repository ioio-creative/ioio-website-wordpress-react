import React, {Component} from 'react';
import CategoryList from 'components/CategoryList';

import routes from 'globals/routes';

class ProjectCategories extends Component {
  render() {  
    const props = this.props;    

    const projectsByCategoryLinkPathCreator = (category) => {
      return routes.projectsByCategory(category.slug);
    };

    const categoryPropertyToShowSelector = (category) => {
      return category.count;
    }

    const allCategoryProjectCountFunc = (categories) => {
      return categories.reduce((sum, currentCategory) => {
        return sum + currentCategory.count;
      }, 0);
    }

    return (
      <CategoryList
        items={props.categories}
        selectAllItemsOptionId={props.selectAllCategoryId}
        selectedItemClass={props.selectedItemClass}
        selectedItemId={props.categoryFilterId}
        itemLinkToCreator={projectsByCategoryLinkPathCreator}
        itemPropertyToShowSelector={categoryPropertyToShowSelector}
        allItemsAggregateFunc={allCategoryProjectCountFunc}
        allItemLinkTo={routes.projectsAll()}
        allItemName={props.allCategoryName}
        />
    );
  }
}

export default ProjectCategories;