import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
//import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class CreateReactionInput 
{
    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;
    
    @Field(() => ID)
    readonly message_id: string;//ObjectId;

    @Field()
    readonly content: string;
}