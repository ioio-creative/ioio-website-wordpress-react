import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import $ from 'jquery';

import {menuCanvas} from 'containers/SidebarMenuCanvas';
import WorkWorkLabSwitch from 'containers/workLabSwitch/WorkWorkLabSwitch';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
import LanguageSelectors from 'containers/i18n/LanguageSelectors';

import routes from 'globals/routes';
import {fetchActiveBrightSidebar} from 'websiteApi';

import './BrightSidebar.css';

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (<a href={item.link} key={index} className="youtube">{item.my_name}</a>);
  });

  return (<div>
    {social_media_items}
  </div>);
}

class BrightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: null,
      isOpenSidebar: false
    };

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount() {
    fetchActiveBrightSidebar((aSidebar) => {
      this.setState({sidebar: aSidebar});
    });    
  }

  handleMenuToggle(e) {
    e.preventDefault();
    
    this.setState(currentState => ({
      isOpenSidebar: !currentState.isOpenSidebar
    }));

    menuCanvas(true);
  }

  handleMenuClose(e) {    
    this.setState({
      isOpenSidebar: false
    });

    window.setTimeout(function() {
      //$('html, body').scrollTop(0);
      $('html, body').animate({scrollTop: "0"});
    }, 0);

  }

  render() {
    const {
      sidebar, isOpenSidebar
    } = this.state;
    
    if (sidebar === null) {
      return <MyFirstLoadingComponent isLoading={true} />;      
    }
    
    return (
      <nav id="sidebar" className={`menu-transition ${isOpenSidebar ? 'active' : ''}`} role="navigation">
        
        <a id="menu-toggle" role="button" className="menu-transition" onClick={this.handleMenuToggle}>
          <div id="menu-toggle-div">
            <h3>
              <FormattedMessage
                id="BrightSidebar.indexButton"
                defaultMessage="Index"
              />
            </h3>
          </div>
          <div className="close-symbol"></div>
        </a>

        <Link id="logo-toggle" role="button" className="menu-transition" to={routes.home(true)} onClick={this.handleMenuClose}>
          <img className="logo menu-transition" src={sidebar.logo_image.guid} alt=""/>
          <h4 id="sidebar-top-logo-text">
            <FormattedMessage
              id="BrightSidebar.companyName"
              defaultMessage="IOIO CREATIVE"
            />
          </h4>
        </Link>

        {
          isOpenSidebar &&
          <WorkWorkLabSwitch
            backgroundColor='white'
            color='black'
            onClick={this.handleMenuClose}
          />
        }        

        <div className="container-fluid ">
          <Link className="menu-item menu-transition menu-close" to={routes.about(true)} onClick={this.handleMenuClose}>
            <FormattedMessage
              id="BrightSidebar.aboutButton"
              defaultMessage="About"
            /> 
          </Link>
          <br/>
          <Link className="menu-item menu-transition menu-close" to={routes.projects(true)} onClick={this.handleMenuClose}>
            <FormattedMessage
              id="BrightSidebar.projectsButton"
              defaultMessage="Project"
            />
          </Link>
          <br/>
          <Link className="menu-item menu-transition menu-close" to={routes.contacts(true)} onClick={this.handleMenuClose}>
            <FormattedMessage
              id="BrightSidebar.contactButton"
              defaultMessage="Contact"
            />          
          </Link>
          
          <br/>
          <LanguageSelectors />
          <canvas id="menu-canvas" width="1000px" height="500px"></canvas>

          <div className="info-section container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-3 sidebar-info">
                <h4>
                  {sidebar.bottom_section_left_title}
                </h4>
                <p>
                  {sidebar.address}
                </p>
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

export default BrightSidebar;
