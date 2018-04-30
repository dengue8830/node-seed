"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../common/connection");
const config_1 = require("../../common/config");
class Project extends sequelize_1.Model {
}
exports.Project = Project;
Project.init({
    id: config_1.default.getPkDefinition(),
    username: sequelize_1.DataTypes.STRING,
    firstName: sequelize_1.DataTypes.STRING,
    lastName: sequelize_1.DataTypes.STRING,
}, { sequelize: connection_1.default });
// Hooks
Project.afterFind((users, options) => {
    console.log('found');
});
//# sourceMappingURL=project.js.map