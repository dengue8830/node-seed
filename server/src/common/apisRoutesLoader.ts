import { Application } from 'express';
import authApis from '../components/auth/authApis';

/**
 * Loads all the apis
 */
export default (app: Application): void => {
    app.use(authApis);
    // ... other apis
};