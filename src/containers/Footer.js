import React, {Component} from 'react';
import {Link} from 'react-router-dom'

function SocialMedia(props) {

  const social_media_items = props.items.map((item) => {
    return (
      <a href={item.link} className="youtube">{item.my_name}</a>
    );
  });

  return (
    <div>
      {social_media_items}
    </div>
  );
}

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
              <h3 className="footer-slogan">{this.props.footer.slogan}</h3>
            </div>
            <div className="col-lg-3 col-md-6 footer-img"></div>
            <div className="col-lg-3 col-md-6 footer-contact">
              <p>
                {this.props.footer.address}
                <br/>
                <br/>
                <strong>{this.props.footer.phone}</strong>
                <br/>
                <strong>{this.props.footer.email}</strong>
                <br/>
              </p>
            </div>
            <div className="col-lg-3 col-md-6 footer-social">
              <div className="social-links">
                <SocialMedia items={this.props.footer.social_media}
                />
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
