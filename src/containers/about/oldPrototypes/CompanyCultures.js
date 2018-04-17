import React, { Component } from 'react';
import { fetchCompanyCultures } from 'websiteApi';

class CompanyCultures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_cultures: []
        }
    }

    componentDidMount() {
        fetchCompanyCultures((companyCultures) => {
            this.setState({
                company_cultures: companyCultures
            });
        });        
    }

    render() {
        let cultures = this.state.company_cultures.map((culture) => {
            return (
                <div key={culture.my_name}>
                    <p>{culture.my_name}</p>
                </div>
            )
        });
        return (
            <div>
                <div><strong>Company Cultures</strong></div>
                <div>
                    {cultures}
                </div>
            </div>
        );
    }
}

export default CompanyCultures;