// import { Connection, Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
// import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
import { UserService } from 'src/user/user.service';
import { UserInputError } from 'apollo-server-express';
import { ChatService } from 'src/chat/chat.service';
// import { Post, PostDocument } from './schemas/post.schema';
// import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreatePostInput } from './inputs/post/create-post.input';
import { GetPostInput } from './inputs/post/get-post.input';
import { GetAllPostsInput } from './inputs/post/get-all-post.input';
import { SearchPostInput } from './inputs/post/search-post.input';
import { UpdatePostInput } from './inputs/post/update-post.input';
import { SubscriptionService } from 'src/subscriptions/subscription.service';
// import { SubscriptionDocument } from 'src/subscriptions/schemas/subscriptions.schema';
// import { UserDocument } from 'src/user/schemas/user.schema';
import { LikeInput } from './inputs/like/like.input';
// import { Like, LikeDocument } from './schemas/like.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { select_user } from 'src/user/selects/user.select';
import { select_post } from './selects/post.select';
import { Group, Post, PostLike, Subscription, User } from '@prisma/client';
import { select_post_like } from './selects/like.select';
import { select_subscription } from 'src/subscriptions/selects/subscription.select';
import { GroupService } from 'src/group/group.service';


@Injectable()
export class PostService 
{
    constructor(private prisma: PrismaService,
                /*@InjectConnection() 
                private connection: Connection,
                @InjectModel(Post.name)  
                private post_model: Model<PostDocument>,
                @InjectModel(Comment.name)  
                private comment_model: Model<CommentDocument>,
                @InjectModel(Like.name)  
                private like_model: Model<LikeDocument>,*/
                private user_service: UserService,
                private group_service: GroupService,
                private subscription_service: SubscriptionService,
                private file_service: FileService) {}


    async create(dto: CreatePostInput): Promise<Post/*Document*/> 
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            /*let errors: any = {
                text: undefined, 
                image: undefined, 
                audio: undefined, 
                video: undefined
            };*/

            const { current_user_id,
                    group_id,
                    text, 
                    image, 
                    audio, 
                    video } = dto;

            if ((!text || text.trim() === '') && !image && !audio && !video) 
                throw new UserInputError('Post is empty!');

            if (group_id) await this.group_service.get({ id: group_id });

            /*const user =*/ await this.user_service.get({ id: current_user_id });

            //if (text.trim() === '') throw new UserInputError('Post text is empty!');

            // const post = await this.post_model.create(
            // [{
            //     ...dto,
            //     user_id: user._id
            // }], { session });
            

            const post = await this.prisma.$transaction(async (prisma) =>
            {
                let  create_post;
                
                if (group_id) create_post = await prisma.post.create(
                {
                    data: {
                        //...dto,
                        //user_id: current_user_id,
                        user: { connect: { id: current_user_id } },
                        group: { connect: { id: group_id } },
                        text: text.trim(), image, audio, video
                    },
                    select: select_post
                });
                else create_post = await prisma.post.create(
                {
                    data: {
                        user: { connect: { id: current_user_id } },
                        text, image, audio, video
                    },
                    select: select_post
                });

                return create_post;
            });

            //await session.commitTransaction();
            return post;//[0]; //await this.get({ id: post[0]._id });
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


    async get(dto: GetPostInput): Promise<Post/*Document*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                user_id: undefined,
                post_id: undefined
            };

            const { id, current_user_id } = dto;

            if (current_user_id) await this.user_service.get({ id: current_user_id });

            const post = await this.prisma.$transaction(async (prisma) =>
            {
                const get_post = await prisma.post.findUnique(
                {
                    where: { id },
                    select: select_post
                });

                if (!get_post)
                {
                    errors.post_id = 'Post not found!';
                    throw new UserInputError('Post not found!', { errors });
                }

                if (current_user_id && get_post.user_id !== current_user_id) 
                {
                    errors.user_id = 'It is not your post!';
                    throw new UserInputError('It is not your post!', { errors });
                }

                return get_post;
            });

            // const post = await this.post_model.findById(id)
            //                                     .populate('user_id')
            //                                     .populate('likes')
            //                                     .populate('comments')
            //                                     .session(session);
                                                   
            // if (!post)
            // {
            //     errors.message_id = 'Post not found!';
            //     throw new UserInputError('Post not found!', { errors });
            // }

            //await session.commitTransaction();
            return post;
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
    

    async get_all(dto: GetAllPostsInput): Promise<Post[]/*Document[]*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            /*let errors: any = {
                post_id: undefined
            };*/

