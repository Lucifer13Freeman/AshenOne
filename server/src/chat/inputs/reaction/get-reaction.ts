import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetReactionInput 
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;
}