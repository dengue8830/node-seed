import { Request, Response, Application, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import authService from '../auth/authService';
import config from '../../common/config';
import socket from './socket';
import logger from '../../common/logger';

const router = Router();

router.get('/api/chat/v1', async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`por api ${req.query.message}`);
    socket.sendMessage(req.query.message);
    res.json({ status: 'ok' });
});

export default router;