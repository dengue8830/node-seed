import { Application } from 'express';
import { authApis } from '../components/auth/auth.apis';
import { userApis } from '../components/user/user.apis';
import { chatApis } from '../components/chatt/chat.apis';

/**
 * Loads all the apis
 */
export function apisRoutesLoader(app: Application): void {
  app.use(authApis);
  app.use(userApis);
  app.use(chatApis);
  // ... other apis
};