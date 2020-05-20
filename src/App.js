import React, { Component } from 'react';
//import logo from '../images/logo.svg';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
//import ja from 'react-intl/locale-data/ja';

// Our translated strings
import localeData from 'locales/data.json';

//import WebFont from 'webfontloader';

import addPolyfills from 'addPolyfills';
import { LanguageContextProvider } from 'globals/contexts/languageContext';
import { AddressListContextProvider } from 'globals/contexts/addressListContext';
import {
  config,
  getLanguageFromBrowserLangIdCode,
  getLanguageFromLanguageCode
} from 'globals/config';

import Main from 'containers/Main';
import Sidebar from 'containers/sidebar/Sidebar';
import Header from 'containers/header/Header';
//import TestLanguageSelector from 'containers/test/TestLanguageSelector';

import scriptjs from 'scriptjs';
import { getAbsoluteUrlsFromRelativeUrls } from 'utils/setStaticResourcesPath';
import initializeGoogleTagManager from 'utils/tracking/initializeGoogleTagManager';
import initializeReactGa from 'utils/tracking/initializeReactGa';
import getSearchObjectFromLocation from 'utils/queryString/getSearchObjectFromLocation';
import { invokeIfIsFunction } from 'utils/js/function/isFunction';

import MyFirstLoadingComponent from 'components/loading/MyFirstLoadingComponent';

function loadJSFiles(callback) {
  console.log('loadJSFiles started.');
  const loadScriptsAsync = getAbsoluteUrlsFromRelativeUrls([
    'lib/jquery/jquery.min.js',
    'lib/wow/wow.min.js'
  ]);

  const loadScriptsLater = getAbsoluteUrlsFromRelativeUrls([
    'lib/jquery/jquery-migrate.min.js',
    'lib/bootstrap/js/bootstrap.bundle.min.js',
    //'lib/owlcarousel/owl.carousel.min.js',
    'lib/easing/easing.min.js',
    'lib/superfish/hoverIntent.js',
    'lib/scrollspy/scrollspy.js',
    'lib/touchSwipe/jquery.touchSwipe.min.js'
  ]);

  const loadScriptLast = getAbsoluteUrlsFromRelativeUrls([
    'js/loadByPage.js',
    'lib/jqueryvide/jquery.vide.js'
  ]);

  scriptjs(loadScriptsAsync, _ => {
    scriptjs(loadScriptsLater, _ => {
      scriptjs(loadScriptLast, _ => {
        console.log('loadJSFiles finished.');
        invokeIfIsFunction(callback);
      });
    });
  });
}

function getNavigatorLanguageWithRegionCode() {
  // Define user's language. Different browsers have the user locale defined
  // on different fields on the `navigator` object, so we make sure to account
  // for these different by checking all of them
  const language =
    (navigator.languages && navigator.languages[0]) ||
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
let globalLanguage =
  getLanguageFromLanguageCode(languageCodeFromQuery) ||
  getLanguageFromBrowserLangIdCode(browserLangIdCode) ||
  config.defaultLanguage;
// let globalLanguage = config.defaultLanguage;

// this is for setting language specific css
const htmlElement = document.querySelector('html');
const changeHtmlLang = newCode => {
  htmlElement.setAttribute('lang', newCode);
};
changeHtmlLang(globalLanguage.code);

// https://github.com/austintackaberry/i18n-example/blob/master/src/index.js
// https://medium.freecodecamp.org/setting-up-internationalization-in-react-from-start-to-finish-6cb94a7af725
//addLocaleData([...en, ...zh, ...ja]);
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
    // constants
    this.isWaitForGlobalJsLoaded = true;
    this.isWaitForAddPolyfills = true;
    this.state = {
      language: globalLanguage,
      messages: localeData[globalLanguage.locale],
      isGlobalJsLoaded: this.isWaitForGlobalJsLoaded ? false : true,
      isPolyfillsAdded: this.isWaitForAddPolyfills ? false : true
    };
    ['changeGlobalLocaleAndLanguage'].forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
    initializeGoogleTagManager();
    initializeReactGa();
  }

  async componentDidMount() {
    loadJSFiles(
      this.isWaitForGlobalJsLoaded
        ? _ => {
            this.setState({
              isGlobalJsLoaded: true
            });
          }
        : null
    );

    // setTimeout(_ => {
    //   if (console.clear) {
    //     console.clear();
    //   }
    //   if (console.log) {
    //     console.log('  ██    ██████\n  ██    ██  ██\n  ██    ██████\n\n  ██    ██████\n██████    ██ ▄\n  ██      ██');
    //   }
    // }, 1000);

    await addPolyfills();

    if (this.isWaitForAddPolyfills) {
      this.setState({
        isPolyfillsAdded: true
      });
    }
  }

  changeGlobalLocaleAndLanguage(newLanguage) {
    const { language } = this.state;

    if (language.code !== newLanguage.code) {
      globalLanguage = newLanguage;
      changeHtmlLang(newLanguage.code);
      //loadGlobalLanugageFont();

      this.setState({
        language: globalLanguage,
        messages: localeData[globalLanguage.locale]
      });
    }
  }

  render() {
    const { language, messages, isGlobalJsLoaded } = this.state;

    if (!isGlobalJsLoaded && !this.isPolyfillsAdded) {
      return <MyFirstLoadingComponent isLoading={true} />;
    }

    /*
      Note: 
      Somehow, BrowserRouter must be inside IntlProvider for the router to work.
      It does not work when IntlProvider is inside BrowserRouter.
    */
    return (
      <IntlProvider locale={language.locale} messages={messages}>
        <BrowserRouter>
          {/*console.log(this.props.location.pathname)*/}
          <LanguageContextProvider
            language={language}
            multilingualMessages={localeData}
            changeGlobalLocaleAndLanguageFunc={
              this.changeGlobalLocaleAndLanguage
            }
          >
            {/**
             * Note: AddressListContext is a consumer of LanguageContext
             */}
            <AddressListContextProvider>
              <Sidebar languageCode={language.code} />
              <Header languageCode={language.code} />
              <Main languageCode={language.code} />
              {/* <TestLanguageSelector /> */}
            </AddressListContextProvider>
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
