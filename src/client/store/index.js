import auth from './auth.js';

const store = { ...auth };

const createStore = initialStore => ({ ...store, ...initialStore });

export default store;

export { createStore };
