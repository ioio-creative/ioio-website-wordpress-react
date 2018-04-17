import React, { Component } from 'react';
import { fetchCompanyClients } from 'websiteApi';

class CompanyClients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_clients: []
        }
    }

    componentDidMount() {
        fetchCompanyClients((companyClients) => {
            this.setState({
                company_clients: companyClients
            });
        });        
    }

    render() {
        let clients = this.state.company_clients.map((client) => {
            return (
                <div key={client.my_name}>
                    <p>{client.my_name}</p>
                </div>
            )
        });
        return (
            <div>
                <div><strong>Company Clients</strong></div>
                <div>
                    {clients}
                </div>
            </div>
        );
    }
}

export default CompanyClients;