// import { Connection, Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
// import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
import { UserService } from 'src/user/user.service';
import { UserInputError } from 'apollo-server-express';
import { ChatService } from 'src/chat/chat.service';
//import { Subscription, SubscriptionDocument } from './schemas/subscriptions.schema';
import { CreateSubscriptionInput } from './inputs/create-subscription.input';
// import { UserDocument } from 'src/user/schemas/user.schema';
import { GetSubscriptionInput } from './inputs/get-subscription.input';
import { GetAllSubscriptionsInput } from './inputs/get-all-subscriptions.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PrismaPromise, Role, Subscription } from '.prisma/client';
import { select_user } from 'src/user/selects/user.select';
import { select_subscription } from './selects/subscription.select';
import { User } from '@prisma/client';


@Injectable()
export class SubscriptionService 
{    
    constructor(private prisma: PrismaService,
                // @InjectConnection() 
                // private connection: Connection,
                // @InjectModel(Subscription.name)  
                // private subscription_model: Model<SubscriptionDocument>,
                // @InjectModel(Reaction.name)  
                // private reaction_model: Model<ReactionDocument>,
                // private chat_service: ChatService,
                /*private user_service: UserService*/) {}


    async create(dto: CreateSubscriptionInput): Promise<Subscription/*Document*/> 
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                follower_id: undefined
            };

            const { current_user_id, profile_id } = dto;
            
            const check_follower = await this.check({ current_user_id, profile_id });

            if (check_follower) 
            {
                errors.follower_id = 'You are already follower!';
                throw new UserInputError('You are already follower!', { errors });
            }

            // const follower = await this.user_service.get({ id: current_user_id });
            // const profile = await this.user_service.get({ id: profile_id });

            //const check_follower = await this.get({ user_id }); //this.check_follower({ current_user_id, user_id });
            const subscription = await this.prisma.$transaction(async (prisma) => 
            {
                //const check_follower = await this.subscription_model.findOne({ follower, profile });

                // const check_follower = await prisma.subscription.findFirst(
                // {
                //     where: { follower_id: current_user_id, profile_id }
                // });

                // if (check_follower) 
                // {
                //     errors.follower_id = 'You are already follower!';
                //     throw new UserInputError('You are already follower!', { errors });
                // }

                const create_subscription = await prisma.subscription.create(
                {
                    data: {
                        // ...dto,
                        // follower_id: current_user_id,
                        // profile_id,
                        follower: { connect: { id: current_user_id } }, 
                        profile: { connect: { id: profile_id } }
                    },
                    select: select_subscription
                });

                return create_subscription;
            });

            

            // const subscription = await this.subscription_model.create(
            // [{
            //     ...dto,
            //     follower: follower._id,
            //     profile: profile._id
            // }], { session });

            //this.user_service.set_is_follow({ id: profile._id }, true);

            //await session.commitTransaction();
            return subscription; //await this.get({ id: subscription[0]._id/*, user_id: follower._id*/ });
        } 
        catch (err) 
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     session.endSession();
        // }
    }


    async get(dto: GetSubscriptionInput): Promise<Subscription/*Document*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                follower_id: undefined
            };

            const { id, profile_id, follower_id, current_user_id } = dto;

            //let subscription: Subscription;//Document;

            const subscription = await this.prisma.$transaction(async (prisma) => 
            {
                let get_subscription; //: Subscription | PrismaPromise<Subscription>;

                if (profile_id) 
                {
                    // const follower = await this.user_service.get({ id: current_user_id });
                    // const profile = await this.user_service.get({ id: profile_id });

                    // subscription = await this.subscription_model.findOne({ follower, profile })
                    //                                             .populate('follower')
                    //                                             .populate('profile')
                    //                                             .session(session);
                    
                    get_subscription = await prisma.subscription.findFirst(
                    {
                        where: { 
                            // follower_id: current_user_id, profile_id ,
                            follower: { id: current_user_id },
                            profile: { id: profile_id }
                        },
                        select: select_subscription
                    });
                }
                else if (follower_id) 
                {
                    // const follower = await this.user_service.get({ id: follower_id });
                    // const profile = await this.user_service.get({ id: current_user_id });

                    // subscription = await this.subscription_model.findOne({ follower, profile })
                    //                                             .populate('follower')
                    //                                             .populate('profile')
                    //                                             .session(session);

                    get_subscription = await prisma.subscription.findFirst(
                    {
                        where: { follower_id: follower_id, profile_id: current_user_id },
                        select: select_subscription
                    });
                }
                else if (profile_id && follower_id)
                {
                    // const follower = await this.user_service.get({ id: follower_id });
                    // const profile = await this.user_service.get({ id: profile_id });

                    // subscription = await this.subscription_model.findOne({ follower, profile })
                    //                                             .populate('follower')
                    //                                             .populate('profile')
                    //                                             .session(session);

                    get_subscription = await prisma.subscription.findFirst(
                    {
                        where: { follower_id: follower_id, profile_id: profile_id },
                        select: select_subscription
                    });
                }
                else if (id && !profile_id && !follower_id) 
                {
                    // subscription = await this.subscription_model.findById(id)
                    //                                             .populate('follower')
                    //                                             .populate('profile')
                    //                                             .session(session);
                    get_subscription = await prisma.subscription.findUnique(
                    {
                        where: { id },
                        select: select_subscription
                    });
                }

                if (!get_subscription)
                {
                    errors.follower_id = 'Follower not found!';
                    throw new UserInputError('Follower not found!', { errors });
                }

                return get_subscription;
            });

            //await session.commitTransaction();
            return subscription;
        }
        catch(err)
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     session.endSession();
        // }
    }
    

    async get_all(dto: GetAllSubscriptionsInput): Promise<Subscription[]/*Document[]*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                followers: undefined
            };

            const { profile_id, follower_id, current_user_id, limit, offset } = dto;

            //let followers: SubscriptionDocument[];

            const followers = await this.prisma.$transaction(async (prisma) => 
            {
                // let profile: User | null;//Document | null;
                // if (profile_id) profile = await this.user_service.get({ id: profile_id ? profile_id : current_user_id });
                
                // let follower: User | null;//Document | null;
                // if (follower_id) follower = await this.user_service.get({ id: follower_id ? follower_id : current_user_id });
                
                let get_followers;

                /*if (profile_id)*/ /*const*/ get_followers = await prisma.subscription.findMany(
                {
                    where: { 
                        // OR: [
                        //     { profile_id: profile_id ? profile_id : current_user_id }, 
                        //     { follower_id: follower_id ? follower_id : current_user_id }
                        // ]
                        profile: { id: profile_id /*? profile_id : current_user_id*/ },
                        follower: { id: follower_id /*? follower_id : current_user_id*/ }
                    },
                    skip: offset,
                    take: limit,
                    select: select_subscription
                });

                // get_followers = await prisma.subscription.findMany(
                // {
                //     where: { 
                //         profile: {
                //             id: profile_id ? profile_id : current_user_id
                //         },
                //         follower: {
                //             id: follower_id ? follower_id : current_user_id
                //         }
                //     },
                //     skip: offset,
                //     take: limit,
                //     select: select_subscription
                // });

                    // followers = await this.subscription_model.find({ $or: [{ follower }, { profile }] })
                    //                                                 .populate('follower')
                    //                                                 .populate('profile')
                    //                                                 .skip(Number(offset))
                    //                                                 .limit(Number(count))
                    //                                                 .session(session);
                

                    // followers = await this.subscription_model.find({ $or: [{ follower }, { profile }] })
                    //                                         .populate('follower')
                    //                                         .populate('profile')
                    //                                         .skip(Number(offset))
                    //    

                if (!get_followers)
                {
                    errors.followers = 'Followers not found!';
                    throw new UserInputError('Followers not found!', { errors });
                }

                return get_followers;
            });

            //await session.commitTransaction();
            return followers;
        } 
        catch (err) 
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     session.endSession();
        // }
    }


    async delete(dto: GetSubscriptionInput): Promise<string/*ObjectId*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                follower_id: undefined
            };

            const { id, profile_id, current_user_id } = dto;

            const check_follower = await this.check({ current_user_id, profile_id });
            
            //const check_follower = await this.followers_model.findOne({ follower, profile });

            //console.log(check_follower)
            if (!check_follower) 
            {
                errors.follower_id = 'You are not follower!';
                throw new UserInputError('You are not follower!', { errors });
            }

            let subscription: Subscription;

            if (profile_id) subscription = await this.get({ profile_id, current_user_id });
            else if (id && !profile_id) subscription = await this.get({ id, current_user_id });

            if (subscription.follower_id !== current_user_id /*&& follower.profile.id !== user.id*/)
            {
                errors.follower_id = 'You are not follower!';
                throw new UserInputError('You are not follower!', { errors });
            }

            const deleted_subscription = await this.prisma.$transaction(async (prisma) => 
            {
                const delete_subscription = await prisma.subscription.delete(
                {
                    where: { id: subscription.id }, select: { id: true }
                });
                return delete_subscription;
            });

            // let subscription: SubscriptionDocument | null;

            // if (profile_id) subscription = await this.get({ profile_id, current_user_id });
            // else if (id && !profile_id) subscription = await this.get({ id, current_user_id });

            // const user = await this.user_service.get({ id: current_user_id });

            // if (subscription.follower.id !== user.id /*&& follower.profile.id !== user.id*/)
            // {
            //     errors.follower_id = 'You are not follower!';
            //     throw new UserInputError('You are not follower!', { errors });
            // }

            // await subscription.delete({ session });

            //this.user_service.set_is_follow({ id: follower._id }, false);

            //await session.commitTransaction();
            return deleted_subscription.id; //subscription.id;
        }
        catch(err)
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     session.endSession();
        // }
    }


    async check(dto: GetSubscriptionInput): Promise<boolean> 
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            const { current_user_id, profile_id } = dto;

            //const follower = await this.user_service.get({ id: current_user_id });
            //const profile = await this.user_service.get({ id: profile_id });
            
            //const check_subscription = await this.subscription_model.findOne({ follower, profile }).session(session);
            
            const check_subscription = await this.prisma.$transaction(async (prisma) => 
            {
                const check_follower = await prisma.subscription.findFirst(
                {
                    where: { 
                        // follower_id: current_user_id, 
                        // profile_id 
                        follower: { id: current_user_id },
                        profile: { id: profile_id }
                    },
                    select: { id: true, follower_id: true, profile_id: true }
                });
                return check_follower;
            });

            //const check_follower = await this.get({ user_id });

            // await session.commitTransaction();
            if (check_subscription) return true;
            else return false;
        } 
        catch (err) 
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     session.endSession();
        // }
    }
}