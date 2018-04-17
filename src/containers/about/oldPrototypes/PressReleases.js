import React, { Component } from 'react';
import { fetchPressReleases } from 'websiteApi';

class CompanyCultures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            press_releases: []
        }
    }

    componentDidMount() {
        fetchPressReleases((pressReleases) => {
            this.setState({
                press_releases: pressReleases
            });
        });        
    }

    render() {
        let presses = this.state.press_releases.map((press) => {
            return (
                <div key={press.my_name}>
                    <p>{press.my_name}</p>
                </div>
            )
        });
        return (
            <div>
                <div><strong>Press Releases</strong></div>
                <div>
                    {presses}
                </div>
            </div>
        );
    }
}

export default CompanyCultures;