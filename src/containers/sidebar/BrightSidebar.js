import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import $ from 'jquery';

import {menuCanvas} from 'containers/SidebarMenuCanvas';
import WorkWorkLabSwitch from 'containers/workLabSwitch/WorkWorkLabSwitch';
import WorkWorkLabSwitchForMobile from 'containers/workLabSwitch/WorkWorkLabSwitchForMobile';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
import LanguageSelectors from 'containers/i18n/LanguageSelectors';

import routes from 'globals/routes';
import {fetchActiveBrightSidebar} from 'websiteApi';

import {isSmallerThanOrEqualToSmallViewport} from 'utils/ui/viewport';

import './BrightSidebar.scss';


function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (<a href={item.link} key={index} className="youtube">{item.my_name}</a>);
  });

  return (
    <div>
      {social_media_items}
    </div>
  );
}

class BrightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: null,
      isOpenSidebar: false,
      isUseMobileWorkWorkLabSwitch: false
    };

    [
      // methods
      'checkIsUseMobileWorkWorkLabSwitch',

      // event handlers
      'handleWindowResize',
      'handleMenuToggle',
      'handleMenuClose',
    ].forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });    
  }


  /* react lifecycles */

  componentDidMount() {
    fetchActiveBrightSidebar((aSidebar) => {
      this.setState({sidebar: aSidebar});
    });

    this.checkIsUseMobileWorkWorkLabSwitch();
    
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  /* end of react lifecycles */


  /* methods */

  checkIsUseMobileWorkWorkLabSwitch() {
    this.setState({
      isUseMobileWorkWorkLabSwitch: isSmallerThanOrEqualToSmallViewport()
    });
  }

  /* end of methods */


  /* event handlers */

  handleWindowResize() {
    this.checkIsUseMobileWorkWorkLabSwitch();
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

  /* end of event handlers */


  render() {
    const {
      sidebar, isOpenSidebar, isUseMobileWorkWorkLabSwitch
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
          <div className="close-symbol" />
        </a>

        <Link id="logo-toggle" role="button" className="menu-transition" to={routes.home(true)} onClick={this.handleMenuClose}>
          <img className="logo menu-transition" src={sidebar.logo_image.guid} alt="IOIO logo" />
          <h4 id="sidebar-top-logo-text">
            <FormattedMessage
              id="BrightSidebar.companyName"
              defaultMessage="IOIO CREATIVE"
            />
          </h4>
        </Link>

        {
          !isUseMobileWorkWorkLabSwitch && isOpenSidebar &&          
          <WorkWorkLabSwitch
            backgroundColor='white'
            color='black'
            onClick={this.handleMenuClose}
          />          
        }

        {
          isUseMobileWorkWorkLabSwitch &&
          <WorkWorkLabSwitchForMobile onClick={this.handleMenuClose} />
        }        

        <div className="container-fluid ">
          <Link className="menu-item menu-transition menu-close" to={routes.about(true)} onClick={this.handleMenuClose}>
            <FormattedMessage
              id="BrightSidebar.aboutButton"
              defaultMessage="About"
            /> 
          </Link>
          <br />
          <Link className="menu-item menu-transition menu-close" to={routes.projects(true)} onClick={this.handleMenuClose}>
            <FormattedMessage
              id="BrightSidebar.projectsButton"
              defaultMessage="Project"
            />
          </Link>
          <br />
          <Link className="menu-item menu-transition menu-close" to={routes.contacts(true)} onClick={this.handleMenuClose}>
            <FormattedMessage
              id="BrightSidebar.contactButton"
              defaultMessage="Contact"
            />          
          </Link>
          
          <br />
          <LanguageSelectors />
          <canvas id="menu-canvas" width="1000px" height="500px" />

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

export default BrightSidebar;
