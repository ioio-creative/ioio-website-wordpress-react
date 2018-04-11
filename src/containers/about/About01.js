import React, { Component } from 'react';

class About01 extends Component {
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
        //const company = this.state.company;
        return (
          <section id="about01" className="wow">
             <div className="container text-left">
                <div className="about01-img text-right">
                   <img id="img-hotpot" src={this.props.hotPotImg} alt="" className="img-fluid" />
                   <img id="img-meet" src={this.props.meatImg} alt="" className="img-fluid" />
                   <img id="img-fish" src={this.props.fishImg} alt="" className="img-fluid" />
                </div>
                <h3>ABOUT IOIO</h3>
                <h1>TO IDENTIFY <br/>THE ALTERNATIVES</h1>
             </div>
          </section>
        );
    }
}

export default About01;
