import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import routes from 'globals/routes';
import { fetchActiveSidebar } from 'websiteApi';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: null
        }
    }

    componentDidMount() {
        fetchActiveSidebar((aSidebar) => {
            this.setState({
                sidebar: aSidebar
            });
        });
    }

    render() {
        const sidebar = this.state.sidebar;
        if (sidebar === null) {
            return;
        }
        return (
            <div id="sidebar" className="menu-transition" >
                <a id="menu-toggle" role="button" className="menu-transition">
                    <h3>Index</h3>
                </a>
                <object data={sidebar.logo_svg} type="image/svg+xml" className="logo menu-transition">
                    <img src={sidebar.logo_svg} alt="" />
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
