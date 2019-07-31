import { config } from './config';

describe('env variables', () => {
  test('it should be on test env', async () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(config.getBd().database).toBe('nodeseed_test');
  });
});