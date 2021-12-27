import { Module } from "@nestjs/common";
import { FileService } from "src/file/file.service";
import { PubSubModule } from "src/pubsub/pubsub.module";
import { UserModule } from "src/user/user.module";
import { GroupController } from "./group.controller";
import { GroupResolver } from "./group.resolver";
import { GroupService } from "./group.service";


@Module(
{
    imports: [
        UserModule,
        PubSubModule
    ],
    controllers: [GroupController],
    providers: [
        GroupService, GroupResolver,
        FileService
    ],
    exports: [GroupService]
})
export class GroupModule {}