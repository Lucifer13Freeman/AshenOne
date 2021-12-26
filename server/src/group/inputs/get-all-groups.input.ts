import { InputType, Field, ID, Int } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetAllGroupsInput 
{
    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    // @Field({ nullable: true })
    // readonly is_my?: boolean;

    @Field({ nullable: true })
    readonly is_private?: boolean;

    @Field({ nullable: true })
    readonly is_secure?: boolean;

    @Field(() => Int, { nullable: true })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;
}