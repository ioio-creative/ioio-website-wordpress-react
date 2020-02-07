import './LanguageSelector.scss';

import React from 'react';
import LanguageSelectorRenderer from 'components/i18n/LanguageSelectorRenderer';
import {languages} from 'globals/config';

function LanguageSelector(props) {
  // LanguageSelectorRenderer uses a render prop.
  const {
    language, labelText
  } = props;
  return (
    <LanguageSelectorRenderer
      language={language}
      render={({currentLanguage, selectLanguageFunc}) => {
        const isCurrentLanguageClass = (currentLanguage.code === language.code? 'current-language ':'');
        const allClassName = isCurrentLanguageClass + "menu-item menu-transition menu-close menu-language";
        return (
          <a 
            className={allClassName}
            onClick={selectLanguageFunc}>
            {labelText}
          </a>
        );
      }}
    />
  );
}

export default function LanguageSelectors() { 
  return (
    <div className="language-selector">
      {languages.english.isUsed && <LanguageSelector language={languages.english} labelText='English' />}
      {languages.traditionalChinese.isUsed && <LanguageSelector language={languages.traditionalChinese} labelText='中文' />}
      {languages.japanese.isUsed && <LanguageSelector language={languages.japanese} labelText='日文' />}
    </div>
  );
}