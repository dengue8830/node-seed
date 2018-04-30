"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authApis_1 = require("../components/auth/authApis");
const userApis_1 = require("../components/user/userApis");
const chatApis_1 = require("../components/chatt/chatApis");
/**
 * Loads all the apis
 */
exports.default = (app) => {
    app.use(authApis_1.default);
    app.use(userApis_1.default);
    app.use(chatApis_1.default);
    // ... other apis
};
//# sourceMappingURL=apisRoutesLoader.js.map