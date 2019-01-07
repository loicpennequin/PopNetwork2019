import RESTService from './../persistence';
import WebsocketService from './../websockets';

const sockets = (io, socket) => {};

const model = {
    tableName: 'posts'
};

module.exports = () => {
    WebsocketService.register(sockets);

    RESTService.createRestResource({
        urlPath: '/posts',
        name: 'Post',
        options: {
            privateRoutes: ['all'],
            exclude: ['all']
        },
        model
    });
};
