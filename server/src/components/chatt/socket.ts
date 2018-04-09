import * as socketio from 'socket.io';
import { Server } from 'http';
import logger from '../../common/logger';
import server from '../../server';

class Socket {
    private io: SocketIO.Server;

    /**
     * Creates the necesary stuffs to get a working socket connection.
     * 
     * @param server If not specified a new server will be created
     * to be binded by the socket.
     */
    init(server?: Server) {
        if (!server) {
            server = server || new Server();
            const port = 3002;
            server.listen(port, () => {
                logger.info(`socket server running on ${port}...`);
            });
        }
        this.io = socketio(server);
        if (server) {
            logger.info(`socket server binded to existing server on port ${server.address().port}`);
        }
        this.io.on('connect', (socket: any) => {
            this.onConnect(socket);
        });
    }

    onConnect(socket: any) {
        logger.info('onconnection');
        socket.on('message', this.onMessage.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));
    }

    onMessage(m: string) {
        logger.info(`onmessage ${JSON.stringify(m)}`);
        this.io.emit('message', m);
    }

    onDisconnect(x: any) {
        logger.info(`disconnected ${x}`);
    }

    sendMessage(message: string) {
        this.io.emit('message', message);
    }
}

export default new Socket();