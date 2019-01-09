import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';
import { Provider } from 'daria-store';
import Test from './test.js';

const store = {
    greeter: 'Hello',
    name: 'Daria',
    setName: name => state => ({ name })
};

const App = () => (
    <Provider {...store}>
        <Test />
    </Provider>
);

export default hot(App);
