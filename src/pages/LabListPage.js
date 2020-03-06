import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import Shuffle from 'shufflejs'
import {Link} from 'react-router-dom';
import Footer from 'containers/footer/Footer';
//import LabCategories from 'containers/labList/LabCategories';

//import getSearchObjectFromHistory from 'utils/queryString/getSearchObjectFromHistory';

import {fetchActiveLab, fetchLabCategories} from 'websiteApi';

import './LabListPage.css';
import './LabListPageM.css';

//import ReactPlayer from 'react-player';

//import Measure from 'react-measure';
import {SizeMe} from 'react-sizeme';
//import withContentRect from 'react-measure';

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

}

class LabItems extends Component {
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
    let thisTarget = e.target;
    $(".lab-item").addClass('fade')
    $('#lab-list').addClass('active')

    $(thisTarget).closest('.lab-item').addClass('active')
    $(thisTarget).closest('.img-container').addClass('active')
    $('#hover-cover').addClass('active')

    $(".lab-item.active").removeClass('fade')

    var el = $('#hover-cover')
    var offsets = $(thisTarget).closest('.lab-item').offset();

    //console.log("offsets left" + (  offsets.left) + " lab-list-frame left" + (  $("#lab-list-frame").offset().left));

    if (offsets.left + (w * 1.1) > $('#lab-list-frame').width()) {
      //console.log("l1")
      if(template == 5){
        tick(title,txt,cat, 1, offsets.top)
      }else{
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

    $(".lab-item").removeClass('fade')
    $('#lab-list').removeClass('active')
    $(thisTarget).closest('.lab-item').removeClass('active')
    $(thisTarget).closest('.img-container').removeClass('active')
    $('#hover-cover').removeClass('active')

  }

  handleMeasureResize(contentRect) {
    this.setState({dimensions: contentRect.bounds});
  }

  render() {
    const props = this.props;
    const state = this.state;

    const styleFrame = props.styleFrame;

    const mediumLogo = props.mediumLogo;

    const items = props.labItems.map((item, id) => {

      let itemClassNames = classNames("template-type-" + item.template_type)

      let sz;


      let gridSize = 3;

      if (item.template_type == 5) {
        gridSize = 8;
      } else {
        gridSize = 4;
      }

      let gridSizeClassName = "col-md-" + gridSize;

      return (
        <div className={gridSizeClassName + " lab-item " + itemClassNames} key={item.id}>
          <SizeMe
            monitorHeight monitorWidth
            refreshRate={32}
            render={({ size }) => {sz = size
              return(<div >
              </div>)}}
            />

            <SizeMe monitorHeight monitorWidth
              refreshRate={32} render={
                ({size}) => {

                  //let containerWidth = size.width;
                  let containerWidth = sz.width;
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
                  let classSharingPresenter ="lab-sharing-presenter";

                  let classCategory = ""

                  let classResearchZero = "lab-cat-research-zero";
                  let classSharing = "lab-cat-sharing";
                  let classMedium = "lab-cat-medium";
                  let classExperimentPortrait = "lab-cat-experiment-portrait";
                  /*
                  1.Image/GIF
                  2.video
                  3.Portrait Image/GIF
                  4.Instagram
                  5.Research 0
                  6. medium post
                  7. Sharing
                  */

                  let labCategories = (item.lab_categories && item.lab_categories[0] && item.lab_categories[0].name) || '';
                  if (labCategories == "Feed"){

                  }


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
                    classNameTitle = "lab-title-from-bottom";
                    classNameDesc = "lab-desc-from-bottom";
                    sharingPresenterStyle = hideSharingPresenterStyle;
                  } else if (templateType == 5) {
                    categoryColor = hasCategoryColor;
                    itemStyle = researchZeroStyle;
                    imgStyle = imgResearchZeroStyle;
                    textTitleStyle = whiteText;
                    textDescStyle = whiteText;
                    classNameTitle = "lab-title-from-bottom";
                    classNameDesc = "lab-desc-from-bottom";
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
                    classNameTitle = "lab-title-from-bottom";
                    classNameDesc = "lab-desc-from-bottom";
                    sharingPresenterStyle = hideSharingPresenterStyle;
                  }
                  //console.log(item.link)
                  /**
                   * TODO: <Link /> somehow doesn't understand external url
                   * the following is just hack 
                   */                  
                  const labItemClickChildren = (
                    <>
                      <div onClick={null} className="hover-mobile">
                        <div className='lab-item-detail-mobile'>
                          <h3 className='lab-item-cat'>
                            {labCategories}
                          </h3>
                          <h2 className='lab-item-title'>
                            {item.lab_item_title}
                          </h2>
                          <p className='lab-item-desc'>
                            {item.hover_description}
                          </p>
                        </div>
                      </div>

                      <span style={categoryColor}>{labCategories}</span>
                      <h1 className={classNameDesc} style={textDescStyle}>{item.description}</h1>
                      <h3 className={classNameTitle} style={textTitleStyle}>{item.lab_item_title}</h3>
                      <div className={classSharingPresenter} style={sharingPresenterStyle}><div style={templateType == 7 ? {borderRadius: '50%'} : {borderRadius: '0%'}} className="presenter-img-container"><img className="lab-item-icon" src={templateType == 6 ? mediumLogo : item.sharing_presenter_icon.guid} alt="" /></div><span>{item.sharing_presenter_name}</span><h5>{templateType == 6 ? 'Medium Post' : item.sharing_presenter_title}</h5><i className="medium-arrow ion ion-android-arrow-forward" style={templateType == 6 ? {display:'block'} : {display:'none'}}></i></div>
                      <div onClick={null} className="img-container" style={containerStyle}>
                        <img className={classNameImg} src={item.image.guid} alt="" style={imgStyle}/>
                      </div>
                    </>
                  );
                  
                  return (
                    <div className="sub-lab-item wow fadeInUp"
                      data-wow-delay={Math.random() * (1 - 0.1) + id * 0.05 + 's'}
                      style={itemStyle}
                      onMouseOver={(e) => {
                        this.handleMouseOver(e, containerWidth, templateType , item.lab_item_title, item.hover_description, labCategories );
                      }}
                      onMouseOut={(e) => {
                        this.handleMouseOut(e,templateType);
                      }}>

                      {
                        item.link && item.link[0] === '/' ?
                        <Link className="lab-item-click"
                          to={item.link}                          
                          target={labCategories === "Feed" || labCategories === "Perspective"? '_blank' : '_self'}
                          onClick={this.handleMenuClose}
                          style={item.link ? {cursor: 'pointer'} : {cursor: 'none'}}
                        >
                          {labItemClickChildren}                          
                        </Link>
                        :
                        (
                          item.link ?
                          <a className="lab-item-click"                          
                            href={item.link || '#'}
                            target={item.link ? '_blank' : ''}                          
                            style={item.link ? {cursor: 'pointer'} : {cursor: 'none'}}
                          >
                            {labItemClickChildren}                          
                          </a>
                          :
                          <div className="lab-item-click"                          
                            style={{cursor: 'none'}}
                          >
                            {labItemClickChildren}                          
                          </div>
                        )                        
                      }
                      
                    </div>
                  );
                }
              }
            />
          </div>
        );
      });

      return (
        <div className="row">
          {items}
        </div>
      );
    }
}

