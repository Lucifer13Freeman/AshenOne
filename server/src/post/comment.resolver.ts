import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { GqlHttpAuthGuard } from "src/auth/auth.guard";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { EVENTS, PROVIDERS } from "src/config/configs/consts.config";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { GqlCurrentUser } from "src/decorators/gql-current-user.decorator";
import { GetUserInput } from "src/user/inputs/get-user.input";
import { CommentService } from "./comment.service";
import { CommentType } from "./dto/comment.dto";
import { LikeType } from "./dto/like.dto";
import { CreateCommentInput } from "./inputs/comment/create-comment.input";
import { GetAllCommentsInput } from "./inputs/comment/get-all-comments.input";
import { GetCommentInput } from "./inputs/comment/get-comment.input";
import { SearchCommentInput } from "./inputs/comment/search-comment.input";
import { UpdateCommentInput } from "./inputs/comment/update-comment.input";
import { LikeInput } from "./inputs/like/like.input";
import { PostService } from "./post.service";


@Resolver()
export class CommentResolver 
{
    constructor(@Inject(PROVIDERS.PUB_SUB) 
                //private pubsub: PubSubEngine,
                private pubsub: PubSub,
                private readonly comment_service: CommentService,
                private readonly post_service: PostService) {}


    @UseGuards(GqlHttpAuthGuard)
    @Query(() => CommentType, { nullable: true })
    async get_comment(@Args('input') input: GetCommentInput) 
    {
        try
        {
            return await this.comment_service.get(input);
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlHttpAuthGuard)
    @Query(() => [CommentType], { nullable: true })
    async get_all_comments(@CurrentUser() user: GetUserInput,
                            @Args('input') input: GetAllCommentsInput) 
    {
        try
        {
            return await this.comment_service.get_all({ ...input, 
                                                        current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlHttpAuthGuard)
    @Query(() => [CommentType], { nullable: true })
    async search_comments(@CurrentUser() user: GetUserInput,
                        @Args('input') input: SearchCommentInput) 
    {
        try
        {
            return await this.comment_service.search({ ...input, 
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
    

    @UseGuards(GqlHttpAuthGuard)
    @Mutation(() => CommentType)
    async create_comment(@CurrentUser() user: GetUserInput,
                        @Args('input') input: CreateCommentInput) 
    {
        try
        {
            const comment = await this.comment_service.create({ ...input, 
                                                            current_user_id: user.id });
            this.pubsub.publish(EVENTS.NEW_COMMENT_EVENT, { new_comment: comment });
            return comment;
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlHttpAuthGuard)
    @Mutation(() => CommentType)
    async update_comment(@CurrentUser() user: GetUserInput,
                        @Args('input') input: UpdateCommentInput) 
    {
        try
        {
            return await this.comment_service.update({ ...input, 
                                                    current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }

    @UseGuards(GqlHttpAuthGuard)
    @Mutation(() => LikeType)
    async like_comment(@CurrentUser() user: GetUserInput,
                        @Args('input') input: LikeInput) 
    {
        try
        {
            const like_comment = await this.comment_service.like({ ...input, 
                                                            current_user_id: user.id });

            this.pubsub.publish(EVENTS.NEW_LIKE_COMMENT_EVENT, { new_like_comment: like_comment });

            return like_comment;
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }

    
    @UseGuards(GqlHttpAuthGuard)
    @Mutation(() => String)
    async delete_comment(@CurrentUser() user: GetUserInput,
                        @Args('input') input: GetCommentInput) 
    {
        try 
        {
            return await this.comment_service.delete({ ...input, 
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Subscription(() => CommentType)
    async new_comment(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.NEW_COMMENT_EVENT);
    }

    
    @Subscription(() => LikeType)
    async new_like_comment(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.NEW_LIKE_COMMENT_EVENT);
    }
}