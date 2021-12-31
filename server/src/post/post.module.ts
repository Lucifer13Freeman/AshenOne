import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/file/file.service";
import { UserModule } from "src/user/user.module";
import { PubSub } from "graphql-subscriptions";
import { PubSubModule } from "src/pubsub/pubsub.module";
// import { Post, PostSchema } from "./schemas/post.schema";
// import { Comment, CommentSchema } from "./schemas/comment.schema";
import { PostService } from "./post.service";
import { PostResolver } from "./post.resolver";
import { SubscriptionModule } from "src/subscriptions/subscription.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { CommentService } from "./comment.service";
import { CommentResolver } from "./comment.resolver";
import { GroupModule } from "src/group/group.module";
// import { Like, LikeSchema } from "./schemas/like.schema";
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import * as Redis from 'ioredis';


@Module(
{
    imports: [
        //PrismaModule,
        UserModule,
        PubSubModule,
        SubscriptionModule,
        GroupModule
        // MongooseModule.forFeature([{ name: Post.name, 
        //                             schema: PostSchema }]),
        // MongooseModule.forFeature([{ name: Like.name, 
        //                             schema: LikeSchema }]),
        // MongooseModule.forFeature([{ name: Comment.name, 
        //                             schema: CommentSchema }])
    ],
    providers: [
        PostService, PostResolver, 
        CommentService, CommentResolver, 
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
    exports: [PostService, /*CommentService*/]
})
export class PostModule {}