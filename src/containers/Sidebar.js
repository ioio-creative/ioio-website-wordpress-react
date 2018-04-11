import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';

class Sidebar extends Component {
    render() {
        return (
          <div id="sidebar" className="wow fadeInUp menu-transition" >
             <a id="menu-toggle" href="#"  className="menu-transition">
                <h3>Index</h3>
             </a>
             <object data="img/ioio_logo-02.svg" type="image/svg+xml" className="logo menu-transition">
             <img src="img/ioio_logo-02.png" alt="" />
             </object>
             <Link className="menu-item menu-transition" to='/'>About</Link>
             <Link className="menu-item menu-transition" to='/projects'>Projects</Link>
             <Link className="menu-item menu-transition" to='/contacts'>Contacts</Link>
             <a className="menu-item menu-transition menu-language" href="#">English</a>
             <a className="menu-item menu-transition menu-language" href="#">中文</a>
          </div>
        );
    }
}

export default Sidebar;
