import { User } from '../components/user/user.model';
import { sequelize } from './connection';

describe('connection', () => {
  test('bd should be able to sync', async () => {
    await sequelize.sync({ force: true });
  });
  test('bd should be able to create user', async () => {
    await User.create({ email: 'xxx' });
  });
  test('bd should be able to retreive user', async () => {
    const user = await User.findOne({
      where: {
        email: {
          '$or': ['xxx', 'yyy']
        }
      }
    });
    expect(user).not.toBeUndefined();
  });
});