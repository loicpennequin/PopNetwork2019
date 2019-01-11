import React, { Component } from 'react';
import { useStore } from 'daria-store';
import LoginForm from 'components/Auth/LoginForm/LoginForm';

function mapStateToProps(store) {
    return {
        authenticated: store.authenticated
    };
}

const Home = () => {
    const state = useStore(mapStateToProps);
    return <LoginForm />;
};

Home.pageConfig = {
    name: 'Home',
    path: '/',
    exact: true,
    authLevel: 'public'
};

export default Home;
