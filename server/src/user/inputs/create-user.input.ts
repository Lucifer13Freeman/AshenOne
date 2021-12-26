//import { InputType, Field } from '@nestjs/graphql';

export class CreateUserInput 
{
    readonly username: string;
    readonly email: string;
    readonly password: string;
}