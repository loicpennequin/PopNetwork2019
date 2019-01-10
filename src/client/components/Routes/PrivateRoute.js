import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { subscribe } from 'daria-store';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component/>
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

function mapStateToProps(store){
    return {
        authenticated: store.authenticated
    };
};

export default subscribe(mapStateToProps)(PrivateRoute);
