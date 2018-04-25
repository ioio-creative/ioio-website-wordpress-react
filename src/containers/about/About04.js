import React, {Component} from 'react';
import scriptjs from 'scriptjs'

import OwlCarousel from 'react-owl-carousel';
import 'containers/slideshow.css';

function loadJSFiles() {
  //console.log("public url: " + JSON.stringify(process.env));
  //const publicUrl = process.env.PUBLIC_URL;
//  scriptjs(publicUrl + '/js/slideshow-carousel.js');

  //console.log("loadJSFiles In project detail page");

}


function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {

    return (<div className="item" key={id}>
      <div className="row container-fluid">
        <div className="col-md-8 text-center">
          <img src={slide.image.guid} className="slideshow-img" alt="alt"/>
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

  return (<OwlCarousel className="owl-theme" loop autoplay={true} dots={true} loop={true} items={1}>
    {member_items}
  </OwlCarousel>);
}

class About04 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }
  componentDidMount() {
      loadJSFiles()
  }

  render() {
    let a = this.props.about
    let slides = a.slideshow

    return (<section className="slideshow slideshow-img-and-text section-bg wow fadeInUp">
      <div className="row container-fluid">
        <div className="col-md-12 text-center">
          <Slideshow slides={slides}/>
        </div>
      </div>
    </section>);
  }
}

export default About04;
