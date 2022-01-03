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
import { GetGroupInput } from './inputs/get-group.input';
import { SearchGroupInput } from './inputs/search-group.input';
import { GetGroupMemberInput } from './inputs/get-member.input';
import { GetAllGroupsInput } from './inputs/get-all-groups.input';
import { UpdateGroupInput } from './inputs/update-group.input';
import { GqlHttpAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';


@UseGuards(GqlHttpAuthGuard)
@Resolver()
export class GroupResolver 
{
    constructor(private readonly group_service: GroupService) {}

    @Query(() => GroupType, { nullable: true })
    async get_group(@CurrentUser() user: GetUserInput,
                    @Args('input') input: GetGroupInput) 
    {
        try
        {
            return await this.group_service.get({ ...input, 
                                                current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => [GroupType], { nullable: true })
    async get_all_groups(@CurrentUser() user: GetUserInput,
                        @Args('input') input: GetAllGroupsInput) 
    {
        try
        {
            return await this.group_service.get_all({ current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => [GroupType], { nullable: true })
    async search_groups(@CurrentUser() user: GetUserInput,
                        @Args('input') input: SearchGroupInput) 
    {
        try
        {
            return await this.group_service.search({ ...input, 
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
    

    @Mutation(() => GroupType)
    async create_group(@CurrentUser() user: GetUserInput,
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


    @UseGuards(GqlAuthGuard)
    @Mutation(() => GroupType)
    async update_group(@CurrentUser() user: GetUserInput,
                        @Args('input') input: UpdateGroupInput) 
    {
        try
        {
            return await this.group_service.update({ ...input, 
                                                    current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => String)
    async delete_group(@CurrentUser() user: GetUserInput,
                        @Args('input') input: GetGroupInput) 
    {
        try 
        {
            return await this.group_service.delete({ ...input,
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => GroupType)
    async add_group_member(@CurrentUser() user: GetUserInput,
                            @Args('input') input: GetGroupMemberInput) 
    {
        try
        {
            return await this.group_service.add_member({ ...input,
                                                        current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => GroupType)
    async add_group_invited_member(@CurrentUser() user: GetUserInput,
                                    @Args('input') input: GetGroupMemberInput) 
    {
        try
        {
            return await this.group_service.add_invited_member({ ...input,
                                                                current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => GroupType)
    async remove_group_member(@CurrentUser() user: GetUserInput,
                                @Args('input') input: GetGroupMemberInput) 
    {
        try
        {
            return await this.group_service.remove_member({ ...input,
                                                        current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}