import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
//import { Subscription, SubscriptionSchema } from "./schemas/subscriptions.schema";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionResolver } from "./subscription.resolver";
import { PrismaModule } from "src/prisma/prisma.module";


@Module(
{
    imports: [
        //PrismaModule,
        UserModule,
        //PubSubModule,
        // MongooseModule.forFeature([{ name: Subscription.name, 
        //                                schema: SubscriptionSchema }])
    ],
    providers: [SubscriptionService, SubscriptionResolver],
    exports: [SubscriptionService]
})
export class SubscriptionModule {}