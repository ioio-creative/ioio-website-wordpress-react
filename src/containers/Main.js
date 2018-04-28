import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import routes from 'globals/routes';

// Code Splitting and React Router v4
// https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
const AsyncHomePage = asyncLoadingComponent(() => import("pages/HomePage"));
const AsyncAboutPage = asyncLoadingComponent(() => import("pages/AboutPage"));
const AsyncProjectListPage = asyncLoadingComponent(() => import("pages/ProjectListPage"));
const AsyncProjectDetailPage = asyncLoadingComponent(() => import("pages/ProjectDetailPage"));
const AsyncContactsPage = asyncLoadingComponent(() => import("pages/ContactsPage"));
const AsyncNotFoundPage = asyncLoadingComponent(() => import("pages/NotFoundPage"));

function asyncLoadingComponent(funcToImportPage) {
    return Loadable({
        loader: funcToImportPage,
        loading: LoadingComponent
    });
}

function LoadingComponent(props) {
    const { isLoading, error } = props;
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
}

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
                    <Route exact path={routes.projectBySlug} component={AsyncProjectDetailPage} />
                    <Route path={routes.projects} component={AsyncProjectListPage} />
                    <Route path={routes.contacts} component={AsyncContactsPage} />
                    <Route component={AsyncNotFoundPage} />
                </Switch>
            </main>
          </div>
        );
    }
}

export default Main;
