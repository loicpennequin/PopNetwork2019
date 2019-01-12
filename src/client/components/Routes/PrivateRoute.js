import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'daria-store';
import Prefetcher from './Prefetcher.js';

const LoggedOutRoute = ({ component, ...rest }) => {
    const { authenticated } = useStore(mapStateToProps);
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
                    <Prefetcher component={component} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

function mapStateToProps(store) {
    return {
        authenticated: store.authenticated
    };
}

export default LoggedOutRoute;
