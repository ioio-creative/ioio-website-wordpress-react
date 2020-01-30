import React, { Component } from 'react';
import { fetchCompanyServices } from 'websiteApi';

class CompanyServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_services: []
        }
    }

    componentDidMount() {
        fetchCompanyServices((companyServices) => {
            this.setState({
                company_services: companyServices
            });
        });        
    }

    render() {
        let services = this.state.company_services.map((service) => {
            return (
                <div key={service.my_name}>
                    <p>{service.my_name}</p>
                </div>
            )
        });
        return (
            <div>
                <div><strong>Company Cultures</strong></div>
                <div>
                    {services}
                </div>
            </div>
        );
    }
}

export default CompanyServices;