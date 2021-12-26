import { Module } from "@nestjs/common";
import { FileService } from "src/file/file.service";
import { UserModule } from "src/user/user.module";
import { AdminResolver } from "./admin.resolver";
import { AdminService } from "./admin.service";


@Module(
{
    imports: [UserModule],
    providers: [AdminService, AdminResolver, FileService],
})
export class AdminModule {}