import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Modal from 'react-modal';
import {FormattedMessage} from 'react-intl';

import './BrightFooter.css'
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import $ from 'jquery'

import {fetchActiveBrightFooter} from 'websiteApi';

Modal.setAppElement('#root');

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (
      <a target={'_blank'} href={item.link} key={index} className="youtube">
        <img className="social-media-img" src={item.icon.guid} alt={item.my_name} />
      </a>
    );
  });

  return (<div>
    {social_media_items}
  </div>);
}


class BrightFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      footer: null
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.backToTop = this.backToTop.bind(this);
  }

  componentDidMount() {
    fetchActiveBrightFooter((aFooter) => {
      this.setState({footer: aFooter});
    });
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

  backToTop(){
    console.log("go")
    window.setTimeout(function() {
      //$('html, body').scrollTop(0);
      $('html, body').animate({scrollTop: "0"},1500);
    }, 0);
  }

  render() {
    const footerInfo = this.state.footer;
    
    if (footerInfo === null) {
      return <MyFirstLoadingComponent isLoading={true} />;
      // return null;
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

    return (
      <footer id="footer" className="wow fadeIn" data-wow-delay="0.5s">
        <div className="footer-top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-3 footer-info">
                <img className="footer-hotpot-img" src={footerInfo.hotpot_image.guid} alt="alt"/>
                <h3 className="footer-slogan">{footerInfo.slogan}</h3>
              </div>
              <div className="col-md-2 footer-img"></div>
              <div className="col-md-3 footer-contact">
                <p>
                  {footerInfo.address}
                  <br/>
                  <br/>
                  <strong>{footerInfo.phone}</strong>
                  <br/>
                  <strong>{footerInfo.email}</strong>
                  <br/>
                </p>
              </div>

              <div className="col-md-2 footer-social">
                <div className="social-links">
                  <SocialMedia items={footerInfo.social_media}/>
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-3 footer-bottom-copyright">
                <FormattedMessage
                  id="BrightFooter.copyRightLabel"
                  defaultMessage="&copy;2018 IOIO LIMITED"
                />
              </div>
              <div className="col-md-3"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2 footer-bottom-links">
                <Link to="#" onClick={this.openModal} id="pop-up-terms">
                  <FormattedMessage
                    id="BrightFooter.termsAndConditionsLabel"
                    defaultMessage="TERMS & CONDITIONS"
                  />
                </Link>
                <a id="footer-join-us">
                  <FormattedMessage
                    id="BrightFooter.joinUsLabel"
                    defaultMessage="JOIN US"
                  />
                </a>
                <a className="footer-back-to-top" onClick={this.backToTop}>
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
          <div className="terms-div" contenteditable={"true"}>
            {footerInfo.terms_and_condition}
          </div>
        </Modal>
      </footer>
    );
  }
}

export default BrightFooter;
