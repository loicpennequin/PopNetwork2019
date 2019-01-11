import React, { Component } from 'react';
import { useStore } from 'daria-store';
import LoginForm from 'components/Auth/LoginForm/LoginForm';

function mapStateToProps(store) {
    return {
        authenticated: store.authenticated
    };
}

const Dashboard = () => {
    const state = useStore(mapStateToProps);
    return (
        <>
            <div>I am the dashboard !</div>
            <button onClick={() => logout()}>logout</button>
        </>
    );
};

Dashboard.pageConfig = {
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    authLevel: 'private'
};

export default Dashboard;
