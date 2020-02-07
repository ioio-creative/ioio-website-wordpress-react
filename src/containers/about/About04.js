import React, {Component} from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import 'containers/slideshow.css';

function Slideshow(props) {
  const member_items = props.slides.map((slide, id) => {

    return (
      <div className="item" key={id}>
        <div className="row container-fluid">
          <div className="col-md-1" />
          <div className="col-md-6 text-center">
            <div className="img-container">
              <img src={slide.image.guid} className="slideshow-img" alt="alt"/>
            </div>
          </div>
          <div className="col-md-4 slideshow-text">
            <h2>{slide.my_title}</h2>
            <p>
              {slide.desc}
            </p>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    );
  });

  // TODO: autoplay changed to false by Chris
  return (
    <OwlCarousel className="owl-theme" loop={true} nav={false} autoplay={false} dots={true} dotsEach={true} items={1} slideBy={1} autoplayTimeout={8000}>
      {member_items}
    </OwlCarousel>
  );
}

class About04 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      about: a
    } = this.props;
    const {
      slideshow: slides
    } = a;
    //console.log(a.slideshow_background_image.guid);

    const url = "url('" + a.slideshow_background_image.guid + "')"

    const bg = {
      backgroundImage: url,
      backgroundSize: 'auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left top'
    };

    return (
      <section className="slideshow slideshow-img-and-text about-section-bg wow fadeInLeft" style={bg}>
        <div className="row container-fluid">
          <div className="col-md-12 text-center">
            <Slideshow slides={slides}/>
          </div>
        </div>
      </section>
    );
  }
}

export default About04;
