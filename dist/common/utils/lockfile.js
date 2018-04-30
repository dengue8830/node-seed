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
const lockFile = require("lockfile");
const config_1 = require("../../common/config");
const fs = require("fs-extra");
// Tiene que ir en ./components porque el correspondiente test tiene que ir ahi.
// Ver el archivo de test para ver porque
class LockFile {
    static lock(filePath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Intentara durante 20 segundos.
            // No usamos la opcion { wait: 20000 } porque consulta durante 20 segundos de forma continua
            // o por lo menos eso da a entender la doc https://www.npmjs.com/package/lockfile.
            // Eso no nos conviene porque hara un uso mas intensivo de cpu,
            // si bien consigue un resultado mas rapido, como lo pondremos en un servidor compartido no nos conviene.
            // Checkear el test "deberia crear 3 pedidos "concurrentemente" sin equivocarse en el stock",
            // crea concurrentemente 3 pedidos y los ultimos dos pelean pelean por entrar a la zona de exclusion.
            // Con { retries: 50, retryWait: 400 } tarda 830ms y con { wait: 20000 } tarda 350ms para 2 pedidos en competencia.
            options = options || { retries: 50, retryWait: 400 };
            return new Promise((resolve, reject) => {
                lockFile.lock(filePath, options, (error) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();
                });
            });
        });
    }
    static unlock(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                lockFile.unlock(filePath, (error) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();
                });
            });
        });
    }
    static lockExample() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.lock(config_1.default.getExampleLockFileName());
        });
    }
    static unlockExample() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unlock(config_1.default.getExampleLockFileName());
        });
    }
    /**
     * Its recomended use this method on the initalization of the app to
     * ensure a clean environment. If not, zombies lockfiles can still live
     * becouse a lockfile that not had been deleted properly due to a exception throw
     * or something.
     */
    static deleteAllLockfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return fs.remove(config_1.default.getExampleLockFileName());
            // add anothers lockfiles you use in your app
        });
    }
}
exports.LockFile = LockFile;
//# sourceMappingURL=lockfile.js.map