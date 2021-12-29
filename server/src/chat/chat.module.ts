import { forwardRef, Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/file/file.service";
import { UserModule } from "src/user/user.module";
import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
// import { Chat, ChatSchema } from "./schemas/chat.schema";
import { MessageService } from "./message.service";
// import { Message, MessageSchema } from "./schemas/message.schema";
// import { Reaction, ReactionSchema } from "./schemas/reaction.schema";
import { MessageResolver } from "./message.resolver";
import { PubSub } from "graphql-subscriptions";
import { PubSubModule } from "src/pubsub/pubsub.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { InviteModule } from "src/invite/invite.module";
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import * as Redis from 'ioredis';


@Module(
{
    imports: [
        //PrismaModule,
        UserModule,
        forwardRef(() => InviteModule),
        // InviteModule,
        PubSubModule//,
        // MongooseModule.forFeature([{ name: Chat.name, 
        //                             schema: ChatSchema }]),
        // MongooseModule.forFeature([{ name: Message.name, 
        //                             schema: MessageSchema }]),
        // MongooseModule.forFeature([{ name: Reaction.name, 
        //                             schema: ReactionSchema }])
    ],
    providers: [
        ChatService, ChatResolver, 
        MessageService, MessageResolver, 
        FileService,
        // {
        //     provide: 'PUB_SUB',
        //     useValue: new PubSub()
        // }
        // {
        //     provide: 'PUB_SUB',
        //     useFactory: () => {
        //       const options = {
        //         host: 'localhost',
        //         port: 6379
        //       };
          
        //       return new RedisPubSub({
        //         publisher: new Redis(options),
        //         subscriber: new Redis(options),
        //       });
        //     },
        // },
    ],
    exports: [ChatService, MessageService]
})
export class ChatModule {}