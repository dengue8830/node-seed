import { Application } from 'express';
import config from '../../common/config';
import * as passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { RequestHandlerParams } from 'express-serve-static-core';
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
  init(app: Application) {
    app.use(passport.initialize());

    passport.use(new Strategy({
      secretOrKey: config.getJwtSecret(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (payload: any, done: VerifiedCallback) => done(undefined, payload)));
  }

  /**
   * Gets the auth middleware for a basic authentication,
   * that is check that the token is valid.
   */
  getBasicAuthMdl(): RequestHandlerParams {
    // ejwt({ secret: config.getJwtSecret() })
    // session: false prevents the declaration of serializeUser on passport initialization
    return passport.authenticate('jwt', { session: false });
  }
}

export default new AuthService();