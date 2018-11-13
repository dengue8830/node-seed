/**
 * Component that handles token generation and related stuffs (login, logout, etc.)
 */

import { Request, Response, NextFunction, Router } from 'express';
import { User } from './user';
import sequelize from '../../common/connection';
import { Op } from 'sequelize';
import { Group } from './group';
import { logger } from '../../common/logger';

const router = Router();

/**
 * Client request a token to operate on protected apis.
 * Changes this with your login logic.
 */
router.get('/api/users/v1', async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.findAll({ include: [{ all: true }] });
  res.json({ users });
});

router.get('/secret/syncforce', async (req: Request, res: Response, next: NextFunction) => {
  await sequelize.sync({ force: true });
  await User.create({ email: 'xxx' });
  const user = await User.findOne({
    where: {
      email: {
        [Op.or]: ['xxx', 'yyy']
      }
    }
  });
  const group = await Group.create({ name: 'g1' });
  await user.setGroup(group);
  // user.groupId = group.id;
  // await user.save();
  // await user.createGroup({ name: 'g1' });
  const users = await group.getUsers();
  logger.debug(`cantidad ${users.length}`);
  // await user.destroy();
  res.json({ status: 'ok' });
});

export default router;