import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import asyncLoadingComponentWithTracker from 'components/loading/AsyncLoadingComponentWithTracker';

import './Main.css';

import {LanguageContext, passLanguageToAsyncLoadingComponentFunc} from 'globals/contexts/languageContext';

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
const AsyncTappingPage = asyncLoadingComponentWithTracker(() => import("pages/TappingPage"));
const AsyncHoppingPage = asyncLoadingComponentWithTracker(() => import("pages/Prototype2Page"));
const AsyncNotFoundPage = asyncLoadingComponentWithTracker(() => import("pages/NotFoundPage"));

class Main extends Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {value => {
          const langCode = value.language.code;          
          return (
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

                    Using context to pass language as props to the element in each 
                    Route is necessary to trigger re-render of the elements when 
                    language changes
                */}
                <Switch>
                  <Route exact path={routes.home} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncHomePage)} />
                  <Route path={routes.about} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncAboutPage)} />
                  <Route path={routes.labAbout} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncAboutLabPage)} />
                  <Route path={routes.labContacts} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncContactsLabPage)} />
                  <Route exact path={routes.projectBySlug} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncProjectDetailPage)} />
                  <Route path={routes.projects} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncProjectListPage)} />
                  <Route exact path={routes.labBySlug} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncLabDetailPage)} />
                  <Route path={routes.lab} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncLabListPage)} />
                  <Route path={routes.contacts} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncContactsPage)} />
                  <Route path={routes.tapping} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncTappingPage)} />
                  <Route path={routes.hopping} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncHoppingPage)} />
                  <Route path='/trial' component={P5SketchTrialPage} />
                  <Route component={AsyncNotFoundPage} />
                </Switch>
              </main>
            </div>
        );}}
      </LanguageContext.Consumer>
    );
  }
}

export default Main;
