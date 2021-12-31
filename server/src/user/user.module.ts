import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/file/file.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
// import { User, UserSchema } from "./schemas/user.schema";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";


@Module(
{
    imports: [
        //PrismaModule,
        // MongooseModule.forFeature([{ name: User.name, 
        //                             schema: UserSchema }])
    ],
    controllers: [UserController],
    providers: [UserService, UserResolver, FileService],
    exports: [UserService]
})
export class UserModule {}