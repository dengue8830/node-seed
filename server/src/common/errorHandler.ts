import logger from './logger';
const hri = require('human-readable-ids').hri;

class ErrorHandler {
    handleError(error: any): string {
        const errorCode = hri.random();
        logger.error(`[${errorCode}]: ${error}`);
        // Here logic if we need to send a email to admin or something else
        return errorCode;
    }
}

export default new ErrorHandler();