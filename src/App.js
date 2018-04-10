import React, { Component } from 'react';
//import logo from '../images/logo.svg';
import './App.css';

import Header from 'containers/Header';
import Main from 'containers/Main';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
