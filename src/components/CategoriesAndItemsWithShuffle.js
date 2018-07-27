import React, {Component} from 'react';

import {createIdNamePairs, createNameIdPairs, createSlugIdPairs, createIdSlugPairs} from 'utils/generalMapper';

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
    this.categoryNameIdPairs = [];
    this.categoryIdSlugPairs = [];
    this.categorySlugIdPairs = [];

    // used together with WithShuffle
    this.props.setWithShuffleParamsFunc(props.shuffleSelectorClass,
      this.filterItemsByQueryFromUrl, this.filterItemsByQueryFromUrl);
  }

  getCategoryIdNamePairs() {
    if (this.categoryIdNamePairs.length === 0) {
      this.categoryIdNamePairs = createIdNamePairs(this.props.categories);
    }
    return this.categoryIdNamePairs;
  }

  getCategoryNameIdPairs() {
    if (this.categoryNameIdPairs.length === 0) {
      this.categoryNameIdPairs = createNameIdPairs(this.props.categories);
    }
    return this.categoryNameIdPairs;
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

  filterItemsByQueryFromUrl(shuffle) {
    //console.log("filter starts");    

    // cater for filter ALL case
    const categoryIdToFilter =
      this.getCategorySlugIdPairs()[this.props.categoryFilterSlugFromQuery]
      || this.selectAllCategoryId;
    this.filterItems(shuffle, categoryIdToFilter);

    //console.log("filter ends");
  }

  filterItems(shuffle, categoryId, tagId) {    
    /*
      Important: Do not call this.setState() here.
      Calling this.setState() here would make the animation effect
      of this.shuffle.filter() not working.
    */            
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
        categoryIdNamePairs={this.getCategoryIdNamePairs()}
        categoryNameIdPairs={this.getCategoryNameIdPairs()}

        /* items custom use */
        itemsExtra={props.itemsExtra} />
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
