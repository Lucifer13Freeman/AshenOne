import { registerAs } from '@nestjs/config';
import { CONFIG } from './consts.config';


export default registerAs(CONFIG.APP_CONFIG, () => (
{
    env: process.env.NODE_ENV,
    port: parseInt(process.env.APP_PORT, 10) || 5000,
    // jwt_secret: process.env.JWT_SECRET,
    // jwt_expires_in: process.env.JWT_EXPIRES_IN
}));