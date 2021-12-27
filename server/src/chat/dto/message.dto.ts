import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import { Reaction, User } from '@prisma/client';
// import { ObjectId } from 'mongoose';
import { UserType } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/interfaces/user.interface';
//import { User, UserDocument } from 'src/user/schemas/user.schema';
//import { Reaction, ReactionDocument } from '../schemas/reaction.schema';
import { ChatType } from './chat.dto';
import { ReactionType } from './reaction.dto';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class MessageType
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => ID)
    readonly chat_id: string;//ObjectId;

    @Field(() => UserType)
    readonly user: User;//Document; //IUser; //User;

    @Field()
    readonly text: string;

    @Field({ nullable: true })
    readonly image: string;

    @Field({ nullable: true })
    readonly audio: string;

    @Field({ nullable: true })
    readonly video: string;

    @Field({ nullable: true, defaultValue: false })
    readonly is_read: boolean;

    @Field({ nullable: true, defaultValue: false })
    readonly is_edited: boolean;

    @Field({ nullable: true, defaultValue: false })
    readonly is_forwarded: boolean;

    @Field(() => [ReactionType], { nullable: true })
    readonly reactions: Reaction[];//Document[]; //IReaction[];

    @Field({ nullable: true })
    readonly created_at: Date;

    @Field({ nullable: true })
    readonly updated_at: Date;
}