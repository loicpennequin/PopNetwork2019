import AuthService from 'resources/services/AuthService';

export default {
    authenticated: false,
    login: values => async state => {
        try {
            await AuthService.login(values);
            return { authenticated: true };
        } catch (e) {
            return { authenticated: false };
        }
    },
    logout: values => async state => {
        await AuthService.logout(values);
        return { authenticated: false };
    }
};
