/**
 * We doesnt implement the winston's types becouse es too problematic with the new release. Also we
 * need expose our debug methods (trace, info, etc.) to the other components and the winston's types doenst allow us.
 * Its easier import the plain js lib and add our interface.
 */

import * as winston from 'winston';

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

class Logger {
  private logger: winston.Logger;

  constructor() {
    // Logs error and fatal
    const prodTransport = new (winston.transports.File)({ filename: 'logs/error.log', level: 'error' });
    // Logs debug, info, and forward
    const devTransport = new winston.transports.Console({
      format: winston.format.simple(),
      level: 'debug',
      // colorize: true,
      // timestamp: true,
      // prettyPrint: true
    });
    this.logger = winston.createLogger({
      level: isProductionEnv ? 'error' : 'debug',
      // we redefine security leves as mentioned
      levels: customLevels.levels,
      transports: [isProductionEnv ? prodTransport : devTransport]
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg: string) {
    const lggr = this.logger as any;
    lggr.trace(msg);
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
    const lggr = this.logger as any;
    lggr.fatal(msg);
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