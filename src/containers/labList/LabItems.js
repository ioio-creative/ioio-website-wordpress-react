import React, {Component} from 'react';

import classNames from 'classnames';
import {SizeMe} from 'react-sizeme';
import $ from 'jquery';

import getStylesByTemplateType from './LabItemsStyles';
import './LabItems.css';

function tick(title, txt, cat, pos, topPos) {
  let thisTarget = '.hover-left';
  switch (pos) {
    case 2:
      thisTarget = '.hover-middle';
      break;
    case 3:
      thisTarget = '.hover-right';
      break;
  }

  let item_hover_description = txt;

  const element = "<div class='lab-item-detail'><h3 class='lab-item-cat'>" 
    + cat 
    + "</h3><h2 class='lab-item-title'>"
    + title 
    + "</h2><p class='lab-item-desc'>"
    + item_hover_description + "</p></div>";
  $('.hover-middle').html('');
  $('.hover-left').html('');
  $('.hover-right').html('');

  let topPosition = topPos;

  //  console.log(topPos-$(window).scrollTop());
  if (topPos-$(window).scrollTop() > 0){
    topPosition = topPos-$(window).scrollTop();
  } else {
    topPosition = '10%';
  }
  $(thisTarget).html(element).css('top', topPosition);
}

export default class LabItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: null,
      hover: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(e, w, template, title, txt, cat) {
    const thisTarget = e.target;
    $(".lab-item").addClass('fade');
    $('#lab-list').addClass('active');

    $(thisTarget).closest('.lab-item').addClass('active');
    $(thisTarget).closest('.img-container').addClass('active');
    $('#hover-cover').addClass('active');

    $(".lab-item.active").removeClass('fade');

    //const el = $('#hover-cover');
    const offsets = $(thisTarget).closest('.lab-item').offset();

    //console.log("offsets left" + (  offsets.left) + " lab-list-frame left" + (  $("#lab-list-frame").offset().left));

    if (offsets.left + (w * 1.1) > $('#lab-list-frame').width()) {
      //console.log("l1")
      if (template === 5){
        tick(title,txt,cat, 1, offsets.top)
      } else {
        tick(title,txt,cat, 2, offsets.top)
      }

    } else {
      if (offsets.left + (w / 2) > $('#lab-list-frame').width() / 3 && offsets.left + (w / 2) < $('#lab-list-frame').width() * 2 / 3) {
        //console.log("l3 ")
        tick(title,txt,cat, 3, offsets.top)
      } else {
        tick(title,txt,cat, 2, offsets.top)
        //console.log("l2 ")
      }
    }
  }

  handleMouseOut(e,template) {
    let thisTarget = e.target;

    $(".lab-item").removeClass('fade');
    $('#lab-list').removeClass('active');
    $(thisTarget).closest('.lab-item').removeClass('active');
    $(thisTarget).closest('.img-container').removeClass('active');
    $('#hover-cover').removeClass('active');
  }

  handleMeasureResize(contentRect) {
    this.setState({dimensions: contentRect.bounds});
  }

  render() {
    const props = this.props;
    const mediumLogo = props.mediumLogo;

    const items = props.items.map((item, idx) => {
      let itemClassNames = classNames("template-type-" + item.template_type)
      let sz;
      /*
        1.Image/GIF
        2.video
        3.Portrait Image/GIF
        4.Instagram
        5.Research 0
        6. medium post
        7. Sharing
      */

      let gridSize = 3;

      if (item.template_type == 5) {
        gridSize = 8;
      } else {
        gridSize = 4;
      }

      let gridSizeClassName = "col-md-" + gridSize;      
      
      return (
        <div key={item.id}
          className={gridSizeClassName + " lab-item " + itemClassNames + ' ' + props.shuffleSelectorClass}
          key={item.id}
          data-category-ids={item.lab_categories.join(',')}>
          <SizeMe
            monitorHeight monitorWidth
            refreshRate={32}
            render={({ size }) => {
              sz = size;
              return(<div></div>);
            }}
          />

          <SizeMe monitorHeight
            refreshRate={32}
            render={({size}) => {  
              const containerWidth = sz ? sz.width : 0;
              const templateType = item.template_type;

              const labItemStyles = getStylesByTemplateType(templateType, sz);

              return (
                <div className="sub-lab-item wow fadeInUp"
                  data-wow-delay={Math.random() * (1 - 0.1) + idx * 0.05 + 's'}
                  style={labItemStyles.itemStyle}
                  onMouseOver={(e) => {
                    this.handleMouseOver(e, containerWidth, templateType , item.lab_item_title, item.hover_description, item.lab_categories[0].name);
                  }}
                  onMouseOut={(e) => {
                    this.handleMouseOut(e, templateType);
                  }}>
                  <a className="lab-item-click"
                    href={item.link != '' ? item.link : 'javascript:;'}
                    target="_blank"
                    onClick={this.handleMenuClose}
                    style={item.link != '' ? {cursor:'pointer'} : {cursor:'none'}}>
                    <span style={labItemStyles.categoryColor}>{item.lab_categories[0].name}</span>
                    <h1 className={labItemStyles.classNameDesc} style={labItemStyles.textDescStyle}>{item.description}</h1>
                    <h3 className={labItemStyles.classNameTitle} style={labItemStyles.textTitleStyle}>{item.lab_item_title}</h3>
                    <div className={labItemStyles.classSharingPresenter} style={labItemStyles.sharingPresenterStyle}><div style={templateType == 7 ? {borderRadius: '50%'} : {borderRadius: '0%'}} className="presenter-img-container"><img className="lab-item-icon" src={templateType == 6 ? mediumLogo : item.sharing_presenter_icon.guid} alt="" /></div><span>{item.sharing_presenter_name}</span><h5>{templateType == 6 ? 'Medium Post' : item.sharing_presenter_title}</h5><i className="medium-arrow ion ion-android-arrow-forward" style={templateType == 6 ? {display:'block'} : {display:'none'}}></i></div>
                    <div className="img-container" style={labItemStyles.containerStyle}>
                      <img className={labItemStyles.classNameImg} src={item.image.guid} alt="" style={labItemStyles.imgStyle}/>
                    </div>
                  </a>
                </div>
              );
            }}
          />
        </div>
      );
    });

    return (
      <div ref={props.setShuffleRefFunc} className="row">
        {items}
      </div>
    );
  } 
}
