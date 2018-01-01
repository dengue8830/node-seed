/**
 * We doesnt implement the winston's types becouse es too problematic with the new release. Also we
 * need expose our debug methods (trace, info, etc.) to the other components and the winston's types doenst allow us.
 * Its easier import the plain js lib and add our interface.
 */

// TODO: Tests
// TODO: Built it as a npm package
// declare function require(arg:string): any;

var winston = require('winston');
// import * as winston from 'winston';
interface Logger {
    // Logs methods
    trace(msg: string): void;
    debug(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    fatal(msg: string): void;

    // To get other logger stuffs works
    // add(something: any): void;
}

let transports = [];

// TODO: no se porque no puedo importar Process de node, o porque tnego que hacer un hack para que ande "require" cuando deberia tomarlo de @types/node
if (process.env.NODE_ENV === 'production') {
    // Logueara error y fatal
    transports.push(new (winston.transports.File)({ filename: 'logs/error.log', level: 'error' }));
} else {
    // Logueara debug, info, en adelante
    transports.push(new (winston.transports.Console)({
        // format: winston.format.simple(),
        level: 'debug',
        colorize: true,
        timestamp: true,
        prettyPrint: true
    }));
}

/**
 * Author: https://gist.github.com/rtgibbons/7354879
 */
const logger: Logger = new (winston.Logger)({
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
    },
    transports: transports
});

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