// import { ConnectionOptions, createConnection } from 'typeorm';

// import { createConnection } from "mongoose";
import { DBConfigService } from "src/config/db-config.service";
// import * as mongoose from 'mongoose';
import { join } from "path";
//import { createConnection } from "typeorm";
import { PROVIDERS } from "src/config/configs/consts.config";


// export const mssql_connection_options: ConnectionOptions = {
//     type: 'mssql',
//     host: 'localhost',
//     port: 3143,
//     username: 'root',
//     password: 'root',
//     database: 'db_ashen_one',
//     entities: [
//         __dirname + '/../**/*.entity{.ts,.js}',
//     ],
//     synchronize: true
// };


// export const database_providers = [
//     {
//         provide: DATABASE_CONNECTION,
//         useFactory: async (db_config_service: DBConfigService) => 
//                             await createConnection( 
//                                 db_config_service.mongo_url,
//                                 { useNewUrlParser: true,
//                                 useCreateIndex: true,
//                                 useUnifiedTopology: true }),
        // mongoose.connect(
        //     db_config_service.mongo_uri,
        //     { useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true }
        // ),
//         inject: [DBConfigService]
//     }
// ];

// export const database_providers = [
//     {
//         provide: PROVIDERS.DATABASE_CONNECTION,
//         useFactory: async (db_config_service: DBConfigService)/*: Promise<typeof mongoose>*/ => (
//             await createConnection(
//             db_config_service.mongo_uri,
//             { useNewUrlParser: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true }
//         )),
//         inject: [DBConfigService]
//     }
// ];

// export const database_providers = [
//     {
//       // Token can be set by yourself
//       provide: PROVIDERS.DATABASE_CONNECTION,
//       useFactory: async (db_config_service: DBConfigService) =>
//         await createConnection({
//             type: 'mongodb',
//             url: db_config_service.mongo_url,
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             entities: [join(__dirname, '**/**.entity{.ts,.js}')],
//             synchronize: true,
//             logging: true
//         }),
//         inject: [DBConfigService]
//     }
// ];

// export const database_providers = [
//     {
//         provide: DATABASE_CONNECTION,
//         useFactory: async () => await createConnection(mssql_connection_options)
//     }
// ];