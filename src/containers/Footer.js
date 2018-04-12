import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Footer extends Component {
  render() {
    return (<footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-info">
              <h3 className="footer-slogan">Bring your food,
                <br/>Join us on the table.</h3>
            </div>
            <div className="col-lg-3 col-md-6 footer-img"></div>
            <div className="col-lg-3 col-md-6 footer-contact">
              <p>
                Unit A802, 8/F, Tai Chiap Factory<br/>
                Building, 17 Yuk Yat St,<br/>
                To Kwa Wan, Kowloon<br/>
                <br/>
                <strong>Tel: (852) 3709 8437</strong>
                <br/>
                <strong>Info@Ioiocreative.com</strong>
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
