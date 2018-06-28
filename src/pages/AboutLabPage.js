import React, {Component} from 'react';

import Footer from 'containers/footer/Footer';

import './AboutLabPage.css';

import {fetchActiveAboutLab} from 'websiteApi';

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
  }

  render() {
    const about = this.state.about;
    if (about === null) {
      return null;
    }

    return (
      <div>
        <section id="lab-about">
          <div className="container">
          <span>{about.page_subtitle}</span>
        </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default(AboutLabPage);
