import React, { Component } from 'react';

class TestPage extends Component {
    static pageConfig = {
        name: 'TestPage',
        path : '/test',
        exact: true,
        authLevel: 'public'
    }

    render() {
        return (
            <div>I am a Test Page !</div>
        );
    }

}

export default TestPage;
