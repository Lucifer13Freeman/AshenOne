import { Field, ID, InputType, Int } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class SearchMessageInput 
{
    @Field(() => ID)
    readonly chat_id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field()
    readonly text: string;

    @Field(() => Int, { nullable: true })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;
}