import React, {Component} from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'containers/slideshow.css';

function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {

    return (<div className="slideshow-item" key={id}>
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

class ProjectTemp03 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    const bg = {
      backgroundColor: props.background_mood_color,
    };
    return (<section className="slideshow slideshow-img-on-right project-section-bg wow fadeInUp" style={bg}>
      <div className="row container-fluid">
                <div className="col-md-1 ">
                </div>
        <div className="col-md-3 slideshow-text">
          <h2>{props.section_title}</h2>
          <p>
            {props.description}
          </p>
        </div>
        <div className="col-md-7 text-center">
          <Slideshow slides={props.images}/>
        </div>
        <div className="col-md-1 ">
        </div>
      </div>
    </section>);
  }
}

export default ProjectTemp03;
