import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {languages} from 'globals/config';

import {LanguageContext} from 'globals/contexts/languageContext';

import nav from 'utils/history/nav';

class TestLanguageSelector extends Component {
  constructor(props) {
    super(props);
    this.handleLanguageButtonClick.bind(this);
  }

  handleLanguageButtonClick(language, changeLanguageContextFunc) {
    nav(window.location.pathname + '?lang=' + language.code);    
    this.props.changeGlobalLocaleAndLanguageFunc(language);
    changeLanguageContextFunc(language.code);
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {value => (
          <div id="lang-switch">
            <button onClick={() => {this.handleLanguageButtonClick(languages.english, value.changeLanguageContextFunc);}}>EN</button>
            <button onClick={() => {this.handleLanguageButtonClick(languages.simpliedChinese, value.changeLanguageContextFunc);}}>SC</button>
            <button onClick={() => {this.handleLanguageButtonClick(languages.traditionalChinese, value.changeLanguageContextFunc);}}>TC</button>
            {/* <Link to={window.location.pathname + '?lang=en'}>EN</Link>
            <Link to={window.location.pathname + '?lang=sc'}>SC</Link>
            <Link to={window.location.pathname + '?lang=tc'}>TC</Link> */}
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default TestLanguageSelector;