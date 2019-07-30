import { IUser } from './../user/user.model';
import { ErrorsAPI } from './../error/errors';
import { Application, NextFunction, Request, Response } from 'express';
import { config } from '../../common/config';
import * as passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { RequestHandlerParams } from 'express-serve-static-core';
import { ISession } from './session';
// import * as ejwt from 'express-jwt';
// "express-jwt": "5.3.0",
// "@types/express-jwt": "0.0.38",

// #add-roles-here
type CheckPermissionsOptions = {
  checkRoot?: boolean,
  checkGuest?: boolean
};

/**
 * Manages all the auth behavior.
 */
export class AuthService {
  // Shortcut to indicate all the roles.
  // #add-roles-here
  static ALL_ROLES: CheckPermissionsOptions = {
    checkRoot: true,
    checkGuest: true
  };

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
    },
    /**
     * Each time we call "passport.authenticate" this callback
     * will be invoked with decoded jwt's payload and "done" callback is the callback
     * passed in "passport.authenticate"
     */
     (payload: any, done: VerifiedCallback) => done(undefined, payload)));
  }

  /**
   * Gets the auth middleware for a basic authentication,
   * that is check that the token is valid.
   * It's like use getCheckRolesMdl with ALL_ROLES
   */
  getBasicAuthMdl(): RequestHandlerParams {
    // ejwt({ secret: config.getJwtSecret() })
    // session: false prevents the declaration of serializeUser on passport initialization
    return passport.authenticate('jwt', { session: false });
  }

  /**
  * Middleware that checks session have all the roles requested by api.
  * Roles are evaluated with OR, that means the user have to have at least one of them to pass the check.
  * If you need AND you can make a second middleware beacuse that is something very weird.
  */
  getCheckRolesMdl(options: CheckPermissionsOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate('jwt', { session: false }, (error, session: ISession, info) => {
        if (error || !session) {
          return res.status(403).json({ error: ErrorsAPI.NotAuthorized });
        }
        if (options.checkRoot && session.user.isRoot
          // #add-roles-here
          || options.checkGuest && session.user.isGuest) {
          // Express stores sessions in req.user it's confusing and annoying >:v
          req.user = session;
          return next();
        }
        return res.status(403).json({ error: ErrorsAPI.NotAuthorized });
      })(req, res, next);
    };
  }

  buildSession(user?: IUser): ISession {
    // Datos de sesion que usaremos en authService
    const session: ISession = {
      user: {
        id: user ? user.id : undefined,
        isRoot: !!(user && user.isRoot),
        // #add-roles-here
        isGuest: !user
      }
    };
    return session;
  }
}

export const authService = new AuthService();