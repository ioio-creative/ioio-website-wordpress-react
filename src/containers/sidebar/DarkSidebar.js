import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import $ from 'jquery';

import { menuCanvas } from 'containers/SidebarMenuCanvas';
import LabWorkLabSwitch from 'containers/workLabSwitch/LabWorkLabSwitch';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
//import LanguageSelectors from 'containers/i18n/LanguageSelectors';

import routes from 'globals/routes';
import { fetchActiveDarkSidebar, fetchActiveAboutLab } from 'websiteApi';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';

import './DarkSidebar.scss';

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

function DarkSidebar({ addresses }) {
  const [sidebar, setSidebar] = useState(null);
  const [about, setAbout] = useState(null);

  // component did mount
  useEffect(_ => {
    fetchActiveDarkSidebar(aSidebar => {
      setSidebar(aSidebar);
    });
    //  $('<canvas id="menu-canvas" width="1000px" height="500px"></canvas>').insertAfter($("#dark-sidebar").parent().find('.menu-item').last());

    fetchActiveAboutLab(anAbout => {
      setAbout(anAbout);
    });
  }, []);

  // event handlers
  const handleMenuToggle = useCallback(
    e => {
      e.preventDefault();

      const attr = $("#dark-sidebar[class*='active']");

      $('#dark-sidebar').toggleClass('active');

      menuCanvas(true);
      if (attr.length === 1) {
        //console.log("close");
        $('#dark-sidebar #lab-about span').removeClass('active');
      } else {
        //console.log("open");
        $('#dark-sidebar #lab-about span').toggleClass('active');
      }
    },
    [menuCanvas]
  );

  const handleMenuClose = useCallback(e => {
    $('#dark-sidebar').removeClass('active');

    window.setTimeout(function () {
      //$('html, body').scrollTop(0);
      $('html, body').animate({ scrollTop: '0' });
    }, 0);
  }, []);

  // render
  if (sidebar === null) {
    return <MyFirstLoadingComponent isLoading={true} />;
  }

  if (about === null) {
    return <MyFirstLoadingComponent isLoading={true} />;
  }

  return (
    <nav id='dark-sidebar' className='menu-transition' role='navigation'>
      <a
        id='menu-toggle'
        role='button'
        className='menu-transition'
        onClick={handleMenuToggle}
      >
        <div id='menu-toggle-div'>
          <h3>
            <FormattedMessage
              id='DarkSidebar.aboutButton'
              defaultMessage='About'
            />
          </h3>
        </div>
        <div className='close-symbol'></div>
      </a>

      <Link
        id='logo-toggle'
        role='button'
        className='menu-transition'
        to={routes.lab(true)}
        onClick={handleMenuClose}
      >
        <img
          className='logo menu-transition'
          src={sidebar.logo_image.guid}
          alt=''
        />
        <h4 id='sidebar-top-logo-text'>
          <FormattedMessage
            id='DarkSidebar.companyName'
            defaultMessage='IOIO CREATIVE'
          />
        </h4>
      </Link>

      <section id='lab-about'>
        <div className='container'>
          <span>
            {about.page_subtitle}
            {/* <LanguageSelectors /> */}
          </span>
        </div>
      </section>

      <LabWorkLabSwitch onClick={handleMenuClose} />

      <div className='container-fluid '>
        {/*
          <Link className="menu-item menu-transition menu-close" to={routes.labAbout(true)} onClick={handleMenuClose}>About</Link><br/>
          <Link className="menu-item menu-transition menu-close" to={routes.projects(true)} onClick={handleMenuClose}>Research 0</Link><br/>
          <Link className="menu-item menu-transition menu-close" to={routes.projects(true)} onClick={handleMenuClose}>Experiment</Link><br/>
          <Link className="menu-item menu-transition menu-close" to={routes.labContacts(true)} onClick={handleMenuClose}>Contact</Link><br/>       
        */}

        <canvas id='menu-canvas' width='1000px' height='500px'></canvas>

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
            {/* <div className='col-lg-3 col-md-3 '>
              <div className='social-links'>
                <SocialMedia items={sidebar.social_media} />
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

export default DarkSidebar;
