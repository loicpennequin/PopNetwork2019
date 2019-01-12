import User from 'models/UserModel';
import { LocalStorage } from 'utils';

export default {
    prefetchHome: () => state => state,
    prefetchDashboard: () => async state => {
        const id = LocalStorage.get('uid');
        const currentUser = new User({ id });
        try {
            await currentUser.get();
            return { currentUser };
        } catch (e) {
            console.log(e);
            return { currentUserError: e };
        }
    }
};
