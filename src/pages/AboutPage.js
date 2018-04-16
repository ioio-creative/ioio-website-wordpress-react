import React, {Component} from 'react';

import About01 from 'containers/about/About01';
import About02 from 'containers/about/About02';
import About03 from 'containers/about/About03';
import About04 from 'containers/about/About04';
import About05 from 'containers/about/About05';
import About06 from 'containers/about/About06';
import About07 from 'containers/about/About07';
import About08 from 'containers/about/About08';
import Footer from 'containers/Footer';
import Scripts from 'containers/Scripts';

// import CompanyDnas from 'containers/about/CompanyDnas';
// import CompanyCultures from 'containers/about/CompanyCultures';
// import TeamMembers from 'containers/about/TeamMembers';
// import CompanyServices from 'containers/about/CompanyServices';
// import CompanyClients from 'containers/about/CompanyClients';
// import PressReleases from 'containers/about/PressReleases';
// import Company from 'containers/about/Company';

import {fetchAbouts, fetchFooter} from 'websiteApi';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: null
    }
  }

  componentDidMount() {
    fetchAbouts((abouts) => {
      this.setState({about: abouts[0]});
    });
    fetchFooter((footers) => {
      this.setState({footer: footers[0]});
    });
    <Scripts/>
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

      <About01
        //Section: title
        about={about}/>

      <About02
        //Section: video
        about={about}/>

      <About03
        //Section: core-value
        about={about}/>

      <About04
        // Section: SlideShow
        about={about}/>

      <About05
        // Section: The-team
        about={about}/>

      <About06
        //Section: Services
        about={about}/>

      <About07
        //Section: Clients
        about={about}/>

      <About08
        //Section: Press
        about={about}/>

      <Footer
        //Section: Footer
        footer={footer}/> {/*
      <CompanyCultures/>
      <TeamMembers/>
      <CompanyServices/>
      <CompanyClients/>
      <PressReleases/>
      <Company/>
  */
      }
    </div>);
  }
}

export default AboutPage;
