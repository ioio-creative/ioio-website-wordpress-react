import React, {Component} from 'react';
import {Link} from 'react-router-dom'

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (
      <a href={item.link} key={index} className="youtube">{item.my_name}</a>
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
    var f = this.props.footer
    return (<footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-info">
              <h3 className="footer-slogan">{f.slogan}</h3>
            </div>
            <div className="col-lg-3 col-md-6 footer-img"></div>
            <div className="col-lg-3 col-md-6 footer-contact">
              <p>
                {f.address}
                <br/>
                <br/>
                <strong>{f.phone}</strong>
                <br/>
                <strong>{f.email}</strong>
                <br/>
              </p>
            </div>
            <div className="col-lg-3 col-md-6 footer-social">
              <div className="social-links">
                <SocialMedia items={f.social_media}
                />
              </div>
            </div>
          </div>
          <img className="footer-hotpot" src={f.hotpot_image.guid} alt="alt"/>
        </div>
      </div>
    </footer>);
  }
}

export default Footer;
