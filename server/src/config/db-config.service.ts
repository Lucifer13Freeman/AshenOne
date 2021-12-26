import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CONFIG } from "./configs/consts.config";


@Injectable()
export class DBConfigService 
{
    constructor(private config_service: ConfigService) {}
    
    get mongo_type(): string
    {
        return this.config_service.get<string>(CONFIG.DB_MONGO_TYPE);
    }

    get mongo_uri(): string 
    {
        return this.config_service.get<string>(CONFIG.DB_MONGO_URI);
    }
}