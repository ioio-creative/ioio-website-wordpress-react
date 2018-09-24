import React, {Component} from 'react';

class ProjectTemp07 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    const bg = {
      backgroundColor: props.background_mood_color,
    };
    
    let image0 = '';
    if (props.images) {
      image0 = props.images[0].guid;
    }      

    return (
      <section className="photo-montage-one-vid project-section-bg wow fadeInUp">
        <div className="container-fluid" style={bg}>
          <video className="photo-montage-one-vid-inside" width={'100%'} height={'auto'} poster={image0} autoPlay={"autoPlay"} loop={"loop"} muted="muted" playsInline={"playsInline"}>
            <source src={props.video.guid} type="video/mp4" />
            {/* //TODO add webm <source src="https://multicdn.synq.fm/projects/bb/56/bb56f28429b942c08dc5128e4b7ba48c/derivatives/videos/71/43/71439ccd73c74ecc8bbab7abd3bb98bc/webm_720/71439ccd73c74ecc8bbab7abd3bb98bc_webm_720.webm" type="video/webm"/>*/}
            <img src={image0} title="Your browser does not support the <video> tag" />
          </video>
        </div>
      </section>
    );
  }
}

export default ProjectTemp07;
