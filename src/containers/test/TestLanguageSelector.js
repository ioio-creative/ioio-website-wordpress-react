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

  handleLanguageButtonClick(language, changeGlobalLocaleAndLanguageFunc) {
    nav(window.location.pathname + '?lang=' + language[1]);
    changeGlobalLocaleAndLanguageFunc(language);
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {value => (
          <div style={{position: 'fixed', top: 0, left: 50, zIndex: 2}}>
            <button onClick={() => {this.handleLanguageButtonClick(languages.english, value.changeGlobalLocaleAndLanguageFunc);}}>EN</button>
            <button onClick={() => {this.handleLanguageButtonClick(languages.simpliedChinese, value.changeGlobalLocaleAndLanguageFunc);}}>SC</button>
            <button onClick={() => {this.handleLanguageButtonClick(languages.traditionalChinese, value.changeGlobalLocaleAndLanguageFunc);}}>TC</button>
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