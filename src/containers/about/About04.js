import React, {Component} from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'containers/slideshow.css';

function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {

    return (<div className="item" key={id}>
      <div className="row container-fluid">
        <div className="col-md-1"></div>
        <div className="col-md-7 text-center">
          <img src={slide.image.guid} className="slideshow-img" alt="alt"/>
        </div>
        <div className="col-md-3 slideshow-text">
          <h2>{slide.my_title}</h2>
          <p>
            {slide.desc}
          </p>
        </div>
      </div>
              <div className="col-md-1"></div>
    </div>);
  });

  return (<OwlCarousel className="owl-theme" loop={true} nav={false} autoplay={true} dots={true} dotsEach={true} items={1} slideBy={1} autoplayTimeout={8000}>
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

  render() {
    let a = this.props.about
    let slides = a.slideshow
    console.log(a.slideshow_background_image.guid)

    const url = "url('" + a.slideshow_background_image.guid + "')"

    const bg = {
      backgroundImage: url,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    };

    return (<section className="slideshow slideshow-img-and-text about-section-bg wow fadeInLeft" style={bg}>
      <div className="row container-fluid">
        <div className="col-md-12 text-center">
          <Slideshow slides={slides}/>
        </div>
      </div>
    </section>);
  }
}

export default About04;
