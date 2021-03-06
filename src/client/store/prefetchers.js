import User from 'models/UserModel';
import { LocalStorage } from 'utils';

export default {
    prefetchHome: () => state => state,
    prefetchDashboard: () => async state => {
        const currentUser = new User();
        try {
            await currentUser.getSelf();
            return { currentUser };
        } catch (e) {
            console.log(e);
            return { currentUserError: e };
        }
    },
    prefetchProfile: ({ id }) => async state => {
        const user = new User({ id });
        try {
            await user.get();
            return {
                profile: user,
                isOwnProfile: id == LocalStorage.get('uid')
            };
        } catch (e) {
            console.log(e);
            return { profileError: e };
        }
    }
};
