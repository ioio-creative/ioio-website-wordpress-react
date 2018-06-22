import React, {Component} from 'react';

//Footer
import Footer from 'containers/Footer';

import {fetchActiveLab, fetchLabItems, fetchActiveFooter} from 'websiteApi';

import './LabListPage.css';

import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'

import Measure from 'react-measure'
import {SizeMe} from 'react-sizeme'
import withContentRect from 'react-measure'

import classNames from 'classnames'

import $ from 'jquery'

class LabItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: null,
      hover: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

  }

  handleMouseOver(e) {
    let thisTarget = e.target;

    $('#lab-list').addClass('active')

    $(thisTarget).closest('.lab-item').addClass('active')
    $(thisTarget).closest('.img-container').addClass('active')
    $('#hover-cover').addClass('active')

    //  $(thisTarget).addClass('active')

    //$('#hover-cover').addClass('active')
    //  $('#lab-list').addClass('active')

  }

  handleMouseOut(e) {
    let thisTarget = e.target;

    $('#lab-list').removeClass('active')
    $(thisTarget).closest('.lab-item').removeClass('active')
    $(thisTarget).closest('.img-container').removeClass('active')
    $('#hover-cover').removeClass('active')
    //    $(thisTarget).parent().removeClass('active')
    //  $(thisTarget).removeClass('active')

    //  $('#hover-cover').removeClass('active')

  }

  handleMeasureResize(contentRect) {
    this.setState({dimensions: contentRect.bounds});
  }

  render() {
    const props = this.props;
    const state = this.state;

    const styleFrame = props.styleFrame;

    const items = props.labItems.map((item) => {

      let itemClassNames = classNames("template-type-" + item.template_type)

      /* 1.Image/GIF
      2.video
      3.Portrait Image/GIF
      4.Instagram
      5.Research 0
      6. medium post */

      let gridSize = 3;

      if (item.template_type == 5) {
        gridSize = 8;
      } else {
        gridSize = 4;
      }

      let gridSizeClassName = "col-md-" + gridSize;

      return (<div className={gridSizeClassName + " lab-item " + itemClassNames} key={item.id}>
        <SizeMe>{
            ({size}) => {

              let containerWidth = size.width;
              let containerresearchZeroHeight = containerWidth / 2 * 1.3;
              let templateType = item.template_type;

              let imgStyle;
              let itemStyle;

              let squareStyle = {
                background: 'transparent',
                color: 'black',
                width: size.width,
                height: size.width
              };

              let longRectStyle = {
                background: 'transparent',
                color: 'black',
                width: size.width,
                height: 'auto'
              };

              let researchZeroStyle = {
                background: 'transparent',
                color: 'black',
                width: containerWidth,
                height: containerresearchZeroHeight
              };

              let imgSquareStyle = {
                height: containerWidth
              };

              let imgLongRectStyle = {
                width: "100%",
                height: 'auto'
              };

              let imgResearchZeroStyle = {
                width: '100%',
                height: 'auto'
              };

              if (templateType == 3) {
                itemStyle = longRectStyle;
                imgStyle = imgLongRectStyle;
              } else if (templateType == 5) {
                itemStyle = researchZeroStyle;
                imgStyle = imgResearchZeroStyle;
              } else {
                itemStyle = squareStyle;
                imgStyle = imgSquareStyle;
              }

              return (<div className="sub-lab-item" style={itemStyle} onMouseOver={(e) => {
                  this.handleMouseOver(e);
                }} onMouseOut={(e) => {
                  this.handleMouseOut(e);
                }}>
                <h1>{item.subcaption}</h1>
                <h3>{item.caption}</h3>
                <div className="img-container" style={imgStyle}>
                  <img className="lab-thumb" src={item.thumbnail.guid} alt="" style={imgStyle}/>
                </div>
              </div>)
            }
          }
        </SizeMe>
      </div>)
    });

    return (<div className="row">
      {items}
    </div>);
  }
}

class LabListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lab: null,
      labItems: null
    }

  }

  async componentDidMount() {
    fetchActiveLab((aLab) => {
      this.setState({lab: aLab});
    });
    /*
    fetchLabItems((aLabItems) => {
      this.setState({labItems: aLabItems});
    });
*/
    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });

    /*
    $('.img-container').hover(function() { // Mouse over
      $(this).siblings().stop().fadeTo(300, 0.6);
      $(this).parent().siblings().stop().fadeTo(300, 0.3);
      console.log("hello")
    }, function() { // Mouse out
      $(this).siblings().stop().fadeTo(300, 1);
      $(this).parent().siblings().stop().fadeTo(300, 1);
      console.log("bye")
    });

    $('#lab-list').hover(function() {
      // hover code
      console.log("hello")
    }, function() {
      // unhover code
      console.log("byeee")
    });

    this.handleHover(this)
    */
  }

  render() {

    const footer = this.state.footer;
    if (footer === null) {
      return null;
    }

    const lab = this.state.lab;
    if (lab === null) {
      return null;
    }
    /*
    let labItems = this.state.labItems;
    if (labItems === null) {
      return null;
    }
*/
    const labItems = lab.lab_item;

    const bg = {
      //backgroundImage: url,
      /*
      backgroundSize: 'auto',
      backgroundPosition: 'center'
      */
    };

    return (<div>
      <div id="hover-cover"></div>
      <section id="lab-video-landing" className="lab-bg wow fadeIn" data-wow-delay="0.8s">
        <div className="video-landing-div">
          <div className="container-fluid">
            <div className="player-wrapper">
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
      <section id="lab-top" className="wow fadeIn lab-bg" style={bg}>

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
          <div className="col-md-10">
            <LabItems labItems={labItems}/>
          </div>
          <div className="col-md-1"></div>
        </div>
      </section>
      <Footer footer={footer}/>

    </div>
    );
}
}

export default LabListPage;
