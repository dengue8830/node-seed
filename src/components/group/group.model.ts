import {
  DataTypes,
  HasMany,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
} from 'sequelize';
import sequelize from '../../common/connection';
import config from '../../common/config';

export class Group extends Model {
  public id: string;
  public name: string;

  // mixins for association (optional)
  public users: User[];
  public getUsers: HasManyGetAssociationsMixin<User>;
  public setUsers: HasManySetAssociationsMixin<User, string>;
  public addUser: HasManyAddAssociationMixin<User, string>;
  public addUsers: HasManyAddAssociationsMixin<User, string>;
  public createUser: HasManyCreateAssociationMixin<string>;
  public countUsers: HasManyCountAssociationsMixin;
  public hasUser: HasManyHasAssociationMixin<User, string>;
  public removeUser: HasManyRemoveAssociationMixin<User, string>;
  public removeUsers: HasManyRemoveAssociationsMixin<User, string>;
}

// attach all the metadata to the model
// instead of this, you could also use decorators
Group.init({ id: config.getPkDefinition(), name: DataTypes.STRING }, { sequelize });

// associate
// it is important to import _after_ the model above is already exported so the circular reference works.
import { User } from '../user/user.model';
Group.hasMany(User, { as: 'users', foreignKey: 'groupId' });