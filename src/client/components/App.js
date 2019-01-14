import React  from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider, useStore } from 'daria-store';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { createStore } from './../store';
import AppRoutes from 'components/Routes/AppRoutes.js';
import pages from './../pages';
import { PrivateLayout, PublicLayout } from './../layouts';

if (!__IS_BROWSER__) {
    require('source-map-support').install();
}

const Router = __IS_BROWSER__ ? BrowserRouter : StaticRouter;

const App = props => {
    const initialData = props.initialData
        ? props.initialData
        : window.__INITIAL_DATA__;
    const store = createStore(initialData);


    return (
        <Provider {...store}>
            <Router location={props.location} context={{}}>
                <Layout/>
            </Router>
        </Provider>
    );
};

const Layout = () => {
    const { authenticated } = useStore(mapStateToProps);
    const ActiveLayout = authenticated ? PrivateLayout : PublicLayout;
    return (
        <ActiveLayout>
            <AppRoutes/>
        </ActiveLayout>
    );
};
function mapStateToProps(store) {
    return {
        authenticated: store.authenticated
    };
}

export default hot(App);

export { pages };
