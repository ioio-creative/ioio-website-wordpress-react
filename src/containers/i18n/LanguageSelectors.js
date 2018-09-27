import React from 'react';
import LanguageSelectorRenderer from 'components/i18n/LanguageSelectorRenderer';
import {languages} from 'globals/config';

function LanguageSelector(props) {
  // LanguageSelectorRenderer uses a render prop.
  return <LanguageSelectorRenderer
    language={props.language}
    render={({currentLanguage, selectLanguageFunc}) => {
      const isCurrentLanguageClass = (currentLanguage.code === props.language.code? 'current-language ':'');
      return (
        <a 
          className={isCurrentLanguageClass + "menu-item menu-transition menu-language menu-close"}
          onClick={selectLanguageFunc}>
          {props.labelText}
        </a>
      );
    }}
  />;
}

export default function LanguageSelectors() { 
  return null;
  return (
    <div className="language-selector">
      <LanguageSelector language={languages.english} labelText='English' />
      <LanguageSelector language={languages.traditionalChinese} labelText='中文' />
    </div>
  );
}