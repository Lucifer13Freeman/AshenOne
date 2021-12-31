import { registerAs } from '@nestjs/config';
import { CONFIG } from './consts.config';


export default registerAs(CONFIG.DB_CONFIG, () => (
{
    mongo: {
        type: process.env.DB_MONGO_TYPE,
        uri: process.env.DB_MONGO_URI
    },
    mssql: {
        type: process.env.MSSQL_TYPE,
        host: process.env.MSSQL_HOST,
        port: parseInt(process.env.MSSQL_PORT, 10) || 1433,
        username: process.env.MSSQL_USERNAME,
        password: process.env.MSSQL_PASSWORD
    }
}));