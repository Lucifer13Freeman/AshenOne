import { Controller, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { HttpAuthGuard } from "src/auth/http-auth.guard";
import { FILE_TYPE } from "src/config/configs/consts.config";
import { HttpCurrentUser } from "src/decorators/http-current-user.decorator";
import { UpdateUserInput } from "./inputs/update-user.input";
import { UserService } from "./user.service";


@UseGuards(HttpAuthGuard)
@Controller('/people')
export class UserController 
{
    constructor(private user_service: UserService) {}

    @Post(':id/avatar')
    @UseInterceptors(FileFieldsInterceptor([
        { name: FILE_TYPE.IMAGE, maxCount: 1 }
        // { name: 'audio', maxCount: 1 },
    ]))
    update_avatar(@HttpCurrentUser() user: UpdateUserInput,
                    @Param('id') id: string,
                    @UploadedFiles() files)
    {
        const { image /*, audio*/ } = files;
        return this.user_service.update_avatar({ id, current_user_id: user.id }, image[0]);
    }
}