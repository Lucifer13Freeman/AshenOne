import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfigService } from "./app-config.service";
import database_config from "./configs/database.config";
import app_config from "./configs/app.config";
import jwt_config from "./configs/app.config";
import { AuthConfigService } from "./auth-config.service";
import { DBConfigService } from "./db-config.service";


@Global()
@Module(
{
    imports: [
        ConfigModule.forRoot({
            load: [
                app_config,
                jwt_config, 
                database_config
            ],
            envFilePath: [`.${process.env.NODE_ENV}.env`],
            cache: true,
            isGlobal: true
        })
    ],
    providers: [
        AppConfigService,
        AuthConfigService,
        DBConfigService
    ],
    exports: [
        AppConfigService,
        AuthConfigService,
        DBConfigService
    ]
})
export class AppConfigModule {}