import { InputType, ObjectType, Field } from '@nestjs/graphql';


@InputType()
export class LoginUserInput 
{
    @Field()
    //@IsNotEmpty()
    //@IsEmail()
    readonly email: string;

    @Field()
    //@IsNotEmpty()
    readonly password: string;
}