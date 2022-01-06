import { Field, ObjectType, Int } from '@nestjs/graphql';


@ObjectType()
export class ReportType
{
    @Field(() => Int, { nullable: true })
    readonly total_users: number;

    @Field(() => Int, { nullable: true })
    readonly total_banned_users: number;

    @Field(() => Int, { nullable: true })
    readonly total_messages: number;

    @Field(() => Int, { nullable: true })
    readonly total_reactions: number;

    @Field(() => Int, { nullable: true })
    readonly total_posts: number;

    @Field(() => Int, { nullable: true })
    readonly total_post_likes: number;

    @Field(() => Int, { nullable: true })
    readonly total_comments: number;

    @Field(() => Int, { nullable: true })
    readonly total_comment_likes: number;

    @Field(() => Int, { nullable: true })
    readonly total_subscriptions: number;

    @Field(() => Int, { nullable: true })
    readonly total_groups: number;

    @Field(() => Int, { nullable: true })
    readonly total_invites: number;

    @Field()
    readonly created_at: Date;
}