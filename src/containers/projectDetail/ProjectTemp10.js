import React, { Component } from 'react';

class ProjectTemp10 extends Component {
    constructor(props) {
      super(props);
      this.video = null;
      this.playButton = null;

      // methods
      this.hidePlayButton = this.hidePlayButton.bind(this);
      this.showPlayButton = this.showPlayButton.bind(this);
      this.playVideo = this.playVideo.bind(this);

      // event handlers
      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    }
    

    /* react lifecycles */

    componentDidMount() {
      if (this.props.is_autoplay_video === "1")
        this.playVideo();
      else 
        this.showPlayButton();
    }

    /* end of react lifecycles */

    
    /* methods */

    hidePlayButton() {
      this.playButton.style.visibility = 'hidden';
      this.playButton.style.opacity = 0;
      this.video.controls = true;
    }

    showPlayButton(e) {
      /* https://stackoverflow.com/questions/40584563/html5-video-fires-pause-event-while-seeked */
      if (this.video && this.video.readyState === 4) {
        this.playButton.style.visibility = 'visible';
        this.playButton.style.opacity = 1;
        this.video.controls = false;
      }
    }

    playVideo(isMutedVideo = true) {
      // https://github.com/scottschiller/SoundManager2/issues/178
      // https://sites.google.com/a/chromium.org/dev/audio-video/autoplay
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
      this.video.muted = isMutedVideo;
      const videoPlayPromise = this.video.play();
      if (videoPlayPromise !== undefined) {
        videoPlayPromise.then(_ => {
          // Autoplay started!
        }).catch(err => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
          this.showPlayButton();
        });
      }
    }

    /* end of methods */


    /* event handlers */

    handlePlayButtonClick() {
      this.playVideo(false);
    }

    /* end of event handlers */

    render() {
      const props = this.props;
      const bg = {
        backgroundColor: props.background_mood_color,
      };
      const videoAttrs = {
        autoPlay: (props.is_autoplay_video === "1"? true: false),
        loop: (props.is_autoplay_video === "1"? true: false),
        muted: (props.is_autoplay_video === "1"? true: false),
      };
      // console.log(videoAttrs);
      if (props.images && props.images[0]['guid']) {
        videoAttrs['poster'] = props.images[0]['guid'];
      }
      return (
        <section className="photo-montage-one-video project-section-bg wow fadeInUp" style={bg}>
          {/* TODO: modified by Chris */}
          {/* <div className="container"> */}
            <div className="row container-fluid">
              <div className="col-md-10 offset-md-1">
                <div className="video-wrapper">
                  <video src={props.video.guid} {...videoAttrs}
                    onPlay={this.hidePlayButton}
                    onPause={this.showPlayButton}
                    ref={ref=>this.video=ref}
                  />
                  <div className="play-button"
                    onClick={this.handlePlayButtonClick}
                    ref={ref=>this.playButton=ref}
                  />
                </div>
              </div>
            </div>
          {/* </div> */}
        </section>
      );
    }
}

export default ProjectTemp10;