class LabItemsWithShuffle extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div></div>
    );
  }
}

class LabListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lab: null,
      labCategories: [],
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };

    [
      'handleResize'
    ].forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }

  handleResize(){
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  componentDidMount() {
    fetchActiveLab((aLab) => {
      this.setState({lab: aLab});
    });

    /*
    fetchLabItems((aLabItems) => {
      this.setState({labItems: aLabItems});
    });
    */

    fetchLabCategories((categories) => {
      this.setState({labCategories: categories});
    });

    window.addEventListener("resize", this.handleResize);
  }

  /**
  * Remove event listener
  */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }


  render() {
    const lab = this.state.lab;
    if (lab === null) {
      return null;
    }

    const labItems = lab.lab_item;

    const labCategories = this.state.labCategories;
    if (labCategories.length === 0) {
      return null;
    }
    //console.log(this.state.windowWidth);
    const bg = {
    };
    // if(this.state.windowWidth >767){
    //   const bg = {
    //     width: '100%',
    //     height: this.state.windowWidth *9/16+'px',
    //   };
    // }


    const blackBg = {
      background: 'black'
    };

    return (
      <div style={blackBg}>
        <div id="hover-cover">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="row hover-text">
                <div className="col-md-4 hover-left"></div>
                <div className="col-md-4 hover-middle"></div>
                <div className="col-md-4 hover-right"></div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
        <section id="lab-video-landing" className="lab-bg" style={bg}>
          <div className="video-landing-div wow fadeIn" data-wow-delay="0.8s"  style={bg}>
            <div className="container-fluid" style={bg}>
              <div className="player-wrapper" style={bg}>
                <video className="react-player" width={'100%'} height={'auto'} poster={lab.top_video_preload_image.guid} autoPlay={"autoPlay"} loop={"loop"} muted={"muted"} playsInline={"playsInline"}>
                  <source className="wow fadeIn" src={lab.top_video.guid} type="video/mp4"/> {/* //TODO add webm <source src="https://multicdn.synq.fm/projects/bb/56/bb56f28429b942c08dc5128e4b7ba48c/derivatives/videos/71/43/71439ccd73c74ecc8bbab7abd3bb98bc/webm_720/71439ccd73c74ecc8bbab7abd3bb98bc_webm_720.webm" type="video/webm"/> */}
                  <img className="wow fadeIn" src={lab.top_video_preload_image.guid} title="Your browser does not support the <video> tag"/>
                </video>
              </div>
              <div className="video-text wow fadeIn">
                <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-10">
                    <h3>{lab.subcaption}</h3>
                    <h1>{lab.caption}</h1>
                  </div>
                  <div className="col-md-1"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="lab-top" className="wow fadeIn lab-bg">
          <div className="container-fluid row text-left">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="lab-top-img text-right">
                <img id="lab-top-img3" src={lab.top_image_3.guid} alt="" className="img-fluid"/>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </section>
        <section id="lab-list" className="lab-bg wow fadeIn">
          <div className="container-fluid row text-center">
            <div className="col-md-1"></div>
            <div className="col-md-10" id="lab-list-frame">
              <div className="lab-categories container-fluid" id="portfolio-flters">
                {/* <LabCategories categories={labCategories}
                  selectAllCategoryId={this.selectAllCategoryId}
                  categoryFilterId={1}
                  allCategoryName='All' /> */}
                </div>
                <LabItems labItems={labItems} w={this.state.windowWidth} h={this.state.windowHeight} mediumLogo={lab.medium_logo.guid} />
              </div>
              <div className="col-md-1"></div>
            </div>
          </section>
          <section id="lab-bottom">
            <div className="container-fluid">
              <div className="row lab-bottom-detail">
                <div className="col-md-1"></div>
                <div className="col-md-5 additional-info"><span id="ioio-text-l">IOIO</span><span id="ioio-text-r">LAB</span></div>
                <div className="col-md-5" id="lab-bottom-detail-desc">
                  <p>{lab.bottom_caption}</p>
                </div>
                <div className="col-md-1"></div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      );
    }
  }

  export default LabListPage;
