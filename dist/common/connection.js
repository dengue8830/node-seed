"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const logger_1 = require("./logger");
const sequelize = new sequelize_1.Sequelize({
    operatorsAliases: false,
    host: 'localhost',
    dialect: 'mysql',
    database: 'nodeseed',
    username: 'nodeseed',
    password: 'nodeseed',
    logging: (query) => {
        logger_1.default.trace(query);
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map