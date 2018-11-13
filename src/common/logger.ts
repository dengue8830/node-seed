/**
 * We doesnt implement the winston's types becouse es too problematic with the new release. Also we
 * need expose our debug methods (trace, info, etc.) to the other components and the winston's types doenst allow us.
 * Its easier import the plain js lib and add our interface.
 */

import * as winston from 'winston';
import * as moment from 'moment';

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
  }
};

const isProductionEnv = process.env.NODE_ENV === 'production';

// const withColorsAndTime = winston.format.combine(
//   winston.format.colorize(),
//   winston.format.timestamp(),
//   winston.format.printf((info) => {
//     const { timestamp, level, message, ...args } = info;
//     const ts = moment(timestamp).local().format('HH:MM:ss');
//     return `${ts} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
//   }),
// );

class Logger {
  private logger: winston.Logger;

  constructor() {
    // Logs error and fatal
    const prodTransport = new (winston.transports.File)({ filename: 'logs/error.log', level: 'error' });
    // Logs debug, info, and forward
    const devTransport = new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      // format: withColorsAndTime,
      level: 'trace'
    });
    this.logger = winston.createLogger({
      level: isProductionEnv ? 'error' : 'debug',
      // We redefine security leves as mentioned
      levels: customLevels.levels,
      transports: [isProductionEnv ? prodTransport : devTransport]
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg: string) {
    this.logger.log('trace', msg);
  }

  debug(msg: string) {
    this.logger.debug(msg);
  }

  info(msg: string) {
    this.logger.info(msg);
  }

  warn(msg: string) {
    this.logger.warn(msg);
  }

  error(msg: string) {
    this.logger.error(msg);
  }

  fatal(msg: string) {
    this.logger.log('fatal', msg);
  }
}

/**
 * Examples
 */

// logger.trace('testing');
// logger.debug('testing');
// logger.info('testing');
// logger.warn('testing');
// logger.error('testing');
// logger.fatal('testing');

export const logger = new Logger();