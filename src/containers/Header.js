import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import routes from 'globals/routes';

class Header extends Component {
  render() {
    return (<div>
      {/*
          <header>
          <nav>
          <ul>
          <li><Link to={routes.home}>Home</Link></li>
          <li><Link to={routes.about}>About</Link></li>
          <li><Link to={routes.projects}>Projects</Link></li>
          <li><Link to={routes.contacts}>Contacts</Link></li>
        </ul>
      </nav>
    </header>
    */
      }
    </div>);
  }
}

export default Header;
