import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import { Chat, Group, Post, User } from '@prisma/client';
import { ChatType } from 'src/chat/dto/chat.dto';
import { GroupType } from 'src/group/dto/group.dto';
import { PostType } from 'src/post/dto/post.dto';
import { UserType } from 'src/user/dto/user.dto';


@ObjectType()
export class InviteType
{
    @Field(() => ID)
    readonly id: string;

    @Field(() => ID)
    readonly user_id: string;

    @Field(() => UserType)
    readonly user: User;

    @Field(() => ID)
    readonly sender_id: string;

    @Field(() => UserType)
    readonly sender: User;

    @Field(() => ID, { nullable: true })
    readonly chat_id?: string;

    @Field(() => ChatType, { nullable: true })
    readonly chat?: Chat;

    @Field(() => ID, { nullable: true })
    readonly group_id?: string;

    @Field(() => GroupType, { nullable: true })
    readonly group?: Group;

    @Field()
    readonly status: string;

    @Field({ nullable: true })
    readonly created_at?: Date

    @Field({ nullable: true })
    readonly updated_at?: Date
}