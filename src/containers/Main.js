import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncLoadingComponent from 'components/loading/AsyncLoadingComponent';
/**
 * !!!Note!!!
 * No need to use withTracker any more as Google Tag Manager automatically do it for me!
 * https://www.twinword.com/blog/google-tag-manager-need-website/
 * Tag Manager can listen to browser history changes!
 */
//import asyncLoadingComponentWithTracker from 'components/loading/AsyncLoadingComponentWithTracker';

import './Main.css';

import {
  LanguageContextConsumer,
  passLanguageToAsyncLoadingComponentFunc
} from 'globals/contexts/languageContext';

import routes from 'globals/routes';

import P5SketchTrialPage from 'pages/P5SketchTrialPage';

// Code Splitting and React Router v4
// https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
const AsyncHomePage = asyncLoadingComponent(() => import('pages/HomePage'));
const AsyncAboutPage = asyncLoadingComponent(() => import('pages/AboutPage'));
const AsyncAboutLabPage = asyncLoadingComponent(() =>
  import('pages/AboutLabPage')
);
const AsyncProjectListPage = asyncLoadingComponent(() =>
  import('pages/ProjectListPage')
);
const AsyncProjectDetailPage = asyncLoadingComponent(() =>
  import('pages/ProjectDetailPage')
);
const AsyncLabListPage = asyncLoadingComponent(() =>
  import('pages/LabListPage')
);
const AsyncLabDetailPage = asyncLoadingComponent(() =>
  import('pages/LabDetailPage')
);
const AsyncContactsPage = asyncLoadingComponent(() =>
  import('pages/ContactsPage')
);
const AsyncContactsLabPage = asyncLoadingComponent(() =>
  import('pages/ContactsLabPage')
);
const AsyncTappingPage = asyncLoadingComponent(() =>
  import('pages/TappingPage')
);
const AsyncHoppingPage = asyncLoadingComponent(() =>
  import('pages/Prototype2Page')
);
const AsyncSonar2019Page = asyncLoadingComponent(() =>
  import('pages/Sonar2019Page')
);
const AsyncSchoolVR = asyncLoadingComponent(() => import('pages/SchoolVR'));
const AsyncCovBattle = asyncLoadingComponent(() =>
  import('pages/CovBattle/index')
);
const AsyncNotFoundPage = asyncLoadingComponent(() =>
  import('pages/NotFoundPage')
);

const Main = _ => {
  return (
    <LanguageContextConsumer>
      {value => {
        const langCode = value.language.code;
        return (
          <div id='scroller'>
            <main id='main'>
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
                <Route
                  exact
                  path={routes.home(false)}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncHomePage
                  )}
                />
                <Route
                  path={routes.about(false)}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncAboutPage
                  )}
                />
                <Route
                  path={routes.labAbout(false)}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncAboutLabPage
                  )}
                />
                <Route
                  path={routes.labContacts(false)}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncContactsLabPage
                  )}
                />
                <Route
                  exact
                  path={routes.projectBySlug}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncProjectDetailPage
                  )}
                />
                <Route
                  path={routes.projects(false)}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncProjectListPage
                  )}
                />
                <Route
                  exact
                  path={routes.labBySlug}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncLabDetailPage
                  )}
                />
                <Route
                  path={routes.lab(false)}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncLabListPage
                  )}
                />
                <Route
                  path={routes.contacts(false)}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncContactsPage
                  )}
                />
                <Route
                  path={routes.tapping}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncTappingPage
                  )}
                />
                <Route
                  path={routes.hopping}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncHoppingPage
                  )}
                />
                <Route
                  path={routes.sonar2019}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncSonar2019Page
                  )}
                />
                <Route
                  path={routes.schoolVR}
                  render={passLanguageToAsyncLoadingComponentFunc(
                    langCode,
                    AsyncSchoolVR
                  )}
                />
                <Route
                  path={routes.winningTheFlu(false)}
                  component={AsyncCovBattle}
                />
                <Route path='/trial' component={P5SketchTrialPage} />
                <Route component={AsyncNotFoundPage} />
              </Switch>
            </main>
          </div>
        );
      }}
    </LanguageContextConsumer>
  );
};

export default Main;
