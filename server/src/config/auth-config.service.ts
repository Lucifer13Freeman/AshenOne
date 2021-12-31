import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CONFIG } from "./configs/consts.config";


@Injectable()
export class AuthConfigService 
{
    constructor(private config_service: ConfigService) {}
    

    get jwt_secret(): string
    {
        return this.config_service.get<string>(CONFIG.JWT_SECRET);
    }

    get jwt_expires_in(): number | string
    {
        return this.config_service.get<number | string>(CONFIG.JWT_EXPIRES_IN);
    }
}