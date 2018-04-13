import React, {Component} from 'react';

function getIndex(value, arr, prop) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
}

function Slideshow(props) {
  var id = 0;
  const social_media_items = props.slides.map((slide) => {
    console.log(id);

    var h = '';
    if (id == 0) {
      h = 'arousel-item active'
    } else {
      h = 'arousel-item'
    }

    return (<div className={h} data-ids={id++}>
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

  return (<div className="carousel-inner" role="listbox">
    {social_media_items}
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
    var a = this.props.about
    var slides = a.slideshow
    return (<section id="slideshow">
      <div className="intro-container">
        <div id="introCarousel" className="carousel slide carousel-fade" data-ride="carousel">
          <ol className="carousel-indicators text-right"/>
          <Slideshow slides={slides}/>
          <a className="carousel-control-prev" href="#introCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon ion-chevron-left" aria-hidden="true"/>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#introCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon ion-chevron-right" aria-hidden="true"/>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>);
  }
}

export default About04;
