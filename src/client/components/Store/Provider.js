// store/UserProvider.js
import React, { createContext, useState, memo } from 'react';

export const StoreContext = createContext({});

// We need a reference to the state outside of the component to access it with hetState() otherwise we get the un-memoized verison of the state which is an empty object.
let _state = {};
const getState = () => _state;
const _setState = newState => {
    console.log(newState);
    _state = { ..._state, ...newState };
    setState(_state);
};

const RenderPure = memo(({ children }) => children);

const makeStore = (props, state, setState) => {
    const stateUpdateFns = Object.entries(props)
        .filter(([key, value]) => {
            return typeof value === 'function';
        })
        .reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: async (...args) => setState(await value(...args)(state))
            }),
            {}
        );

    const initialState = {
        ...props,
        ...stateUpdateFns,
        setState: newState => setState(newState)
    };
    return initialState;
};

const Provider = props => {
    const _setState = (...args) => setState(...args);
    const [state, setState] = useState(makeStore(props, state, _setState));

    return (
        <StoreContext.Provider value={state}>
            <RenderPure>{props.children}</RenderPure>
        </StoreContext.Provider>
    );
};

export default Provider;
