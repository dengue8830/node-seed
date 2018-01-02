/**
 * https://www.npmjs.com/package/config
 *
 * Hold the config dir in server/config/ otherwise we should copy the config dir to dist folder
 */

import * as config from 'config';

class Config {

    get(path: string): any {
        return config.get(path);
    }

    getJwtSecret(): any {
        return this.get('jwtSecret');
    }
}

export default new Config();