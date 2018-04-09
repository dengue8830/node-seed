import App from './app';
import logger from './common/logger';

logger.info(`env ${process.env.NODE_ENV}`);
const app = new App();
const port = process.env.NODE_ENV === 'production' ? 8080 : 8080;
// Splitting this from app.ts we can eg: create multiples servers on diferent ports with the same app, or something else
const server = app.getExpressApp().listen(port, () => {
    logger.info(`app server running on port ${port}...`);
    app.init(server);
});

export default server;