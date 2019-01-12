import auth from './auth.js';
import user from './user.js';
import prefetchers from './prefetchers.js';

const store = {
    ...auth,
    ...user,
    ...prefetchers,
    // @FIXME this should be created in the Provider component but it has some weird bugs
    setState: newState => state => ({ ...newState })
};

const createStore = initialStore => ({ ...store, ...initialStore });

export default store;

export { createStore };
