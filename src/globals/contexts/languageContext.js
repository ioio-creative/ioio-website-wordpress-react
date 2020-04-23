import React from 'react';


const LanguageContext = React.createContext();

// To force remount of React element by setting the key prop
// https://stackoverflow.com/questions/45332611/react-force-re-mount-component-on-route-change/45333138
// https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905
function passLanguageToAsyncLoadingComponentFunc(languageCode, Component, additionalPropsObj = null) {
  return (props) => {
    const allPropsObj = {
      ...props,
      ...additionalPropsObj      
    };
    return (
      <Component key={Component.displayName + '-' + languageCode} languageCode={languageCode} {...allPropsObj} />
    );
  };
}

class LanguageContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: props.language
    };
    this.changeLanguageContext = this.changeLanguageContext.bind(this);
  }

  changeLanguageContext(newLanguage) {
    if (this.state.language.code !== newLanguage.code) {
      this.props.changeGlobalLocaleAndLanguageFunc(newLanguage);      
      this.setState({
        language: newLanguage
      });     
    }
  }
  
  render() {
    const props = this.props;
    const state = this.state;
    return (
      <LanguageContext.Provider 
        value={{
          language: state.language,
          messages: props.multilingualMessages[state.language.locale],
          changeLanguageContextFunc: this.changeLanguageContext 
        }}
      >
        {props.children}
      </LanguageContext.Provider>          
    );
  }
}

const LanguageContextConsumer = LanguageContext.Consumer;

export {  
  LanguageContextProvider,
  LanguageContextConsumer,
  passLanguageToAsyncLoadingComponentFunc
};
