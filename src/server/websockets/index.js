import socketio from 'socket.io';
import logger from './../logger';

class WebsocketService {
    constructor() {
        this.sockets = new Set();
        this._events = [];
    }

    _onConnect(socket) {
        this.socket = socket;

        this.sockets.add(socket.id);
        logger.debug(`socket connected, socketId : ${this.socket.id}`);

        this.socket.on('disconnect', () => {
            logger.debug(`socket disconnected, socketId : ${this.socket.id}`);
            this.sockets.delete(this.socket.id);
        });

        this._events.forEach(fn => {
            fn(this.io, socket);
        });
    }

    start(server) {
        logger.debug('================STARTING WEBSOCKETS SERVICE');
        this.io = socketio.listen(server);
        this.io.on('connection', this._onConnect.bind(this));
    }

    register(fn) {
        this._events.push(fn);
    }

    forEach(cb) {
        Object.keys(this.io.sockets.sockets).forEach(socket => {
            cb(this.io.sockets.sockets[socket]);
        });
    }
}

export default new WebsocketService();
