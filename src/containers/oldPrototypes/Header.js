import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import routes from 'globals/routes';

class Header extends Component {
  render() {
    return (<div>
      {/*
          <header>
          <nav>
          <ul>
          <li><Link to={routes.home(true)}>Home</Link></li>
          <li><Link to={routes.about(true)}>About</Link></li>
          <li><Link to={routes.projects(true)}>Projects</Link></li>
          <li><Link to={routes.contacts(true)}>Contacts</Link></li>
        </ul>
      </nav>
    </header>
    */
      }
    </div>);
  }
}

export default Header;
