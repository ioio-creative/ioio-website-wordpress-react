import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CategoryListItem extends Component {
  render() {
    const props = this.props;    

    const selectedItemClass = 'filter-active';

    let itemClassName = '';
    if (props.isSelected) {
      itemClassName = selectedItemClass;
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
        itemLinkTo={props.allItemLinkTo}
        itemSlug={null}
        itemName={props.allItemName}
        itemProperty={allItemsAggregate} />
    );

    return (
      <div className="col-lg-12">
        <ul id="portfolio-flters">          
          {btnAllItems}
          {items}
        </ul>
      </div>
    );
  }
}

export default CategoryList;