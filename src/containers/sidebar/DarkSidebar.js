import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import $ from 'jquery';

import {menuCanvas} from 'containers/SidebarMenuCanvas';
import LabWorkLabSwitch from 'containers/workLabSwitch/LabWorkLabSwitch';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
//import LanguageSelectors from 'containers/i18n/LanguageSelectors';

import routes from 'globals/routes';
import {fetchActiveDarkSidebar, fetchActiveAboutLab} from 'websiteApi';

import './DarkSidebar.scss';

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (<a href={item.link} key={index} className="youtube">{item.my_name}</a>);
  });

  return (<div>
    {social_media_items}
  </div>);
}

class DarkSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: null,
      about: null
    };
    [
      'handleMenuToggle',
      'handleMenuClose'
    ].forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });    
  }

  componentDidMount() {
    fetchActiveDarkSidebar((aSidebar) => {
      this.setState({sidebar: aSidebar});
    });
    //  $('<canvas id="menu-canvas" width="1000px" height="500px"></canvas>').insertAfter($("#dark-sidebar").parent().find('.menu-item').last());

    fetchActiveAboutLab((anAbout) => {
      this.setState({about: anAbout});
    });

  }

  handleMenuToggle(e) {
    e.preventDefault();

    let attr = $("#dark-sidebar[class*='active']");

    $("#dark-sidebar").toggleClass("active");

    menuCanvas(true);
    if (attr.length === 1){
      //console.log("close");
      $("#lab-about span").removeClass("active");
    } else {
      //console.log("open");
      $("#lab-about span").toggleClass("active");
    }
  }

  handleMenuClose(e) {
    $("#dark-sidebar").removeClass("active");

    window.setTimeout(function() {
      //$('html, body').scrollTop(0);
      $('html, body').animate({scrollTop: "0"});
    }, 0);
  }

  render() {
    const sidebar = this.state.sidebar;
    if (sidebar === null) {
      return <MyFirstLoadingComponent isLoading={true} />;
    }

    const about = this.state.about;
    if (about === null) {
      return <MyFirstLoadingComponent isLoading={true} />;
    }

    return (
      <nav id="dark-sidebar" className="menu-transition" role="navigation">
        <a id="menu-toggle" role="button" className="menu-transition" onClick={this.handleMenuToggle}>
          <div id="menu-toggle-div">
            <h3>
              <FormattedMessage
                id="DarkSidebar.aboutButton"
                defaultMessage="About"
              />
            </h3>
          </div>
          <div className="close-symbol"></div>
        </a>

        <Link id="logo-toggle" role="button" className="menu-transition" to={routes.lab(true)} onClick={this.handleMenuClose}>
          <img className="logo menu-transition" src={sidebar.logo_image.guid} alt=""/>
          <h4 id="sidebar-top-logo-text">
            <FormattedMessage
              id="DarkSidebar.companyName"
              defaultMessage="IOIO CREATIVE"
            />
          </h4>
        </Link>

        <section id="lab-about">
          <div className="container">
            <span>
              {about.page_subtitle}
              {/* <LanguageSelectors /> */}
            </span>
          </div>
          
        </section>

        <LabWorkLabSwitch onClick={this.handleMenuClose} />

        <div className="container-fluid ">
          
          {/*
            <Link className="menu-item menu-transition menu-close" to={routes.labAbout(true)} onClick={this.handleMenuClose}>About</Link><br/>
            <Link className="menu-item menu-transition menu-close" to={routes.projects(true)} onClick={this.handleMenuClose}>Research 0</Link><br/>
            <Link className="menu-item menu-transition menu-close" to={routes.projects(true)} onClick={this.handleMenuClose}>Experiment</Link><br/>
            <Link className="menu-item menu-transition menu-close" to={routes.labContacts(true)} onClick={this.handleMenuClose}>Contact</Link><br/>       
          */}

          <canvas id="menu-canvas" width="1000px" height="500px"></canvas>

          <div className="info-section container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-3 sidebar-info">
                <h4 dangerouslySetInnerHTML={{
                  __html: sidebar.bottom_section_left_title
                }} />
                <p dangerouslySetInnerHTML={{
                  __html: sidebar.address
                }} />
              </div>
              <div className="col-lg-3 col-md-3 sidebar-contact-method">
                <p>
                  <strong>{sidebar.phone}</strong>
                  <br/>
                  <strong>{sidebar.email}</strong>
                  <br/>
                </p>
              </div>
              <div className="col-lg-3 col-md-3 ">
                <div className="social-links">
                  <SocialMedia items={sidebar.social_media}/>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 sidebar-hiring">
                <h4>
                  {sidebar.hiring_title}
                </h4>
                <p>
                  {sidebar.hiring_description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default DarkSidebar;
