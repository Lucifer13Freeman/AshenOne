import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
//import { ObjectId } from 'mongoose';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class UserType
{
    @Field(() => ID)
    //@IsMongoId()
    //@IsNotEmpty()
    readonly id: string; //ObjectId;//string;

    @Field()
    //@IsNotEmpty()
    readonly username: string;

    @Field({ nullable: true })
    //@IsEmail()
    readonly email: string;

    // @Field({ nullable: true })
    // readonly password: string;

    @Field({ nullable: true })
    readonly avatar: string;

    @Field({ nullable: true })
    readonly role: string;

    // @Field({ nullable: true })
    // readonly is_follow: boolean;

    @Field({ nullable: true })
    readonly is_banned: boolean;

    @Field({ nullable: true })
    //@IsDateString()
    readonly created_at: Date;//string//Date["toISOString"];

    @Field({ nullable: true })
    //@IsDateString()
    readonly updated_at: Date;//string//Date["toISOString"];

    /*@Field({ nullable: true })
    //@IsJWT()
    token: string;*/
}


/*@InputType()
export class CreateUserInput 
{
    @Field()
    //@IsNotEmpty()
    readonly username: string;

    @Field()
    //@IsNotEmpty()
    //@IsEmail()
    readonly email: string;

    @Field()
    //@IsNotEmpty()
    readonly password: string;

    @Field()
    //@IsNotEmpty()
    readonly confirm_password: string;
}


@InputType()
export class GetAllUsersInput 
{
    @Field(() => Int, { nullable: true/*, defaultValue: 10 })
    readonly count: number

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    readonly offset: number
}*/

