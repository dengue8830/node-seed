import { Request, Response, NextFunction, Router } from 'express';
import { asyncMdl } from '../../common/async.mdl';
import { logger } from '../../common/logger';
import { IErrorLogAttrs, ErrorLog } from './error-log.model';
import { CommonUtil } from '../../common/utils/common.util';
import { MathUtil } from '../../common/utils/math.util';

const router = Router();

// No protegemos la api porque necesitamos capturar errors que pueden susceder en el splash
// antes de obtener un token
router.post('/apis/v1/errorLogs/reportError', asyncMdl(async (req: Request, res: Response, next: NextFunction) => {
  const errorLog: IErrorLogAttrs = req.body;
  // Parseos por seguridad. Algunos valores para android son de un tipo y para ios de otro
  errorLog.buildNumber = errorLog.buildNumber ? errorLog.buildNumber.toString() : undefined;
  // Nivel de bateria es un valor entre 0 y 1 y puede ser 0.788888
  errorLog.batteryLevel = CommonUtil.exists(errorLog.batteryLevel) ? MathUtil.round(errorLog.batteryLevel!, 2) : undefined;
  logger.debug(errorLog);
  await ErrorLog.create(errorLog);
  res.json({ status: 'ok' });
}));

export const errorApis = router;