// import { Connection, Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
// import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
import { RegisterUserInput } from '../auth/inputs/register.input';
//import { Chat, ChatDocument } from './schemas/chat.schema';
import { UserService } from 'src/user/user.service';
import { CreateChatInput } from './inputs/chat/create-chat.input';
//import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserInputError } from 'apollo-server-express';
import { GetChatInput } from './inputs/chat/get-chat.input';
import { GetAllChatsInput } from './inputs/chat/get-all-chats.input';
import { SearchChatInput } from './inputs/chat/search-chat.input';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { GetChatMemberInput } from './inputs/chat/get-member.input';
// import { Message, MessageDocument } from './schemas/message.schema';
import { MessageService } from './message.service';
import { Chat, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { select_user } from 'src/user/selects/user.select';
import { select_chat } from './selects/chat.select';
import { ObjectId } from 'bson';
import { UpdateChatInput } from './inputs/chat/update-chat.input';
import { connect } from 'http2';


@Injectable()
export class ChatService 
{
    constructor(private prisma: PrismaService,
                // @InjectConnection() 
                // private connection: Connection,
                // @InjectModel(Chat.name)  
                // private chat_model: Model<ChatDocument>,
                //@InjectModel(Message.name)  
                //private message_model: Model<MessageDocument>,
                // private message_service: MessageService,
                private user_service: UserService) {}


    async create(dto: CreateChatInput): Promise<Chat/*Document*/> 
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            //let chat: Chat;//Document;
            //User[];//Document[];

            let errors: any = {
                //user_id: undefined,
                chat: undefined,
                chat_id: undefined
            };

            const { current_user_id, members } = dto;

            //const user = await this.user_service.get({ id: current_user_id });

            let member_ids: string[];
            
            if (!members 
                || members.length === 0 
                || members.includes(current_user_id /*user.id*/)) member_ids = [current_user_id /*user.id*/];
            else member_ids = [current_user_id/*user.id*/, ...members];

            const chat = await this.prisma.$transaction(async (prisma) => 
            {
                const is_exist = await prisma.chat.findFirst(
                {
                    where: { member_ids: { equals: member_ids } }
                });

                if (is_exist) 
                {
                    errors.chat = 'Chat with these members is already exists!';
                    errors.chat_id = is_exist.id;
                    throw new UserInputError('Chat with these members is already exists!', { errors });
                }

                const create_chat = await prisma.chat.create(
                {
                    data: { 
                        // admin_id: current_user_id,
                        // member_ids: [...member_ids],
                        admin: { connect: { id: current_user_id } }, 
                        members: { connect: member_ids.map((id) => ({id})) }
                    },
                    select: select_chat
                });

                // await prisma.user.updateMany(
                // {
                //     where: {
                //         id: { in: member_ids }
                //     },
                //     data: {
                //         chat_ids: { push: create_chat.id }
                //     }
                // });

                return create_chat;
            });

            //const is_exist = await this.chat_model.findOne({ members: member_ids }).session(session);
                                                    //.populate('members');

            // if (is_exist) 
            // {
            //     errors.chat = 'Chat with these members is already exists!';
            //     errors.chat_id = is_exist.id;
            //     throw new UserInputError('Chat with these members is already exists!', { errors });
            // }
            // else 
            // {
            //     const new_chat = await this.chat_model.create(
            //     [{
            //         user_id: user.id,
            //         members: member_ids
            //     }], { session });
            //     chat = new_chat[0];
            // }

            //await session.commitTransaction();
            return chat; //await this.get({ id: chat._id });
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


    async get(dto: GetChatInput): Promise<Chat /*Document*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                chat_id: undefined,
                user_id: undefined
            };

            const { id, current_user_id } = dto;

            //let user: User; //Document;
            if (current_user_id) /*user = */await this.user_service.get({ id: current_user_id });

            /*let chat = await this.chat_model.findById(id)
                                                .populate('members')
                                                .populate('messages');*/

            const chat = await this.prisma.$transaction(async (prisma) => 
            {
                const get_chat = await prisma.chat.findUnique(
                {
                    where: { id },
                    select: select_chat
                });

                if (!get_chat)
                {
                    errors.chat_id = 'Chat not found!';
                    throw new UserInputError('Chat not found!', { errors });
                }

                if (current_user_id) 
                {
                    const is_member = get_chat.member_ids.find((id: string) => id === current_user_id);

                    if (is_member === undefined)
                    {
                        errors.user_id = 'You are not a member of this chat!';
                        throw new UserInputError('You are not a member of this chat!', { errors });
                    }
                }

                return get_chat;
            });

            // const chat = await this.chat_model.findById(id)
            //                                     .populate('members')
            //                                     .populate({
            //                                         path: 'messages',
            //                                         populate: {
            //                                             path: 'user_id'
            //                                         }
            //                                     }).session(session);

            //console.log(chat)
            //console.log(chat.messages)

            // if (!chat)
            // {
            //     errors.chat_id = 'Chat not found';
            //     throw new UserInputError('Chat not found', { errors });
            // }
            
            // if (user) 
            // {
            //     const is_member = chat.members.find((u: UserDocument) => u.id === user.id);

            //     if (is_member === undefined)
            //     {
            //         errors.user_id = 'You are not a member of this chat';
            //         throw new UserInputError('You are not a member of this chat', { errors });
            //     }
            // }

            //await session.commitTransaction();
            return chat;
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
    

    async get_all(dto: GetAllChatsInput): Promise<Chat[]/*Document[]*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            const { current_user_id, limit, offset } = dto;
            //let chats: Chat[]; //Document[]; //Chat[] | PromiseLike<Chat[]>;

            /*const user = */await this.user_service.get({ id: current_user_id });

            //const id = new ObjectId(current_user_id);

            let chats = await this.prisma.$transaction(async (prisma) => 
            {
                // let chat_members = await prisma.chat.findMany(
                // {
                //     select: { members: { select: { id: true } } }
                // });

                // chat_members = chat_members.map((chat));

                const get_all_chats /*const chat_ids*/ = await prisma.chat.findMany(
                {
                    // where: { member_ids: { hasSome: [current_user_id] } },
                    where: { members: { some: { id: current_user_id } } },
                    // where: {
                    //     members: {
                    //     }
                    // },
                    skip: offset,
                    take: limit,
                    //select: select_chat
                    select: select_chat
                })//).map((chat) => chat.id);

                
                // console.log(get_all_chats)

                // const get_all_chats = await prisma.chat.findMany(
                // {
                //     where: { id: { in: [...chat_ids] } },
                //     // skip: offset,
                //     // take: limit,
                //     select: select_chat
                // });

                // get_all_chats = get_all_chats.filter((chat: Chat) => 
                // {
                //     //return chat.members.find((u: User) => u.email === user.email)
                //     return chat.member_ids.find((id: string) => id === user.id);
                // })

                return get_all_chats;
            });

            chats = chats?.filter((chat: Chat) => 
                chat.member_ids?.find((id) => id === current_user_id) !== undefined);

            //console.log(chats)

            // if (count) chats = await this.chat_model.find()
            //                                         .populate('members')
            //                                         .populate({
            //                                             path: 'messages',
            //                                             populate: {
            //                                                 path: 'user_id'
            //                                             }
            //                                         })
            //                                         .skip(Number(offset))
            //                                         .limit(Number(count))
            //                                         .session(session);
            // else chats = await this.chat_model.find()
            //                                 .populate('members')
            //                                 .populate({
            //                                     path: 'messages',
            //                                     populate: {
            //                                         path: 'user_id'
            //                                     }
            //                                 })
            //                                 .skip(Number(offset))
            //                                 .session(session);

            // chats = chats.filter((chat: Chat) => 
            // {
            //     return chat.members.find((u: User) => u.email === user.email)
            // })

            
            /*if (current_user_id) 
            {
                const user = await this.user_service.get({ id: current_user_id });

                chats = await this.chat_model.find()
                                            .populate('members')
                                            .populate('messages');

                chats.filter((chat: Chat) => 
                {
                    chat.members.find((u: UserDocument) => u._id === user._id);
                });
            }
            else chats = await this.chat_model.find()
                                            .populate('members')
                                            .populate('messages');*/
            
            //await session.commitTransaction();
            return chats;
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


    async delete(dto: GetChatInput): Promise<string/*ObjectId*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                user_id: undefined
            };

            const { id, current_user_id } = dto;

            //let chat: Chat;//Document;

            const check_chat = await this.get({ id, current_user_id });

            if (check_chat.admin_id !== current_user_id)
            {
                errors.user_id = 'You are not admin of this chat!';
                throw new UserInputError('You are not admin of this chat!', { errors });
            }

            const chat = await this.prisma.$transaction(async (prisma) => 
            {
                const delete_chat = await prisma.chat.delete(
                {
                    where: { id }, select: { id: true }
                });
                
                await prisma.message.deleteMany({ where: { chat_id: id } });

                return delete_chat;
            });

            //await this.message_service.delete_all_in_chat({ chat_id: chat.id, current_user_id });

            //chat = await this.chat_model.findByIdAndDelete(chat._id).session(session);
            //await this.message_service.delete_all_in_chat({ chat_id: chat._id, current_user_id });

            // if (!chat)
            // {
            //     errors.chat_id = 'Chat not found';
            //     throw new UserInputError('Chat not found', { errors });
            // }

            //await session.commitTransaction();
            return chat.id;
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

    
    async delete_all_messages_in_chat(dto: GetChatInput): Promise<Chat | null>
    {
        try 
        {
            let errors: any = {
                user_id: undefined
            };

            const { id, current_user_id } = dto;

            let chat = await this.get({ id, current_user_id });

            if (chat.admin_id !== current_user_id)
            {
                errors.user = 'You are not admin of this chat!';
                throw new UserInputError('You are not admin of this chat!', { errors });
            }

            chat = await this.prisma.$transaction(async (prisma) => 
            {
                await prisma.message.deleteMany({ where: { chat_id: id } });
                return await prisma.chat.findUnique({ where: { id }, select: select_chat });
            });

            return chat;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    async search(dto: SearchChatInput): Promise<Chat[]/*Document[]*/ | null>//: Promise<Chat[] | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            const { current_user_id, username, message_text, limit, offset } = dto;
            const search_username = username?.trim();
            const search_message_text = message_text?.trim();


            // let chats = await this.get_all({ current_user_id });

            // const username_regexp = new RegExp(username, 'i');

            // chats = chats.filter((chat: Chat) => 
            // {
            //     return chat.members.find((u: User) => username_regexp.test(u.username));
            // });

            // let users; 
            // let messages;
            
            // if (username) await this.user_service.search({ username });
            // if (message_text) await this.message_service.search({ text: message_text });

            let chats = await this.prisma.$transaction(async (prisma) => 
            {
                // let search_chats = await prisma.chat.findMany(
                // {
                //     where: {
                //         // member_ids: {
                //         //     hasSome: current_user_id,
                //         // },
                //         members: { 
                //             some: { 
                //                 // id: current_user_id,
                //                 username: { contains: search_username, mode: 'insensitive' }
                //             }
                //         },
                //         messages: {
                //             some: {
                //                 text: { contains: search_message_text, mode: 'insensitive' }
                //             }
                //         }
                //     },
                //     skip: offset,
                //     take: limit,
                //     select: select_chat
                // });

                const search_chats = await prisma.chat.findMany(
                {
                    where: {
                        members: { 
                            some: { 
                                // id: current_user_id,
                                username: { contains: search_username, mode: 'insensitive' }
                            }
                        },
                        messages: {
                            some: {
                                text: { contains: search_message_text, mode: 'insensitive' }
                            }
                        }
                    },
                    skip: offset,
                    take: limit,
                    select: select_chat
                });

               
                // search_chats = search_chats.map((chat: Chat) => 
                // {
                //     chat.member_ids
                // });

                // search_chats = search_chats.filter((chat: Chat) => chat.member_ids.find((id) => id === current_user_id) !== undefined);

                // if (message_text.trim() != "")
                // {
                //     search_chats = await prisma.chat.findMany(
                //     {
                //         where: {
                //             members: { 
                //                 some: { 
                //                     id: current_user_id,
                //                     username: { contains: username, mode: 'insensitive' }
                //                 }
                //             },
                            // messages: {
                            //     some: {
                            //         text: { contains: message_text, mode: 'insensitive' }
                            //     }
                            // }
                //         },
                //         skip: offset,
                //         take: limit,
                //         select: select_chat
                //     });
                // }
                // else if (username.trim() != "") 
                // {
                //     search_chats = await prisma.chat.findMany(
                //     {
                //         where: {
                //             members: { 
                //                 some: { 
                //                     id: current_user_id,
                //                     username: { contains: username, mode: 'insensitive' }
                //                 }
                //             }
                //         },
                //         skip: offset,
                //         take: limit,
                //         select: select_chat
                //     });
                // }
                // else 
                // {
                //     search_chats = await prisma.chat.findMany(
                //     {
                //         where: {
                //             members: { some: { id: current_user_id} }
                //         },
                //         skip: offset,
                //         take: limit,
                //         select: select_chat
                //     });
                // }

                // const search_chats = await prisma.chat.findMany(
                //     {
                //         where: { id: { in: [...chat_ids] } },
                //         // skip: offset,
                //         // take: limit,
                //         select: select_chat
                //     });
               
                return search_chats;
            });

            chats = chats.filter((chat: Chat) => 
                chat.member_ids.find((id) => id === current_user_id) !== undefined);


            //await session.commitTransaction();
            return chats;
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


    async add_member(dto: GetChatMemberInput): Promise<Chat/*Document*/>//: Promise<Chat> 
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                user_id: undefined,
            };

            const { user_id, chat_id, current_user_id } = dto;

            if (user_id === current_user_id)
            {
                errors.user_id = 'You are member of this chat already!';
                throw new UserInputError('You are member of this chat already!', { errors });
            }

            await this.user_service.get({ id: user_id });

            let chat = await this.get({ id: chat_id, current_user_id });
            
            const is_member = chat.member_ids.find((id: string) => id === user_id);

            if (is_member === undefined)
            {
                chat.member_ids.push(user_id);

                chat = await this.prisma.$transaction(async (prisma) => 
                {
                    const update_chat = await prisma.chat.update(
                    {
                        where: { id: chat_id },
                        data: { member_ids: { set: chat.member_ids } },
                        select: select_chat
                    });

                    return update_chat;
                });

                return chat;
            }
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

    
    async remove_member(dto: GetChatMemberInput): Promise<Chat | null/*Document*/>//: Promise<Chat> 
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            /*let errors: any = {
                user_id: undefined
            };*/

            const { user_id, chat_id, current_user_id } = dto;

            const user = await this.user_service.get({ id: user_id });
            
            let chat = await this.get({ id: chat_id, 
                                    current_user_id: current_user_id });
            
            const is_member = chat.member_ids.find((id: string) => id === user.id);

            if (is_member !== undefined)
            {
                chat.member_ids = chat.member_ids.filter((id: string) => id !== user.id);

                if (chat.member_ids.length === 0) 
                { 
                    this.delete({ id: chat_id, current_user_id });
                    //delete all messages from chat
                }
                else
                {
                    chat = await this.prisma.$transaction(async (prisma) => 
                    {
                        let update_chat;

                        update_chat = await prisma.chat.update(
                        {
                            where: { id: chat_id },
                            data: {
                                member_ids: { set: chat.member_ids },
                                admin_id: chat.admin_id === user.id ? chat.member_ids[0] : chat.admin_id
                            },
                            select: select_chat
                        });

                        return update_chat;
                    });
                }
                
                return chat;
            }

            // const is_member = chat.members.find((u: UserDocument) => u.id === user_id);

            // if (is_member === undefined) 
            // {
            //     await session.commitTransaction();
            //     return chat;
            // }
            // else 
            // {
            //     chat.members = chat.members.filter((u: UserDocument) => u.id !== user.id);

            //     if (chat.members.length === 0) 
            //     {
            //         this.delete({ id: chat_id, current_user_id });
            //         //delete all messages from chat
            //         await session.commitTransaction();
            //         return chat;
            //     }
            //     else
            //     {
            //         if (chat.user_id.toString() === user.id) chat.user_id = chat.members[0]._id;

            //         await chat.save({ session });

            //         await session.commitTransaction();
            //         return chat; //await this.get({ id: chat._id });
            //     }
            // }
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

    async update_chat(dto: UpdateChatInput): Promise<Chat | null>
    {
        try 
        {
            const { id, current_user_id, is_private, is_secure } = dto;

            let chat = await this.get({ id, current_user_id });

            if (chat.admin_id === current_user_id)
            {
                chat = await this.prisma.$transaction(async (prisma) => 
                {
                    const update_chat = await prisma.group.update(
                    {
                        where: { id },
                        data: {
                            is_private: is_private !== undefined ? is_private : chat.is_private,
                            is_secure: is_secure !== undefined ? is_secure : chat.is_secure
                        }
                    });

                    return update_chat;
                });
            }

            return chat;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}