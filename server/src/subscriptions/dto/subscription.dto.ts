import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import { User } from '@prisma/client';
// import { ObjectId } from 'mongoose';
import { UserType } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/interfaces/user.interface';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class SubscriptionType
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => UserType)
    readonly follower: User;//Document;

    @Field(() => UserType)
    readonly profile: User;//Document;

    @Field({ nullable: true })
    readonly created_at: Date

    @Field({ nullable: true })
    readonly updated_at: Date
}