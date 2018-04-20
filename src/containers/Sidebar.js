import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

import routes from 'globals/routes';
import { fetchActiveSidebar } from 'websiteApi';

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
            this.setState({
                sidebar: aSidebar
            });
        });
    }

    handleMenuToggle(e) {
      console.log('OPEN MENU')
      e.preventDefault();
            console.log('OPEN MENU1')
      $("#sidebar").toggleClass("active");
      console.log('OPEN MENU2')
      $("#menu-canvas").remove();
      console.log('OPEN MENU3')
      $('<canvas id="menu-canvas" width="1000px" height="500px"></canvas>').insertAfter($("#sidebar").parent().find('.menu-item').last());
      console.log('OPEN MENU4')
      $("#run-menu-canvas").remove();
            console.log('OPEN MENU5')

            $("#run-reload-js").remove();
            $('<script id="run-reload-js">reloadJS();</script>').insertAfter( '#root' );;

            console.log('OPEN MENU6')
      $('<script id="run-menu-canvas">menuCanvas();</script>').insertAfter( '#root' );;
      // $(".menu-close").click(function(e) {
      //   $("#sidebar").toggleClass("active");
      //   $("#menu-canvas").remove();
      //   reloadJS();
      // });
      //
      // $("#menu-toggle").click(function(e) {
      //   e.preventDefault();
      //   $("#sidebar").toggleClass("active");
      //   $("#menu-canvas").remove();
      //   $('<canvas id="menu-canvas" width="1000px" height="500px"></canvas>').insertAfter($("#sidebar").parent().find('.menu-item').last());
      //   menuCanvas();
      // });
    }

    handleMenuClose(e) {
            console.log('CLOSE MENU')
      $("#sidebar").toggleClass("active");

      $("#run-reload-js").remove();
      $('body').append('<script id="run-reload-js">reloadJS();</script>');

    }

    render() {
        const sidebar = this.state.sidebar;
        if (sidebar === null) {
            return null;
        }
        return (
            <div id="sidebar" className="menu-transition" >
                <a  id="menu-toggle" role="button" className="menu-transition" onClick={this.handleMenuToggle}>
                    <h3>Index</h3>

                </a>
                <img className="logo menu-transition" src={sidebar.logo_image.guid} alt="" />
              {/*  <object data={sidebar.logo_svg.guid} type="image/svg+xml" className="logo menu-transition">

            </object> */}
                <Link className="menu-item menu-transition menu-close" to={routes.about} onClick={this.handleMenuClose}>About</Link>
                <Link className="menu-item menu-transition menu-close" to={routes.projects} onClick={this.handleMenuClose}>Projects</Link>
                <Link className="menu-item menu-transition menu-close" to={routes.contacts} onClick={this.handleMenuClose}>Contacts</Link>
                <a className="menu-item menu-transition menu-language menu-close" href="#">English</a>
                <a className="menu-item menu-transition menu-language menu-close" href="#">中文</a>
            </div>
        );
    }
}

export default Sidebar;
