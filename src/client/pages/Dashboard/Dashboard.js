import React, { Component } from 'react';
import { subscribe } from 'daria-store';

@subscribe()
class Dashboard extends Component {
    static pageConfig = {
        name: 'Dashboard',
        path: '/dashboard',
        exact: true,
        authLevel: 'private'
    };

    render() {
        return <div>I am the dashboard !</div>;
    }
}

export default TestPage;
