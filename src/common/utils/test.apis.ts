import { config } from './../config';
import { authService } from './../../components/auth/auth.service';
import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { sessionUtil } from './session.util';

const router = Router();

router.get('/apis/test/guestToken', (req: Request, res: Response, next: NextFunction) => {
  const token = jwt.sign(authService.buildSession(), config.getJwtSecret()); // , { expiresIn: '30s' }
  return res.json({ status: 'ok', token });
});

router.get('/apis/test/rootToken', (req: Request, res: Response, next: NextFunction) => {
  const token = jwt.sign(authService.buildSession({ isRoot: true, email: 'root', id: '1', username: 'root', firstName: 'root' }), config.getJwtSecret()); // , { expiresIn: '30s' }
  return res.json({ status: 'ok', token });
});

router.get('/apis/test/protectedGuest', authService.getCheckRolesMdl({ checkGuest: true, checkRoot: true }), (req: Request, res: Response, next: NextFunction) => {
  // The token data is in req.user -> console.log(req.user);
  const session = sessionUtil.parseRequest(req);
  res.json({ status: 'ok', session });
});

router.get('/apis/test/protectedRoot', authService.getCheckRolesMdl({ checkRoot: true }), (req: Request, res: Response, next: NextFunction) => {
  // The token data is in req.user -> console.log(req.user);
  const session = sessionUtil.parseRequest(req);
  res.json({ status: 'ok', session });
});

export const testApis = router;