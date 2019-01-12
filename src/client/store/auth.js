import AuthService from 'resources/services/AuthService';
import { LocalStorage } from 'utils';

export default {
    authenticated: false,
    login: values => async state => {
        try {
            const id = await AuthService.login(values);
            LocalStorage.set('uid', id);
            return { authenticated: true };
        } catch (e) {
            return { authenticated: false };
        }
    },
    logout: values => async state => {
        await AuthService.logout(values);
        return { authenticated: false, currentUser: undefined };
    }
};
