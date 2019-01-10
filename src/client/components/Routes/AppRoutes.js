import React from 'react';
import { Switch, Route } from 'react-router-dom';
import pages from './../../pages';

const AppRoutes = () => (
    <Switch>
        {pages.map(Page =>
            <Route exact path={Page.path} component={Page} />
        )}
    </Switch>
)

export default AppRoutes;
