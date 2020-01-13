import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncLoadingComponent from 'components/loading/AsyncLoadingComponent';

import routes from 'globals/routes';

const AsyncDarkHeader = asyncLoadingComponent(_ => import("./DarkHeader"));
const AsyncBrightHeader = asyncLoadingComponent(_ => import("./BrightHeader"));

export default function Header() {    
  return (
    <Switch>
      {/*
          Switch component behaves similarly to the "switch" construct
          in programming. Once a Route is matched, subsequent Routes
          will be ignored. So we should use "exact" keyword on more
          generic paths, like "/", or put more generic paths as the
          later Routes in the Route list.
      */}
      <Route path={routes.lab(false)} component={AsyncDarkHeader} />
      <Route path={routes['sonar2019']} render={null} />
      <Route path={routes['schoolVR']} render={null} />
      <Route component={AsyncBrightHeader} />
    </Switch>    
  );    
};
