"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const errorHandlerMdl_1 = require("./common/errorHandlerMdl");
const apisRoutesLoader_1 = require("./common/apisRoutesLoader");
const authService_1 = require("./components/auth/authService");
const lockfile_1 = require("./common/utils/lockfile");
const logger_1 = require("./common/logger");
const socket_1 = require("./components/chatt/socket");
const bodyParser = require('body-parser');
const helmet = require('helmet');
class App {
    constructor() {
        this.app = express();
    }
    init(server) {
        return __awaiter(this, void 0, void 0, function* () {
            // An array of promises to do the async work
            const promises = [];
            // Remove this line and his import if you won't use sockets
            socket_1.default.init(server);
            // Uncomment this lines to enable CORS
            // this.app.use(function (req, res, next) {
            //     res.header('Access-Control-Allow-Origin', '*'); // specific domains are recomended
            //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
            //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            //     next();
            // });
            this.app.use(helmet({
                // until we use https
                hsts: false
            }));
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: false }));
            authService_1.default.init(this.app);
            // Routes inside this caller
            apisRoutesLoader_1.default(this.app);
            // Remove all the lockfiles to ensure a clean app's startup
            promises.push(lockfile_1.LockFile.deleteAllLockfiles()
                .catch(error => {
                logger_1.default.error(`error deleting a lockfile ${error}`);
            }));
            this.app.use(errorHandlerMdl_1.errorHandlerMdl);
            return Promise.all(promises);
        });
    }
    getExpressApp() {
        return this.app;
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map