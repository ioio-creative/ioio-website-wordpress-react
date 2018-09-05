import React from 'react';

const languages = {
  english: "en",
  simpliedChinese: "zh",
  traditionalChinese: ""
};

const defaultLanguageParams = {
  language: languages.simpliedChinese
};

const LanguageContext = React.createContext(
  defaultLanguageParams
);

class LanguageContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageParams: defaultLanguageParams
    }
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state.languageParams}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export {
  languages,
  LanguageContext,
  LanguageContextProvider
};

