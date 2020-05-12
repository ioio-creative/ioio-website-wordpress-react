import './DarkFooter.scss';

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

import { useIsSmallerThanOrEqualToSmallViewport } from 'hooks/ui/viewport';

import $ from 'jquery';

import { fetchActiveDarkFooter } from 'websiteApi';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';

Modal.setAppElement('#root');

function Address({ address }) {
  return (
    <>
      <div className='address'>
        <div className='address-title'>{address.display_title}</div>
        <div className='address-detail'>{address.detail}</div>
        {address.phone && <div className='address-phone'>{address.phone}</div>}
      </div>
      <br />
    </>
  );
}

function SocialMedia(props) {
  const { items } = props;
  const social_media_items = items.map((item, index) => {
    return (
      <a target={'_blank'} href={item.link} key={index} className='youtube'>
        <img
          className='social-media-img'
          src={item.icon.guid}
          alt={item.my_name}
        />
      </a>
    );
  });

  return <div>{social_media_items}</div>;
}

function DarkFooter(props) {
  // props
  const { addresses } = props;

  // state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [footerInfo, setFooterInfo] = useState(null);

  // component did mount
  useEffect(_ => {
    fetchActiveDarkFooter(aFooter => {
      setFooterInfo(aFooter);
    });
  }, []);

  // methods
  const openModal = useCallback(
    _ => {
      setModalIsOpen(true);
    },
    [setModalIsOpen]
  );

  const afterOpenModal = useCallback(_ => {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }, []);

  const closeModal = useCallback(
    _ => {
      setModalIsOpen(false);
    },
    [setModalIsOpen]
  );

  const backToTop = useCallback(_ => {
    window.setTimeout(function () {
      //$('html, body').scrollTop(0);
      $('html, body').animate({ scrollTop: '0' }, 1500);
    }, 0);
  }, []);

  const isSmViewport = useIsSmallerThanOrEqualToSmallViewport();

  if (footerInfo === null) {
    return <MyFirstLoadingComponent isLoading={true} />;
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      height: '80vh'
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
    <footer id='dark-footer' className='wow fadeIn' data-wow-delay='0.5s'>
      <div className='footer-top'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-1'></div>
            <div className='col-md-3 footer-info'>
              <img
                className='footer-hotpot-img'
                src={footerInfo.hotpot_image.guid}
                alt='alt'
              />
              <h3 className='footer-slogan'>{footerInfo.slogan}</h3>
            </div>
            <div className='col-md-1 footer-img'></div>
            {!isSmViewport ? (
              <>
                <div className='col-md-3 footer-contact'>
                  <div className='email'>
                    <strong>{footerInfo.email}</strong>
                  </div>
                  {isNonEmptyArray(firstHalfAddresses) &&
                    firstHalfAddresses.map(address => {
                      return (
                        <Address
                          key={address.display_title}
                          address={address}
                        />
                      );
                    })}
                </div>
                <div className='col-md-3 footer-social'>
                  <div className='social-links'>
                    <SocialMedia items={footerInfo.social_media} />
                  </div>
                  <span className='footer-contact'>
                    {isNonEmptyArray(secondHalfAddresses) &&
                      secondHalfAddresses.map(address => {
                        return (
                          <Address
                            key={address.display_title}
                            address={address}
                          />
                        );
                      })}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className='col-md-3 footer-contact'>
                  <span>
                    {isNonEmptyArray(addresses) &&
                      addresses.map(address => {
                        return (
                          <Address
                            key={address.display_title}
                            address={address}
                          />
                        );
                      })}
                  </span>
                  <br />
                  <br />
                  <div className='email'>
                    <strong>{footerInfo.email}</strong>
                  </div>
                </div>
                <div className='col-md-2 footer-social'>
                  <div className='social-links'>
                    <SocialMedia items={footerInfo.social_media} />
                  </div>
                </div>
              </>
            )}
            <div className='col-md-1'></div>
          </div>
          <div className='row'>
            <div className='col-md-1'></div>
            <div className='col-md-3 footer-bottom-copyright'>
              <span>
                <FormattedMessage
                  id='DarkFooter.copyRightLabel'
                  defaultMessage='&copy;2019 IOIO LIMITED'
                />
              </span>
            </div>
            <div className='col-md-3'></div>
            <div className='col-md-2'></div>
            <div className='col-md-2 footer-bottom-links'>
              <Link to='#' onClick={openModal} id='pop-up-terms'>
                <FormattedMessage
                  id='DarkFooter.termsAndConditionsLabel'
                  defaultMessage='TERMS & CONDITIONS'
                />
              </Link>
              <a id='footer-join-us'>
                <FormattedMessage
                  id='DarkFooter.joinUsLabel'
                  defaultMessage='JOIN US'
                />
              </a>
              <a className='footer-back-to-top' onClick={backToTop}>
                <i className='ion ion-android-arrow-up'></i>
              </a>
            </div>
            <div className='col-md-1'></div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Terms Modal'
        style={customStyles}
      >
        <button
          className='video-close-btn'
          ion-button='ion-button'
          round='round'
          onClick={closeModal}
        >
          <i className='ion ion-android-close'></i>
        </button>
        <div className='terms-div'>{footerInfo.terms_and_condition}</div>
      </Modal>
    </footer>
  );
}

export default DarkFooter;
