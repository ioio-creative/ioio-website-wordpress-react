import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncLoadingComponent from 'components/loading/AsyncLoadingComponent';

import routes from 'globals/routes';

import {LanguageContext, passLanguageToAsyncLoadingComponentFunc} from 'globals/contexts/languageContext';

const AsyncDarkSidebar = asyncLoadingComponent(() => import("./DarkSidebar"));
const AsyncBrightSidebar = asyncLoadingComponent(() => import("./BrightSidebar"));

export default function Sidebar() {
  return (
    <LanguageContext.Consumer>
      {value => {
        const langCode = value.language.code;
        return (
          <Switch>
            {/*
                Switch component behaves similarly to the "switch" construct
                in programming. Once a Route is matched, subsequent Routes
                will be ignored. So we should use "exact" keyword on more
                generic paths, like "/", or put more generic paths as the
                later Routes in the Route list.
            */}
            <Route path={routes.lab(false)} render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncDarkSidebar)} />
            <Route path={routes['sonar2019']} render={null} />
            <Route path={routes['schoolVR']} render={null} />
            <Route render={passLanguageToAsyncLoadingComponentFunc(langCode, AsyncBrightSidebar)} />
          </Switch>
        );
      }}
    </LanguageContext.Consumer>
  );
};
