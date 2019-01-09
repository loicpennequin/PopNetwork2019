// store/UserProvider.js
import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext({});

let _state = {};

const Provider = props => {
    const _setState = newState => {
        _state = { ..._state, ...newState };
        setState(_state);
    };
    const getState = () => _state;

    const [state, setState] = useState(_state);

    const makeStore = () => {
        const stateUpdateFns = Object.entries(props).filter(
            ([key, value]) => typeof value === 'function'
        );

        const mappedFunctions = stateUpdateFns.reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: (...args) => _setState(value(...args)(state))
            }),
            {}
        );
        const initialState = {
            ...props,
            ...mappedFunctions,
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
