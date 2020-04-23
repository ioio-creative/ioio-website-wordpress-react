import React, {Component} from 'react';

import {LanguageContextConsumer} from 'globals/contexts/languageContext';

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
    return (
      <LanguageContextConsumer>
        {
          value => {
            return this.props.render({
              currentLanguage: value.language,
              selectLanguageFunc: () => this.selectLanguage(props.language, value.changeLanguageContextFunc)
            });
          }
        }
      </LanguageContextConsumer>
    );
  }  
}

export default LanguageSelectorRenderer;