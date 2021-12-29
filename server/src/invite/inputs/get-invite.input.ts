import { InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class GetInviteInput 
{
    @Field(() => ID, { nullable: true })
    readonly id?: string;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;

    @Field(() => ID, { nullable: true })
    readonly user_id?: string;

    @Field(() => ID, { nullable: true })
    readonly sender_id?: string;

    @Field(() => ID, { nullable: true })
    readonly chat_id?: string;

    @Field(() => ID, { nullable: true })
    readonly group_id?: string;
}