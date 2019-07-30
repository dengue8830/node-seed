import { Sequelize } from 'sequelize';
import { logger } from './logger';
import * as sqlFormatter from 'sql-formatter';
import { config } from './config';

const bd = config.getBd();

const sequelize = new Sequelize({
  operatorsAliases: false,
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

export default sequelize;
