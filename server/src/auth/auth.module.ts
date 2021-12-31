import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
// import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AppConfigModule } from "src/config/config.module";
import { AppConfigService } from "src/config/app-config.service";
// import { User, UserSchema } from "src/user/schemas/user.schema";
import { UserModule } from "src/user/user.module";
import { GqlAuthGuard } from "./gql-auth.guard";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from './auth.service';
import { JwtStrategy } from "./jwt.strategy";
import { AuthConfigService } from "src/config/auth-config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import jwt_config from './../config/configs/jwt.config';


@Module(
{
    imports: [
        //MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        //AppConfigModule,
        ConfigModule.forFeature(jwt_config),
        UserModule,
        PassportModule,
        // PassportModule.registerAsync(
        // {
        //     imports: [AppConfigModule],
        //     useFactory: async (auth_config_service: AuthConfigService) => (
        //     {
        //         secret: process.env.JWT_SECRET, //auth_config_service.jwt_secret, // 
        //         signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }//auth_config_service.jwt_expires_in } //'24h' }//'60s' }//3600 }
        //     }),
        //     inject: [AuthConfigService]
        // }),
        JwtModule.registerAsync(
        { 
            //imports: [AppConfigModule],
            useFactory: (auth_config_service: AuthConfigService) => 
            ({
                secret: auth_config_service.jwt_secret, // process.env.JWT_SECRET, //
                signOptions: { expiresIn: auth_config_service.jwt_expires_in } //process.env.JWT_EXPIRES_IN }//'24h' }//'60s' }//3600 }
            }),
            inject: [AuthConfigService]
        }),
        // JwtModule.registerAsync(
        // {
        //     useFactory: async (config: ConfigService) => 
        //     ({
        //         secret: config.get<string>('JWT_SECRET'),
        //         signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRES_IN') }
        //     }),
        //     inject: [ConfigService]
        // }),
        //PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [AuthService, AuthResolver, GqlAuthGuard, JwtStrategy],
    //exports: [AuthService]
})
export class AuthModule {}