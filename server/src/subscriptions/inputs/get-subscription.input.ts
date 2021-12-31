import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
//import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class GetSubscriptionInput 
{
    @Field(() => ID, { nullable: true })
    readonly id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly profile_id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly follower_id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    /*@Field(() => ID)
    readonly user_id: ObjectId;*/
}