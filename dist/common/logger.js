"use strict";
/**
 * We doesnt implement the winston's types becouse es too problematic with the new release. Also we
 * need expose our debug methods (trace, info, etc.) to the other components and the winston's types doenst allow us.
 * Its easier import the plain js lib and add our interface.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Tests
// TODO: Built it as a npm package
// declare function require(arg:string): any;
const winston = require('winston');
const transports = [];
// TODO: no se porque tnego que hacer un hack para que ande "require" cuando deberia tomarlo de @types/node
if (process.env.NODE_ENV === 'production') {
    // Logs error and fatal
    transports.push(new (winston.transports.File)({ filename: 'logs/error.log', level: 'error' }));
}
else {
    // Logs debug, info, and forward
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
const logger = new (winston.Logger)({
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
 * Examples
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
exports.default = logger;
//# sourceMappingURL=logger.js.map