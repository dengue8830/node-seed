"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../common/connection");
const config_1 = require("../../common/config");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: config_1.default.getPkDefinition(),
    username: sequelize_1.DataTypes.STRING,
    firstName: sequelize_1.DataTypes.STRING,
    lastName: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    nro: { type: sequelize_1.DataTypes.INTEGER({ length: 3 }), defaultValue: 0 }
}, { sequelize: connection_1.default, paranoid: true });
// Hooks
User.afterFind((users, options) => {
    console.log('found');
});
User.beforeCreate('increment_number', (user, options) => {
    console.log('incrementando');
    user.increment({ nro: 1 });
});
User.afterDestroy('user_destroy', (user) => {
    console.log('user destroyed');
});
// associate
// it is important to import _after_ the model above is already exported so the circular reference works.
const group_1 = require("./group");
User.belongsTo(group_1.Group, { as: 'group', foreignKey: 'groupId' });
//# sourceMappingURL=user.js.map