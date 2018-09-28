import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncLoadingComponent from 'components/loading/AsyncLoadingComponent';

import {LanguageContext, passLanguageToAsyncLoadingComponentFunc} from 'globals/contexts/languageContext';

import routes from 'globals/routes';

const AsyncDarkFooter = asyncLoadingComponent(() => import("./DarkFooter"));
const AsyncBrightFooter = asyncLoadingComponent(() => import("./BrightFooter"));

export default function Footer() {
  return (
    <LanguageContext.Consumer>
      {value => (
        <Switch>
          {/*
              Switch component behaves similarly to the "switch" construct
              in programming. Once a Route is matched, subsequent Routes
              will be ignored. So we should use "exact" keyword on more
              generic paths, like "/", or put more generic paths as the
              later Routes in the Route list.
          */}
          <Route path={routes.lab(false)} render={passLanguageToAsyncLoadingComponentFunc(value.language, AsyncDarkFooter)} />
          <Route render={passLanguageToAsyncLoadingComponentFunc(value.language, AsyncBrightFooter)} />
        </Switch>
      )}
    </LanguageContext.Consumer>
  );
}
