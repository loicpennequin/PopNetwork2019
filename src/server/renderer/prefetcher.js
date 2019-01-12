import RESTService from './../persistence';

export default {
    Home: async req => ({}),
    Dashboard: async req => {
        const currentUser = await RESTService.get('User').findById(req.user.id);
        console.log(JSON.stringify(currentUser));
        return { currentUser };
    }
};
