import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import routes from 'globals/routes';

class Sidebar extends Component {
    render() {
        return (
          <div id="sidebar" className="menu-transition" >
             <a id="menu-toggle" role="button" className="menu-transition">
                <h3>Index</h3>
             </a>
            <object data="" type="image/svg+xml" className="logo menu-transition">
             <img src="img/ioio_logo-02.png" alt="" />
             </object>
             <Link className="menu-item menu-transition menu-close" to={routes.about}>About</Link>
             <Link className="menu-item menu-transition menu-close" to={routes.projects}>Projects</Link>
             <Link className="menu-item menu-transition menu-close" to={routes.contacts}>Contacts</Link>
             <a className="menu-item menu-transition menu-language menu-close" href="#">English</a>
             <a className="menu-item menu-transition menu-language menu-close" href="#">中文</a>
          </div>
        );
    }
}

export default Sidebar;
