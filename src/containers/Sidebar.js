import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery';
import {menuCanvas} from 'containers/SidebarMenuCanvas';

import routes from 'globals/routes';
import {fetchActiveSidebar} from 'websiteApi';
import 'containers/Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: null
    }

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount() {
    fetchActiveSidebar((aSidebar) => {
      this.setState({sidebar: aSidebar});
    });
    //  $('<canvas id="menu-canvas" width="1000px" height="500px"></canvas>').insertAfter($("#sidebar").parent().find('.menu-item').last());

  }

  handleMenuToggle(e) {

    e.preventDefault();

    let attr = $("#sidebar[class*='active']")
    //console.log(attr.length)

    $("#sidebar").toggleClass("active");
    menuCanvas();
  }

  handleMenuClose(e) {
    $("#sidebar").removeClass("active");

    window.setTimeout(function() {
      //$('html, body').scrollTop(0);
      $('html, body').animate({scrollTop: "0"});
    }, 0);
    /*

$('html, body').animate({
  scrollTop: 0
}, 1500, 'easeInOutExpo');
*/

  }

  render() {
    const sidebar = this.state.sidebar;
    if (sidebar === null) {
      return null;
    }
    return (<nav id="sidebar" className="menu-transition" role="navigation">

      <a id="menu-toggle" role="button" className="menu-transition" onClick={this.handleMenuToggle}>
        <h3>Index</h3>
      </a>
      <Link id="logo-toggle" role="button" className="menu-transition" to={routes.home} onClick={this.handleMenuClose}>
        {/* <img className="logo menu-transition" src={sidebar.logo_image.guid} alt=""/> */}
        <object data="img/ioio_logo-02.svg" type="image/svg+xml" className="logo menu-transition"></object>

      </Link>

      <Link className="menu-item menu-transition menu-close" to={routes.about} onClick={this.handleMenuClose}>About</Link>
      <Link className="menu-item menu-transition menu-close" to={routes.projects} onClick={this.handleMenuClose}>Projects</Link>
      <Link className="menu-item menu-transition menu-close" to={routes.contacts} onClick={this.handleMenuClose}>Contact</Link>
      <a className="menu-item menu-transition menu-language menu-close" href="#">English</a>
      <a className="menu-item menu-transition menu-language menu-close" href="#">中文</a>
      <canvas id="menu-canvas" width="1000px" height="500px"></canvas>

    </nav>);
  }
}

export default Sidebar;
