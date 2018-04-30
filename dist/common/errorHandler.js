"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const hri = require('human-readable-ids').hri;
/**
 * Handles all kind of errors on the server
 */
class ErrorHandler {
    /**
     * Prints the error depending on the log level and do extra
     * operations before close the error handle cycle.
     *
     * Generates a human-friendly error code to track it latter on logs.
     * We don't want the clients seeing a db or logic error on a specific file and line right?
     *
     * @param error Any kind of error.
     * @returns Generated human-friendly error code.
     */
    handleError(error) {
        const errorCode = hri.random();
        logger_1.default.error(`[${errorCode}]: ${error}`);
        /** Here extra logic like sending email to admin or something else */
        return errorCode;
    }
}
exports.default = new ErrorHandler();
//# sourceMappingURL=errorHandler.js.map