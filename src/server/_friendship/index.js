import RESTService from './../persistence';
import WebsocketService from './../websockets';

const sockets = (io, socket) => {};

const model = {
    tableName: 'friendships'
};

module.exports = () => {
    WebsocketService.register(sockets);

    RESTService.createRestResource({
        urlPath: '/friendships',
        name: 'Friendship',
        options: {
            privateRoutes: ['all']
        },
        model
    });
};
