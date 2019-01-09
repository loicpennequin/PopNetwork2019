// store/UserProvider.js
import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext({});

// We need a reference to the state outside of the component to access it with hetState() otherwise we get the un-memoized verison of the state which is an empty object.
let _state = {};

const getState = () => _state;

const Provider = props => {
    const [state, setState] = useState(_state);

    const _setState = newState => {
        _state = { ..._state, ...newState };
        setState(_state);
    };

    const makeStore = () => {
        const stateUpdateFns = Object.entries(props)
            .filter(([key, value]) => {
                return typeof value === 'function';
            })
            .reduce(
                (acc, [key, value]) => ({
                    ...acc,
                    [key]: (...args) => _setState(value(...args)(state))
                }),
                {}
            );

        const initialState = {
            ...props,
            ...stateUpdateFns,
            setState: newState => _setState(newState)
        };
        _setState(initialState);
    };
    useEffect(() => makeStore(), []);

    return (
        <StoreContext.Provider value={state}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default Provider;
