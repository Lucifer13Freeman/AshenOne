import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { RegisterUserInput } from '../auth/inputs/register.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { UserService } from 'src/user/user.service';
import { GetUserInput } from 'src/user/inputs/get-user.input';
import { MessageService } from './message.service';
// import { MessageType } from './selects/dto/message.dto';
import { GetMessageInput } from './inputs/message/get-message.input';
import { CreateMessageInput } from './inputs/message/create-message.input';
import { GetAllMessagesInput } from './inputs/message/get-all-messages.input';
import { SearchMessageInput } from './inputs/message/search-message.input';
// import { ChatType } from './selects/dto/chat.dto';
import { CreateReactionInput } from './inputs/reaction/create-reaction.input';
// import { ReactionType } from './selects/dto/reaction.dto';
import { GetReactionInput } from './inputs/reaction/get-reaction';
import { UpdateMessageInput } from './inputs/message/update-message.input';
// import { Message } from './schemas/message.schema';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
// import { User } from 'src/user/schemas/user.schema';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';
//import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { EVENTS, PROVIDERS } from 'src/config/configs/consts.config';
import { MessageType } from './dto/message.dto';
import { ReactionType } from './dto/reaction.dto';
import { ChatType } from './dto/chat.dto';


//const NEW_MESSAGE_EVENT = 'NEW_MESSAGE';
//const pubsub = new PubSub();

//@UseGuards(GqlAuthGuard)
@Resolver()
export class MessageResolver 
{
    //private pubsub: PubSub;

    constructor(@Inject(PROVIDERS.PUB_SUB/*'PUB_SUB'*/) 
                //private pubsub: PubSubEngine,
                private pubsub: PubSub,
                private readonly message_service: MessageService,
                private readonly chat_service: ChatService) 
    { 
        //this.pubsub = new PubSub();
    }


    @UseGuards(GqlAuthGuard)
    @Query(() => MessageType, { nullable: true })
    async get_message(@Args('input') input: GetMessageInput) 
    {
        try
        {
            return await this.message_service.get(input);
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Query(() => [MessageType], { nullable: true })
    async get_all_messages(@GqlCurrentUser() user: GetUserInput,
                            @Args('input') input: GetAllMessagesInput) 
    {
        try
        {
            return await this.message_service.get_all({ ...input, 
                                                        current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Query(() => [MessageType], { nullable: true })
    async search_messages(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: SearchMessageInput) 
    {
        try
        {
            return await this.message_service.search({ ...input, 
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
    

    @UseGuards(GqlAuthGuard)
    @Mutation(() => MessageType)
    async create_message(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: CreateMessageInput) 
    {
        try
        {
            const message = await this.message_service.create({ ...input, 
                                                            current_user_id: user.id });

            // const chat = await this.chat_service.get({ id: input.chat_id, 
            //                                             current_user_id: user.id });
                                                        
                
            this.pubsub.publish(EVENTS.NEW_MESSAGE_EVENT, { new_message: message, is_create: true/*, chat_members: chat.members*/ });

            return message;
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => MessageType)
    async update_message(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: UpdateMessageInput) 
    {
        try
        {
            const message = await this.message_service.update({ ...input, current_user_id: user.id });
            this.pubsub.publish(EVENTS.UPDATE_MESSAGE_EVENT, { updated_message: message });
            return message;
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => ReactionType)
    async create_reaction(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: CreateReactionInput)
    {
        try
        {
            const reaction = await this.message_service.create_reaction({ ...input, 
                                                                        current_user_id: user.id });

            this.pubsub.publish(EVENTS.NEW_REACTION_EVENT, { new_reaction: reaction/*, chat_members: chat.members*/ });

            return reaction;
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => ReactionType)
    async delete_reaction(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetReactionInput)
    {
        try
        {
            return await this.message_service.delete_reaction({ ...input, 
                                                                current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async delete_message(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetMessageInput) 
    {
        try 
        {
            const message_id = await this.message_service.delete({ ...input, 
                                                    current_user_id: user.id });
            this.pubsub.publish(EVENTS.DELETE_MESSAGE_EVENT, { deleted_message: message_id });
            return message_id;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    // @UseGuards(GqlAuthGuard)
    // @Mutation(() => ChatType)
    // async delete_all_messages_in_chat(@CurrentUser() user: GetUserInput,
    //                                 @Args('input') input: GetAllMessagesInput) 
    // {
    //     try 
    //     {
    //         return await this.message_service.delete_all_in_chat({ ...input, 
    //                                                             current_user_id: user.id });
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // @UseGuards(GqlAuthGuard)
    // @Mutation(() => ChatType)
    // async delete_chat_with_messages(@CurrentUser() user: GetUserInput,
    //                                 @Args('input') input: GetAllMessagesInput) 
    // {
    //     try 
    //     {
    //         return await this.message_service.delete_chat_with_messages({ ...input, 
    //                                                                     current_user_id: user.id });
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }
    

    @Subscription(() => MessageType, 
    {
        /*filter: (payload, variables) =>
        payload.new_message.user_id.id === variables.user.id 
        || payload.chat_members.find((u: User) => u.email === variables.user.email)*/
    })
    async new_message(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.NEW_MESSAGE_EVENT);
    }

    @Subscription(() => MessageType)
    async updated_message(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.UPDATE_MESSAGE_EVENT);
    }

    @Subscription(() => String)
    async deleted_message(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.DELETE_MESSAGE_EVENT);
    }

    @Subscription(() => ReactionType)
    async new_reaction(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.NEW_REACTION_EVENT);
    }
}