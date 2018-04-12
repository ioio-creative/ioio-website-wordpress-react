import React, {Component} from 'react';

class About03 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    return (<section id="core-value">
      <div className="container-fluid">
        <div className="row wow fadeInUp">
          <div className="col-lg-4 box-bg-01">
            <h4 className="core-value-title text-left">Core Value</h4>
            <div className="text-center">
              <img src="img/fish2.png" alt="alt" className="img-fluid core-value-img"/>
            </div>
            <p className="description text-center">To be open-minded,
              <br/>believe in creativity
            </p>
          </div>
          <div className="col-lg-4 box-bg-02">
            <h4 className="core-value-title text-left">Core Value</h4>
            <div className="text-center">
              <img src="img/meet.png" alt="alt" className="img-fluid core-value-img"/>
            </div>
            <p className="description text-center">To understand
              <br/>human behaviour</p>
          </div>
          <div className="col-lg-4 box-bg-03">
            <h4 className="core-value-title text-left">Core Value</h4>
            <div className="text-center">
              <img src="img/fish2.png" alt="alt" className="img-fluid core-value-img"/>
            </div>
            <p className="description text-center">To generate standard
              <br/>for the future</p>
          </div>
        </div>
      </div>
    </section>);
  }
}

export default About03;
