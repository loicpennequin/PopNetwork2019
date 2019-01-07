import RESTService from './../persistence';
import WebsocketService from './../websockets';

const sockets = (io, socket) => {};

const model = {
    tableName: 'publications'
};

module.exports = () => {
    WebsocketService.register(sockets);

    RESTService.createRestResource({
        urlPath: '/publications',
        name: 'Publication',
        options: {
            privateRoutes: ['all']
        },
        model
    });
};
