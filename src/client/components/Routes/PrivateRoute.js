import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'daria-store';

const LoggedOutRoute = ({ component: Component, ...rest }) => {
    const { authenticated } = useStore(mapStateToProps);
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
                    <Component />
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
