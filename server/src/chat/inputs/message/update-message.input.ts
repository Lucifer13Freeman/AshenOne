import { InputType, Field, ID } from '@nestjs/graphql';
//import { ObjectId } from 'mongoose';
//import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class UpdateMessageInput 
{
    @Field(() => ID)
    readonly message_id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field({ nullable: true })
    readonly text: string;

    @Field({ nullable: true })
    readonly image?: string;

    @Field({ nullable: true })
    readonly audio?: string;

    @Field({ nullable: true })
    readonly video?: string;

    @Field({ nullable: true, defaultValue: false })
    readonly is_read: boolean;

    @Field({ nullable: true, defaultValue: false })
    readonly is_edited: boolean;

    @Field({ nullable: true, defaultValue: false })
    readonly is_forwarded: boolean;
}