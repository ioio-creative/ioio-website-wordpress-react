import React, { Component } from 'react';

import {languages} from 'globals/config';

import {LanguageContext} from 'globals/contexts/languageContext';

class TestLanguageSelector extends Component {
  constructor(props) {
    super(props);
    this.handleLanguageButtonClick.bind(this);
  }

  handleLanguageButtonClick(languageCode, changeGlobalLanguageFunc) {
    changeGlobalLanguageFunc(languageCode);
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {value => (
          <div style={{position: 'fixed', top: 0, left: 50, zIndex: 2}}>
            <button onClick={() => {this.handleLanguageButtonClick(languages.english, value.changeGlobalLanguageFunc);}}>EN</button>
            <button onClick={() => {this.handleLanguageButtonClick(languages.simpliedChinese, value.changeGlobalLanguageFunc);}}>SC</button>
            <button onClick={() => {this.handleLanguageButtonClick(languages.traditionalChinese, value.changeGlobalLanguageFunc);}}>TC</button>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default TestLanguageSelector;