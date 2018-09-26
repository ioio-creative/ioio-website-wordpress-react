import React, {Component} from 'react';

import {LanguageContext} from 'globals/contexts/languageContext';

import nav from 'utils/history/nav';
import insertParamToQueryInCurrentUrl from 'utils/queryString/insertParamToQueryInCurrentUrl';

class LanguageSelectorRenderer extends Component {
  constructor(props) {
    super(props);
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  selectLanguage(language, changeLanguageContextFunc) {
    const newUrl = insertParamToQueryInCurrentUrl('lang', language.code);
    nav(newUrl);
    changeLanguageContextFunc(language);
  }
  
  // using a render prop.
  render() {
    const props = this.props;
    console.log(props);
    return (
      <LanguageContext.Consumer>
        {value => {
          return this.props.render({
            selectLanguageFunc: () => this.selectLanguage(props.language, value.changeLanguageContextFunc)
          });
        }}
      </LanguageContext.Consumer>
    );
  }  
}

export default LanguageSelectorRenderer;