import { Field, ID, InputType, Int } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class SearchCommentInput 
{
    @Field(() => ID)
    readonly post_id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly user_id?: string;//ObjectId;

    @Field({ nullable: true })
    readonly text: string;

    @Field({ nullable: true })
    readonly username: string;

    @Field({ nullable: true, defaultValue: false})
    readonly is_order_by_desc?: boolean;

    @Field(() => Int, { nullable: true })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;
}