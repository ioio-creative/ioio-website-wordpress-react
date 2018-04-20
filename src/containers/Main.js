import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import ProjectListPage from 'pages/ProjectListPage';
import ProjectDetailPage from 'pages/ProjectDetailPage';
import ContactsPage from 'pages/ContactsPage';
import NotFoundPage from 'pages/NotFoundPage'

import routes from 'globals/routes';

class Main extends Component {
    render() {
        return (
          <div id="scroller">
            <main id="main">
                {/*
                    Switch component behaves similarly to the "switch" construct
                    in programming. Once a Route is matched, subsequent Routes
                    will be ignored. So we should use "exact" keyword on more
                    generic paths, like "/", or put more generic paths as the
                    later Routes in the Route list.
                */}
                <Switch>
                    <Route exact path={routes.home} component={HomePage} />
                    <Route exact path={routes.about} component={AboutPage} />
                    <Route exact path={routes.projectBySlug} component={ProjectDetailPage} />
                    <Route path={routes.projects} component={ProjectListPage} />
                    <Route path={routes.contacts} component={ContactsPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </main>
          </div>
        );
    }
}

export default Main;
