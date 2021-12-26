import { Field, InputType, ObjectType, ID } from '@nestjs/graphql';
// import { ObjectId } from 'mongoose';
// import { UserType } from 'src/user/dto/user.dto';
// import { UserDocument } from 'src/user/schemas/user.schema';


@InputType()
export class LikeInput
{
    @Field(() => ID, { nullable: true })
    readonly post_id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly comment_id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;
}