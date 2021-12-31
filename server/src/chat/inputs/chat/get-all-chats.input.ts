import { InputType, Field, ID, Int } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetAllChatsInput 
{
    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field(() => Int, { nullable: true })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;
}