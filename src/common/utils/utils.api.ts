import { Request, Response, Application, NextFunction, Router } from 'express';
import { authService } from '../../components/auth/auth.service';

const router = Router();

router.get('/apis/v1/utils/checkServerStatus', authService.getBasicAuthMdl(), (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 'ok' });
});

export const utilsApis = router;