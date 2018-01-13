import { Application } from 'express';
import config from '../common/config';
import * as passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { RequestHandlerParams } from 'express-serve-static-core';
// import * as ejwt from 'express-jwt';
// "express-jwt": "5.3.0",
// "@types/express-jwt": "0.0.38",

class AuthService {
    init(app: Application) {
        app.use(passport.initialize());

        passport.use(new Strategy({
            secretOrKey: config.getJwtSecret(),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }, (payload: any, done: VerifiedCallback) => done(undefined, payload)));
    }

    getBasicAuthMdl(): RequestHandlerParams {
        // ejwt({ secret: config.getJwtSecret() })
        return passport.authenticate('jwt', { session: false });
    }
}

export default new AuthService();