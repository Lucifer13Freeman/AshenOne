import { Global, Module } from "@nestjs/common";
import { ChatModule } from "src/chat/chat.module";
import { FileService } from "src/file/file.service";
import { GroupModule } from "src/group/group.module";
import { PubSubModule } from "src/pubsub/pubsub.module";
import { UserModule } from "src/user/user.module";
import { InviteResolver } from "./invite.resolver";
import { InviteService } from "./invite.service";


// @Global()
@Module(
{
    imports: [
        UserModule,
        PubSubModule
    ],
    providers: [
        InviteService, InviteResolver,
        FileService
    ],
    exports: [InviteService]
})
export class InviteModule {}