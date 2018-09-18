import React from 'react';

const LanguageContext = React.createContext();

function passLanguageToAsyncLoadingComponentFunc(languageCode, Component) {
  return (props) => <Component languageCode={languageCode} {...props} />
}

class LanguageContextProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    console.log(props.languageCode);
    return (
      <LanguageContext.Provider 
        value={{
          languageCode: props.languageCode,
          changeGlobalLocaleAndLanguageFunc: props.changeGlobalLocaleAndLanguageFunc
        }}>
        {this.props.children}
      </LanguageContext.Provider>          
    );
  }
}

export {  
  LanguageContext,
  LanguageContextProvider,
  passLanguageToAsyncLoadingComponentFunc
};

