import React, {Component} from 'react';

class About07 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    var a = this.props.about
    return ( <section id="clients">
        <div className="container">
          <header className="section-header">
            <h3>Clients</h3>
            <p>Our team brings a wealth of experience from some of the world’s most
              formidable production studios, agencies and startups.</p>
          </header>
          <div className="row about-cols">
            <div className="col-md-12 wow fadeInUp">
              <div className="about-col">
                <div className="img">
                  <img src="img/about/Clients.jpg" alt="" className="img-fluid" />
                </div>
                <p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>);
  }
}

export default About07;
