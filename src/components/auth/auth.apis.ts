import { CommonUtil } from './../../common/utils/common.util';
import { Request, Response, Application, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { authService, AuthService } from './auth.service';
import { config } from '../../common/config';

const router = Router();

/**
 * Checks if the token is valid.
 * Used to know if redirect user to login screen.
 * @return: 403 | 200
 */
router.post('/apis/v1/auth/checkToken', authService.getCheckRolesMdl(AuthService.ALL_ROLES), (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 'ok' });
});

router.post('/apis/v1/auth/login', authService.getCheckRolesMdl(AuthService.ALL_ROLES), (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 'ok' });
});

router.post('/apis/v1/auth/register', authService.getCheckRolesMdl(AuthService.ALL_ROLES), (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 'ok' });
});

export const authApis = router;