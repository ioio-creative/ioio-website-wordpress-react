import React, {Component} from 'react';
import CategoryList from 'components/CategoryList';

import routes from 'globals/routes';

class LabCategories extends Component {
  render() {
    const props = this.props;

    const labItemLinkPathCreator = (lab) => {
      return routes.labByCategory(lab.slug);
    };

    const labItemPropertyToShowSelector = (lab) => {
      return lab.count;
    }

    const allCategoryLabItemCountFunc = (categories) => {
      return categories.reduce((sum, currentCategory) => {
        return sum + currentCategory.count;
      }, 0);
    }

    return (
      <CategoryList
        items={props.categories}
        selectAllItemsOptionId={props.selectAllCategoryId}
        selectedItemId={props.categoryFilterId}
        itemLinkToCreator={labItemLinkPathCreator}
        itemPropertyToShowSelector={labItemPropertyToShowSelector}
        allItemsAggregateFunc={allCategoryLabItemCountFunc}
        allItemLinkTo={routes.labAll}
        allItemName={props.allCategoryName}
        />
    );
  }
}

export default LabCategories;
