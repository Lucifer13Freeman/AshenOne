import { Global, Module } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { PROVIDERS } from "src/config/configs/consts.config";

//export const PUB_SUB = 'PUB_SUB';
 
@Global()
@Module({
  providers: [
    {
      provide: PROVIDERS.PUB_SUB,
      //useClass: PubSub,
      useValue: new PubSub(),
      useFactory: () => new PubSub()
    }
  ],
  exports: [PROVIDERS.PUB_SUB]
})

export class PubSubModule {}