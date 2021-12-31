import { InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class GetReportInput 
{
    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;
}