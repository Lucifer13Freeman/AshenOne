import { InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class GetMemberInput 
{
    @Field(() => ID)
    readonly user_id: string;

    @Field(() => ID)
    readonly group_id: string;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;
}