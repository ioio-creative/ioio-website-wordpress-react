import React from 'react';

import {config, languages} from 'globals/config'

let globalLanguage = config.defaultLanguage;

function getNavigatorLanguageWithRegionCode() {
  // Define user's language. Different browsers have the user locale defined
  // on different fields on the `navigator` object, so we make sure to account
  // for these different by checking all of them
  const language = (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;
    
  return language.toLowerCase();
}

getNavigatorLanguageWithRegionCode();

function getNavigatorLanguageWithoutRegionCode() {
  const language = getNavigatorLanguageWithRegionCode();

  // Split locales with a region code
  const languageWithoutRegionCode = language.split(/[_-]+/)[0];

  return languageWithoutRegionCode;
}

const LanguageContext = React.createContext({
  language: globalLanguage
});  

class LanguageContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: globalLanguage
    }
    this.changeGlobalLanguage = this.changeGlobalLanguage.bind(this);
  }

  changeGlobalLanguage(newLanguage) {
    if (this.state.language !== newLanguage) {
      globalLanguage = newLanguage;
      this.setState({
        language: newLanguage
      });
    }
  }

  render() {
    return (
      <LanguageContext.Provider 
        value={{
          language: this.state.language,
          changeGlobalLanguageFunc: this.changeGlobalLanguage
        }}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export {
  globalLanguage,
  getNavigatorLanguageWithRegionCode,
  getNavigatorLanguageWithoutRegionCode,
  LanguageContext,
  LanguageContextProvider
};

