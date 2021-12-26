import { User } from '.prisma/client';
import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { UserType } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/interfaces/user.interface';
//import { User, UserDocument } from 'src/user/schemas/user.schema';


@ObjectType()
export class LoginType 
{
    @Field({ nullable: true })
    token: string;

    @Field({ nullable: true })
    cookie?: string

    @Field(() => UserType, { nullable: true })
    user?: User;//UserDocument;
}