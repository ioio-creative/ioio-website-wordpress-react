import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

import routes from 'globals/routes';

import Footer from 'containers/Footer';

import {fetchActiveFooter} from 'websiteApi';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: null
    }
  }

  componentDidMount() {

    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });

  }

  render() {

    const footer = this.state.footer;
    if (footer === null) {
      return null;
    }
    return (<div>
      <section id="homepage-top section-bg wow fadeInUp">
        <div className="row container-fluid">
          <canvas id="homepage-canvas" width="1000px" height="500px"></canvas>
        </div>
      </section>

      <section id="homepage-selected-project section-bg wow fadeInUp">
        <div className="row container-fluid">
          <div className="col-md-12 text-center"></div>
          <div className="row container-fluid">
            <div className="col-md-6 text-center"></div>
            <div className="col-md-6 text-center"></div>
          </div>
        </div>
      </section>
      <section id="homepage-core-val section-bg wow fadeInUp">
        <div className="row container">

          <div className="col-md-6 text-center"></div>
          <div className="col-md-6 text-center"></div>

        </div>
      </section>
      <section id="homepage-lab section-bg wow fadeInUp">
        <div className="row container-fluid">

          <div className="col-md-12 text-center"></div>
          <div className="col-md-6 text-center"></div>

        </div>
      </section>
      <Footer
        //Section: Footer
        footer={footer}/>
    </div>);
  }
}

export default HomePage;
