import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { StoreContext } from './Provider.js';

const subscribe = mapStoreToProps => Wrapped => {
    class Subscribe extends Component {
        render() {
            return (
                <StoreContext.Consumer>
                    {store => {
                        const mapped =
                            mapStoreToProps &&
                            typeof mapStoreToProps === 'function'
                                ? {
                                      ...mapStoreToProps(store),
                                      setState: store.setstate
                                  }
                                : store;
                        return <Wrapped {...mapped} {...this.props} />;
                    }}
                </StoreContext.Consumer>
            );
        }
    }
    hoistNonReactStatic(Subscribe, Wrapped);
    return Subscribe;
};

export default subscribe;
