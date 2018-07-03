import React, {Component} from 'react';

import Footer from 'containers/footer/Footer';

import './AboutLabPage.css';

import {fetchActiveAboutLab} from 'websiteApi';
import {withRouter} from 'react-router'
import $ from 'jquery';

function hello() {



}
class AboutLabPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: null
    }
  }

  componentDidMount() {
    fetchActiveAboutLab((anAbout) => {
      this.setState({about: anAbout});
    });
    $('body').css("overflow", "hidden");


  }

  componentWillUnmount() {
    $('body').css("overflow", "auto");
  }

  render() {
    const about = this.state.about;
    if (about === null) {
      return null;
    }

    return (<div>
      <section id="lab-about">
        <canvas id = 'c'>{hello()}</canvas>
        <div className="container">
          <span>{about.page_subtitle}</span>
        </div>
      </section>



    </div>);
  }
}

export default(AboutLabPage);
