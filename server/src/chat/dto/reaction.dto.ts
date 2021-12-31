import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
import { UserType } from 'src/user/dto/user.dto';
// import { User } from 'src/user/schemas/user.schema';
// import { Chat } from '../../schemas/chat.schema';
// import { Message } from '../../schemas/message.schema';
import { ChatType } from './chat.dto';
import { MessageType } from './message.dto';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class ReactionType
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => ID)
    readonly user_id: string;//ObjectId;

    @Field(() => ID)
    readonly message_id: string;//ObjectId;

    @Field({ nullable: true })
    readonly content: string;

    @Field({ nullable: true })
    readonly created_at: Date

    @Field({ nullable: true })
    readonly updated_at: Date
}