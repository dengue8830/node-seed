import { Application } from 'express';
import authApis from '../components/auth/authApis';

export default (app: Application): void => {
    app.use(authApis);
    // ... other apis
};