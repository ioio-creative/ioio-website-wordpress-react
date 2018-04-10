import React, { Component } from 'react';

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
            about: {}
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
        return (
            <div>
                <h2>This is a about page!</h2>
                <div>{about.page_title}</div>
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