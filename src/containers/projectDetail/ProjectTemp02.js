import React, {Component} from 'react';

import {getMultipleTextsFromSingleText} from 'utils/textAreaDelimiter';

function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {
    console.log(slide.guid)
    return (<div className="row container-fluid">
      <div className="col-md-8 text-center">
        <img src={slide.guid} className="testimonial-img" alt="alt"/>
      </div>
      <div className="col-md-4">
        <h2>Saul Goodman</h2>
        <p>
          Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
        </p>
      </div>
    </div>);
  });

  return (<div className="slideshow-item">
    {member_items}
  </div>);
}

class ProjectTemp02 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    console.log(props)
    const texts = getMultipleTextsFromSingleText(props.text_areas);
    const textContainer = texts.map((text) => {
      return (<div>
        <br/>
        <div>
          {text}
        </div>
      </div>);
    });
    return (

    <section className="slideshow slideshow-img-on-left section-bg wow fadeInUp">
      <div className="container-fluid">
        <div className="owl-carousel slideshow-carousel">
          <Slideshow slides={props.images}/>
        </div>
      </div>
    </section>);
  }
}

export default ProjectTemp02;
