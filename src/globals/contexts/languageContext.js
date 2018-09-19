import React from 'react';

const LanguageContext = React.createContext();

// To force remount of React element by setting the key prop
// https://stackoverflow.com/questions/45332611/react-force-re-mount-component-on-route-change/45333138
// https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905
function passLanguageToAsyncLoadingComponentFunc(languageCode, Component) {
  return (props) => <Component key={Component.displayName + '-' + languageCode} languageCode={languageCode} {...props} />
}

class LanguageContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: props.languageCode
    };
    this.changeLanguageContext = this.changeLanguageContext.bind(this);
  }

  changeLanguageContext(languageCode) {
    if (languageCode !== this.state.languageCode) {
      this.setState({
        languageCode: languageCode
      });
    }
  }
  
  render() {
    const props = this.props;
    const state = this.state;
    return (
      <LanguageContext.Provider 
        value={{
          languageCode: state.languageCode,
          changeLanguageContextFunc: this.changeLanguageContext 
        }}>
        {props.children}
      </LanguageContext.Provider>          
    );
  }
}

export {  
  LanguageContext,
  LanguageContextProvider,
  passLanguageToAsyncLoadingComponentFunc
};

