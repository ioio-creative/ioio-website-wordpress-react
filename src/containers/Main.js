import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { asyncLoadingComponentWithTracker } from 'components/loading/AsyncLoadingComponentWithTracker';

import routes from 'globals/routes';

import P5SketchTrialPage from 'pages/P5SketchTrialPage';

// Code Splitting and React Router v4
// https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
const AsyncHomePage = asyncLoadingComponentWithTracker(() => import("pages/HomePage"));
const AsyncAboutPage = asyncLoadingComponentWithTracker(() => import("pages/AboutPage"));
const AsyncAboutLabPage = asyncLoadingComponentWithTracker(() => import("pages/AboutLabPage"));
const AsyncProjectListPage = asyncLoadingComponentWithTracker(() => import("pages/ProjectListPage"));
const AsyncProjectDetailPage = asyncLoadingComponentWithTracker(() => import("pages/ProjectDetailPage"));
const AsyncLabListPage = asyncLoadingComponentWithTracker(() => import("pages/LabListPage"));
const AsyncLabDetailPage = asyncLoadingComponentWithTracker(() => import("pages/LabDetailPage"));
const AsyncContactsPage = asyncLoadingComponentWithTracker(() => import("pages/ContactsPage"));
const AsyncNotFoundPage = asyncLoadingComponentWithTracker(() => import("pages/NotFoundPage"));

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
                  <Route exact path={routes.home} component={AsyncHomePage} />
                  <Route path={routes.about} component={AsyncAboutPage} />
                  <Route path={routes.labAbout} component={AsyncAboutLabPage} />
                  <Route path={routes.labContacts} component={AsyncContactsPage} />  {/* link to Contacts page */}
                  <Route exact path={routes.projectBySlug} component={AsyncProjectDetailPage} />
                  <Route path={routes.projects} component={AsyncProjectListPage} />
                  <Route exact path={routes.labBySlug} component={AsyncLabDetailPage} />
                  <Route path={routes.lab} component={AsyncLabListPage} />
                  <Route path={routes.contacts} component={AsyncContactsPage} />
                  <Route path='/trial' component={P5SketchTrialPage} />
                  <Route component={AsyncNotFoundPage} />
                </Switch>
            </main>
          </div>
        );
    }
}

export default Main;
