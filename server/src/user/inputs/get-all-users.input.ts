import { Field, ID, InputType, Int } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';


@InputType()
export class GetAllUsersInput 
{
    @Field(() => Int, { nullable: true/*, defaultValue: 10*/ })
    readonly limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset?: number;

    @Field(() => [ID], { nullable: true, defaultValue: [] })
    readonly user_ids?: string[]; //ObjectId[];
}