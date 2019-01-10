import AuthService from './../auth';

export default {
    Home: async req => ({
        authenticated: AuthService.get('local').isLoggedIn(req)
    })
};
