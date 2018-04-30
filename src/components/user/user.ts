import {
    BelongsTo,
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    FindOptions,
    Model,
    CreateOptions,
} from 'sequelize';

import sequelize from '../../common/connection';
import config from '../../common/config';

export class User extends Model {
    public static associations: {
        group: BelongsTo;
    };

    public id: string;
    public username: string;
    public email: string;
    public firstName: string;
    public lastName?: string;
    public nro: number;
    public createdAt?: Date;
    public updatedAt?: Date;

    // mixins for association (optional)
    public groupId?: string;
    public group?: Group;
    public getGroup: BelongsToGetAssociationMixin<Group>;
    public setGroup: BelongsToSetAssociationMixin<Group, string>;
    public createGroup: BelongsToCreateAssociationMixin<Group>;
}

User.init(
    {
        id: config.getPkDefinition(),
        username: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        nro: { type: DataTypes.INTEGER({ length: 3 }), defaultValue: 0 }
    },
    { sequelize, paranoid: true }
);

// Hooks
User.afterFind((users, options: FindOptions) => {
    console.log('found');
});

User.beforeCreate('increment_number', (user: User, options: CreateOptions) => {
    console.log('incrementando');
    user.increment({ nro: 1 });
});

User.afterDestroy('user_destroy', (user: User) => {
    console.log('user destroyed');
});
// associate
// it is important to import _after_ the model above is already exported so the circular reference works.
import { Group } from './group';
User.belongsTo(Group, { as: 'group', foreignKey: 'groupId' });