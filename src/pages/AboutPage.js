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
import CompanyDnas from 'containers/about/CompanyDnas';
import CompanyCultures from 'containers/about/CompanyCultures';
import TeamMembers from 'containers/about/TeamMembers';
import CompanyServices from 'containers/about/CompanyServices';
import CompanyClients from 'containers/about/CompanyClients';
import PressReleases from 'containers/about/PressReleases';
import Company from 'containers/about/Company';

import {fetchAbouts} from 'websiteApi';
import {fetchFooter} from 'websiteApi';

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
        page_title={about.page_title}
        page_subtitle={about.page_subtitle}
        hotPotImg={about.hotpot_image.guid}
        meatImg={about.meat_image.guid}
        fishImg={about.fish_image.guid}
      />

      <About02
        //Section: video
        feature_media={about.feature_media.guid}
        feature_media_caption={about.feature_media_caption}
        feature_media_desc={about.feature_media_desc}
      />

      <About03
        //Section: core-value
      />

      <About04
        // Section: SlideShow

      />

      <About05
        // Section: The-team
      />

      <About06
        //Section: Services
      />

      <About07
        //Section: Clients
      />

      <About08
        //Section: Press
      />

      <Footer
        //Section: Footer
        footer_slogan = {footer.slogan}
        footer_address = {footer.address}
        footer_phone = {footer.phone}
        footer_email = {footer.email}
        footer_social_media = {footer.social_media}
      />
{/*

      <CompanyCultures/>
      <TeamMembers/>
      <CompanyServices/>
      <CompanyClients/>
      <PressReleases/>
      <Company/>

  */}
    </div>);
  }
}

export default AboutPage;
