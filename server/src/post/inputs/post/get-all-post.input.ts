import { InputType, Field, ID, Int } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetAllPostsInput 
{
    @Field(() => ID, { nullable: true })
    readonly user_id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly group_id?: string;

    @Field({ nullable: true, defaultValue: false})
    readonly is_order_by_desc?: boolean;

    @Field({ nullable: true, defaultValue: false})
    readonly is_for_followers?: boolean;

    @Field({ nullable: true, defaultValue: false})
    readonly is_for_group_members?: boolean;

    @Field(() => Int, { nullable: true })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;
}