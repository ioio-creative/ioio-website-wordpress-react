import React, { Component } from 'react';
import { fetchCompanyDnas } from 'websiteApi';

class CompanyDnas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_dnas: []
        }
    }

    componentDidMount() {
        fetchCompanyDnas((companyDnas) => {
            this.setState({
                company_dnas: companyDnas
            });
        });        
    }

    render() {
        let dnas = this.state.company_dnas.map((dna) => {
            return (
                <div key={dna.my_name}>
                    <p>{dna.my_name}</p>
                </div>
            )
        });
        return (
            <div>
                <div><strong>Company DNAs</strong></div>
                <div>
                    {dnas}
                </div>
            </div>
        );
    }
}

export default CompanyDnas;