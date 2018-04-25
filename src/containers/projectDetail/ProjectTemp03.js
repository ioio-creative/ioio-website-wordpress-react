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

class ProjectTemp03 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    return (<section className="slideshow slideshow-img-on-right section-bg wow fadeInUp">
      <div className="row container-fluid">
        <div className="col-md-4 slideshow-text">
          <h2>{props.section_title}</h2>
          <p>
            {props.description}
          </p>
        </div>
        <div className="col-md-8 text-center">
          <Slideshow slides={props.images}/>
        </div>
      </div>
    </section>);
  }
}

export default ProjectTemp03;
