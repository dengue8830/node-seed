import { Application } from 'express';
import authApis from '../components/auth/auth.apis';
import userApis from '../components/user/userApis';
import chatApis from '../components/chatt/chatApis';

/**
 * Loads all the apis
 */
export default (app: Application): void => {
    app.use(authApis);
    app.use(userApis);
    app.use(chatApis);
    // ... other apis
};