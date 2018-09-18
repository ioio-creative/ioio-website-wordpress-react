import React, {Component} from 'react';
//import logo from '../images/logo.svg';
import './App.css';

import {IntlProvider} from "react-intl";
import {LanguageContextProvider, globalLanguage} from 'globals/contexts/languageContext';

// Our translated strings
import localeData from '../src/locales/data.json';

import Main from 'containers/Main';
import Sidebar from 'containers/sidebar/Sidebar';
import Header from 'containers/header/Header';
import TestLanguageSelector from 'containers/test/TestLanguageSelector';

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




// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;




class App extends Component {
  constructor(props) {
    super(props);

    initializeReactGa();
  }

  componentDidMount() {
    loadJSFiles();
  }

  render() {
// <IntlProvider locale={globalLanguage} messages={messages}>

    return (                
        <LanguageContextProvider>        
          <Sidebar />
          <Header />
          <Main />
          <TestLanguageSelector />
        </LanguageContextProvider>      
    );
  }
}

export default App;
