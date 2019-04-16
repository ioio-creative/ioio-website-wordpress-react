import React, { Component } from 'react';

class ProjectTemp10 extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const props = this.props;
      const bg = {
        backgroundColor: props.background_mood_color,
      };
      const isAutoPlay = {
        autoPlay: (props.is_autoplay_video === "1"? true: false),
        controls: true
      }
      console.log(isAutoPlay);
      return (
        <section className="photo-montage-one-video project-section-bg wow fadeInUp" style={bg}>
          {/* TODO: modified by Chris */}
          {/* <div className="container"> */}
            <div className="row container-fluid">
              <div className="col-md-10 offset-md-1">
                <div className="video-wrapper">
                  <video src={props.video.guid} {...isAutoPlay} />
                  {!isAutoPlay.autoPlay && <div className="play-button" />}
                </div>
              </div>
            </div>
          {/* </div> */}
        </section>
      );
    }
}

export default ProjectTemp10;
