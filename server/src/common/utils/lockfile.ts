import * as lockFile from 'lockfile';
import { Options } from 'lockfile';
import config from '../../common/config';
import * as fs from 'fs-extra';

// Tiene que ir en ./components porque el correspondiente test tiene que ir ahi.
// Ver el archivo de test para ver porque
export class LockFile {
    static async lock(filePath: string, options?: Options) {
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
            lockFile.lock(filePath, options, (error: any) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    static async unlock(filePath: string) {
        return new Promise((resolve, reject) => {
            lockFile.unlock(filePath, (error: any) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    static async lockExample() {
        return this.lock(config.getExampleLockFileName());
    }

    static async unlockExample() {
        return this.unlock(config.getExampleLockFileName());
    }

    /**
     * Its recomended use this method on the initalization of the app to
     * ensure a clean environment. If not, zombies lockfiles can still live
     * becouse a lockfile that not had been deleted properly due to a exception throw
     * or something.
     */
    static async deleteAllLockfiles() {
        return fs.remove(config.getExampleLockFileName());
        // add anothers lockfiles you use in your app
    }
}
