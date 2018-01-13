import errorHandler from  './errorHandler';

export function errorHandlerMdl(error: any, req: any, res: any, next: any) {
    // Este middleware captura todos los errores, por lo que no todos los errores son 500
    res.status(error.status || 500).json({error: errorHandler.handleError(error)});
}