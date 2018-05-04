import React, {Component} from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'containers/slideshow.css';

function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {

    return (<div className="slideshow-item">
      <div className="row container-fluid">
        <div className="col-md-12 text-center">
          <img src={slide.guid} className="slideshow-img" alt="alt"/>
        </div>
      </div>
    </div>);
  });

  return (<OwlCarousel className="owl-theme" loop autoplay={true} dots={true} loop={true} items={1}>
    {member_items}
  </OwlCarousel>);
}

class ProjectTemp05 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const bg = {
      backgroundColor: props.background_mood_color,
    };
    return (<section className="slideshow slideshow-img-in-middle section-bg wow fadeInUp" style={bg}>
      <div className="row container-fluid">
        <div className="col-md-12 text-center">
          <Slideshow slides={props.images}/>
        </div>
      </div>
    </section>);
  }
}

export default ProjectTemp05;
