import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import { Post, User } from '@prisma/client';
// import { ObjectId } from 'mongoose';
import { PostType } from 'src/post/dto/post.dto';
// import { PostDocument } from 'src/post/schemas/post.schema';
import { UserType } from 'src/user/dto/user.dto';
// import { UserDocument } from 'src/user/schemas/user.schema';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class GroupType
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field()
    readonly name: string;

    @Field(() => ID)
    readonly user_id: string;//ObjectId;

    @Field(() => [UserType])
    readonly members: User[];//Document[];

    @Field(() => [PostType], { nullable: true })
    readonly posts: Post[];//Document[];

    @Field({ nullable: true })
    readonly is_open: boolean;

    @Field({ nullable: true })
    readonly is_secure: boolean;

    @Field({ nullable: true })
    readonly created_at: Date

    @Field({ nullable: true })
    readonly updated_at: Date
}