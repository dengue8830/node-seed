/**
 * https://www.npmjs.com/package/config
 * otra opcion es
 * https://www.npmjs.com/package/node-config-env
 */

import * as config from 'config';

class Config {
    get(path: string): any {
        return config.get(path);
    }
}

export default new Config();