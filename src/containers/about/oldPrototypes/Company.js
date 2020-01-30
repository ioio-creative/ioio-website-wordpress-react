import React, { Component } from 'react';
import { fetchCompanies } from 'websiteApi';

class CompanyCultures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: null
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
        if (company === null) {
            return null;
        }
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