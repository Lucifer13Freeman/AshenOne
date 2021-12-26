import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import { Message, User } from '@prisma/client';
// import { ObjectId } from 'mongoose';
import { UserType } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/interfaces/user.interface';
//import { User, UserDocument } from 'src/user/schemas/user.schema';
//import { Message, MessageDocument } from '../schemas/message.schema';
import { MessageType } from './message.dto';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class ChatType
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => ID)
    readonly admin_id: string;//ObjectId;

    @Field(() => [UserType])
    readonly members: User[];//Document[]; //IUser[]; //User[];

    @Field(() => [MessageType/*ID*/], { nullable: true })
    readonly messages: Message[];//Document[]; //IMessage[]; //ObjectId;

    @Field({ nullable: true })
    readonly is_open: boolean;

    @Field({ nullable: true })
    readonly is_secure: boolean;

    @Field({ nullable: true })
    readonly created_at: Date

    @Field({ nullable: true })
    readonly updated_at: Date
}