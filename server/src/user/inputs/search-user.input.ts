import { Field, InputType, Int } from '@nestjs/graphql';


@InputType()
export class SearchUserInput 
{
    @Field()
    readonly username: string;

    @Field(() => Int, { nullable: true/*, defaultValue: 10*/ })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;
}