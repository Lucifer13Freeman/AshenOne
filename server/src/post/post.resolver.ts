import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { RegisterUserInput } from '../auth/inputs/register.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { UserService } from 'src/user/user.service';
import { GetUserInput } from 'src/user/inputs/get-user.input';
// import { User } from 'src/user/schemas/user.schema';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';
//import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { PostService } from './post.service';
import { PostType } from './dto/post.dto';
import { GetPostInput } from './inputs/post/get-post.input';
import { UpdatePostInput } from './inputs/post/update-post.input';
import { CreateMessageInput } from 'src/chat/inputs/message/create-message.input';
import { SearchPostInput } from './inputs/post/search-post.input';
import { GetAllPostsInput } from './inputs/post/get-all-post.input';
import { CreatePostInput } from './inputs/post/create-post.input';
import { LikeInput } from './inputs/like/like.input';
// import { LikeSchema } from './schemas/like.schema';
import { EVENTS, PROVIDERS } from 'src/config/configs/consts.config';
import { LikeType } from './dto/like.dto';


//const NEW_POST_EVENT = 'NEW_POST';
//const NEW_LIKE_POST_EVENT = 'NEW_LIKE_POST';
//const pubsub = new PubSub();

//@UseGuards(GqlAuthGuard)
@Resolver()
export class PostResolver 
{
    //private pubsub: PubSub;

    constructor(@Inject(PROVIDERS.PUB_SUB/*'PUB_SUB'*/) 
                //private pubsub: PubSubEngine,
                private pubsub: PubSub,
                private readonly post_service: PostService) 
    { 
        //this.pubsub = new PubSub();
    }


    @UseGuards(GqlAuthGuard)
    @Query(() => PostType, { nullable: true })
    async get_post(@Args('input') input: GetPostInput) 
    {
        try
        {
            return await this.post_service.get(input);
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Query(() => [PostType], { nullable: true })
    async get_all_posts(@GqlCurrentUser() user: GetUserInput,
                            @Args('input') input: GetAllPostsInput) 
    {
        try
        {
            return await this.post_service.get_all({ ...input, 
                                                        current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Query(() => [PostType], { nullable: true })
    async search_posts(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: SearchPostInput) 
    {
        try
        {
            return await this.post_service.search({ ...input, 
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
    

    @UseGuards(GqlAuthGuard)
    @Mutation(() => PostType)
    async create_post(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: CreatePostInput) 
    {
        try
        {
            const post = await this.post_service.create({ ...input, 
                                                            current_user_id: user.id });

            this.pubsub.publish(EVENTS.NEW_POST_EVENT, { new_post: post });

            return post;
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => PostType)
    async update_post(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: UpdatePostInput) 
    {
        try
        {
            return await this.post_service.update({ ...input, 
                                                    current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => LikeType)
    async like_post(@GqlCurrentUser() user: GetUserInput,
                    @Args('input') input: LikeInput) 
    {
        try
        {
            const like_post = await this.post_service.like({ ...input, 
                                                            current_user_id: user.id });

            //this.pubsub.publish(NEW_LIKE_POST_EVENT, { new_like_post: post. });

            this.pubsub.publish(EVENTS.NEW_LIKE_POST_EVENT, { new_like_post: like_post });

            return like_post;

            // post.likes_count = post.likes.length;
            // return post;
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    // @UseGuards(GqlAuthGuard)
    // @Mutation(() => PostType)
    // async create_reaction(@CurrentUser() user: GetUserInput,
    //                     @Args('input') input: CreateReactionInput)
    // {
    //     try
    //     {
    //         return await this.post_service.create_reaction({ ...input, 
    //                                                             current_user_id: user.id });
    //     }
    //     catch (err) 
    //     {
    //         console.log(err);
    //         throw err;
    //     }
    // }


    // @UseGuards(GqlAuthGuard)
    // @Mutation(() => ReactionType)
    // async delete_reaction(@CurrentUser() user: GetUserInput,
    //                     @Args('input') input: GetReactionInput)
    // {
    //     try
    //     {
    //         return await this.post_service.delete_reaction({ ...input, 
    //                                                             current_user_id: user.id });
    //     }
    //     catch (err) 
    //     {
    //         console.log(err);
    //         throw err;
    //     }
    // }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async delete_post(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetPostInput) 
    {
        try 
        {
            return await this.post_service.delete({ ...input, 
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => PostType)
    async delete_all_comments_in_post(@GqlCurrentUser() user: GetUserInput,
                                    @Args('input') input: GetPostInput) 
    {
        try 
        {
            return await this.post_service.delete_all_comments_in_post({ ...input, 
                                                                        current_user_id: user.id });
        } 
        catch (err) 
        {
            console.log(err);
            throw err;
        }
    }


    // @UseGuards(GqlAuthGuard)
    // @Mutation(() => ChatType)
    // async delete_chat_with_messages(@CurrentUser() user: GetUserInput,
    //                                 @Args('input') input: GetAllMessagesInput) 
    // {
    //     try 
    //     {
    //         return await this.post_service.delete_chat_with_messages({ ...input, 
    //                                                                     current_user_id: user.id });
    //     } 
    //     catch (err) 
    //     {
    //         console.log(err);
    //         throw err;
    //     }
    // }
    

    @Subscription(() => PostType, 
    {
        /*filter: (payload, variables) =>
        payload.new_message.user_id.id === variables.user.id 
        || payload.chat_members.find((u: User) => u.email === variables.user.email)*/
    })
    async new_post(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.NEW_POST_EVENT);
    }


    @Subscription(() => LikeType)
    async new_like_post(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.NEW_LIKE_POST_EVENT);
    }
}