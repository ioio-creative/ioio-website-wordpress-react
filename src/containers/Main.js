import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import ProjectsPage from 'pages/ProjectsPage';
import ContactsPage from 'pages/ContactsPage';

class Main extends Component {
    render() { console.log("TT");
        return (
          <div id="scroller">
            <main id="main">
                <Switch>//remember to put "exact on Route"
                    <Route exact path='/home' component={HomePage} />
                    <Route exact path='/' component={AboutPage} />
                    <Route exact path='/projects' component={ProjectsPage} />
                    <Route exact path='/contacts' component={ContactsPage} />
                </Switch>
            </main>
          </div>
        );
    }
}

export default Main;