            // const { user_id, 
            //         current_user_id, 
            //         group_id, 
            //         is_for_followers, 
            //         is_for_group_members, 
            //         limit, 
            //         offset } = dto;

            //let posts: Post[]/*PostDocument[]*/ | null;
            //let subscriptions: Subscription[]/*SubscriptionDocument[]*/ | null;

            //const subscriptions = await this.subscription_service.get_all({ follower_id: current_user_id });
            //const profiles: User[] | null = subscriptions.map((sub: Subscription) => sub.profile);

            // if (is_for_followers) 
            // {
            //     const subscriptions = await this.subscription_service.get_all({ follower_id: current_user_id });
            // }

            const group_posts = await this.get_group_posts(dto);
            const user_posts = await this.get_user_posts(dto);
            const posts = [...group_posts, ...user_posts];

            // if (group_id) await this.group_service.get({ id: group_id });

            // const posts = await this.prisma.$transaction(async (prisma) =>
            // {
            //     let get_all_posts = [];
            //     let get_group_posts = [];
            //     // let get_followed_posts;

            //     // let subscriptions;
            //     // let profile_ids;
                

            //     if (is_for_group_members && !group_id && !user_id)
            //     {
            //         const groups = await prisma.group.findMany(
            //         {
            //             where: { members: { some: { id: current_user_id } } },
            //             skip: offset,
            //             take: limit,
            //             select: { id: true }
            //         });

            //         const group_ids = groups.map(gr => gr.id);

            //         get_group_posts = await prisma.post.findMany(
            //         {
            //             where: { group_id: { in: group_ids } },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //     }
            //     else if (group_id && !user_id)
            //     {
            //         get_group_posts = await prisma.post.findMany(
            //         {
            //             where: { group_id },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //     }
                

            //     if (is_for_followers && !user_id)
            //     {
            //         const subscriptions = await prisma.subscription.findMany(
            //         {
            //             where: { follower_id: current_user_id },
            //             //where: { follower: { id: current_user_id } },
            //             //select: { profile: { id: true } } 
            //             select: { profile_id: true }
            //         });
        
            //         const profile_ids = subscriptions.map(sub => sub.profile_id);

            //         if (profile_ids.length > 0) 
            //         {
            //             get_all_posts = await prisma.post.findMany(
            //             {
            //                 where: { user_id: { in: profile_ids } },
            //                 //where: { user: { id: { in: profile_ids } } },
            //                 skip: offset,
            //                 take: limit,
            //                 select: select_post
            //             });
            //         }
            //     }
            //     else if (user_id)
            //     {
            //         get_all_posts = await prisma.post.findMany(
            //         {
            //             where: { user_id },
            //             //where: { user: { id: user_id } },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //     }
            //     else
            //     {
            //         get_all_posts = await prisma.post.findMany(
            //         {
            //             where: { user_id: current_user_id },
            //             //where: { user: { id: current_user_id } },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //     }

            //     get_all_posts = [...get_group_posts, ...get_all_posts];

            //     return get_all_posts;
            // });

