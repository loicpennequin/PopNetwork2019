import RESTService from './../persistence';
import WebsocketService from './../websockets';

const sockets = (io, socket) => {};

const model = {
    tableName: 'users',
    hidden: ['password'],
    bcrypt: { field: 'password' }
};

module.exports = () => {
    WebsocketService.register(sockets);

    RESTService.createRestResource({
        urlPath: '/users',
        name: 'User',
        options: {
            privateRoutes: ['find', 'destroy', 'update']
        },
        model
    });
};
