import React, {Component} from 'react';

//Footer
import Footer from 'containers/Footer';

import {fetchActiveLab, fetchActiveFooter} from 'websiteApi';

import './LabListPage.css';


class LabListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lab: null
    }
  }

  async componentDidMount() {
    fetchActiveLab((aLab) => {
      this.setState({lab: aLab});
    });

    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });
  }


  render() {
    //var a = this.props.about

  //  const url = "url('" + a.about_top_section_background_image.guid + "')"

    const bg = {
      //backgroundImage: url,
      backgroundSize: 'auto',
      backgroundPosition: 'center'
    };


    const footer = this.state.footer;
    if (footer === null) {
      return null;
    }

    const lab = this.state.lab;
    if (lab === null) {
      return null;
    }
    console.log(lab)
    return (
      <div>
        <section id="lab-top" className="wow fadeIn lab-section-bg" style={bg}>
          <div className="container-fluid row text-left">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="lab-top-img text-right">
                <img id="lab-top-img1" src={lab.top_image_1.guid} alt="" className="img-fluid"/>
                <img id="lab-top-img2" src={lab.top_image_2.guid} alt="" className="img-fluid"/>
                <img id="lab-top-img3" src={lab.top_image_3.guid} alt="" className="img-fluid"/>
              </div>
              <h3>{lab.subcaption}</h3>
              <h1>{lab.caption}</h1>
            </div>
            <div className="col-md-1"></div>
          </div>
        </section>
        <section id="lab-list">
          
        </section>
        <Footer
          footer={footer}/>
      </div>
    );
  }
}

export default LabListPage;
