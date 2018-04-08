import App from './app';
import logger from './common/logger';

const app = new App();
app.init();
const port = process.env.NODE_ENV === 'production' ? 8080 : 8080;

logger.info(`env ${process.env.NODE_ENV}`);
logger.info(`port ${port}`);

// Splitting this from app.ts we can eg: create multiples servers on diferent ports with the same app, or something else
const server = app.getExpressApp().listen(port, () => {
    logger.info('server running...');
});
export default server;