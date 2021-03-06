// store/UserProvider.js
import React, { createContext, useState, memo } from 'react';

export const StoreContext = createContext({});

// We need a reference to the state outside of the component to access it with hetState() otherwise we get the un-memoized verison of the state which is an empty object.
let _state;

const RenderPure = memo(({ children }) => children);

const makeStore = (props, setState) => {
    const stateUpdateFns = Object.entries(props)
        .filter(([key, value]) => {
            return typeof value === 'function';
        })
        .reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: async (...args) => {
                    console.log('%cstore.' + key, 'color: blue');
                    const newState = await value(...args)(_state);
                    _state = { ..._state, ...newState };
                    console.log('%cstore.' + key + ' finished', 'color: blue');
                    return setState(_state);
                }
            }),
            {}
        );

    if (!_state) {
        _state = {
            ...props,
            ...stateUpdateFns
        };
    }

    return _state;
};

const Provider = ({ children, ...props }) => {
    const _setState = (...args) => setState(...args);
    const [state, setState] = useState(makeStore(props, _setState));

    return (
        <StoreContext.Provider value={state}>
            <RenderPure>{children}</RenderPure>
        </StoreContext.Provider>
    );
};

export default Provider;
