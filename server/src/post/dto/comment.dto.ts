import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import { CommentLike, User } from '@prisma/client';
// import { ObjectId } from 'mongoose';
// import { CommentDocument } from 'src/track/schemas/comment.schema';
import { UserType } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/interfaces/user.interface';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
// import { LikeDocument } from '../schemas/like.schema';
import { LikeType } from './like.dto';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class CommentType
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => ID)
    readonly post_id: string;// ObjectId;

    @Field(() => UserType)
    readonly user: UserType;//Document;

    @Field()
    readonly text: string;

    @Field({ nullable: true })
    readonly image: string;

    @Field({ nullable: true })
    readonly audio: string;

    @Field({ nullable: true })
    readonly video: string;

    @Field(() => [LikeType], { nullable: true })
    readonly likes: CommentLike[];//LikeDocument[];
    
    // @Field(() => Int, { nullable: true, defaultValue: 0 })
    // readonly likes_count: number; 

    @Field({ nullable: true })
    readonly created_at: Date;

    @Field({ nullable: true })
    readonly updated_at: Date;
}