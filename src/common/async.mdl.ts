import { Response, Request, NextFunction } from 'express';

/**
 * Wrapper to catch exceptions in the logic of the routes.
 * This way routes doesn't need to wrap their code in a try/catch.
 * You can don't use this wrapper and use try/catch calling next function on catch
 *
 * @param fn Route logic
 */
export function asyncMdl(fn: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
}