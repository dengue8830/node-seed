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

const parser = (param: any): string => {
  if (!param) {
    return '';
  }
  if (typeof param === 'string') {
    return param;
  }
  return Object.keys(param).length ? JSON.stringify(param, undefined, 2) : '';
};

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, meta } = info;
    const ts = moment(timestamp).local().format('HH:MM:ss');
    const metaMsg = meta ? `: ${parser(meta)}` : '';
    return `${ts} [${level}] ${parser(message)} ${metaMsg}`;
  }),
);

/**
 * This class Takes care of the logs on the app.
 *
 * For both prod and dev environments we use Console transport because we use
 * pm2 for production and it handles the console logs quite fine. If you are not using pm2
 * you can use a File transport for production.
 *
 * Our pm2 start.json is configured with a single out.log file for all the log types in order to get
 * a simpler configuration. If you need a separate file for errors for pm2, edit start.json and set a
 * different file name for error, later edit error method of this class and use the simple console.error,
 * pm2 will handle it and print it in the error file described in start.json.
 */
class Logger {
  private logger: winston.Logger;

  constructor() {
    // Use this config for separate transport for prod if you are not using pm2
    // const prodTransport = new winston.transports.File({ filename: 'logs/error.log', level: 'error' });
    const transport = new winston.transports.Console({
      // format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      format: formatter
    });
    this.logger = winston.createLogger({
      // Logs error and fatal for prod and the rest for dev
      level: isProductionEnv ? 'error' : 'trace',
      // We redefine security leves as mentioned
      levels: customLevels.levels,
      transports: [transport]
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
    // Use this way to make pm2 put the error log in the error file
    // Set the name of the error file in start.json
    // TODO: extract the printf function to reuse the code
    // console.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

/**
 * Examples
 */
// logger.trace({ x: 2 }, { a: 1 });
// logger.trace('hi', { a: 1 });
// logger.trace({ x: 2 }, 'by');
// logger.trace('hi again');
// logger.trace('that its', 'by');

export const logger = new Logger();