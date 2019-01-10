import React, { Component } from 'react';

class Home extends Component {
    static pageConfig = {
        name: 'Home',
        path : '/',
        exact: true,
        authLevel: 'public'
    }

    render() {
        return (
            <div>I am the Home !</div>
        );
    }

}

export default Home;
