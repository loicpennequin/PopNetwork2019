import constants from 'constants';

const { AUTH_URL } = constants;

class AuthService {
    static async login(body) {
        const response = await fetch(AUTH_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return await response.text();
    }
    //@TODO should probably do more than this lol
    static async logout() {
        await fetch(AUTH_URL + '/logout');
    }
}

export default AuthService;
