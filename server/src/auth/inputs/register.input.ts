import { InputType, Field } from '@nestjs/graphql';
//import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class RegisterUserInput 
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