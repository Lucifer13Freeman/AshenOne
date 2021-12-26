import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ChatModule } from './chat/chat.module';
// import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { PubSub } from 'graphql-subscriptions';
import { PubSubModule } from './pubsub/pubsub.module';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { PostModule } from './post/post.module';
import { AppConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
// import { createConnection } from 'mongoose';
import { DBConfigService } from './config/db-config.service';
import { GQLModule } from './graphql/graphql.module';
import { GroupModule } from './group/group.module';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';


@Module(
{
    imports: [
        ServeStaticModule.forRoot({ 
            serveRoot: '/static',
            // renderPath: '/static',
            rootPath: path.resolve(__dirname, '..', 'static'),// join(process.cwd(), 'static'), //join(__dirname, '..', 'static'), //
            // serveStaticOptions: {
			// 	redirect: false,
			// 	index: false
			// }
        }),
        AppConfigModule,
        GQLModule,
        PrismaModule,
        //TrackModule,
        AuthModule,
        //PubSubModule,
        UserModule,
        AdminModule,
        ChatModule,
        SubscriptionModule,
        PostModule,
        GroupModule,
        FileModule
    ],
    controllers: [],
    providers: [
        // {
        //   provide: 'PUB_SUB',
        //   useValue: new PubSub(),
        // },
    ]
})
export class AppModule {}