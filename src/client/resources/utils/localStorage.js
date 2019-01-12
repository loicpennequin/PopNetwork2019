function get(key) {
    const item = localStorage.getItem(key);
    try {
        const json = JSON.parse(item);
        return json;
    } catch (e) {
        return item;
    }
}

function set(key, data) {
    try {
        const json = JSON.stringify(item);
        localStorage.setItem(key, json);
    } catch (e) {
        localStorage.setItem(key, data);
    }
}

function remove(key) {
    localStorage.removeItem(key);
}

export default {
    get,
    set,
    remove
};
