import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const defaultSelectedItemClass = 'filter-active';

class CategoryListItem extends Component {
  render() {    
    const props = this.props;

    let itemClassName = '';
    if (props.isSelected) {
      itemClassName = props.selectedItemClass || defaultSelectedItemClass;
    }

    return (
      <li className={itemClassName}>
        <Link to={props.itemLinkTo}>
          {props.itemName}<span>{props.itemProperty}</span>
        </Link>
      </li>
    );
  }  
}

class CategoryList extends Component {
  render() {
    const props = this.props;    

    const items = props.items.map((item) => {      
      const isSelected = props.selectedItemId === item.id;
      return (
        <CategoryListItem key={item.id} 
          isSelected={isSelected}
          selectedItemClass={props.selectedItemClass}
          itemLinkTo={props.itemLinkToCreator(item)}
          itemSlug={item.slug}
          itemName={item.name}
          itemProperty={props.itemPropertyToShowSelector(item)} />
      );
    });

    const isAllItemSelected =
      !props.selectedItemId || props.selectedItemId === props.selectAllItemsOptionId;      
    const allItemsAggregate = props.allItemsAggregateFunc(props.items);
    const btnAllItems = (
      <CategoryListItem
        isSelected={isAllItemSelected}
        selectedItemClass={props.selectedItemClass}
        itemLinkTo={props.allItemLinkTo}
        itemSlug={null}
        itemName={props.allItemName}
        itemProperty={allItemsAggregate} />
    );

    return (
      <div className="row">
        <div className="col-lg-12">
          <ul id="portfolio-flters">          
            {btnAllItems}
            {items}
            <div className="scroll-icon" />
          </ul>
        </div>
      </div>
    );
  }
}

export default CategoryList;