import React, { Component } from 'react';
import { useStore } from 'daria-store';
import LoginForm from 'components/Auth/LoginForm/LoginForm';
import { noop } from 'utils';

function mapStateToProps(store) {
    return {
        authenticated: store.authenticated
    };
}

const Home = () => {
    const state = useStore(mapStateToProps);
    return <LoginForm />;
};

Home.getInitialState = () => {};

Home.pageConfig = {
    name: 'Home',
    path: '/',
    exact: true,
    authLevel: 'public'
};

Home.getInitialState = async () => {
    noop();
};

export default Home;
