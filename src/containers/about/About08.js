import React, {Component} from 'react';

class About08 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    };
  }

  render() {
    const a = this.props.about;
    return (<section id="about-press" className="about-section-bg">
        <div className="container">
          <header className="section-header">
            <h3>{a.press_section_title}</h3>
            <p>{a.press_section_desc}</p>
          </header>
          <div className="row about-cols">
            <div className="col-md-12 wow fadeInDown">
              <div className="about-col">
                <div className="img">
                  <img src="img.jpg" alt="" className="img-fluid" />
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
