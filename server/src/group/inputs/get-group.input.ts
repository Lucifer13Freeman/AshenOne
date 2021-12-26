import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetGroupInput 
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    // @Field({ nullable: true })
    // readonly is_my?: boolean;

    @Field({ nullable: true })
    readonly is_private?: boolean;

    @Field({ nullable: true })
    readonly is_secure?: boolean;
}