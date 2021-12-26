import { InputType, Field, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
//import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class CreateGroupInput 
{
    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field(() => [ID], { nullable: true })
    readonly members?: string[];//ObjectId[];

    @Field()
    readonly name: string;

    @Field({ nullable: true })
    readonly avatar: string;

    // @Field({ nullable: true })
    // readonly is_my?: boolean;

    @Field({ nullable: true })
    readonly is_private?: boolean;

    @Field({ nullable: true })
    readonly is_secure?: boolean;
}