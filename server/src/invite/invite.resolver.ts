import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { RegisterUserInput } from '../auth/inputs/register.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { UserService } from 'src/user/user.service';
import { GetUserInput } from 'src/user/inputs/get-user.input';
import { InviteService } from './invite.service';
import { InviteType } from './dto/invite.dto';
import { CreateInviteInput } from './inputs/create-invite.input';
import { GetInviteInput } from './inputs/get-invite.input';
import { GetAllInvitesInput } from './inputs/get-all-invites.input';
import { UpdateInviteInput } from './inputs/update-invite.input';
import { EVENTS, PROVIDERS } from 'src/config/configs/consts.config';
import { PubSub } from 'graphql-subscriptions';
import { GetGroupMemberInput } from 'src/group/inputs/get-member.input';
import { GetChatMemberInput } from 'src/chat/inputs/chat/get-member.input';


@UseGuards(GqlAuthGuard)
@Resolver()
export class InviteResolver 
{
    constructor(@Inject(PROVIDERS.PUB_SUB) 
                private pubsub: PubSub,
                private readonly invite_service: InviteService) {}

    @Query(() => InviteType, { nullable: true })
    async get_invite(@GqlCurrentUser() user: GetUserInput,
                    @Args('input') input: GetInviteInput) 
    {
        try
        {
            return await this.invite_service.get({ ...input, 
                                                current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => [InviteType], { nullable: true })
    async get_all_invites(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetAllInvitesInput) 
    {
        try
        {
            return await this.invite_service.get_all_invites({ ...input, 
                                                            current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => [InviteType], { nullable: true })
    async get_received_invites(@GqlCurrentUser() user: GetUserInput,
                                @Args('input') input: GetAllInvitesInput) 
    {
        try
        {
            return await this.invite_service.get_received_invites({ ...input, 
                                                                current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => [InviteType], { nullable: true })
    async get_sent_invites(@GqlCurrentUser() user: GetUserInput,
                                @Args('input') input: GetAllInvitesInput) 
    {
        try
        {
            return await this.invite_service.get_sent_invites({ ...input, 
                                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
    

    @Mutation(() => InviteType)
    async create_invite(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: CreateInviteInput) 
    {
        try
        {
            const invite = await this.invite_service.create({ ...input, current_user_id: user.id });
            this.pubsub.publish(EVENTS.NEW_INVITE_EVENT, { new_invite: invite });
            return invite;
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => InviteType)
    async update_invite(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: UpdateInviteInput) 
    {
        try
        {
            return await this.invite_service.update({ ...input, 
                                                    current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @UseGuards(GqlAuthGuard)
    @Mutation(() => InviteType)
    async update_and_delete_invite(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: UpdateInviteInput) 
    {
        try
        {
            return await this.invite_service.update_and_delete({ ...input, 
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
    async delete_invite(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetInviteInput) 
    {
        try 
        {
            return await this.invite_service.delete({ ...input,
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Subscription(() => InviteType, 
    {
        /*filter: (payload, variables) =>
        payload.new_message.user_id.id === variables.user.id 
        || payload.chat_members.find((u: User) => u.email === variables.user.email)*/
    })
    async new_invite(/*@CurrentUser() user: GetUserInput*/) 
    {
        return this.pubsub.asyncIterator(EVENTS.NEW_INVITE_EVENT);
    }


    // @Mutation(() => InviteType)
    // async accept_group_invite(@GqlCurrentUser() user: GetUserInput,
    //                 @Args('input') input: GetGroupMemberInput) 
    // {
    //     try
    //     {
    //         return await this.invite_service.accept_group_invite({ ...input,
    //                                                         current_user_id: user.id });
    //     }
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // @Mutation(() => InviteType)
    // async accept_chat_invite(@GqlCurrentUser() user: GetUserInput,
    //                         @Args('input') input: GetChatMemberInput) 
    // {
    //     try
    //     {
    //         return await this.invite_service.accept_chat_invite({ ...input,
    //                                                         current_user_id: user.id });
    //     }
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // @Mutation(() => InviteType)
    // async remove_invite_member(@GqlCurrentUser() user: GetUserInput,
    //                 @Args('input') input: GetInviteMemberInput) 
    // {
    //     try
    //     {
    //         return await this.invite_service.remove_member({ ...input,
    //                                                     current_user_id: user.id });
    //     }
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }
}