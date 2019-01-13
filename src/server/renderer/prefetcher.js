import RESTService from './../persistence';
import { wrap } from './../errorHandling';

export default {
    Home: async req => ({}),
    Dashboard: async req =>
        await wrap(async () => {
            const currentUser = await RESTService.get('User').findById(
                req.user.id
            );
            return { currentUser };
        }),
    Profile: async req =>
        await wrap(async () => {
            const profile = await RESTService.get('User').findById(
                req.params.id
            );
            return { profile, isOwnProfile: req.params.id == req.user.id };
        })
};
