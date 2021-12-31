import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class UpdateCommentInput 
{
    @Field(() => ID)
    readonly comment_id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field({ nullable: true })
    readonly text: string;

    @Field({ nullable: true })
    readonly image?: string;

    @Field({ nullable: true })
    readonly audio?: string;

    @Field({ nullable: true })
    readonly video?: string;
}