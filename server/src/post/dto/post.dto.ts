import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import { PostLike, User } from '@prisma/client';
// import { ObjectId } from 'mongoose';
// import { CommentDocument } from 'src/track/schemas/comment.schema';
import { UserType } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/interfaces/user.interface';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
// import { LikeDocument } from '../schemas/like.schema';
import { CommentType } from './comment.dto';
import { LikeType } from './like.dto';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class PostType
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => UserType)
    readonly user: UserType;//Document;

    @Field(() => ID, { nullable: true })
    readonly group_id?: string;//ObjectId;

    @Field()
    readonly text: string;

    @Field({ nullable: true })
    readonly image: string;

    @Field({ nullable: true })
    readonly audio: string;

    @Field({ nullable: true })
    readonly video: string;

    @Field({ nullable: true })
    readonly views: number

    @Field(() => [LikeType], { nullable: true })
    readonly likes: PostLike[];//LikeDocument[];

    // @Field(() => Int, { nullable: true, defaultValue: 0 })
    // readonly likes_count: number; 

    @Field(() => [CommentType], { nullable: true })
    readonly comments: CommentType[];//CommentDocument[];

    @Field({ nullable: true })
    readonly created_at: Date;

    @Field({ nullable: true })
    readonly updated_at: Date;
}