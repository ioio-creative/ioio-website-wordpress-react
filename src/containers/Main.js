import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncLoadingComponentWithTracker from 'components/loading/AsyncLoadingComponentWithTracker';

import './Main.css';

import {LanguageContext} from 'globals/contexts/languageContext';

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
const AsyncContactsLabPage = asyncLoadingComponentWithTracker(() => import("pages/ContactsLabPage"));
const AsyncNotFoundPage = asyncLoadingComponentWithTracker(() => import("pages/NotFoundPage"));

class Main extends Component {
  constructor(props) {
    super(props);    
    this.passLanguageToAsyncLoadingComponentFunc = this.passLanguageToAsyncLoadingComponentFunc.bind(this);
  }

  passLanguageToAsyncLoadingComponentFunc(languageObj, Component) {
    return (props) => <Component language={languageObj.language} {...props} />
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {value => (
          <div id="scroller">
            <main id="main">
                {/*
                    Switch component behaves similarly to the "switch" construct
                    in programming. Once a Route is matched, subsequent Routes
                    will be ignored. So we should use "exact" keyword on more
                    generic paths, like "/", or put more generic paths as the
                    later Routes in the Route list.

                    Pass props to a component rendered by React Router
                    https://tylermcginnis.com/react-router-pass-props-to-components/
                */}
                <Switch>
                  <Route exact path={routes.home} render={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncHomePage)} />
                  <Route path={routes.about} component={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncAboutPage)} />
                  <Route path={routes.labAbout} component={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncAboutLabPage)} />
                  <Route path={routes.labContacts} component={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncContactsLabPage)} />
                  <Route exact path={routes.projectBySlug} component={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncProjectDetailPage)} />
                  <Route path={routes.projects} component={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncProjectListPage)} />
                  <Route exact path={routes.labBySlug} component={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncLabDetailPage)} />
                  <Route path={routes.lab} component={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncLabListPage)} />
                  <Route path={routes.contacts} component={this.passLanguageToAsyncLoadingComponentFunc(value, AsyncContactsPage)} />
                  <Route path='/trial' component={P5SketchTrialPage} />
                  <Route component={AsyncNotFoundPage} />
                </Switch>
            </main>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default Main;
