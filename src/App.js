import React, {Component} from 'react';
//import logo from '../images/logo.svg';
import './App.css';
import {Link} from 'react-router-dom'
import routes from 'globals/routes';

import Main from 'containers/Main';
import Sidebar from 'containers/sidebar/Sidebar';

import scriptjs from 'scriptjs'
import {getAbsoluteUrlsFromRelativeUrls} from 'utils/setStaticResourcesPath';
import initializeReactGa from 'utils/reactGa/initializeReactGa';

function loadJSFiles() {
  const loadScriptsAsync = getAbsoluteUrlsFromRelativeUrls(['lib/jquery/jquery.min.js', 'lib/wow/wow.min.js']);

  const loadScriptsLater = getAbsoluteUrlsFromRelativeUrls([
    'lib/jquery/jquery-migrate.min.js',
    'lib/bootstrap/js/bootstrap.bundle.min.js',
    'lib/owlcarousel/owl.carousel.min.js',
    'lib/easing/easing.min.js',
    'lib/superfish/hoverIntent.js',
    'lib/scrollspy/scrollspy.js',
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

    initializeReactGa();
  }

  componentDidMount() {
    loadJSFiles();
  }

  render() {
    return (
      <div>
        <Link id="lab-work-lab-switch" role="button" to={routes.home}>
          <h4 id="work-lab-switch">Work</h4>
        </Link>
        <Sidebar />
        <Main />
      </div>
    );
  }
}

export default App;
