import React, {Component} from 'react';

import {Player} from 'video-react'; //todo Remove video-react
import './About02.css'

class About02 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    const a = this.props.about;

    const buttonStyle = {
      left: '50%',
      top: '50%',
      marginTop: '-0.75em',
      marginLeft: '-1.5em',
      fontSize: '6em',
      lineHeight: '1.9em',
      height: '2em',
      width: '2em',
      borderRadius: '50%',
    };
    return (<section id="media" className="wow fadeIn about-section-bg">
      <div className="container-fluid row text-left">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h1>{a.feature_media_caption}
          </h1>
          <div className="media-video text-center">
            <Player poster={a.feature_media_preview_photo.guid} src={a.feature_media.guid} autoPlay={false} fluid={true} volume={1} preload={'auto'} style={buttonStyle}></Player>
          </div>
          <p>{a.feature_media_desc}
          </p>
        </div>
        <div className="col-md-1"></div>
      </div>
    </section>);
  }
}




export default About02;
