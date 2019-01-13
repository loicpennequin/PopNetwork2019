import User from 'models/UserModel';
import { LocalStorage } from 'utils';

export default {
    getProfile: id => async state => {
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
