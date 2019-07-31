import { App } from '../../app';
import * as fs from 'fs-extra';
import { config } from '../../common/config';
import { LockFile } from './lockfile';

// Tiene que ir en ./components porque sino la tarea de test de package.json toma solo
// este archivo y ninguno de los otros :v que raro

describe('lockfile tests', () => {
  test('should delete a lockfile on the app initialization', async () => {
    await fs.createFile(config.getExampleLockFileName());
    expect(await fs.pathExists(config.getExampleLockFileName())).toEqual(true);
    const app = new App();
    await app.init();
    expect(await fs.pathExists(config.getExampleLockFileName())).toEqual(false);
  });

  test('should create and delete a lockfile with the class API', async () => {
    expect(await fs.pathExists(config.getExampleLockFileName())).toEqual(false);
    await LockFile.lockExample();
    expect(await fs.pathExists(config.getExampleLockFileName())).toEqual(true);
    await LockFile.unlockExample();
    expect(await fs.pathExists(config.getExampleLockFileName())).toEqual(false);
  });
});
