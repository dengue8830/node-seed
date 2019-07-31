import { ErrorsAPI } from './../error/errors';
import {
  Model,
  DataTypes
} from 'sequelize';
import * as crypto from 'crypto';
import { sequelize } from '../../common/connection';
import { config } from '../../common/config';

/**
 * Stores the user sensible data like hash and tokens.
 */
export interface IUserKey {
  id: string
  userId: string
  firebaseRegistrationToken?: string
  facebookToken?: string
  hash?: string
  salt?: string
}

export class UserKey extends Model implements IUserKey {
  id: string
  userId: string
  /** To send notifications. */
  firebaseRegistrationToken?: string
  /** To operate in name of the user. */
  facebookToken?: string
  hash?: string
  salt?: string

  setPassword(pass: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64, 'sha512').toString('hex');
  }

  isValidPassword(pass: string): boolean {
    if (!this.salt) {
      throw new Error(ErrorsAPI.UserWithOutPass);
    }
    return this.hash === crypto.pbkdf2Sync(pass, this.salt, 1000, 64, 'sha512').toString('hex');
  }
}

UserKey.init(
  {
    id: config.getPkDefinition(),
    facebookToken: { type: DataTypes.STRING(230) },
    firebaseRegistrationToken: { type: DataTypes.STRING },
    hash: { type: DataTypes.STRING(1100) },
    salt: { type: DataTypes.STRING(1100) }
  },
  {
    sequelize,
    paranoid: false,
    timestamps: true,
    tableName: 'userKey'
  }
);

import { User } from './user.model';

// associate
// it is important to import _after_ the model above is already exported so the circular reference works.
UserKey.belongsTo(User, { as: 'user', foreignKey: 'userId', onDelete: 'CASCADE' });