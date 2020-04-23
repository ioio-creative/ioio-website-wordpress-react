import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import $ from 'jquery';

import {menuCanvas} from 'containers/SidebarMenuCanvas';
import WorkWorkLabSwitch from 'containers/workLabSwitch/WorkWorkLabSwitch';
import WorkWorkLabSwitchForMobile from 'containers/workLabSwitch/WorkWorkLabSwitchForMobile';
import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';
import LanguageSelectors from 'containers/i18n/LanguageSelectors';

import routes from 'globals/routes';
import {fetchActiveBrightSidebar} from 'websiteApi';

import './BrightSidebar.scss';


function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (
      <a href={item.link} key={index} className="youtube">
        {item.my_name}
      </a>
    );
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
      whiteBg: false
    };
    // console.log(this.props.location.pathname);
    [
      // methods

      // event handlers
      'handleMenuToggle',
      'handleMenuClose',
      'checkCurrentPageNeedWhiteBg',
    ].forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });   
  }


  /* react lifecycles */

  componentDidMount() {
    fetchActiveBrightSidebar((aSidebar) => {
      this.setState({sidebar: aSidebar});
    });
    this.checkCurrentPageNeedWhiteBg();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkCurrentPageNeedWhiteBg();
    }
  }
  /* end of react lifecycles */


  /* methods */
  checkCurrentPageNeedWhiteBg() {
    //console.log(routes.about(false));
    switch (this.props.location.pathname) {
      case routes.about(false):
      case routes.contacts(false):
      case routes.projects(false):
        this.setState({
          whiteBg: true
        }, _=>{
          console.log(this.state);
        })
        break;
      default: 
        this.setState({
          whiteBg: false
        })
    }
  }
  /* end of methods */


  /* event handlers */

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
      sidebar, isOpenSidebar, whiteBg
    } = this.state;

    const {
      addresses
    } = this.props;
    
    if (sidebar === null) {
      return <MyFirstLoadingComponent isLoading={true} />;      
    }
    
    return (
      <nav id="sidebar" className={`menu-transition${isOpenSidebar ? ' active' : ''}${whiteBg? ' white-bg': ''}`} role="navigation">        
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

        <div className='work-work-lab-switch-container'>
          <WorkWorkLabSwitch
            backgroundColor='white'
            color='black'
            onClick={this.handleMenuClose}
            showDelay='1s'
          />
        </div>

        <div className='work-work-lab-switch-for-mobile-container'>
          <WorkWorkLabSwitchForMobile onClick={this.handleMenuClose} />
        </div>   

        <div className="container-fluid">
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

          <div className="container-fluid info-section">
            <div className="row">
              <div className="col-lg-3 col-md-3 sidebar-info">
                <h4>{sidebar.address_title}</h4>
                <p>{sidebar.address}</p>
              </div>
              <div className="col-lg-3 col-md-3 sidebar-info">
                <h4>{sidebar.tw_address_title}</h4>
                <p>{sidebar.tw_address}</p>
              </div>
              <div className="col-lg-3 col-md-3 sidebar-info">
                <h4>{sidebar.ny_address_title}</h4>
                <p>{sidebar.ny_address}</p>
              </div>
              <div className="col-lg-3 col-md-3 sidebar-contact-method">
                <p>
                  <strong>{sidebar.phone}</strong>
                  <br />
                  <strong>{sidebar.email}</strong>
                  <br />
                </p>
              </div>
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
}

export default withRouter(BrightSidebar);
