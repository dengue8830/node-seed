import { Application } from 'express';
import authApis from '../components/auth/authApis';
import userApis from '../components/user/userApis';

/**
 * Loads all the apis
 */
export default (app: Application): void => {
    app.use(authApis);
    app.use(userApis);
    // ... other apis
};