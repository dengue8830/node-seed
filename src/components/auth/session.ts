import { Request } from 'express';

export interface ISession {
  user: {
    id?: string,
    isRoot: boolean,
    isGuest: boolean
  }
}

export class Session implements ISession {
  user: {
    id?: string,
    isRoot: boolean,
    isGuest: boolean
  }

  /**
   * Abstract the way we store the session in the request.
   * @param req Express Request
   */
  static parseRequest(req: Request): Session {
    const session = new Session();
    // On this case req.user is type Session
    session.user = req.user.usuario;
    return session;
  }

  /**
   * Passport "user" is our session, so we use it as session
   */
  static parseSession(rawSession: ISession) {
    const session = new Session();
    // On this case req.user is type Session
    session.user = rawSession.user;
    return session;
  }

  isRoot(): boolean {
    return !!this.user.isRoot;
  }

  isGuest(): boolean {
    return !!this.user.isGuest;
  }
}