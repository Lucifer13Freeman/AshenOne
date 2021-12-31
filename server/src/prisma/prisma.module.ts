import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'src/config/config.module';
// import { database_providers } from './prisma.providers';
import db_config from '../config/configs/database.config';
import { DBConfigService } from 'src/config/db-config.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PrismaService } from './prisma.service';


@Global()
@Module(
{
    providers: [PrismaService],
    exports: [PrismaService]
    
    // imports: [
    //     ConfigModule.forFeature(db_config),
    //     MongooseModule.forRootAsync(
    //     {
    //         imports: [AppConfigModule],
    //         useFactory: async (db_config_service: DBConfigService) => (
    //         {
    //             uri: db_config_service.mongo_uri,
    //             useNewUrlParser: true,
    //             useCreateIndex: true,
    //             useUnifiedTopology: true
    //         }),
    //         inject: [DBConfigService]
    //     }),

        // TypeOrmModule.forRootAsync(
        // {
        //     imports: [AppConfigModule],
        //     useFactory: async (db_config_service: DBConfigService) => (
        //     {
        //         //type: 'mongodb',
        //         url: db_config_service.mongo_url,
        //         entities: [join(__dirname, '**/**.entity{.ts,.js}')],
        //         synchronize: true,
        //         useNewUrlParser: true,
        //         useCreateIndex: true,
        //         useUnifiedTopology: true,
        //         logging: true
        //     }),
        //     inject: [DBConfigService]
        // }),
    //],
    //providers: [ ...database_providers ],
    // exports: [...database_providers]
    // MongooseModule.forRoot(process.env.MONGO_URI, 
    //                         { useNewUrlParser: true,
    //                         useCreateIndex: true,
    //                         useUnifiedTopology: true }),
})
export class PrismaModule {}