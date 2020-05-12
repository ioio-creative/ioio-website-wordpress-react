import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import $ from 'jquery';

import { menuCanvas } from 'containers/SidebarMenuCanvas';
import WorkWorkLabSwitch from 'containers/workLabSwitch/WorkWorkLabSwitch';
import WorkWorkLabSwitchForMobile from 'containers/workLabSwitch/WorkWorkLabSwitchForMobile';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
import LanguageSelectors from 'containers/i18n/LanguageSelectors';

import routes from 'globals/routes';
import { fetchActiveBrightSidebar } from 'websiteApi';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';

import './BrightSidebar.scss';

function SocialMedia({ items }) {
  const social_media_items = items.map((item, index) => {
    return (
      <a href={item.link} key={index} className='youtube'>
        {item.my_name}
      </a>
    );
  });

  return <div>{social_media_items}</div>;
}

function BrightSidebar({
  location: { pathname: locationPathname },
  addresses
}) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [whiteBg, setWhiteBg] = useState(false);

  // event handlers
  const handleMenuToggle = useCallback(
    e => {
      e.preventDefault();

      setIsOpenSidebar(currentState => !currentState);
      menuCanvas(true);
    },
    [setIsOpenSidebar, menuCanvas]
  );

  const handleMenuClose = useCallback(
    e => {
      setIsOpenSidebar(false);

      window.setTimeout(function () {
        //$('html, body').scrollTop(0);
        $('html, body').animate({ scrollTop: '0' });
      }, 0);
    },
    [setIsOpenSidebar]
  );

  // methods
  const checkCurrentPageNeedWhiteBg = useCallback(
    _ => {
      //console.log(routes.about(false));
      switch (locationPathname) {
        case routes.about(false):
        case routes.contacts(false):
        case routes.projects(false):
          setWhiteBg(true);
          break;
        default:
          setWhiteBg(false);
      }
    },
    [locationPathname, setWhiteBg, routes]
  );

  // fetch footer info from api
  const [sidebar, setSidebar] = useState(null);
  useEffect(_ => {
    fetchActiveBrightSidebar(aSidebar => {
      setSidebar(aSidebar);
    });
    checkCurrentPageNeedWhiteBg();
  }, []);

  // component did update
  useEffect(
    _ => {
      checkCurrentPageNeedWhiteBg();
    },
    [locationPathname]
  );

  // render
  if (sidebar === null) {
    return <MyFirstLoadingComponent isLoading={true} />;
  }

  return (
    <nav
      id='sidebar'
      className={`menu-transition${isOpenSidebar ? ' active' : ''}${
        whiteBg ? ' white-bg' : ''
      }`}
      role='navigation'
    >
      <a
        id='menu-toggle'
        role='button'
        className='menu-transition'
        onClick={handleMenuToggle}
      >
        <div id='menu-toggle-div'>
          <h3>
            <FormattedMessage
              id='BrightSidebar.indexButton'
              defaultMessage='Index'
            />
          </h3>
        </div>
        <div className='close-symbol' />
      </a>

      <Link
        id='logo-toggle'
        role='button'
        className='menu-transition'
        to={routes.home(true)}
        onClick={handleMenuClose}
      >
        <img
          className='logo menu-transition'
          src={sidebar.logo_image.guid}
          alt='IOIO logo'
        />
        <h4 id='sidebar-top-logo-text'>
          <FormattedMessage
            id='BrightSidebar.companyName'
            defaultMessage='IOIO CREATIVE'
          />
        </h4>
      </Link>

      <div className='work-work-lab-switch-container'>
        <WorkWorkLabSwitch
          backgroundColor='white'
          color='black'
          onClick={handleMenuClose}
          showDelay='1s'
        />
      </div>

      <div className='work-work-lab-switch-for-mobile-container'>
        <WorkWorkLabSwitchForMobile onClick={handleMenuClose} />
      </div>

      <div className='container-fluid'>
        <Link
          className='menu-item menu-transition menu-close'
          to={routes.about(true)}
          onClick={handleMenuClose}
        >
          <FormattedMessage
            id='BrightSidebar.aboutButton'
            defaultMessage='About'
          />
        </Link>
        <br />
        <Link
          className='menu-item menu-transition menu-close'
          to={routes.projects(true)}
          onClick={handleMenuClose}
        >
          <FormattedMessage
            id='BrightSidebar.projectsButton'
            defaultMessage='Project'
          />
        </Link>
        <br />
        <Link
          className='menu-item menu-transition menu-close'
          to={routes.contacts(true)}
          onClick={handleMenuClose}
        >
          <FormattedMessage
            id='BrightSidebar.contactButton'
            defaultMessage='Contact'
          />
        </Link>

        <br />
        <LanguageSelectors />
        <canvas id='menu-canvas' width='1000px' height='500px' />

        <div className='container-fluid info-section'>
          <div className='row'>
            <div className='col-lg-3 col-md-3 sidebar-contact-method'>
              {sidebar.email}
            </div>
            <div className='col-lg-9 col-md-9' />
            {isNonEmptyArray(addresses) &&
              addresses.map(address => {
                return (
                  <div
                    key={address.display_title}
                    className='col-lg-3 col-md-3 sidebar-info'
                  >
                    <h4 className='sidebar-info-title'>
                      {address.display_title}
                    </h4>
                    <p className='sidebar-info-detail'>{address.detail}</p>
                    <p className='sidebar-info-phone'>{address.phone}</p>
                  </div>
                );
              })}
            {/* <div className="col-lg-3 col-md-3 ">
              <div className="social-links">
                <SocialMedia items={sidebar.social_media}/>
              </div>
            </div> */}
            {/* <div className="col-lg-3 col-md-3 sidebar-hiring">
              <h4>
                {sidebar.hiring_title}
              </h4>
              <p>
                {sidebar.hiring_description}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(BrightSidebar);
