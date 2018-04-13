import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footer: {}
    }
  }

  render() {
    return (<footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-info">
              <h3 className="footer-slogan">{this.props.footer_slogan}</h3>
            </div>
            <div className="col-lg-3 col-md-6 footer-img"></div>
            <div className="col-lg-3 col-md-6 footer-contact">
              <p>
                {this.props.footer_address}
                <br/>
                <br/>
                <strong>{this.props.footer_phone}</strong>
                <br/>
                <strong>{this.props.footer_email}</strong>
                <br/>
              </p>
            </div>
            <div className="col-lg-3 col-md-6 footer-social">
              <div className="social-links">

                <a href="#" className="facebook">Facebook</a>
                <a href="#" className="instagram">Instagram</a>
                <a href="#" className="youtube">Youtube</a>
              </div>
            </div>
          </div>
          <img className="footer-hotpot" src="img/hotpot.png" alt="alt"/>
        </div>
      </div>
    </footer>);
  }
}

export default Footer;
