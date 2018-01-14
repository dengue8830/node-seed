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
import * as config from 'config';

class Config {

    get(path: string): any {
        return config.get(path);
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
}

export default new Config();