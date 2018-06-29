import React, {Component} from 'react';
import asyncLoadingComponent from 'components/loading/AsyncLoadingComponent';

import {createIdNamePairs, createSlugIdPairs, createIdSlugPairs} from 'utils/generalMapper';
import isFunction from 'utils/types/isFunction';

import ProjectCategories from 'containers/projectList/ProjectCategories';
import ProjectGrid from 'containers/projectList/ProjectGrid';
import LabCategories from 'containers/labList/LabCategories';
import LabGrid from 'containers/labList/LabGrid';

// What is the preferred syntax for defining enums in JavaScript?
// https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript
const CategoriesAndItemsWithShuffleMode = Object.freeze({
  Projects: 1,
  Lab: 2
});

// How do I create a dynamic key to be added to a JavaScript object variable
// https://stackoverflow.com/questions/2462800/how-do-i-create-a-dynamic-key-to-be-added-to-a-javascript-object-variable
const CategoriesAndItemsWithShuffleModeComponentsDict = {
  [CategoriesAndItemsWithShuffleMode.Projects]: {
    // asyncCategoriesComponent: asyncLoadingComponent(() => import('containers/projectList/ProjectCategories')),
    // asyncItemsComponent: asyncLoadingComponent(() => import('containers/projectList/ProjectGrid')),
    categoriesComponent: ProjectCategories,
    itemsComponent: ProjectGrid
  },
  [CategoriesAndItemsWithShuffleMode.Lab]: {
    // asyncCategoriesComponent: asyncLoadingComponent(() => import('containers/labList/LabCategories')),
    // asyncItemsComponent: asyncLoadingComponent(() => import('containers/labList/LabGrid')),
    categoriesComponent: LabCategories,
    itemsComponent: LabGrid
  }
};

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

    const categoriesAndItemsComponents = CategoriesAndItemsWithShuffleModeComponentsDict[props.mode];    
    // const Categories = categoriesAndItemsComponents.asyncCategoriesComponent;
    // const Items = categoriesAndItemsComponents.asyncItemsComponent;
    const Categories = categoriesAndItemsComponents.categoriesComponent;
    const Items = categoriesAndItemsComponents.itemsComponent;

    return (
      <section id="portfolio" className="section-bg wow fadeIn">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <header className="section-header">
                <h3 className="section-title">Case Studies</h3>
              </header>              
              {/* <Tags tags={t}/> */}
              <Categories categories={props.categories}
                selectAllCategoryId={this.selectAllCategoryId}
                selectedItemClass={this.selectedCategoryClass}
                categoryFilterId={categoryIdToFilter}
                allCategoryName='All' />              
              <Items items={props.items}
                shuffleSelectorClass={props.shuffleSelectorClass}
                setShuffleRefFunc={props.setShuffleRefFunc}
                categoryIdNamePairs={this.getCategoryIdNamePairs()} />
            </div>
            <div className="col-md-1" />
          </div>
        </div>
      </section>        
    );
  }
}

export default CategoriesAndItemsWithShuffle;
export const CategoriesAndItemsMode = CategoriesAndItemsWithShuffleMode;