import React, {Component} from 'react';

import {createIdNamePairs, createSlugIdPairs, createIdSlugPairs} from 'utils/generalMapper';
import isFunction from 'utils/types/isFunction';

class CategoriesAndItemsWithShuffle extends Component {
  constructor(props) {
    super(props);

    this.selectAllCategoryId = -1;
    this.selectedCategoryClass = 'filter-active';

    this.filterItemsByQueryFromUrl = this.filterItemsByQueryFromUrl.bind(this);
    this.filterItems = this.filterItems.bind(this);

    this.getCategoryIdNamePairs = this.getCategoryIdNamePairs.bind(this);
    this.getCategoryIdSlugPairs = this.getCategoryIdSlugPairs.bind(this);
    this.getCategorySlugIdPairs = this.getCategorySlugIdPairs.bind(this);

    this.categoryIdNamePairs = [];
    this.categoryIdSlugPairs = [];
    this.categorySlugIdPairs = [];

    // used together with WithShuffle  
    if (isFunction(props.setWithShuffleParamsFunc)) {
      this.props.setWithShuffleParamsFunc(props.shuffleSelectorClass,
        this.filterItemsByQueryFromUrl, this.filterItemsByQueryFromUrl);
    }
  }

  getCategoryIdNamePairs() {
    if (this.categoryIdNamePairs.length === 0) {
      this.categoryIdNamePairs = createIdNamePairs(this.props.categories);
    }
    return this.categoryIdNamePairs;
  }

  getCategoryIdSlugPairs() {
    if (this.categoryIdSlugPairs.length === 0) {
      this.categoryIdSlugPairs = createIdSlugPairs(this.props.categories);
    }
    return this.categoryIdSlugPairs;
  }

  getCategorySlugIdPairs() {
    if (this.categorySlugIdPairs.length === 0) {
      this.categorySlugIdPairs = createSlugIdPairs(this.props.categories);
    }
    return this.categorySlugIdPairs;
  }

  filterItemsByQueryFromUrl() {
    // cater for filter ALL case
    const categoryIdToFilter =
      this.getCategorySlugIdPairs()[this.props.categoryFilterSlugFromQuery]
      || this.selectAllCategoryId;
    this.filterItems(categoryIdToFilter);
  }

  filterItems(categoryId, tagId) {
    /*
      Important: Do not call this.setState() here.
      Calling this.setState() here would make the animation effect
      of this.shuffle.filter() not working.
    */

    const shuffle = this.props.shuffle;

    if (shuffle !== null) {
      if (categoryId === this.selectAllCategoryId) {
        shuffle.filter();
      } else {
        // https://vestride.github.io/Shuffle/#advanced-filters
        shuffle.filter((item) => {
          const itemCategoryIds = item.getAttribute('data-category-ids').split(',').map((id) => {
            return parseInt(id, 10);
          });
          return itemCategoryIds.includes(categoryId);
        });
      }
    }
  }

  render() {
    const props = this.props;

    const categoryIdToFilter = this.getCategorySlugIdPairs()[props.categoryFilterSlugFromQuery];

    const CategoriesAndItemsContainerComponent = props.categoriesAndItemsComponent;
    const CategoriesComponent = props.categoriesComponent;
    const ItemsComponent = props.itemsComponent;

    const categories = (
      <CategoriesComponent categories={props.categories}
        selectAllCategoryId={this.selectAllCategoryId}
        allCategoryName={props.allCategoryName}
        selectedItemClass={this.selectedCategoryClass}
        categoryFilterId={categoryIdToFilter} />
    );

    const items = (
      <ItemsComponent items={props.items}
        shuffleSelectorClass={props.shuffleSelectorClass}
        setShuffleRefFunc={props.setShuffleRefFunc}
        categoryIdNamePairs={this.getCategoryIdNamePairs()} />
    );

    return (
      <CategoriesAndItemsContainerComponent
        categories={categories}
        items={items}
      > 
        {/* <Tags tags={t}/> */}
      </CategoriesAndItemsContainerComponent>
    );
  }
}

export default CategoriesAndItemsWithShuffle;
