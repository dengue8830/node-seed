/**
 * Component that handles token generation and related stuffs (login, logout, etc.)
 */

import { Request, Response, Application, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as ejwt from 'express-jwt';
import config from '../../common/config';

const router = Router();

/**
 * Client request a token to operate on protected apis
 */
router.get('/api/v1/token', (req: Request, res: Response, next: NextFunction) => {
    const token = jwt.sign({ datosSesion: 'bar' }, config.getJwtSecret());
    res.json({ token: token });
});

/**
 * An example of a protected api to test the token generator api.
 * Delete this for your project
 */
router.get('/api/v1/protected', ejwt({ secret: config.getJwtSecret() }), (req: Request, res: Response, next: NextFunction) => {
    res.json({ status: 'listorti' });
});

export default router;