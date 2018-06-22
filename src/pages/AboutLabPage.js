import React, {Component} from 'react';

import Footer from 'containers/DarkFooter';

import './AboutLabPage.css';

import {fetchActiveAboutLab, fetchActiveDarkFooter} from 'websiteApi';

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
    fetchActiveDarkFooter((aFooter) => {
      this.setState({footer: aFooter});
    });

  }

  render() {
    const about = this.state.about;
    if (about === null) {
      return null;
    }
    const footer = this.state.footer;
    if (footer === null) {
      return null;
    }

    return (<div>
      <section id="lab-about">
        <div className="container">
        <span>{about.page_subtitle}</span>
      </div>
      </section>
      {/*
      <Footer
        //Section: Footer
        footer={footer}/>
        */}
    </div>);
  }
}

export default(AboutLabPage);
