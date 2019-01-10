import React from 'react';
import { Switch } from 'react-router-dom';
import pages from './../../pages';
import LoggedOutRoute from 'components/Routes/LoggedOutRoute.js';
import PrivateRoute from 'components/Routes/PrivateRoute.js';

const AppRoutes = () => (
    <Switch>
        {pages.map(Page => {
            const cfg = Page.pageConfig;
            const Route = cfg.authLevel === 'private' ? PrivateRoute : LoggedOutRoute;
            return <Route {...cfg} component={Page} key={cfg.name} />
        })}
    </Switch>
)

export default AppRoutes;
