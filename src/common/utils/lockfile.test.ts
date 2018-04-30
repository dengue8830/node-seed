import App from '../../app';
import * as fs from 'fs-extra';
import 'mocha';
import * as chai from 'chai';
import ChaiHttp = require('chai-http');
import config from '../../common/config';
import { LockFile } from './lockfile';
const expect = chai.expect;

// Tiene que ir en ./components porque sino la tarea de test de package.json toma solo
// este archivo y ninguno de los otros :v que raro

describe('lockfile tests', () => {
    it('should delete a lockfile on the app initialization', async () => {
        await fs.createFile(config.getExampleLockFileName());
        expect(await fs.pathExists(config.getExampleLockFileName())).equals(true, 'no se creo el archivo');
        const app = new App();
        await app.init();
        expect(await fs.pathExists(config.getExampleLockFileName())).equals(false, 'no se borro el lock file');
    });

    it('should create and delete a lockfile with the class API', async () => {
        expect(await fs.pathExists(config.getExampleLockFileName())).equals(false, 'exists lockfile');
        await LockFile.lockExample();
        expect(await fs.pathExists(config.getExampleLockFileName())).equals(true, 'lockfile doesnt exists');
        await LockFile.unlockExample();
        expect(await fs.pathExists(config.getExampleLockFileName())).equals(false, 'exists lockfile');
    });
});
