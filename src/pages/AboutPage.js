import React, {Component} from 'react';

import About01 from 'containers/about/About01';
import About02 from 'containers/about/About02';
import About03 from 'containers/about/About03';
import About04 from 'containers/about/About04';
import About05 from 'containers/about/About05';
import About06 from 'containers/about/About06';
import ClientList from 'containers/about/ClientList';
import About08 from 'containers/about/About08';
import Footer from 'containers/footer/Footer';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import './AboutPage.css';

import {fetchActiveAbout} from 'websiteApi';


class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: null
    }
  }

  componentDidMount() {
    fetchActiveAbout((anAbout) => {
      this.setState({about: anAbout});
    });
  }

  render() {
    const about = this.state.about;
    if (about === null) {
      return <MyFirstLoadingComponent isLoading={true} />;
      // return null;
    }
    
    return (
      <div className='about-page'>
        <About01
          //Section: title
          about={about}
        />
        <About02
          //Section: video
          about={about}
        />
        <About03
          //Section: core-value
          about={about}
        />
        <About04
          // Section: SlideShow
          about={about}
        />
        <About05
          // Section: The-team
          about={about}
        />
        <About06
          //Section: Services
          about={about}
        />        
        <ClientList        
          title={about.client_section_title}
          desc={about.client_section_desc}
          clients={about.clients}
        />
        <About08
          //Section: Press
          about={about}
        />
        <Footer />
      </div>
    );
  }
}

export default(AboutPage);
