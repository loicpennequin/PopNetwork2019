import React from "react";
import hoistNonReactStatic from 'hoist-non-react-statics';
import { StoreContext } from "./Provider.js";

const subscribe = mapStoreToProps => Wrapped => (props) => (
  <StoreContext.Consumer>
      {store => {
          const mapped = mapStoreToProps && typeof mapStoreToProps === 'function'
              ? { ...mapStoreToProps(store), setState: store.setstate }
              : store;
          return  <Wrapped {...mapped}/>}
      }
      </StoreContext.Consumer>
);

export default subscribe
