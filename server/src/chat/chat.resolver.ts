import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { RegisterUserInput } from '../auth/inputs/register.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { ChatService } from './chat.service';
import { CreateChatInput } from './inputs/chat/create-chat.input';
// import { ChatType } from './selects/dto/chat.dto';
import { UserService } from 'src/user/user.service';
import { GetUserInput } from 'src/user/inputs/get-user.input';
import { GetChatInput } from './inputs/chat/get-chat.input';
import { GetAllChatsInput } from './inputs/chat/get-all-chats.input';
import { SearchChatInput } from './inputs/chat/search-chat.input';
import { GetChatMemberInput } from './inputs/chat/get-member.input';
import { ChatType } from './dto/chat.dto';


@UseGuards(GqlAuthGuard)
@Resolver()
export class ChatResolver 
{
    constructor(private readonly chat_service: ChatService) {}

    @Query(() => ChatType, { nullable: true })
    async get_chat(@GqlCurrentUser() user: GetUserInput,
                    @Args('input') input: GetChatInput) 
    {
        try
        {
            return await this.chat_service.get({ ...input, 
                                                current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => [ChatType], { nullable: true })
    async get_all_chats(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetAllChatsInput) 
    {
        try
        {
            return await this.chat_service.get_all({ ...input,
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => [ChatType], { nullable: true })
    async search_chats(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: SearchChatInput) 
    {
        try
        {
            return await this.chat_service.search({ ...input, 
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
    

    @Mutation(() => ChatType)
    async create_chat(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: CreateChatInput) 
    {
        try
        {
            return await this.chat_service.create({ ...input,
                                                    current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => String)
    async delete_chat(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetChatInput) 
    {
        try 
        {
            return await this.chat_service.delete({ ...input,
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => ChatType)
    async delete_all_messages_in_chat(@GqlCurrentUser() user: GetUserInput,
                                    @Args('input') input: GetChatInput) 
    {
        try 
        {
            return await this.chat_service.delete_all_messages_in_chat({ ...input, 
                                                                        current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => ChatType)
    async add_chat_member(@GqlCurrentUser() user: GetUserInput,
                    @Args('input') input: GetChatMemberInput) 
    {
        try
        {
            return await this.chat_service.add_member({ ...input,
                                                        current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => ChatType)
    async remove_chat_member(@GqlCurrentUser() user: GetUserInput,
                    @Args('input') input: GetChatMemberInput) 
    {
        try
        {
            return await this.chat_service.remove_member({ ...input,
                                                        current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}