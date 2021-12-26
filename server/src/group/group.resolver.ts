import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { RegisterUserInput } from '../auth/inputs/register.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { UserService } from 'src/user/user.service';
import { GetUserInput } from 'src/user/inputs/get-user.input';
import { GroupService } from './group.service';
import { GroupType } from './dto/group.dto';
import { CreateGroupInput } from './inputs/create-group.input';


@UseGuards(GqlAuthGuard)
@Resolver()
export class GroupResolver 
{
    constructor(private readonly group_service: GroupService) {}

    // @Query(() => ChatType, { nullable: true })
    // async get_chat(@CurrentUser() user: GetUserInput,
    //                 @Args('input') input: GetChatInput) 
    // {
    //     try
    //     {
    //         return await this.group_service.get({ ...input, 
    //                                             current_user_id: user.id });
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // @Query(() => [ChatType], { nullable: true })
    // async get_all_chats(@CurrentUser() user: GetUserInput
    //                     /*@Args('input') input: GetAllChatsInput*/) 
    // {
    //     try
    //     {
    //         return await this.group_service.get_all({ current_user_id: user.id });
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // @Query(() => [ChatType], { nullable: true })
    // async search_chats(@CurrentUser() user: GetUserInput,
    //                     @Args('input') input: SearchChatInput) 
    // {
    //     try
    //     {
    //         return await this.group_service.search({ ...input, 
    //                                                 current_user_id: user.id });
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }
    

    @Mutation(() => GroupType)
    async create_group(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: CreateGroupInput) 
    {
        try
        {
            return await this.group_service.create({ ...input,
                                                    current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    // @Mutation(() => String)
    // async delete_chat(@CurrentUser() user: GetUserInput,
    //                     @Args('input') input: GetChatInput) 
    // {
    //     try 
    //     {
    //         return await this.group_service.delete({ ...input,
    //                                                 current_user_id: user.id });
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // @Mutation(() => ChatType)
    // async add_member(@CurrentUser() user: GetUserInput,
    //                 @Args('input') input: GetMemberInput) 
    // {
    //     try
    //     {
    //         return await this.group_service.add_member({ ...input,
    //                                                     current_user_id: user.id });
    //     }
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // @Mutation(() => ChatType)
    // async remove_member(@CurrentUser() user: GetUserInput,
    //                 @Args('input') input: GetMemberInput) 
    // {
    //     try
    //     {
    //         return await this.group_service.remove_member({ ...input,
    //                                                     current_user_id: user.id });
    //     }
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }
}