import { InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class UpdateInviteInput 
{
    @Field(() => ID)
    readonly id: string;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;

    @Field()
    readonly status: string;
}