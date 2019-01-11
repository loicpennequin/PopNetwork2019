import React, { Component } from 'react';
import { subscribe } from 'daria-store';
import LoginForm from 'components/Auth/LoginForm/LoginForm';

function mapStoreToProps(store) {
    return {
        authenticated: store.authenticated
    };
}

// @subscribe(mapStoreToProps)
class Home extends Component {
    static pageConfig = {
        name: 'Home',
        path: '/',
        exact: true,
        authLevel: 'public'
    };

    render() {
        const { authenticated } = this.props;

        return (
            <>
                <LoginForm />
            </>
        );
    }
}

export default Home;
