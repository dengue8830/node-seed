"use strict";
/**
 * Component that handles token generation and related stuffs (login, logout, etc.)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const authService_1 = require("../auth/authService");
const config_1 = require("../../common/config");
const router = express_1.Router();
/**
 * Client request a token to operate on protected apis.
 * Changes this with your login logic.
 */
router.get('/api/v1/token', (req, res, next) => {
    const token = jwt.sign({ someData: 'foobar' }, config_1.default.getJwtSecret()); // , { expiresIn: '30s' }
    res.json({ token: token });
});
/**
 * An example of a protected api to test the token generator api.
 * Delete this for your project
 */
router.get('/api/v1/protected', authService_1.default.getBasicAuthMdl(), (req, res, next) => {
    // The token data is in req.user -> console.log(req.user);
    res.json({ status: 'listorti' });
});
exports.default = router;
//# sourceMappingURL=authApis.js.map