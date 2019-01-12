import API from 'services/RESTService.js';

class UserModel {
    constructor(modelDef) {
        if (!modelDef.id) {
            throw new Error('USerModel definition needs an id.');
        }
        Object.assign(this, { ...modelDef });
    }

    async get() {
        const data = await API.get(`/users/${this.id}`);
        Object.assign(this, { ...data });
        return this;
    }
}

export default UserModel;
