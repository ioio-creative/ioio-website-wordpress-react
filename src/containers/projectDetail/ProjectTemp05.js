import React, {Component} from 'react';

function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {

    return (<div className="slideshow-item">
      <div className="row container-fluid">
        <div className="col-md-12 text-center">
          <img src={slide.guid} className="testimonial-img" alt="alt"/>
        </div>
      </div>
    </div>);
  });

  return (<div className="owl-carousel slideshow-carousel">
    {member_items}
  </div>);
}

class ProjectTemp05 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    return (<section className="slideshow slideshow-img-in-middle section-bg wow fadeInUp">
      <div className="row container-fluid">
        <div className="col-md-12 text-center">
          <Slideshow slides={props.images}/>
        </div>
      </div>
    </section>);
  }
}

export default ProjectTemp05;
