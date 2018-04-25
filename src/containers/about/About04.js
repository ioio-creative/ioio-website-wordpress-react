import React, {Component} from 'react';
import scriptjs from 'scriptjs'


function loadJSFiles() {
  console.log("public url: " + JSON.stringify(process.env));
  const publicUrl = process.env.PUBLIC_URL;


  scriptjs(publicUrl + '/js/slideshow-carousel.js');

  console.log("loadJSFiles In project detail page");

}


function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {

    return (<div className="slideshow-item">
      <div className="row container-fluid">
        <div className="col-md-8 text-center">
          <img src={slide.image.guid} className="testimonial-img" alt="alt"/>
        </div>
        <div className="col-md-4 slideshow-text">
          <h2>{slide.my_title}</h2>
          <p>
            {slide.desc}
          </p>
        </div>
      </div>
    </div>);
  });

  return (<div className="owl-carousel slideshow-carousel">
    {member_items}
  </div>);
}

class About04 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    let a = this.props.about
    let slides = a.slideshow

    return (<section className="slideshow slideshow-img-and-text section-bg wow fadeInUp">
      <div className="row container-fluid">
        <div className="col-md-12 text-center">
          <Slideshow slides={slides}/>
          {loadJSFiles()}
        </div>
      </div>
    </section>);
  }
}

export default About04;
