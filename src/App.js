import React, {Component} from 'react';
//import logo from '../images/logo.svg';
import './App.css';

import {BrowserRouter} from 'react-router-dom';
import {IntlProvider, addLocaleData} from "react-intl";
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";

// Our translated strings
import localeData from '../src/locales/data.json';

//import WebFont from 'webfontloader';

import {LanguageContextProvider} from 'globals/contexts/languageContext';
import {config, getLanguageFromBrowserLangIdCode, getLanguageFromLanguageCode} from 'globals/config';

import Main from 'containers/Main';
import Sidebar from 'containers/sidebar/Sidebar';
import Header from 'containers/header/Header';
import TestLanguageSelector from 'containers/test/TestLanguageSelector';

import scriptjs from 'scriptjs'
import {getAbsoluteUrlsFromRelativeUrls} from 'utils/setStaticResourcesPath';
import initializeReactGa from 'utils/reactGa/initializeReactGa';
import getSearchObjectFromLocation from 'utils/queryString/getSearchObjectFromLocation';

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


function getNavigatorLanguageWithRegionCode() {
  // Define user's language. Different browsers have the user locale defined
  // on different fields on the `navigator` object, so we make sure to account
  // for these different by checking all of them
  const language = (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;
    
  return language.toLowerCase();
}

function getNavigatorLanguageWithoutRegionCode() {
  const language = getNavigatorLanguageWithRegionCode();

  // Split locales with a region code
  const languageWithoutRegionCode = language.split(/[_-]+/)[0];

  return languageWithoutRegionCode;
}

const browserLangIdCode = getNavigatorLanguageWithRegionCode();
// browserLangIdCode = 'asdg';
// console.log('language: ' + getLanguageFromBrowserLangIdCode(browserLangIdCode));
const languageCodeFromQuery = getSearchObjectFromLocation(window.location).lang;
let globalLanguage = getLanguageFromLanguageCode(languageCodeFromQuery)
 || getLanguageFromBrowserLangIdCode(browserLangIdCode) 
 || config.defaultLanguage;


// https://github.com/austintackaberry/i18n-example/blob/master/src/index.js
// https://medium.freecodecamp.org/setting-up-internationalization-in-react-from-start-to-finish-6cb94a7af725
addLocaleData([...en, ...zh]);


// https://scotch.io/@micwanyoike/how-to-add-fonts-to-a-react-project
// function loadGlobalLanugageFont() {
//   if (!globalLanguage.isFontLoaded) {
//     console.log
//     WebFont.load({
//       google: {
//         families: [globalLanguage.fontFamily, config.defaultFontFamily]
//       }
//     });
//     globalLanguage.isFontLoaded = true; 
//   }
// }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: globalLanguage,
      messages: localeData[globalLanguage.locale]
    }
    this.changeGlobalLocaleAndLanguage = this.changeGlobalLocaleAndLanguage.bind(this);
    initializeReactGa();
  }

  componentDidMount() {
    loadJSFiles();
  }

  changeGlobalLocaleAndLanguage(newLanguage) {
    if (this.state.language.code !== newLanguage.code) {
      globalLanguage = newLanguage;

      //loadGlobalLanugageFont();
      
      this.setState({
        language: globalLanguage,
        messages: localeData[globalLanguage.locale]
      });      
    }
  }

  render() {
    const state = this.state;

    /*
      Note: 
      Somehow, BrowserRouter must be inside IntlProvider for the router to work.
      It does not work when IntlProvider is inside BrowserRouter.
    */
    return (
      <IntlProvider locale={state.language.locale} messages={state.messages}>  
        <BrowserRouter>
          {/*console.log(this.props.location.pathname)*/}                 
          <LanguageContextProvider 
            language={state.language}
            multilingualMessages={localeData}
            changeGlobalLocaleAndLanguageFunc={this.changeGlobalLocaleAndLanguage}            
          >
            <Sidebar languageCode={state.language.code} />
            <Header languageCode={state.language.code} />
            <Main languageCode={state.language.code} />
            {/* <TestLanguageSelector /> */}
          </LanguageContextProvider>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

export default App;

export {
  globalLanguage,
  getNavigatorLanguageWithRegionCode,
  getNavigatorLanguageWithoutRegionCode
};
