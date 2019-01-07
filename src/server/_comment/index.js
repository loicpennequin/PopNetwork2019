import RESTService from './../persistence';
import WebsocketService from './../websockets';

const sockets = (io, socket) => {};

const model = {
    tableName: 'comments'
};

module.exports = () => {
    WebsocketService.register(sockets);

    RESTService.createRestResource({
        urlPath: '/comments',
        name: 'Comment',
        options: {
            privateRoutes: ['all']
        },
        model
    });
};
