import { CommonUtil } from './utils/common.util';
import { devApis } from './utils/dev.apis';
import { Application } from 'express';
import { authApis } from '../components/auth/auth.apis';
import { chatApis } from '../components/chatt/chat.apis';
import { testApis } from './utils/test.apis';

/**
 * Loads all the apis
 */
export function apisRoutesLoader(app: Application): void {
  app.use(authApis);
  app.use(chatApis);
  if (CommonUtil.isDev) {
    app.use(devApis);
  }
  if (CommonUtil.isTest) {
    app.use(testApis);
  }
  // ... other apis
};