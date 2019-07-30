import {
  DataTypes,
  Model
} from 'sequelize';

import { sequelize } from '../../common/connection';
import { config } from '../../common/config';

export interface IUser {
  id: string
  username: string
  email: string
  firstName: string
  lastName?: string
  isRoot: boolean
  createdAt?: Date
  updatedAt?: Date

  userKey?: IUserKey
}

export class User extends Model implements IUser {
  id: string
  username: string
  email: string
  firstName: string
  lastName?: string
  isRoot: boolean
  createdAt?: Date
  updatedAt?: Date

  userKey?: UserKey
}

User.init(
  {
    id: config.getPkDefinition(),
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    isRoot: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    paranoid: true,
    tableName: 'user'
  }
);

// associate
// it is important to import _after_ the model above is already exported so the circular reference works.
import { UserKey, IUserKey } from './user-key.model';

User.hasOne(UserKey, { as: 'userKey', foreignKey: 'userId', onDelete: 'CASCADE' });