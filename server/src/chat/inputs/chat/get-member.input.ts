import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetChatMemberInput 
{
    @Field(() => ID)
    readonly user_id: string;//ObjectId;

    @Field(() => ID)
    readonly chat_id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;
    
    // @Field({ nullable: true, defaultValue: false })
    // readonly is_for_invited?: boolean;
}