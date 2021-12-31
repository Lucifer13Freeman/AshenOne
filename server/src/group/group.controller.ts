import { Controller, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { HttpAuthGuard } from "src/auth/http-auth.guard";
import { FILE_TYPE } from "src/config/configs/consts.config";
import { HttpCurrentUser } from "src/decorators/http-current-user.decorator";
import { GetUserInput } from "src/user/inputs/get-user.input";
import { GroupService } from "./group.service";


@UseGuards(HttpAuthGuard)
@Controller('/groups')
export class GroupController 
{
    constructor(private group_service: GroupService) {}

    @Post(':id/avatar')
    @UseInterceptors(FileFieldsInterceptor([
        { name: FILE_TYPE.IMAGE, maxCount: 1 }
        // { name: 'audio', maxCount: 1 },
    ]))
    update_avatar(@HttpCurrentUser() user: GetUserInput,
                    @Param('id') id: string,
                    @UploadedFiles() files)
    {
        const { image /*, audio*/ } = files;
        return this.group_service.update_avatar({ id, current_user_id: user.id }, image[0]);
    }
}