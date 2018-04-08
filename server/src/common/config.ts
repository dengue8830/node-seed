import * as config from 'config';
import * as Sequelize from 'sequelize';
/**
 * Wraps the config logic. Someday we may want to change the lib.
 *
 * https://www.npmjs.com/package/config
 *
 * We use 3 files, a default.json that holds the default config
 * and the development.json and production.json that overrides the default
 * config according to the NODE_ENV flag.
 *
 * Hold the config dir in /server/config/ and not in /config (root) because
 * we need it to be copied to dist folder.
 * Otherwise we should copy the config dir to dist folder
 */
class Config {

    /**
     * Gets the value corresponding to the given key.
     * It's preferable to write a custom method.
     * @param key String to get the de value
     */
    get(key: string): any {
        return config.get(key);
    }

    getJwtSecret(): any {
        return this.get('jwtSecret');
    }

    getEmailServerUser(): string {
        return this.get('emailServerUser');
    }

    getEmailServerPass(): string {
        return this.get('emailServerPass');
    }

    getExampleLockFileName(): string {
        return this.get('exampleLockfileName');
    }

    getPkDefinition(): { type: any, defaultValue: any, primaryKey: boolean } {
        return {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        };
    }
}

export default new Config();