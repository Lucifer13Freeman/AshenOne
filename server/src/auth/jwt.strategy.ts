import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthConfigService } from 'src/config/auth-config.service';
import { ConfigService, ConfigType } from '@nestjs/config';
import { CONFIG } from 'src/config/configs/consts.config';


// const cookie_extractor = (req: Request): string | null => 
// {
//     let token = null;
//     if (req && req.cookies) token = req.cookies.token;

//     return token;
// };


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) 
{
    constructor(
        // @Inject()
        private readonly auth_config_service: AuthConfigService,
        //private readonly config: ConfigService
        //private jwt_service: JwtService]
        // @Inject(AuthConfigService.KEY)
        //private auth_config_service: ConfigType<typeof auth_config_service>,
    ) 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => 
            // {
            //     //console.log(req)
            //     return req?.cookies?.token;
            // }]),
            secretOrKey: auth_config_service.jwt_secret, // config.get<string>(/*CONFIG.JWT_SECRET*/ 'JWT_SECRET'), //process.env.JWT_SECRET, // auth_config_service.jwt_secret, // 
            ignoreExpiration: false,
            jsonWebTokenOptions: { expiresIn: auth_config_service.jwt_expires_in } //process.env.JWT_EXPIRES_IN } // auth_config_service.jwt_expires_in } //'24h' }//'60s' }//3600 }
        });
    }

    async validate(payload: any) 
    {
        const { id, /*email,*/ username, role /*token, AccessToken*/, is_banned } = payload;
        //console.log(this.auth_config_service.jwt_secret)
        //const token = ExtractJwt.fromAuthHeaderAsBearerToken();
        //console.log(token.toString())
        return { id, /*email,*/ username, role, is_banned/*, token*/ };
    }
}