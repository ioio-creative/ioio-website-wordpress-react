import React, {Component} from 'react';

class About04 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
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
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-7"><img src="img/intro-carousel/2.jpg" alt="alt" className="img-responsive slideshow-img"/></div>
                  <div className="col-md-5">
                    <h2>Slide 2</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore, magni illum nemo ipsum quod voluptates ab natus nulla possimus incidunt aut neque quaerat mollitia perspiciatis assumenda asperiores consequatur soluta.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore, magni illum nemo ipsum quod voluptates ab natus nulla possimus incidunt aut neque quaerat mollitia perspiciatis assumenda asperiores consequatur soluta.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-7"><img src="img/intro-carousel/3.jpg" alt="alt" className="img-responsive slideshow-img"/></div>
                  <div className="col-md-5">
                    <h2>Slide 3</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore, magni illum nemo ipsum quod voluptates ab natus nulla possimus incidunt aut neque quaerat mollitia perspiciatis assumenda asperiores consequatur soluta.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore, magni illum nemo ipsum quod voluptates ab natus nulla possimus incidunt aut neque quaerat mollitia perspiciatis assumenda asperiores consequatur soluta.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-7"><img src="img/intro-carousel/4.jpg" alt="alt" className="img-responsive slideshow-img"/></div>
                  <div className="col-md-5">
                    <h2>Slide 4</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore, magni illum nemo ipsum quod voluptates ab natus nulla possimus incidunt aut neque quaerat mollitia perspiciatis assumenda asperiores consequatur soluta.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore, magni illum nemo ipsum quod voluptates ab natus nulla possimus incidunt aut neque quaerat mollitia perspiciatis assumenda asperiores consequatur soluta.</p>
                  </div>
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
