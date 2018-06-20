import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './Footer.css'

import Modal from 'react-modal';

Modal.setAppElement('#root');

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (<a href={item.link} key={index} className="youtube"><img className="social-media-img" src={item.icon.guid} alt={item.my_name} /></a>);
  });

  return (<div>
    {social_media_items}
  </div>);
}

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      footer: {}
    }
  }



  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {}

  render() {
    const f = this.props.footer;
    if (f === undefined || f === null) {
      return null;
    }

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '60%',
        height                : '80vh',
      }
    };

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
              <span>&copy;2018 IOIO LIMITED</span>

            </div>
            <div className="col-md-3"></div>
            <div className="col-md-2"></div>
            <div className="col-md-2 footer-bottom-links">
              <Link to="#" onClick={this.openModal} id="pop-up-terms">
                TERMS & CONDITIONS
              </Link>
              <a id="footer-join-us">JOIN US</a>
              <a className="footer-back-to-top">
                <i className="ion ion-android-arrow-up"></i>
              </a>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
      <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="Terms Modal" style={customStyles}>
        <button className="video-close-btn" ion-button="ion-button" round="round" onClick={this.closeModal}>
          <i className="ion ion-android-close"></i>
        </button>
        <div className="terms-div">
          {f.terms_and_condition}
        </div>
      </Modal>
    </footer>);
  }
}

export default Footer;
