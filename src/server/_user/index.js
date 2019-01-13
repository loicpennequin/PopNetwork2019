import RESTService from './../persistence';
import WebsocketService from './../websockets';
import { cfg } from './../../../config';

const sockets = (io, socket) => {};

const model = {
    tableName: 'users',
    hidden: ['password'],
    bcrypt: { field: 'password' },
    withFriends: function() {}
};

const controller = {
    findSelf: async id => {
        const _getFriendFromRequest = request =>
            request.sender_id === parseInt(id)
                ? request.sendee
                : request.sender;

        const user = await RESTService.get('User')
            .model.forge()
            .findById(id);
        const friendRequests = await RESTService.get('Friendship').getFriends(
            user.id
        );
        return Object.assign(user, {
            friends: friendRequests
                .filter(
                    f =>
                        f.status ===
                        cfg.ENUMS.FRIENDSHIP_REQUESTS_STATUS.ACCEPTED
                )
                .map(_getFriendFromRequest),
            pendingRequests: friendRequests
                .filter(
                    f =>
                        f.status ===
                        cfg.ENUMS.FRIENDSHIP_REQUESTS_STATUS.PENDING
                )
                .map(_getFriendFromRequest),
            declinedRequests: friendRequests
                .filter(
                    f =>
                        f.status ===
                        cfg.ENUMS.FRIENDSHIP_REQUESTS_STATUS.DECLINED
                )
                .map(_getFriendFromRequest)
        });
    }
};

module.exports = () => {
    WebsocketService.register(sockets);

    RESTService.createRestResource({
        urlPath: '/users',
        name: 'User',
        options: {
            privateRoutes: ['find', 'destroy', 'update']
        },
        model,
        controller
    }).get(
        '/self',
        (req, res) => RESTService.get('User').findSelf(req.user.id),
        true
    );
};
