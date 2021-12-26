import { registerAs } from '@nestjs/config';
import { CONFIG } from './consts.config';


export default registerAs(CONFIG.JWT_CONFIG, () => (
{
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN
}));