import React, { Component } from 'react';
//import {Link} from 'react-router-dom';

import {usedLanguagesArray} from 'globals/config';

import {LanguageContextConsumer} from 'globals/contexts/languageContext';

import nav from 'utils/history/nav';
import insertParamToQueryInCurrentUrl from 'utils/queryString/insertParamToQueryInCurrentUrl';

function TestLanguageButton(props) {
  const language = props.language;
  // const newUrl = insertParamToQueryInCurrentUrl('lang', language.code);
  // <Link to={newUrl}>props.language.code</Link>
  return !language.isUsed ? null : (
    <button onClick={props.handleLanguageButtonClickFunc}>{language.code}</button>    
  );
}

class TestLanguageSelector extends Component {
  constructor(props) {
    super(props);
    this.handleLanguageButtonClick.bind(this);
  }

  handleLanguageButtonClick(language, changeLanguageContextFunc) {
    const newUrl = insertParamToQueryInCurrentUrl('lang', language.code);
    nav(newUrl);    
    changeLanguageContextFunc(language);
  }

  render() {
    return (
      <LanguageContextConsumer>
        { 
          value => (
            <div className="lang-switch">
              {
                usedLanguagesArray.map(lang => (
                  <TestLanguageButton 
                    key={lang.code}
                    language={lang}
                    handleLanguageButtonClickFunc={() => this.handleLanguageButtonClick(lang, value.changeLanguageContextFunc)}
                  />
                ))
              }
            </div>
          )
        }
      </LanguageContextConsumer>
    );
  }
}

export default TestLanguageSelector;