import { Field, ID, InputType, Int } from '@nestjs/graphql';


@InputType()
export class SearchGroupInput 
{
    @Field({ nullable: true })
    readonly username: string;

    @Field({ nullable: true })
    readonly name: string;

    @Field({ nullable: true })
    readonly post_text: string;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;

    @Field(() => Int, { nullable: true })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;
}