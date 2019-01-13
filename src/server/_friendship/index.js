import RESTService from './../persistence';
import WebsocketService from './../websockets';

const sockets = (io, socket) => {};

const model = {
    tableName: 'friendships',
    sender() {
        return this.belongsTo('User', 'sender_id');
    },
    sendee() {
        return this.belongsTo('User', 'sendee_id');
    }
};

const controller = {
    getFriends: async id =>
        (await RESTService.get('Friendship')
            .model.forge()
            .query(qb => {
                qb.where('sendee_id', id).orWhere('sender_id', id);
            })
            .fetchAll({ withRelated: ['sender', 'sendee'] })).toJSON()
};

module.exports = () => {
    WebsocketService.register(sockets);

    RESTService.createRestResource({
        urlPath: '/friendships',
        name: 'Friendship',
        options: {
            privateRoutes: ['all']
        },
        model,
        controller
    });
};
