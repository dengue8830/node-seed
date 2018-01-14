import * as express from 'express';
import { Request, Response, Application, NextFunction } from 'express';
import { errorHandlerMdl } from './common/errorHandlerMdl';
import apisRoutesLoader from './common/apisRoutesLoader';
import authService from './components/auth/authService';

const bodyParser = require('body-parser');
const helmet = require('helmet');

const app: Application = express();

app.use(helmet({
    // until we use https
    hsts: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

authService.init(app);

// here routes
apisRoutesLoader(app);

app.use(errorHandlerMdl);

export default app;