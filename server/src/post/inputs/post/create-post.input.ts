import { Field, InputType, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
// import { CommentDocument } from 'src/track/schemas/comment.schema';
// import { UserType } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/interfaces/user.interface';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
//import { IsEmail, IsNotEmpty, IsDateString, IsJWT, IsMongoId } from "class-validator";


@InputType()
export class CreatePostInput
{
    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly group_id?: string;

    @Field()
    readonly text: string;

    @Field({ nullable: true })
    readonly image?: string;

    @Field({ nullable: true })
    readonly audio?: string;

    @Field({ nullable: true })
    readonly video?: string;
}