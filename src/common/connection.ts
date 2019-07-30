import { Sequelize, Op } from 'sequelize';
import { logger } from './logger';
import * as sqlFormatter from 'sql-formatter';
import { config } from './config';

const bd = config.getBd();

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.co
};

export const sequelize = new Sequelize({
  operatorsAliases, // : false
  host: 'localhost',
  dialect: 'mysql',
  database: bd.database,
  username: bd.username,
  password: bd.password,
  logging: (query: string) => {
    logger.trace(sqlFormatter.format(query));
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});