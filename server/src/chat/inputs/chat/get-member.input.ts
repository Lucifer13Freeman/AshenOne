import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetMemberInput 
{
    @Field(() => ID)
    readonly user_id: string;//ObjectId;

    @Field(() => ID)
    readonly chat_id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;
}