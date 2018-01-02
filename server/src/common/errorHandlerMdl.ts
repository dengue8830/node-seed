import errorHandler from  './errorHandler';

export function errorHandlerMdl(error: any, req: any, res: any, next: any) {
    res.status(error.status || 500).json({error: errorHandler.handleError(error)});
}