import React, {Component} from 'react';

//Footer
import Footer from 'containers/DarkFooter';

import {fetchActiveLab, fetchLabItems, fetchActiveDarkFooter} from 'websiteApi';

import './LabListPage.css';

import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'

import Measure from 'react-measure'
import {SizeMe} from 'react-sizeme'
import withContentRect from 'react-measure'

import classNames from 'classnames'

import $ from 'jquery'

function tick(txt, pos) {

  let thisTarget;
  if (pos == 2) {
    thisTarget = '.hover-middle';
  } else if (pos == 3) {
    thisTarget = '.hover-right';
  } else {
    thisTarget = '.hover-left'
  }

  let item_hover_description = txt;

  const element = "<div className='lab-item-detail'><h3>Lab Categories</h3><p>" + item_hover_description + "</p></div>";
  $('.hover-middle').html('')
  $('.hover-left').html('')
  $('.hover-right').html('')
  $(thisTarget).html(element);

}

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

  handleMouseOver(e, w, txt) {
    let thisTarget = e.target;

    $('#lab-list').addClass('active')

    $(thisTarget).closest('.lab-item').addClass('active')
    $(thisTarget).closest('.img-container').addClass('active')
    $('#hover-cover').addClass('active')

    var el = $('#hover-cover')
    var offsets = $(thisTarget).closest('.lab-item').offset();

    console.log("offsets left" + (
    offsets.left) + " lab-list-frame left" + (
    $("#lab-list-frame").offset().left));

    if (offsets.left + (w * 1.1) > $('#lab-list-frame').width()) {
      console.log("l1")
      tick(txt, 1)
    } else {
      if (offsets.left + (w / 2) > $('#lab-list-frame').width() / 3 && offsets.left + (w / 2) < $('#lab-list-frame').width() * 2 / 3) {
        console.log("l3 ")
        tick(txt, 3)
      } else {
        tick(txt, 2)
        console.log("l2 ")
      }
    }
  }

  handleMouseOut(e) {
    let thisTarget = e.target;
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

    const items = props.labItems.map((item, id) => {

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

              return (<div className="sub-lab-item wow fadeInUp" data-wow-delay={Math.random() * (1 - 0.1) + id * 0.05 + 's'} style={itemStyle} onMouseOver={(e) => {
                  this.handleMouseOver(e, containerWidth, item.hover_description);
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
    fetchActiveDarkFooter((aFooter) => {
      this.setState({footer: aFooter});
    });

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

    const labItems = lab.lab_item;

    const bg = {
      //backgroundImage: url,
      /*
      backgroundSize: 'auto',
      backgroundPosition: 'center'
      */
    };

    return (<div>
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
          <div className="col-md-10" id="lab-list-frame">
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
