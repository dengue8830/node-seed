"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const http_1 = require("http");
const logger_1 = require("../../common/logger");
class Chat {
    init(server) {
        if (!server) {
            server = server || new http_1.Server();
            server.listen(3002);
        }
        this.io = socketio(server);
        this.io.on('connect', (socket) => {
            this.onConnect(socket);
        });
    }
    onConnect(socket) {
        logger_1.default.info('onconnection');
        socket.on('message', this.onMessage.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));
    }
    onMessage(m) {
        logger_1.default.info(`onmessage ${JSON.stringify(m)}`);
        this.io.emit('message', m);
    }
    onDisconnect(x) {
        logger_1.default.info(`disconnected ${x}`);
    }
    sendMessage(message) {
        this.io.emit('message', message);
    }
}
exports.default = new Chat();
//# sourceMappingURL=chat.js.map