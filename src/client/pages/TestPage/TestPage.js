import React, { Component } from 'react';

class TestPage extends Component {
    static path = '/test'
    static pageName= 'TestPage'

    render() {
        return (
            <div>I am a Test Page !</div>
        );
    }

}

export default TestPage;
