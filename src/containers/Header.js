import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header>
                <nav>                    
                    <ul>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/'>About</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li><Link to='/contacts'>Contacts</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
