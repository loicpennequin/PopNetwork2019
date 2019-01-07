import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';

function Loading() {
    return <div>Loading...</div>;
}

const Test = Loadable({
    modules: ['./TestLoadable.js'],
    webpack: () => [require.resolveWeak('./TestLoadable.js')],
    loader: () => import(/* webpackChunkName: "test" */ './TestLoadable.js'),
    loading: Loading
});

const App = () => {
    const onClick = () => {
        console.log('onclick');
    };
    const [showloadable, setShowloadable] = useState(false);
    return (
        <>
            <button onClick={() => setShowloadable(true)}>
                Show loadable component
            </button>
            {showloadable && <Test />}
        </>
    );
};

export default hot(App);
