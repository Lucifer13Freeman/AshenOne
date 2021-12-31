import { Field, ID, InputType, Int } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class SearchChatInput 
{
    @Field({ nullable: true })
    readonly username: string;

    @Field({ nullable: true })
    readonly message_text: string;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field(() => Int, { nullable: true })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;
}