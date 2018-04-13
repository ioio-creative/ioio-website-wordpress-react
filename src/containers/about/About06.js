import React, {Component} from 'react';

class About06 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    var a = this.props.about
    return (<section id="services">
        <div className="container">
          <header className="section-header">
            <h3>Services</h3>
            <p>Our team brings a wealth of experience from some of the world’s most
              formidable production studios, agencies and startups.</p>
          </header>
          <div className="row services-cols">
            <div className="col-md-3 wow fadeInUp">
              <div className="services-col">
                <div className="img">
                  <img src="img/about-mission.jpg" alt className="img-fluid" />
                </div>
                <p>
                  do eiusmod
                </p>
              </div>
            </div>
            <div className="col-md-3 wow fadeInUp" data-wow-delay="0.1s">
              <div className="services-col">
                <div className="img">
                  <img src="img/about-plan.jpg" alt className="img-fluid" />
                </div>
                <p>
                  ut perspiciatis
                </p>
              </div>
            </div>
            <div className="col-md-3 wow fadeInUp" data-wow-delay="0.2s">
              <div className="services-col">
                <div className="img">
                  <img src="img/about-vision.jpg" alt className="img-fluid" />
                </div>
                <p>
                  sit amet.
                </p>
              </div>
            </div>
            <div className="col-md-3 wow fadeInUp" data-wow-delay="0.3s">
              <div className="services-col">
                <div className="img">
                  <img src="img/about-vision.jpg" alt className="img-fluid" />
                </div>
                <p>
                  Nemo enim
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>);
  }
}

export default About06;
