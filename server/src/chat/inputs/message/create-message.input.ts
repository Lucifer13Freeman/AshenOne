import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
//import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class CreateMessageInput 
{
    @Field(() => ID)
    readonly chat_id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field()
    readonly text: string;

    @Field({ nullable: true })
    readonly image?: string;

    @Field({ nullable: true })
    readonly audio?: string;

    @Field({ nullable: true })
    readonly video?: string;
}