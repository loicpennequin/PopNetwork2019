const store = {};

const createStore = initialStore => ({ ...initialStore, ...store });

export default store;

export { createStore };
