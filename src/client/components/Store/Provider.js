// store/UserProvider.js
import React, { createContext, useState, useEffect, memo } from 'react';

export const StoreContext = createContext({});

// We need a reference to the state outside of the component to access it with hetState() otherwise we get the un-memoized verison of the state which is an empty object.
let _state = {};

const RenderPure = memo(({ children }) => children);

const Provider = props => {
    const [state, setState] = useState(_state);
    const [initialized, setInitialized] = useState(false);
    const _setState = newState => {
        console.log(newState);
        _state = { ..._state, ...newState };
        setState(_state);
    };
    const getState = () => _state;

    const makeStore = () => {
        const stateUpdateFns = Object.entries(props)
            .filter(([key, value]) => {
                return typeof value === 'function';
            })
            .reduce(
                (acc, [key, value]) => ({
                    ...acc,
                    [key]: async (...args) => {
                        console.log(key);
                        return _setState(await value(...args)(state));
                    }
                }),
                {}
            );

        const initialState = {
            ...props,
            ...stateUpdateFns,
            setState: newState => _setState(newState)
        };
        _setState(initialState);
        setInitialized(true);
    };
    useEffect(() => makeStore(), []);
    // @FIXME probably not working with SSR. Needs fix later.
    return !initialized ? null : (
        <StoreContext.Provider value={state}>
            <RenderPure>{props.children}</RenderPure>
        </StoreContext.Provider>
    );
};

export default Provider;
