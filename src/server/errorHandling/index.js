function _errorHandler(e) {
    return e;
}

const wrap = async (fn, cb = _errorHandler) => {
    try {
        return await fn();
    } catch (e) {
        return cb(e);
    }
};

export { wrap };
