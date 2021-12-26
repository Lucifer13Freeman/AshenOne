import { Field, InputType, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetUserInput 
{
    @Field(() => ID, { nullable: true })
    readonly id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field({ nullable: true })
    readonly email?: string;

    @Field({ nullable: true })
    readonly is_for_admin?: boolean;

    @Field({ nullable: true })
    readonly is_banned?: boolean;

    readonly is_for_login?: boolean;

    readonly is_for_regist?: boolean;
}