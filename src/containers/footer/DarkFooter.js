import './DarkFooter.scss';

import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom'
import Modal from 'react-modal';
import {FormattedMessage} from 'react-intl';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import {useIsSmallerThanOrEqualToSmallViewport} from 'hooks/ui/viewport';

import $ from 'jquery'

import {fetchActiveDarkFooter} from 'websiteApi';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';

Modal.setAppElement('#root');

function SocialMedia(props) {
  const { items } = props;
  const social_media_items = items.map((item, index) => {
    return (<a target={'_blank'} href={item.link} key={index} className="youtube"><img className="social-media-img" src={item.icon.guid} alt={item.my_name} /></a>);
  });

  return (
    <div>
      {social_media_items}
    </div>
  );
}

function DarkFooter(props) {
  const {
    addresses
  } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [footerInfo, setFooterInfo] = useState(null);

  useEffect(_ => {
    fetchActiveDarkFooter((aFooter) => {
      setFooterInfo(aFooter);
    });
  }, []);

  const openModal = useCallback(_ => {
    setModalIsOpen(true);
  });

  const afterOpenModal = useCallback(_ => {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  });

  const closeModal = useCallback(_ => {
    setModalIsOpen(false);
  });

  const backToTop = useCallback(_ => {  
    window.setTimeout(function() {
      //$('html, body').scrollTop(0);
      $('html, body').animate({scrollTop: "0"}, 1500);
    }, 0);
  });

  const isSmViewport = useIsSmallerThanOrEqualToSmallViewport();

  if (footerInfo === null) {
    return <MyFirstLoadingComponent isLoading={true} />;      
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

  let firstHalfAddresses = null;
  let secondHalfAddresses = null;
  if (isNonEmptyArray(addresses)) {
    const dividingPoint = Math.ceil(addresses.length * 0.5);
    firstHalfAddresses = addresses.slice(0, dividingPoint);
    secondHalfAddresses = addresses.slice(dividingPoint);
  }    

  return (
    <footer id="dark-footer" className="wow fadeIn" data-wow-delay="0.5s">
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3 footer-info">
              <img className="footer-hotpot-img" src={footerInfo.hotpot_image.guid} alt="alt"/>
              <h3 className="footer-slogan">{footerInfo.slogan}</h3>                
            </div>
            <div className="col-md-1 footer-img"></div>
            {
              !isSmViewport
              ?
              (
                <>
                  <div className="col-md-3 footer-contact">
                    <div>
                      <strong>{footerInfo.phone}</strong>
                      <br />
                      <strong>{footerInfo.email}</strong>
                      <br />
                      <br />                  
                      <span>
                        {
                          isNonEmptyArray(firstHalfAddresses) &&
                          firstHalfAddresses.map(address => {
                            return (
                              <React.Fragment key={address.display_title}>
                                <div>
                                  <div>{address.display_title}</div>
                                  <div>{address.detail}</div>
                                </div>
                                <br />
                              </React.Fragment>
                            );
                          })
                        }
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3 footer-social">
                    <div className="social-links">
                      <SocialMedia items={footerInfo.social_media}/>
                    </div>
                    <span className='footer-contact'>
                      {
                        isNonEmptyArray(secondHalfAddresses) &&
                        secondHalfAddresses.map(address => {
                          return (
                            <React.Fragment key={address.display_title}>
                              <div>
                                <div>{address.display_title}</div>
                                <div>{address.detail}</div>
                              </div>
                              <br />
                            </React.Fragment>
                          );
                        })
                      }
                    </span>
                  </div>
                </>
              )
              :
              (
                <>
                  <div className="col-md-3 footer-contact">
                    <div>
                      <span>
                        {
                          isNonEmptyArray(addresses) &&
                          addresses.map(address => {
                            return (
                              <React.Fragment key={address.display_title}>
                                <div>
                                  <div>{address.display_title}</div>
                                  <div>{address.detail}</div>
                                </div>
                                <br />
                              </React.Fragment>
                            );
                          })
                        }
                      </span>
                      <br/>
                      <br/>
                      <strong>{footerInfo.phone}</strong>
                      <br/>
                      <strong>{footerInfo.email}</strong>
                      <br/>
                    </div>
                  </div>
                  <div className="col-md-2 footer-social">
                    <div className="social-links">
                      <SocialMedia items={footerInfo.social_media}/>
                    </div>                      
                  </div>
                </>
              )
            }
            <div className="col-md-1"></div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3 footer-bottom-copyright">
              <span>
                <FormattedMessage
                  id="DarkFooter.copyRightLabel"
                  defaultMessage="&copy;2019 IOIO LIMITED"
                />
              </span>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-2"></div>
            <div className="col-md-2 footer-bottom-links">
              <Link to="#" onClick={openModal} id="pop-up-terms">
                <FormattedMessage
                  id="DarkFooter.termsAndConditionsLabel"
                  defaultMessage="TERMS & CONDITIONS"
                />
              </Link>
              <a id="footer-join-us">
                <FormattedMessage
                  id="DarkFooter.joinUsLabel"
                  defaultMessage="JOIN US"
                />
              </a>
              <a className="footer-back-to-top" onClick={backToTop}>
                <i className="ion ion-android-arrow-up"></i>
              </a>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} contentLabel="Terms Modal" style={customStyles}>
        <button className="video-close-btn" ion-button="ion-button" round="round" onClick={closeModal}>
          <i className="ion ion-android-close"></i>
        </button>
        <div className="terms-div">
          {footerInfo.terms_and_condition}
        </div>
      </Modal>
    </footer>
  );  
}

export default DarkFooter;
