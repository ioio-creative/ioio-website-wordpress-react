import React, {Component} from 'react';

class About04 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    var a = this.props.about
    return (<section id="slideshow">
      <div className="intro-container">
        <div id="introCarousel" className="carousel slide carousel-fade" data-ride="carousel">
          <ol className="carousel-indicators text-right"/>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <div className="row container-fluid">
                <div className="col-md-7 text-center">
                  <img src="img/intro-carousel/1.jpg" alt="alt" className="img-responsive slideshow-img"/>
                </div>
                <div className="col-md-5 text-left">
                  <h2>IOIO CULTURE</h2>
                  <p>The internet is an attention economy, but not all attention is created equal. That’s why we invent, design and build digital campaigns and experiences that people truly want to spend time with. We call this “active attention” and we attract it with work that’s beautiful, entertaining, useful, and anything but boring.</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row container-fluid">
                <div className="col-md-7 text-center">
                  <img src="img/intro-carousel/1.jpg" alt="alt" className="img-responsive slideshow-img"/>
                </div>
                <div className="col-md-5 text-left">
                  <h2>Slide 2</h2>
                  <p>The internet is an attention economy, but not all attention is created equal. That’s why we invent, design and build digital campaigns and experiences that people truly want to spend time with. We call this “active attention” and we attract it with work that’s beautiful, entertaining, useful, and anything but boring.</p>
                </div>
              </div>
            </div>
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
      </div>
    </section>);
  }
}

export default About04;
