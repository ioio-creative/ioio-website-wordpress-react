import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/home' component={HomePage} />
                    <Route path='/' component={AboutPage} />                    
                </Switch>
            </main>
        );
    }
}
  
export default Main;