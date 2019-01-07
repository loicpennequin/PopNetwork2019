import RESTService from './../persistence';
import WebsocketService from './../websockets';

const sockets = (io, socket) => {};

const model = {
    tableName: 'messages'
};

module.exports = () => {
    WebsocketService.register(sockets);

    RESTService.createRestResource({
        urlPath: '/messages',
        name: 'Message',
        options: {
            privateRoutes: ['all']
        },
        model
    });
};
