/**
 * WARNING: Lib request to use this on the very first line of your project or set it in the command line
 * just because this config() build and set the env variables from the correct env file.
 * https://www.npmjs.com/package/dotenv-flow#usage
 *
 * So config.ts is the first import on server.ts just to make the dotenv-flow import here and keep the config logic in this file.
 * If you have some circular references problem you can move this line to server.ts.
 */
require('dotenv-flow').config({ path: __dirname + '../../../config' });
import * as Sequelize from 'sequelize';
/**
 * Wraps the config logic. Someday we may want to change the lib.
 *
 * Env file will be used based on NODE_ENV.
 *
 * Hold the config dir in /server/config/ and not in /config (root) because
 * we need it to be copied to dist folder.
 * Otherwise we should copy the config dir to dist folder
 */
class Config {

  getPort(): string {
    return process.env.PORT || '8080';
  }

  getJwtSecret(): any {
    return process.env.JWT_SECRET;
  }

  getEmailServerUser(): string {
    return process.env.EMAIL_SERVER_USER!;
  }

  getEmailServerPass(): string {
    return process.env.EMAIL_SERVER_PASS!;
  }

  getExampleLockFileName(): string {
    return process.env.EXAMPLE_LOCKFILE_NAME!;
  }

  getPkDefinition(): { type: any, defaultValue: any, primaryKey: boolean } {
    return {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    };
  }

  getBd(): { database: string, username: string, password: string } {
    return {
      database: process.env.DB_NAME!,
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASS!
    };
  }

  getImageServer(): string {
    return process.env.IMAGE_SERVER!;
  }

  getUploadFolder(): string {
    return process.env.UPLOAD_FOLDER!;
  }

  getFullUploadPath(): string {
    return this.getImageServer() + '/' + this.getUploadFolder();
  }
}

export const config = new Config();