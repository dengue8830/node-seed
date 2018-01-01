// TODO: Tests
// TODO: Use it as a npm package

const winston = require('winston');

interface Logger {
    // Logs methods
    trace(msg: string): void;
    debug(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    fatal(msg: string): void;

    // To get other logger stuffs works
    add(something: any): void;
}

/**
 * Author: https://gist.github.com/rtgibbons/7354879
 */
const logger : Logger = winston.createLogger({
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red'
    },
    // Redefinimos los niveles de seguridad como yo quiero y de acuerdo con los colores seteados mas arriba
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0
    }
});

if (process.env.NODE_ENV === 'production') {
    // Logueara error y fatal
    logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
} else {
    // Logueara debug, info, en adelante
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: 'debug',
        colorize: true,
        timestamp: true,
        prettyPrint: true
    }));
}

/**
 * Ejemplos de como usar
 */

// logger.log('trace', 'testingx');
// logger.log('debug', 'testingx');
// logger.log('info', 'testingx');
// logger.log('warn', 'testingx');
// logger.log('error', 'testingx');
// logger.log('fatal', 'testingx');

// logger.trace('testing');
// logger.debug('testing');
// logger.info('testing');
// logger.warn('testing');
// logger.error('testing');
// logger.fatal('testing');

export default logger;