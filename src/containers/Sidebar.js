import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { asyncLoadingComponent } from 'components/loading/AsyncLoadingComponent';

import routes from 'globals/routes';

const AsyncDarkSidebar = asyncLoadingComponent(() => import("containers/DarkSidebar"));
const AsyncBrightSidebar = asyncLoadingComponent(() => import("containers/BrightSidebar"));

class Sidebar extends Component {
    render() {
        return (
          <Switch>
            {/*
                Switch component behaves similarly to the "switch" construct
                in programming. Once a Route is matched, subsequent Routes
                will be ignored. So we should use "exact" keyword on more
                generic paths, like "/", or put more generic paths as the
                later Routes in the Route list.
            */}
            <Route path={routes.lab} component={AsyncDarkSidebar} />
            <Route path={routes.aboutLab} component={AsyncDarkSidebar} />
            <Route component={AsyncBrightSidebar} />
          </Switch>
        );
    }
}

export default Sidebar;
