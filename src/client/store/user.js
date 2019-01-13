import User from 'models/UserModel';

export default {
    getCurrentUser: () => async state => {
        const currentUser = new User();
        try {
            await currentUser.getSelf();
            return { currentUser };
        } catch (e) {
            console.log(e);
            return { currentUserError: e };
        }
    }
};
