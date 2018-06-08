import React, {Component} from 'react';

//Footer
import Footer from 'containers/Footer';
import {fetchActiveFooter} from 'websiteApi';


import './LabListPage.css';


class LabListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async componentDidMount() {
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

    return (
      <div>
        <section id="lab-top" className="wow fadeIn lab-section-bg" style={bg}>
          <div className="container-fluid row text-left">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="lab-top-img text-right">
                <img id="lab-top-img1" src={/**/} alt="" className="img-fluid"/>
                <img id="lab-top-img2" src={/**/} alt="" className="img-fluid"/>
                <img id="lab-top-img3" src={/**/} alt="" className="img-fluid"/>
              </div>
              <h3>{/**/}</h3>
              <h1>{/**/}</h1>
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
