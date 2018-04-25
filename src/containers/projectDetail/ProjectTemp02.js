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

class ProjectTemp02 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    return (<section className="slideshow slideshow-img-on-left section-bg wow fadeInUp">
      <div className="row container-fluid">
        <div className="col-md-8 text-center">
          <Slideshow slides={props.images}/>
        </div>
        <div className="col-md-4 slideshow-text">
          <h2>{props.section_title}</h2>
          <p>
            {props.description}
          </p>
        </div>
      </div>
    </section>);
  }
}

export default ProjectTemp02;