            return posts;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async get_group_posts(dto: GetAllPostsInput): Promise<Post[]>
    {
        try 
        {
            /*let errors: any = {
                post_id: undefined
            };*/

            const { user_id, 
                    current_user_id, 
                    group_id, 
                    is_order_by_desc,
                    is_for_group_members, 
                    limit, 
                    offset } = dto;

            if (group_id) await this.group_service.get({ id: group_id });

            const group_posts = await this.prisma.$transaction(async (prisma) =>
            {
                let get_group_posts = [];


                if (is_for_group_members && !group_id && !user_id)
                {
                    let groups = await prisma.group.findMany(
                    {
                        // where: { members: { some: { id: current_user_id } } },
                        skip: offset,
                        take: limit,
                        select: { id: true },
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });

                    groups = groups.filter((group: Group) => 
                        !group.is_private || group.member_ids.find((id) => id === current_user_id) !== undefined);

                    const group_ids = groups.map(gr => gr.id);

                    // console.log(groups)

                    get_group_posts = await prisma.post.findMany(
                    {
                        where: { group_id: { in: group_ids } },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });

                    // console.log(get_group_posts)
                }
                else if (group_id && !user_id)
                {
                    get_group_posts = await prisma.post.findMany(
                    {
                        where: { group_id },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });
                }

                // console.log(get_group_posts)

                return get_group_posts;
            });

            return group_posts;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async get_user_posts(dto: GetAllPostsInput): Promise<Post[]>
    {
        try 
        {
            const { user_id, 
                    current_user_id, 
                    is_order_by_desc,
                    is_for_followers, 
                    limit, 
                    offset } = dto;

            const user_posts = await this.prisma.$transaction(async (prisma) =>
            {
                let get_user_posts = [];

                if (is_for_followers && !user_id)
                {
                    let subscriptions = await prisma.subscription.findMany(
                    {
                        where: { 
                            follower_id: current_user_id, 
                            // profile_id: { not: current_user_id } 
                        },
                        // where: { follower: { id: current_user_id }/*, profile: { id: { not: current_user_id } }*/ },
                        //select: { profile: { id: true } } 
                        select: { profile_id: true, follower_id: true },
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });

                    console.log(subscriptions)

                    console.log(current_user_id)
                    const test = subscriptions.find(sub => sub.follower_id === current_user_id);

                    console.log(test)

                    // subscriptions = subscriptions.filter(sub => sub.follower_id === current_user_id
                    //                                             && sub.profile_id !== current_user_id);
                    
                    // console.log(subscriptions)

                    const profile_ids = subscriptions.map(sub => sub.profile_id);

                    if (profile_ids.length > 0) 
                    {
                        get_user_posts = await prisma.post.findMany(
                        {
                            where: { user_id: { in: profile_ids }, group_id: null },
                            //where: { user: { id: { in: profile_ids } } },
                            skip: offset,
                            take: limit,
                            select: select_post,
                            orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                        });
                    }
                }
                else if (user_id)
                {
                    get_user_posts = await prisma.post.findMany(
                    {
                        where: { user_id, group_id: null },
                        //where: { user: { id: user_id } },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });
                }
                else
                {
                    get_user_posts = await prisma.post.findMany(
                    {
                        where: { user_id: current_user_id, group_id: null },
                        //where: { user: { id: current_user_id } },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });
                }

                // console.log(get_user_posts)

                return get_user_posts;
            });

            return user_posts;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async search(dto: SearchPostInput): Promise<Post[]/*Document[]*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            // const { current_user_id, 
            //         user_id, 
            //         group_id,
            //         username, 
            //         text,
            //         is_for_followers,
            //         is_for_group_members,
            //         limit,
            //         offset } = dto;

            const group_posts = await this.search_group_posts(dto);
            const user_posts = await this.search_user_posts(dto);
            const posts = [...group_posts, ...user_posts];

            // if (group_id) await this.group_service.get({ id: group_id });

            // const posts = await this.prisma.$transaction(async (prisma) =>
            // {
            //     let search_posts;
            //     let search_group_post;

            //     if (is_for_group_members && !group_id && !user_id)
            //     {
            //         const groups = await prisma.group.findMany(
            //         {
            //             where: { members: { some: { id: current_user_id } } },
            //             skip: offset,
            //             take: limit,
            //             select: { id: true }
            //         });

            //         const group_ids = groups.map(gr => gr.id);

            //         search_group_post = await prisma.post.findMany(
            //         {
            //             where: { 
            //                 group_id: { in: group_ids },
            //                 text: { contains: text, mode: 'insensitive' },
            //                 user: { username: { contains: username, mode: 'insensitive' } }
            //             },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //     }
            //     else if (group_id && !user_id)
            //     {
            //         search_group_post = await prisma.post.findMany(
            //         {
            //             where: { 
            //                 group_id,
            //                 text: { contains: text, mode: 'insensitive' },
            //                 user: { username: { contains: username, mode: 'insensitive' } }
            //             },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //     }


            //     if (is_for_followers && !user_id)
            //     {
            //         const subscriptions = await prisma.subscription.findMany(
            //         {
            //             //where: { follower_id: current_user_id },
            //             where: { follower: { id: current_user_id } },
            //             select: { profile_id: true }
            //         });

            //         const profile_ids = subscriptions.map(sub => sub.profile_id);

            //         if(profile_ids.length > 0) 
            //         {
            //             search_posts = await prisma.post.findMany(
            //             {
            //                 where: { 
            //                     user_id: { in: profile_ids },
            //                     // OR: {
            //                     //     text: { contains: text, mode: 'insensitive' },
            //                     //     user: { username: { contains: username, mode: 'insensitive' } }
            //                     // }
            //                     text: { contains: text, mode: 'insensitive' },
            //                     user: { username: { contains: username, mode: 'insensitive' } }
            //                 },
            //                 skip: offset,
            //                 take: limit,
            //                 select: select_post
            //             });
            //         }
            //     }
            //     else if (user_id)
            //     {
            //         search_posts = await prisma.post.findMany(
            //         {
            //             where: { 
            //                 //user_id,
            //                 user: { id: user_id },
            //                 text: { contains: text, mode: 'insensitive' }
            //             },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //     }
            //     else
            //     {
            //         if (username) search_posts = await prisma.post.findMany(
            //         {
            //             where: { 
            //                 user: { username: { contains: username, mode: 'insensitive' } },
            //                 text: { contains: text, mode: 'insensitive' }
            //             },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //         else search_posts = await prisma.post.findMany(
            //         {
            //             where: { 
            //                 user_id: current_user_id,
            //                 text: { contains: text, mode: 'insensitive' }
            //             },
            //             skip: offset,
            //             take: limit,
            //             select: select_post
            //         });
            //     }

            //     return search_posts;
            // });

            // let posts: Post[];//Document[];
            
            //if (user_id) posts = await this.get_all({ user_id });
            //else if (current_user_id) posts = await this.get_all({ current_user_id });

            // if (text) 
            // {
            //     if (is_from_followers)
            //     {
            //         let text_regexp = new RegExp(text, 'i');
            //         posts = await this.get_all({ is_from_followers });

            //         posts = posts.filter((post: PostDocument) => text_regexp.test(post.text));
            //     }
            //     if (user_id) 
            //     {
            //         let text_regexp = new RegExp(text, 'i');
            //         posts = await this.get_all({ user_id });
            //         posts = posts.filter((post: PostDocument) => text_regexp.test(post.text));
            //     }
            //     else 
            //     {
            //         posts = await this.post_model.find(
            //         {
            //             text: { $regex: new RegExp(text, 'i')}
            //         }).populate('user_id')
            //         .populate('likes')
            //         .populate('comments')
            //         .session(session);
            //     }
            // }
            // else if (username && !user_id)
            // {
            //     const users = await this.user_service.search({ username });
            //     posts = await this.post_model.find({ user_id: { $in: users }})
            //                                 .populate('user_id')
            //                                 .populate('likes')
            //                                 .populate('comments')
            //                                 .session(session);
            // }

            // if (offset !== 0 && posts.length > offset) posts.splice(0, offset);
            // if (count) posts.splice(count);

            //await session.commitTransaction();
            return posts;
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


    async search_group_posts(dto: SearchPostInput): Promise<Post[]>
    {
        try 
        {
            const { current_user_id, 
                    user_id, 
                    group_id,
                    username, 
                    text,
                    is_for_group_members,
                    is_order_by_desc,
                    limit,
                    offset } = dto;

            if (group_id) await this.group_service.get({ id: group_id });
            const search_username = username?.trim();
            const search_text = text?.trim();
            

            const group_posts = await this.prisma.$transaction(async (prisma) =>
            {
                let search_group_post = [];

                if (is_for_group_members && !group_id && !user_id)
                {
                    let groups = await prisma.group.findMany(
                    {
                        // where: { members: { some: { id: current_user_id } } },
                        skip: offset,
                        take: limit,
                        select: { id: true },
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });

                    groups = groups.filter((group: Group) => 
                        !group.is_private || group.member_ids.find((id) => id === current_user_id) !== undefined);

                    const group_ids = groups.map(gr => gr.id);

                    search_group_post = await prisma.post.findMany(
                    {
                        where: { 
                            group_id: { in: group_ids },
                            text: { contains: search_text, mode: 'insensitive' },
                            user: { username: { contains: search_username, mode: 'insensitive' } }
                        },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });
                }
                else if (group_id && !user_id)
                {
                    search_group_post = await prisma.post.findMany(
                    {
                        where: { 
                            group_id,
                            text: { contains: search_text, mode: 'insensitive' },
                            user: { username: { contains: search_username, mode: 'insensitive' } }
                        },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });
                }

                return search_group_post;
            });

            return group_posts;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async search_user_posts(dto: SearchPostInput): Promise<Post[]>
    {
        try 
        {
            const { current_user_id, 
                    user_id, 
                    username, 
                    text,
                    is_for_followers,
                    is_order_by_desc,
                    limit,
                    offset } = dto;

            const search_username = username?.trim();
            const search_text = text?.trim();

            const user_posts = await this.prisma.$transaction(async (prisma) =>
            {
                let search_user_posts = [];

                if (is_for_followers && !user_id)
                {
                    let subscriptions = await prisma.subscription.findMany(
                    {
                        //where: { follower_id: current_user_id },
                        where: { follower: { id: current_user_id } },
                        select: { profile_id: true, follower_id: true },
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });

                    // subscriptions = subscriptions.filter(sub => sub.follower_id === current_user_id
                    //                                             && sub.profile_id !== current_user_id);

                    const profile_ids = subscriptions.map(sub => sub.profile_id);

                    if(profile_ids.length > 0) 
                    {
                        search_user_posts = await prisma.post.findMany(
                        {
                            where: { 
                                user_id: { in: profile_ids },
                                group_id: null,
                                // OR: {
                                //     text: { contains: text, mode: 'insensitive' },
                                //     user: { username: { contains: username, mode: 'insensitive' } }
                                // }
                                text: { contains: search_text, mode: 'insensitive' },
                                user: { username: { contains: search_username, mode: 'insensitive' } }
                            },
                            skip: offset,
                            take: limit,
                            select: select_post,
                            orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                        });
                    }
                }
                else if (user_id)
                {
                    search_user_posts = await prisma.post.findMany(
                    {
                        where: { 
                            //user_id,
                            user: { id: user_id },
                            group_id: null,
                            text: { contains: search_text, mode: 'insensitive' }
                        },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });
                }
                else
                {
                    if (username) search_user_posts = await prisma.post.findMany(
                    {
                        where: { 
                            user: { username: { contains: search_username, mode: 'insensitive' } },
                            text: { contains: search_text, mode: 'insensitive' },
                            group_id: null
                        },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });
                    else search_user_posts = await prisma.post.findMany(
                    {
                        where: { 
                            user_id: current_user_id,
                            text: { contains: search_text, mode: 'insensitive' },
                            group_id: null
                        },
                        skip: offset,
                        take: limit,
                        select: select_post,
                        orderBy: { created_at: is_order_by_desc ? 'desc' : 'asc' }
                    });
                }

                return search_user_posts;
            });

            return user_posts;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async update(dto: UpdatePostInput): Promise<Post/*Document*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            // let errors: any = {
            //     post_id: undefined,
            //     user_id: undefined
            // };

            const { current_user_id, 
                    post_id, 
                    text, 
                    image, 
                    audio, 
                    video } = dto;


            if ((!text || text.trim() === '') && !image && !audio && !video) 
                throw new UserInputError('Nothing to update!');

            //await this.user_service.get({ id: current_user_id });
            await this.get({ id: post_id, current_user_id });

            // if (post.user_id !== current_user_id)
            // {
            //     errors.user_id = 'It is not your post!';
            //     throw new UserInputError('It is not your post!', { errors });
            // }

            //if (text.trim() === '') throw new UserInputError('Post text is empty');
            
            //if (!text && !image && !audio && !video) throw new UserInputError('Nothing to update');

            // if (text) post.text = text;
            // if (image) post.image = image;
            // if (audio) post.audio = audio;
            // if (video) post.video = video;

            const data = {
                text: text ? text : undefined,
                image: image ? image : undefined,
                audio: audio ? audio : undefined,
                video: video ? video : undefined
            };

            const post =  await this.prisma.$transaction(async (prisma) => 
            {
                const update_post = await prisma.post.update(
                {
                    where: { id: post_id },
                    data,//: { ...post },
                    select: select_post
                });

                return update_post;
            });

            //await post.save({ session });

            //await session.commitTransaction();
            return post; //await this.get({ id: message._id });
        } 
        catch (err) 
        {
           // await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     session.endSession();
        // }
    }


    async like(dto: LikeInput): Promise<PostLike/*Post*//*Document*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            const { current_user_id, post_id } = dto;

            /*const user = */await this.user_service.get({ id: current_user_id });
            /*let post = */await this.get({ id: post_id });

            const like_post = await this.prisma.$transaction(async (prisma) =>
            {
                let like = await prisma.postLike.findFirst(
                {
                    where: {
                        user_id: current_user_id,
                        post_id: post_id,
                        // user: { id: current_user_id },
                        // post: { id: post_id }
                    },
                    select: select_post_like
                });

                if (like)
                {
                    like = await prisma.postLike.delete(
                    {
                        where: { id: like.id },
                        select: select_post_like
                    });
                }
                else
                {
                    like = await prisma.postLike.create(
                    {
                        data: {
                            // user_id: current_user_id,
                            // post_id: post_id,
                            user: { connect: { id: current_user_id } },
                            post: { connect: { id: post_id } }
                        },
                        select: select_post_like
                    });
                }

                return like; //await prisma.post.findUnique({ where: { id: post_id }, select: select_post });
            });

            // let like: LikeDocument | null = await this.like_model.findOne(
            // {
            //     post_id: post._id,
            //     user_id: user._id
            // }).session(session);

            // if (like)
            // {
            //     like = await this.like_model.findByIdAndDelete(like.id).session(session);
            //     post.likes.filter((l: LikeDocument) => l.id !== like.id);
            // }
            // else 
            // {
            //     const new_like = await this.like_model.create(
            //     [{
            //         post_id: post._id,
            //         user_id: user._id
            //     }], { session });

            //     like = new_like[0];
            //     post.likes.push(like);
            // }

            //await post.save({ session });

            // await session.commitTransaction();
            return like_post;//[0]; //await this.get({ id: post_id });
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


    async delete(dto: GetPostInput): Promise<string/*ObjectId*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            // let errors: any = {
            //     post_id: undefined,
            //     user_id: undefined
            // };

            const { id, current_user_id } = dto;

            /*const user = *///await this.user_service.get({ id: current_user_id });
            /*let post = */await this.get({ id, current_user_id });

            // if (post.user_id !== current_user_id)
            // {
            //     errors.user_id = 'It is not your post!';
            //     throw new UserInputError('It is not your post!', { errors });
            // }

            const post = await this.prisma.$transaction(async (prisma) =>
            {
                const delete_post = await prisma.post.delete(
                {
                    where: { id }, select: { id: true } //: select_post
                });
                
                //await prisma.comment.deleteMany({ where: { post_id: id } });
                await prisma.comment.deleteMany({ where: { post: { id } } });

                return delete_post;
            });

            // await post.delete({ session });

            // await session.commitTransaction();
            return post.id;
        }
        catch(err)
        {
            // await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     session.endSession();
        // }
    }

    async delete_all_comments_in_post(dto: GetPostInput): Promise<Post/*Document*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            /*let errors: any = {
                message_id: undefined,
                user_id: undefined
            };*/

            const { id, current_user_id } = dto;

            let post = await this.get({ id, current_user_id });

            //let messages = await this.get_all({ chat_id, current_user_id });

            //await this.comment_model.deleteMany({ post_id: post }).session(session);

            post = await this.prisma.$transaction(async (prisma) => 
            {
                //await prisma.comment.deleteMany({ where: { post_id: id } });
                await prisma.comment.deleteMany({ where: { post: { id } } });
                return await prisma.post.findUnique({ where: { id }, select: select_post });
            });

            // await session.commitTransaction();
            return post;
        }
        catch(err)
        {
            // await session.abortTransaction();
            console.error(err);
            throw err;
        }
    }
}