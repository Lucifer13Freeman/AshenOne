import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { INVITE_STATUS } from 'src/config/configs/consts.config';


@InputType()
export class GetAllInvitesInput 
{
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

    @Field({ nullable: true, defaultValue: INVITE_STATUS.WAIT })
    readonly status?: string;

    @Field(() => Int, { nullable: true })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;

    // @Field({ nullable: true, defaultValue: false })
    // readonly is_ids_only?: boolean;
}