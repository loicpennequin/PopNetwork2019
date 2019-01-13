import API from 'services/RESTService.js';

class UserModel {
    constructor(modelDef) {
        Object.assign(this, { ...modelDef });
    }

    async get() {
        const data = await API.get(`/users/${this.id}`);
        Object.assign(this, { ...data });
        return this;
    }

    async getSelf() {
        const data = await API.get(`/users/self`);
        Object.assign(this, { ...data });
        return this;
    }
}

export default UserModel;
