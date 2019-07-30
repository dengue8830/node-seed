import { ISession } from './../../components/auth/session';
import { Request } from 'express';

export const sessionUtil = {
  /**
   * Abstract the way we store the session in the Express request.
   * Express stores session in req.user, it's confusingannoying >:v
   *
   * @param req Express Request
   */
  parseRequest(req: Request): ISession {
    return req.user;
  }
}