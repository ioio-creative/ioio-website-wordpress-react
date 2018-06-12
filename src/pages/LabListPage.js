import React, {Component} from 'react';

//Footer
import Footer from 'containers/Footer';

import {fetchActiveLab, fetchActiveFooter} from 'websiteApi';

import './LabListPage.css';

import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'

class LabListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lab: null
    }
  }

  async componentDidMount() {
    fetchActiveLab((aLab) => {
      this.setState({lab: aLab});
    });

    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });
  }

  render() {

    const bg = {
      //backgroundImage: url,
      /*
      backgroundSize: 'auto',
      backgroundPosition: 'center'
      */
    };

    const footer = this.state.footer;
    if (footer === null) {
      return null;
    }

    const lab = this.state.lab;
    if (lab === null) {
      return null;
    }
    console.log(lab)
    return (<div>
      <section id="video-landing" className="lab-bg wow fadeIn" data-wow-delay="0.8s">
        <div className="video-landing-div">
          <div className="container-fluid">
            <div className="player-wrapper">
              <video className="react-player" width={'100%'} height={'auto'} poster={lab.top_video_preload_image.guid} autoPlay={"autoPlay"} loop={"loop"} muted="muted" playsInline={"playsInline"}>
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
        <div class="container">
          <div class="row">
            <div class="col">
              1 of 2
            </div>
            <div class="col">
              2 of 2
            </div>
          </div>
          <div class="row">
            <div class="col">
              1 of 3
            </div>
            <div class="col">
              2 of 3
            </div>
            <div class="col">
              3 of 3
            </div>
            <div class="col">
              3 of 3
            </div>
          </div>
        </div>
      </section>
      <Footer footer={footer}/>
    </div>
    );
  }
}

export default LabListPage;
