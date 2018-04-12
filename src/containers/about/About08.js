import React, {Component} from 'react';

class About08 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    return (<section id="press">
        <div className="container">
          <header className="section-header">
            <h3>Press</h3>
            <p>From products with commercial applications to bespoke tools that we utilize for our clients, our technology team has created a suite of.</p>
          </header>
          <div className="row about-cols">
            <div className="col-md-12 wow fadeInUp">
              <div className="about-col">
                <div className="img">
                  <img src="img.jpg" alt className="img-fluid" />
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

export default About08;
