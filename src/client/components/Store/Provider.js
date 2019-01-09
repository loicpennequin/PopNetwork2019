// store/UserProvider.js
import React, { createContext, useState, memo } from "react";

export const StoreContext = createContext({});

let _state = {};

const RenderPure = memo(({children}) => children);

const Provider = props => {
    const _setState = newState => {
        _state = {..._state, ...newState};
        setState(_state);
    }
    const getState = () => _state;

    const [state, setState] = useState(_state);
    const [initialized, setInitialized] = useState(false);
    if (!initialized) {

        const stateUpdateFns = Object.entries(props)
            .filter(([key, value]) => typeof value === 'function');

        const mappedFunctions = stateUpdateFns.reduce((acc, [key, value]) =>
            ({
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
        setInitialized(true);
    }
    return (
        <StoreContext.Provider value={state}>
            <RenderPure>
                {props.children}
            </RenderPure>
        </StoreContext.Provider>
    );
};

export default Provider;
