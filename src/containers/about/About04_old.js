import React, {Component} from 'react';

function Slideshow(props) {
  const slide_items = props.slides.map((slide, id) => {
    return (<div className={id === 0
        ? 'carousel-item active'
        : 'carousel-item'} key={id++}>
      <div className="row container-fluid">
        <div className="col-md-7 text-center">
          <img src={slide.image.guid} alt="alt" className="img-responsive slideshow-img"/>
        </div>
        <div className="col-md-5 text-left">
          <h2>{slide.my_title}</h2>
          <p>{slide.desc}</p>
        </div>
      </div>
    </div>);
  });

  return (<div className="intro-container">
    <div id="introCarousel" className="carousel slide carousel-fade" data-ride="carousel">
      <ol className="carousel-indicators text-right"/>
      <div className="carousel-inner" role="listbox">
        {slide_items}
      </div>
      <a className="carousel-control-prev" href="#introCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon ion-chevron-left" aria-hidden="true"/>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#introCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon ion-chevron-right" aria-hidden="true"/>
        <span className="sr-only">Next</span>
      </a>
    </div>
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
    return (<section id="slideshow">
      <Slideshow slides={slides}/>
    </section>);
  }
}

export default About04;
