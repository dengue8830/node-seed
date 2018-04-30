"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../common/connection");
const config_1 = require("../../common/config");
class Group extends sequelize_1.Model {
}
exports.Group = Group;
// attach all the metadata to the model
// instead of this, you could also use decorators
Group.init({ id: config_1.default.getPkDefinition(), name: sequelize_1.DataTypes.STRING }, { sequelize: connection_1.default });
// associate
// it is important to import _after_ the model above is already exported so the circular reference works.
const user_1 = require("./user");
Group.hasMany(user_1.User, { as: 'users', foreignKey: 'groupId' });
//# sourceMappingURL=group.js.map