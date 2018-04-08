import * as express from 'express';
import { Request, Response, Application, NextFunction } from 'express';
import { errorHandlerMdl } from './common/errorHandlerMdl';
import apisRoutesLoader from './common/apisRoutesLoader';
import authService from './components/auth/authService';
import { LockFile } from './common/utils/lockfile';
import logger from './common/logger';

const bodyParser = require('body-parser');
const helmet = require('helmet');

export default class App {
    private app: Application;

    async init() {
        // An array of promises to do the async work
        const promises: Promise<any>[] = [];
        this.app = express();
        // Enable CORS
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

        authService.init(this.app);

        // here routes
        apisRoutesLoader(this.app);

        promises.push(LockFile.deleteAllLockfiles()
            .catch(error => {
                logger.error(`error deleting a lockfile ${error}`);
            }));

        this.app.use(errorHandlerMdl);
        return Promise.all(promises);
    }

    getExpressApp(): Application {
        return this.app;
    }
}