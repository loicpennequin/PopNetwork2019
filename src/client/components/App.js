import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';
import { Provider } from './Store';
import Test from './test.js';

const store = {
    greeter : 'Hello',
    name: 'Daria',
    setName : name  => state => ({name})
};

const Body = () => <p>Body</p>

const App = () => {
    Test.foo();
    return (
        <Provider {...store}>
            <Test color="red"/>
            <Body/>
        </Provider>
    );
}
export default hot(App);
