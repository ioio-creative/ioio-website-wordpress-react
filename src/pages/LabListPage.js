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
              <div className="about01-img text-right">
                <img id="img-hotpot" src={a.hotpot_image.guid} alt="" className="img-fluid"/>
                <img id="img-meet" src={a.meat_image.guid} alt="" className="img-fluid"/>
                <img id="img-fish" src={a.fish_image.guid} alt="" className="img-fluid"/>
              </div>
              <h3>{a.page_title}</h3>
              <h1>{a.page_subtitle}</h1>
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
