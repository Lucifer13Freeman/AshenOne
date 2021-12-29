import { InputType, Field, ID } from '@nestjs/graphql';
import { INVITE_STATUS } from 'src/config/configs/consts.config';


@InputType()
export class CreateInviteInput 
{
    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;

    @Field(() => ID)
    readonly user_id: string;

    @Field(() => ID, { nullable: true })
    readonly sender_id?: string;

    @Field(() => ID, { nullable: true })
    readonly chat_id: string;

    @Field(() => ID, { nullable: true })
    readonly group_id: string;

    @Field({ nullable: true, defaultValue: INVITE_STATUS.WAIT })
    readonly status?: string;
}