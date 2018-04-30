"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../common/config");
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
// import * as ejwt from 'express-jwt';
// "express-jwt": "5.3.0",
// "@types/express-jwt": "0.0.38",
/**
 * Manages all the auth behavior.
 */
class AuthService {
    /**
     * Initialize the strategy.
     * This breaks the no mix layers rule but its necesary
     * for encapsulate the initialization logic, becaouse now
     * is passport, tomorrow could be another. We priorize the
     * encapsulation over no mix layer.
     *
     * @param app Express app
     */
    init(app) {
        app.use(passport.initialize());
        passport.use(new passport_jwt_1.Strategy({
            secretOrKey: config_1.default.getJwtSecret(),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
        }, (payload, done) => done(undefined, payload)));
    }
    /**
     * Gets the auth middleware for a basic authentication,
     * that is check that the token is valid.
     */
    getBasicAuthMdl() {
        // ejwt({ secret: config.getJwtSecret() })
        // session: false prevents the declaration of serializeUser on passport initialization
        return passport.authenticate('jwt', { session: false });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=authService.js.map