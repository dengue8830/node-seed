"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const http_1 = require("http");
const logger_1 = require("../../common/logger");
/**
 * Represents a socket server instance.
 * This class wraps the final technology you will use to implements
 * sockets, eg.: socket-io
 *
 * We export an instance and not the class becouse in that way we can do the import
 * and get a working and initialized instance everywhere in the app, eg.: chatApis.ts
 * in other way we must store the reference and pass it to each part of the app that require that.
 *
 * TODO: falta resolver el problema mencionado en server.ts sobre instancias de app,
 * socket y pm2.
 */
class Socket {
    /**
     * Creates the necesary stuffs to get a working socket connection.
     *
     * @param server If not specified a new server will be created
     * to be binded by the socket.
     */
    init(server) {
        if (!server) {
            server = server || new http_1.Server();
            const port = 3002;
            server.listen(port, () => {
                logger_1.default.info(`socket server running on ${port}...`);
            });
        }
        else {
            logger_1.default.info(`socket server binded to existing server on port ${server.address().port}`);
        }
        this.io = socketio(server);
        // this.io.adapter(new MemcachedStore({
        //     hosts: 'localhost:11211'
        // }));
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
        this.io.emit('message', process.env.NODE_APP_INSTANCE);
    }
    onDisconnect(x) {
        logger_1.default.info(`disconnected ${x}`);
    }
    sendMessage(message) {
        this.io.emit('message', message);
    }
}
exports.default = new Socket();
//# sourceMappingURL=socket.js.map