import React, { Component } from 'react';

import About01 from 'containers/about/About01';
import CompanyDnas from 'containers/about/CompanyDnas';
import CompanyCultures from 'containers/about/CompanyCultures';
import TeamMembers from 'containers/about/TeamMembers';
import CompanyServices from 'containers/about/CompanyServices';
import CompanyClients from 'containers/about/CompanyClients';
import PressReleases from 'containers/about/PressReleases';
import Company from 'containers/about/Company';

import { fetchAbouts } from 'websiteApi';

class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: null
        }
    }

    componentDidMount() {
        fetchAbouts((abouts) => {
            this.setState({
                about: abouts[0]
            });
        });
    }

    render() {
        const about = this.state.about;
        if (about === null) {
            return null;
        }
        return (
            <div>
                <h2>This is an about page!</h2>
                <div>{about.page_title}</div>
                <About01
                  hotPotImg={about.hotpot_image.guid}
                  meatImg={about.meat_image.guid}
                  fishImg={about.fish_image.guid}
                />
                <CompanyDnas />
                <CompanyCultures />
                <TeamMembers />
                <CompanyServices />
                <CompanyClients />
                <PressReleases />
                <Company />
            </div>
        );
    }
}

export default AboutPage;
