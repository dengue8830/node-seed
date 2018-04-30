"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const Sequelize = require("sequelize");
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
    get(key) {
        return config.get(key);
    }
    getJwtSecret() {
        return this.get('jwtSecret');
    }
    getEmailServerUser() {
        return this.get('emailServerUser');
    }
    getEmailServerPass() {
        return this.get('emailServerPass');
    }
    getExampleLockFileName() {
        return this.get('exampleLockfileName');
    }
    getPkDefinition() {
        return {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        };
    }
}
exports.default = new Config();
//# sourceMappingURL=config.js.map