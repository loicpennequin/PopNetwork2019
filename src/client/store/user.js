import User from 'models/UserModel';
import { LocalStorage } from 'utils';

export default {
    getCurrentUser: () => async state => {
        const id = LocalStorage.get('uid');
        const user = new User({ id });
        try {
            await user.get();
            return { currentUser: user };
        } catch (e) {
            console.log(e);
            return { currentUserError: e };
        }
    }
};
