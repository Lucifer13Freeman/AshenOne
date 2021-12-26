import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
// import { CommentDocument } from 'src/track/schemas/comment.schema';
import { UserType } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/interfaces/user.interface';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@ObjectType()
export class LikeType
{
    @Field(() => ID)
    readonly id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly post_id: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly comment_id: string;//ObjectId;

    @Field(() => ID)
    readonly user_id: string;//ObjectId;

    @Field({ nullable: true })
    readonly created_at: Date;

    @Field({ nullable: true })
    readonly updated_at: Date;
}