import React, { Component } from 'react';
//import logo from '../images/logo.svg';
import './App.css';

import Header from 'containers/Header';
import Main from 'containers/Main';
import Sidebar from 'containers/Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Main />

      </div>
    );
  }
}

export default App;
