import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './Footer.css'
import $ from 'jquery'

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (<a href={item.link} key={index} className="youtube">{item.my_name}</a>);
  });

  return (<div>
    {social_media_items}
  </div>);
}

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footer: {}
    }
  }

  componentDidMount() {}

  render() {
    const f = this.props.footer;
    if (f === undefined || f === null) {
      return null;
    }
    return (<footer id="footer" className="wow fadeIn" data-wow-delay="0.5s">
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3 footer-info">
              <img className="footer-hotpot-img" src={f.hotpot_image.guid} alt="alt"/>
              <h3 className="footer-slogan">{f.slogan}</h3>
            </div>
            <div className="col-md-2 footer-img"></div>
            <div className="col-md-3 footer-contact">
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

            <div className="col-md-2 footer-social">
              <div className="social-links">
                <SocialMedia items={f.social_media}/>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3 footer-bottom-copyright">
              <span>&copy;2018 IOIO CREATIVE LIMITED</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-2"></div>
            <div className="col-md-2 footer-bottom-links">
              <a>TERMS & CONDITIONS</a>
              <a>JOIN US</a>
              <a className="footer-back-to-top">
                <i className="ion ion-android-arrow-up"></i>
              </a>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </footer>);
  }
}

export default Footer;
