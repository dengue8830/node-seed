import errorHandler from  './errorHandler';
import { Request, Response, NextFunction } from 'express';

/**
 * Error handler to be used as express middleware
 * @param error Express types define it as any
 * @param req The request
 * @param res The response
 * @param next The next function
 */
export function errorHandlerMdl(error: any, req: Request, res: Response, next: NextFunction): void {
    // This middleware handles all kind of errors, not only 500
    res.status(error.status || 500).json({error: errorHandler.handleError(error)});
}