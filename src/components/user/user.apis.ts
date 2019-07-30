// Example api to run tests, delete this when you clone it.

import { Request, Response, NextFunction, Router } from 'express';
import { User } from './user.model';
import { sequelize } from '../../common/connection';
import { Op } from 'sequelize';
import { asyncMdl } from '../../common/async.mdl';

const router = Router();

/**
 * Client request a token to operate on protected apis.
 * Changes this with your login logic.
 */
router.get('/apis/v1/users', asyncMdl(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.findAll({ include: [{ all: true }] });
  res.json({ users });
}));

router.get('/secret/syncforce', asyncMdl(async (req: Request, res: Response, next: NextFunction) => {
  await sequelize.sync({ force: true });
  await User.create({ email: 'xxx' });
  await User.findOne({
    where: {
      email: {
        [Op.or]: ['xxx', 'yyy']
      }
    }
  });
  res.json({ status: 'ok' });
}));

export const userApis = router;