import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CONFIG } from "./configs/consts.config";


@Injectable()
export class AppConfigService 
{
    constructor(private config_service: ConfigService) {}
    
    get name(): string 
    {
        return this.config_service.get<string>('app.name');
    }

    get env(): string 
    {
        return this.config_service.get<string>('app.env');
    }

    get url(): string 
    {
        return this.config_service.get<string>('app.url');
    }

    get port(): number 
    {
        return Number(this.config_service.get<number>(CONFIG.APP_PORT));
    }
}