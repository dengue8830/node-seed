"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./common/logger");
// Como hacer para tener varias instancias de app y socket con pm2?
// https://github.com/Unitech/pm2/issues/637
// https://github.com/socketio/socket.io/issues/1942#issuecomment-82352072
// https://github.com/Unitech/PM2/issues/1510
logger_1.default.info(`env ${process.env.NODE_ENV}`);
const app = new app_1.default();
const port = process.env.NODE_ENV === 'production' ? 8080 : 8080;
// const port = 808 + process.env.NODE_APP_INSTANCE;
// Splitting this from app.ts we can eg: create multiples servers on diferent ports with the same app, or something else
const server = app.getExpressApp().listen(port, () => {
    logger_1.default.info(`app server running on port ${port}...`);
    app.init(server);
});
exports.default = server;
//# sourceMappingURL=server.js.map