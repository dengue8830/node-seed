import { Application } from 'express';
import authApis from '../components/auth/authApis';

export default (app: Application): void => {
    app.use('/api/v1/', authApis);
    // ... other apis
};