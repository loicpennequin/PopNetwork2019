import React, { Component } from 'react';

class TestPage extends Component {
    static pageConfig = {
        name: 'TestPage',
        path : '/test',
        exact: true,
        authLevel: 'private'
    }

    render() {
        return (
            <div>I am a Test Page !</div>
        );
    }

}

export default TestPage;
