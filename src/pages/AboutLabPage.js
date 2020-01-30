import React, {Component} from 'react';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import './AboutLabPage.css';
import './AboutLabPageM.css';

import {fetchActiveAboutLab} from 'websiteApi';
import $ from 'jquery';

function hello() { }

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
      return <MyFirstLoadingComponent isLoading={true} />;
    }

    return (
      <div>
        <section id="lab-about">
          <canvas id = 'c'>{hello()}</canvas>
          <div className="container">
            <span>{about.page_subtitle}</span>
          </div>
        </section>
      </div>
    );
  }
}

export default(AboutLabPage);
