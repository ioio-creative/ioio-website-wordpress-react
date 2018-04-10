import React, { Component } from 'react';
import { fetchCompanies } from 'websiteApi';

class CompanyCultures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {}
        }
    }

    componentDidMount() {
        fetchCompanies((companies) => {
            this.setState({
                company: companies[0]
            });
        });        
    }

    render() {
        const company = this.state.company;
        return (
            <div>
                <div><strong>Company</strong></div>
                <div>
                    {company.my_name}
                </div>
            </div>
        );
    }
}

export default CompanyCultures;