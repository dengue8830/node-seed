import { IUser } from './../user/user.model';
import { ErrorsAPI } from './../error/errors';
import { Application, NextFunction, Request, Response } from 'express';
import { config } from '../../common/config';
import * as passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { RequestHandlerParams } from 'express-serve-static-core';
import { Session, ISession } from './session';
import { User } from '../user/user.model';
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

  /**
  * Mdl que checkea que la sesion tenga los permisos solicitados.
  * Los diferentes roles se evaluan en OR, es decir, tiene que tener al menos uno de esos roles solicitados
  * para que pase. La simultaneidad (AND) se la puede evaluar al pasar este control (ej un segundo mdl) por ser algo bastante
  * raro de necesitar.
  * Por defecto checkea que tenga un token valido. Si no se quiere ni eso pues ni uses este mdl.
  */
  getCheckRolesMdl(options: CheckPermissionsOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      // Passport user is our session, so we call it passportSession
      passport.authenticate('jwt', { session: false }, (error, passportSession, info) => {
        if (error || !passportSession) {
          return res.status(403).json({ error: ErrorsAPI.NotAuthorized });
        }
        const session = Session.parseSession(passportSession);
        if (options.checkRoot && session.isRoot()
          // #add-roles-here
          || options.checkGuest && session.isGuest()) {
          req.user = passportSession;
          return next();
        }
        return res.status(403).json({ error: ErrorsAPI.NotAuthorized });
      })(req, res, next);
    };
  }

  buildSession(user?:IUser): ISession {
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