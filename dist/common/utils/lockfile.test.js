"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const fs = require("fs-extra");
require("mocha");
const chai = require("chai");
const config_1 = require("../../common/config");
const lockfile_1 = require("./lockfile");
const expect = chai.expect;
// Tiene que ir en ./components porque sino la tarea de test de package.json toma solo
// este archivo y ninguno de los otros :v que raro
describe('lockfile tests', () => {
    it('should delete a lockfile on the app initialization', () => __awaiter(this, void 0, void 0, function* () {
        yield fs.createFile(config_1.default.getExampleLockFileName());
        expect(yield fs.pathExists(config_1.default.getExampleLockFileName())).equals(true, 'no se creo el archivo');
        const app = new app_1.default();
        yield app.init();
        expect(yield fs.pathExists(config_1.default.getExampleLockFileName())).equals(false, 'no se borro el lock file');
    }));
    it('should create and delete a lockfile with the class API', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield fs.pathExists(config_1.default.getExampleLockFileName())).equals(false, 'exists lockfile');
        yield lockfile_1.LockFile.lockExample();
        expect(yield fs.pathExists(config_1.default.getExampleLockFileName())).equals(true, 'lockfile doesnt exists');
        yield lockfile_1.LockFile.unlockExample();
        expect(yield fs.pathExists(config_1.default.getExampleLockFileName())).equals(false, 'exists lockfile');
    }));
});
//# sourceMappingURL=lockfile.test.js.map