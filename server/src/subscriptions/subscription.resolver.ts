import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { RegisterUserInput } from '../auth/inputs/register.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { UserService } from 'src/user/user.service';
import { GetUserInput } from 'src/user/inputs/get-user.input';
import { SubscriptionType } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';
import { GetSubscriptionInput } from './inputs/get-subscription.input';
import { CreateSubscriptionInput } from './inputs/create-subscription.input';
import { GetAllChatsInput } from 'src/chat/inputs/chat/get-all-chats.input';
import { GetAllSubscriptionsInput } from './inputs/get-all-subscriptions.input';


@UseGuards(GqlAuthGuard)
@Resolver()
export class SubscriptionResolver 
{
    constructor(private readonly followers_service: SubscriptionService) {}


    @Query(() => SubscriptionType, { nullable: true })
    async get_subscription(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetSubscriptionInput) 
    {
        try
        {
            return await this.followers_service.get({ ...input, current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => [SubscriptionType], { nullable: true })
    async get_all_subscriptions(@GqlCurrentUser() user: GetUserInput,
                            @Args('input') input: GetAllSubscriptionsInput) 
    {
        try
        {
            return await this.followers_service.get_all({ ...input , current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Query(() => Boolean, { nullable: true })
    async check_subscription(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetSubscriptionInput) 
    {
        try
        {
            return await this.followers_service.check({ ...input, current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => SubscriptionType)
    async create_subscription(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: CreateSubscriptionInput) 
    {
        try
        {
            return await this.followers_service.create({ ...input,
                                                        current_user_id: user.id });
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => String)
    async delete_subscription(@GqlCurrentUser() user: GetUserInput,
                        @Args('input') input: GetSubscriptionInput) 
    {
        try 
        {
            return await this.followers_service.delete({ ...input,
                                                        current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}