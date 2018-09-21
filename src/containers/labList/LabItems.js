import React, {Component} from 'react';

import {SizeMe} from 'react-sizeme';
import classNames from 'classnames';

import $ from 'jquery';


function tick(title, txt, cat, pos, topPos) {
  let thisTarget;
  if (pos == 2) {
    thisTarget = '.hover-middle';
  } else if (pos == 3) {
    thisTarget = '.hover-right';
  } else {
    thisTarget = '.hover-left'
  }

  let item_hover_description = txt;

  const element = "<div class='lab-item-detail'><h3 class='lab-item-cat'>" + cat + "</h3><h2 class='lab-item-title'>" + title + "</h2><p class='lab-item-desc'>" + item_hover_description + "</p></div>";
const elementMobile = "<div class='lab-item-detail-mobile'><h3 class='lab-item-cat'>" + cat + "</h3><h2 class='lab-item-title'>" + title + "</h2><p class='lab-item-desc'>" + item_hover_description + "</p></div>";
  $('.hover-middle').html('');
  $('.hover-left').html('');
  $('.hover-right').html('');

  let topPosition = topPos;

  // console.log(topPos-$(window).scrollTop());
  if (topPos-$(window).scrollTop() > 0) {
    topPosition = topPos-$(window).scrollTop();
  } else {
    topPosition = '10%';
  }
  $(thisTarget).html(element).css('top',topPosition);
  $(thisTarget).html(elementMobile);
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
      //console.log("l1");
      if(template === 5){
        tick(title, txt, cat, 1, offsets.top);
      }else{
        tick(title, txt, cat, 2, offsets.top);
      }

    } else {
      if (offsets.left + (w / 2) > $('#lab-list-frame').width() / 3 && offsets.left + (w / 2) < $('#lab-list-frame').width() * 2 / 3) {
        //console.log("l3 ");
        tick(title,txt,cat, 3, offsets.top)
      } else {
        tick(title,txt,cat, 2, offsets.top)
        //console.log("l2 ");
      }
    }
  }

  handleMouseOut(e,template) {
    const thisTarget = e.target;

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
    //const state = this.state;

    //const styleFrame = props.styleFrame;

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

      const categoryNameIdPairs = props.categoryNameIdPairs;

      const categoryIdsCorrespondingToLabItemStr = (item.lab_categories.length > 0) ?
        item.lab_categories.map((category) => (categoryNameIdPairs[category.name])).join(',') :
        '';

      const categoryNamesCorrespondingToLabItemStr = (item.lab_categories.length > 0) ?
        item.lab_categories.map((category) => (category.name)).join(', ') :
        '';

      return (
        <div key={item.id}
          className={gridSizeClassName + " lab-item " + itemClassNames + ' ' + props.shuffleSelectorClass}
          data-category-ids={categoryIdsCorrespondingToLabItemStr}
        >
          {/* <SizeMe
            monitorHeight monitorWidth
            refreshRate={32}
            render={({ size }) => {
              sz = size;
              console.log("size: " + JSON.stringify(sz));
              return (
                <div></div>
              );
            }}
          /> */}

          <SizeMe monitorHeight monitorWidth
            refreshRate={32} render={
              ({size}) => {
                console.log("size: " + JSON.stringify(size));

                let containerWidth = size.width;
                //let containerWidth = sz.width;
                let containerresearchZeroHeight = containerWidth / 2 * 1.3;
                let templateType = item.template_type;

                let containerStyle;
                let imgStyle;
                let itemStyle;
                let textDescStyle;
                let textTitleStyle;
                let categoryColor;
                let classNameImg = "lab-thumb";
                let sharingPresenterStyle;

                let classNameTitle = "lab-title-from-bottom";
                let classNameDesc = "lab-desc-from-bottom";
                let classSharingPresenter ="lab-sharing-presenter"

                let classResearchZero = "lab-research-zero"


                let hasCategoryColor = {
                  opacity : '1',
                  right:'25px',
                }

                let hasMediumCategoryColor = {
                  color:'black',
                  opacity : '1',
                  left:'25px',
                }
                let hasSharingCategoryColor = {
                  color:'#fccd05',
                  opacity : '1',
                  left:'25px',
                }
                let hasNoCategoryColor = {
                  opacity : '0'
                }

                let mediumContainerStyle = {
                  background: '#ffe000',
                  height: containerWidth,
                };

                let sharingContainerStyle = {
                  background: 'white',
                  height: containerWidth,
                };

                let blackText = {
                  color: 'black',
                };
                let whiteText = {
                  color: 'white',
                };

                let squareStyle = {
                  background: 'transparent',
                  color: 'black',
                  width: containerWidth,
                  height: containerWidth
                };

                let longRectStyle = {
                  background: 'transparent',
                  color: 'black',
                  width: containerWidth,
                  height: 'auto'
                };

                let researchZeroStyle = {
                  background: 'transparent',
                  color: 'black',
                  width: containerWidth,
                  height: containerresearchZeroHeight
                };

                let imgSquareStyle = {
                  height: containerWidth,
                };

                let imgLongRectStyle = {
                  width: "100%",
                  height: 'auto',
                };

                let imgNoImageStyle = {
                  height: containerWidth
                };

                let imgResearchZeroStyle = {
                  width: '100%',
                  height: 'auto',
                };

                let imgSharingStyle = {
                  width: '100%',
                  height: 'auto',
                };

                let showSharingPresenterStyle = {
                  display : 'block'
                }

                let hideSharingPresenterStyle = {
                  display : 'none'
                }

                if (templateType == 3) {
                  categoryColor = hasNoCategoryColor;
                  itemStyle = longRectStyle;
                  imgStyle = imgLongRectStyle;
                  textTitleStyle = whiteText;
                  textDescStyle = whiteText;
                  {/* let classNameTitle = "lab-title-from-bottom";
                  let classNameDesc = "lab-desc-from-bottom"; */}
                  sharingPresenterStyle = hideSharingPresenterStyle;
                } else if (templateType == 5) {
                  categoryColor = hasCategoryColor;
                  itemStyle = researchZeroStyle;
                  imgStyle = imgResearchZeroStyle;
                  textTitleStyle = whiteText;
                  textDescStyle = whiteText;
                  {/* let classNameTitle = "lab-title-from-bottom";
                  let classNameDesc = "lab-desc-from-bottom"; */}
                  sharingPresenterStyle = hideSharingPresenterStyle;
                } else if (templateType == 6) {
                  categoryColor = hasMediumCategoryColor;
                  containerStyle = mediumContainerStyle;
                  textTitleStyle = blackText;
                  textDescStyle = blackText;
                  imgStyle = imgNoImageStyle;
                  classNameTitle = "lab-title-from-top";
                  classNameDesc = "lab-desc-from-top";
                  sharingPresenterStyle = showSharingPresenterStyle;
                } else if (templateType == 7) {
                  categoryColor = hasSharingCategoryColor;
                  containerStyle = sharingContainerStyle;
                  imgStyle = imgSharingStyle;
                  textTitleStyle = blackText;
                  textDescStyle = blackText;
                  classNameImg = "lab-thumb sharing";
                  classNameTitle = "lab-title-from-top";
                  classNameDesc = "lab-desc-from-top";
                  sharingPresenterStyle = showSharingPresenterStyle;
                } else {
                  categoryColor = hasNoCategoryColor;
                  itemStyle = squareStyle;
                  imgStyle = imgSquareStyle;
                  textTitleStyle = whiteText;
                  textDescStyle = whiteText;
                  {/* let classNameTitle = "lab-title-from-bottom";
                  let classNameDesc = "lab-desc-from-bottom"; */}
                  sharingPresenterStyle = hideSharingPresenterStyle;
                }
                //console.log("sizeMe inside");
                return (
                  <div className="sub-lab-item wow fadeInUp"
                    data-wow-delay={Math.random() * (1 - 0.1) + idx * 0.05 + 's'}
                    style={itemStyle}
                    onMouseOver={(e) => {
                      this.handleMouseOver(e, containerWidth, templateType , item.lab_item_title, item.hover_description, categoryNamesCorrespondingToLabItemStr);
                    }}
                    onMouseOut={(e) => {
                      this.handleMouseOut(e, templateType);
                    }}>
                    <a className="lab-item-click"
                      href={item.link != '' ? item.link : 'javascript:;'}
                      target="_blank"
                      onClick={this.handleMenuClose}
                      style={item.link != '' ? {cursor: 'pointer'} : {cursor: 'none'}}>
                      <span style={categoryColor}>{categoryNamesCorrespondingToLabItemStr}</span>
                      <h1 className={classNameDesc} style={textDescStyle}>{item.description}</h1>
                      <h3 className={classNameTitle} style={textTitleStyle}>{item.lab_item_title}</h3>
                      <div className={classSharingPresenter} style={sharingPresenterStyle}><div style={templateType === 7 ? {borderRadius: '50%'} : {borderRadius: '0%'}} className="presenter-img-container"><img className="lab-item-icon" src={templateType == 6 ? props.itemsExtra.mediumLogoUrl : item.sharing_presenter_icon.guid} alt="" /></div><span>{item.sharing_presenter_name}</span><h5>{templateType == 6 ? 'Medium Post' : item.sharing_presenter_title}</h5><i className="medium-arrow ion ion-android-arrow-forward" style={templateType == 6 ? {display:'block'} : {display:'none'}}></i></div>
                      <div className="img-container" style={containerStyle}>
                        <img className={classNameImg} src={item.image.guid} alt="" style={imgStyle} />
                      </div>
                    </a>
                  </div>
                );
              }
            }
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
};
