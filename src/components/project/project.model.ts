import {
  DataTypes,
  FindOptions,
  Model,
} from 'sequelize';

import sequelize from '../../common/connection';
import config from '../../common/config';

export class Project extends Model {
  public id: string;
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public createdAt: Date;
  public updatedAt: Date;
}

Project.init(
  {
    id: config.getPkDefinition(),
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  { sequelize }
);

// Hooks
Project.afterFind((users, options: FindOptions) => {
  console.log('found');
});