import React, { Component, useContext } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { StoreContext } from './Provider.js';

const subscribe = mapStoreToProps => Wrapped => {
    const Subscribe = props => (
        <StoreContext.Consumer>
            {store => {
                // console.log(store);
                const mapped =
                    mapStoreToProps && typeof mapStoreToProps === 'function'
                        ? {
                              ...mapStoreToProps(store),
                              setState: store.setstate
                          }
                        : store;
                return <Wrapped {...mapped} {...props} />;
            }}
        </StoreContext.Consumer>
    );
    hoistNonReactStatic(Subscribe, Wrapped);
    return Subscribe;
};

export default subscribe;

function useStore(mapStoreToProps) {
    const store = useContext(StoreContext);
    const mappedStore =
        mapStoreToProps && typeof mapStoreToProps === 'function'
            ? {
                  ...mapStoreToProps(store),
                  setState: store.setstate
              }
            : store;
    return mappedStore;
}

export { useStore };
