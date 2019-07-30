import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  FindOptions,
  Model,
  CreateOptions,
} from 'sequelize';

import { sequelize } from '../../common/connection';
import { config } from '../../common/config';
import { logger } from '../../common/logger';

export class User extends Model {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;

  userKey?: UserKey;
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
  {
    sequelize,
    paranoid: true,
    tableName: 'user'
  }
);

// associate
// it is important to import _after_ the model above is already exported so the circular reference works.
import { UserKey } from './user-key.model';

User.hasOne(UserKey, { as: 'userKey', foreignKey: 'userId', onDelete: 'CASCADE' });