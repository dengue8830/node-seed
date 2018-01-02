import { Request, Response, Application, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as ejwt from 'express-jwt';
import config from '../../common/config';

const router = Router();

router.get('/token', (req: Request, res: Response, next: NextFunction) => {
    const token = jwt.sign({ foo: 'bar' }, config.getJwtSecret());
    res.json({ token: token });
});

router.get('/protected', ejwt({ secret: config.getJwtSecret() }), (req: Request, res: Response, next: NextFunction) => {
    res.json({ status: 'listorti' });
});

export default router;