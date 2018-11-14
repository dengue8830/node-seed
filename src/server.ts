import App from './app';
import { logger } from './common/logger';

// Como hacer para tener varias instancias de app y socket con pm2?
// https://github.com/Unitech/pm2/issues/637
// https://github.com/socketio/socket.io/issues/1942#issuecomment-82352072
// https://github.com/Unitech/PM2/issues/1510
const app = new App();
const port = process.env.NODE_ENV === 'production' ? 8080 : 8080;
// const port = 808 + process.env.NODE_APP_INSTANCE;
// Splitting this from app.ts we can eg: create multiples servers on diferent ports with the same app, or something else
const server = app.getExpressApp().listen(port, () => {
  logger.info(`app server running on port ${port} int ${process.env.NODE_ENV} env`);
  app.init(server);
});

export default server;