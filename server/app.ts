import * as express from 'express';
import { Request, Response, Application, NextFunction } from 'express';
import { errorHandlerMdl } from './common/errorHandlerMdl';

const bodyParser = require('body-parser');
const helmet = require('helmet');

const app:Application = express();

app.use(helmet({
    hsts: false // until we use https
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// here routes

app.use(errorHandlerMdl);

export default app;