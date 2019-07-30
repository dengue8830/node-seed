import { Request, Response, NextFunction, Router } from 'express';
import socket from './socket';
import { logger } from '../../common/logger';
import { asyncMdl } from '../../common/async.mdl';

const router = Router();

router.get('/apis/v1/chat', asyncMdl(async (req: Request, res: Response, next: NextFunction) => {
  logger.info(`por api ${req.query.message}`);
  socket.sendMessage(req.query.message);
  res.json({ status: 'ok' });
}));

export default router;