"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./errorHandler");
/**
 * Error handler to be used as express middleware
 * @param error Express types define it as any
 * @param req The request
 * @param res The response
 * @param next The next function
 */
function errorHandlerMdl(error, req, res, next) {
    // This middleware handles all kind of errors, not only 500
    res.status(error.status || 500).json({ error: errorHandler_1.default.handleError(error) });
}
exports.errorHandlerMdl = errorHandlerMdl;
//# sourceMappingURL=errorHandlerMdl.js.map