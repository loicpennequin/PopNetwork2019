import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';
import { Provider } from 'daria-store';
import { BrowserRouter, StaticRouter, Link } from 'react-router-dom';
import { createStore } from './../store';
import AppRoutes from 'components/Routes/AppRoutes.js';
import pages from './../pages';

const Router = __IS_BROWSER__ ? BrowserRouter : StaticRouter;

const App = props => {
    const initialData = props.initialData
        ? props.initialData
        : window.__INITIAL_DATA__;
    const store = createStore(initialData);
    return (
        <Provider {...store}>
            <Router location={props.location} context={{}}>
                <div>
                    <nav>
                        {pages.map(page => (
                            <Link
                                to={page.pageConfig.path}
                                key={page.pageConfig.name}
                            >
                                {page.pageConfig.name}
                            </Link>
                        ))}
                    </nav>
                    <AppRoutes />
                </div>
            </Router>
        </Provider>
    );
};
export default hot(App);

export { pages };
