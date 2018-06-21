import React, {Component} from 'react';
import ReactGA from 'react-ga';
//import logo from '../images/logo.svg';
import './App.css';

import Main from 'containers/Main';
import Sidebar from 'containers/Sidebar';

import scriptjs from 'scriptjs'
import {getAbsoluteUrlsFromRelativeUrls} from 'utils/setStaticResourcesPath';

import config from 'globals/config';

function loadJSFiles() {
  const loadScriptsAsync = getAbsoluteUrlsFromRelativeUrls(['lib/jquery/jquery.min.js', 'lib/wow/wow.min.js']);

  const loadScriptsLater = getAbsoluteUrlsFromRelativeUrls([
    'lib/jquery/jquery-migrate.min.js',
    'lib/bootstrap/js/bootstrap.bundle.min.js',
    'lib/owlcarousel/owl.carousel.min.js',
    'lib/easing/easing.min.js',
    'lib/superfish/hoverIntent.js',
    'lib/scrollspy/scrollspy.js',
    'lib/isotope/isotope.pkgd.min.js',
    'lib/touchSwipe/jquery.touchSwipe.min.js'
  ]);

  const loadScriptLast = getAbsoluteUrlsFromRelativeUrls(['js/loadByPage.js', 'lib/jqueryvide/jquery.vide.js']);

  scriptjs(loadScriptsAsync, () => {
    scriptjs(loadScriptsLater, () => {
      scriptjs(loadScriptLast, () => {
        console.log("Global JS Files Loaded");
      })
    })
  });
}

class App extends Component {
  constructor(props) {
    super(props);

    // https://golightlyplus.com/setup-google-analytics-react-js-apps/
    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize(config.gaTrackingId);
  }

  componentDidMount() {
    loadJSFiles();
  }

  render() {
    return (<div>
      <div id="coming-soon">
        <span className="align-middle text-center">Still preparing the pod...for your mobile</span>
        <span className="align-middle text-center">But our new site is out already in desktop view!</span>
        <br />
        <span className="align-middle contact text-center">(852) 3709-8437</span>
        <span className="align-middle contact text-center">info@ioiocreative.com</span>
        <img id="coming-soon-img" src="https://admin.ioiocreative.com/wp-content/uploads/2018/04/ezgif-5-4816e291c9.gif" alt="alt"/>
      </div>
      
      <Sidebar />
      <Main />
    </div>);
  }
}

export default App;
