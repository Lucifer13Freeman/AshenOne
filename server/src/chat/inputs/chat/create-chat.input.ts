import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
//import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class CreateChatInput 
{
    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field(() => [ID], { nullable: true })
    readonly members?: string[];//ObjectId[];

    //@Field(() => [ID], { nullable: true })
    //readonly messages?: ObjectId[];
}