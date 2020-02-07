import React, {Component} from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import 'containers/slideshow.css';

function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {

    return (
      <div className="slideshow-item" key={id}>
        <div className="img-container">
          <img src={slide.guid} className="slideshow-img" alt="alt"/>
        </div>
      </div>
    );
  });

  // TODO: autoplay changed to false by Chris
  return (
    <OwlCarousel className="owl-theme" loop={true} autoplay={false} dots={true} items={1}>
      {member_items}
    </OwlCarousel>
  );
}

class LabTemp02 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const bg = {
      backgroundColor: props.background_mood_color
    };
    return (
      <section className="slideshow slideshow-img-on-left project-section-bg wow fadeInLeft" style={bg}>
        <div className="row container-fluid">
          <div className="col-md-1 "></div>
          <div className="col-md-6 text-center">
            <Slideshow slides={props.images}/>
          </div>
          <div className="col-md-4 slideshow-text">
            <h2>{props.section_title}</h2>
            <p>
              {props.description}
            </p>
          </div>
          <div className="col-md-1 "></div>
        </div>
      </section>
    );
  }
}

export default LabTemp02;
