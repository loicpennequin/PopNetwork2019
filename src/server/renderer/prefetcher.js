export default {
    Home: async req => ({}),
    Dashboard: async req => {
        console.log(req.user);
        return {};
    }
};
