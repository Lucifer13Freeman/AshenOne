// import { Connection, Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
// import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
import { UserService } from 'src/user/user.service';
import { UserInputError } from 'apollo-server-express';
import { ChatService } from 'src/chat/chat.service';
// import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageInput } from './inputs/message/create-message.input';
import { GetMessageInput } from './inputs/message/get-message.input';
import { GetAllMessagesInput } from './inputs/message/get-all-messages.input';
import { SearchMessageInput } from './inputs/message/search-message.input';
//import { ChatDocument } from './schemas/chat.schema';
import { CreateReactionInput } from './inputs/reaction/create-reaction.input';
//import { Reaction, ReactionDocument } from './schemas/reaction.schema';
import { GetReactionInput } from './inputs/reaction/get-reaction';
import { UpdateMessageInput } from './inputs/message/update-message.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { select_user } from 'src/user/selects/user.select';
import { select_message } from './selects/message.select';
import { Chat, Message, Reaction } from '@prisma/client';
import { select_chat } from './selects/chat.select';
import { select_reaction } from './selects/reaction.select';


@Injectable()
export class MessageService 
{
    constructor(private prisma: PrismaService,
            // @InjectConnection() 
                // private connection: Connection,
                // @InjectModel(Message.name)  
                // private message_model: Model<MessageDocument>,
                // @InjectModel(Reaction.name)  
                // private reaction_model: Model<ReactionDocument>,
                private chat_service: ChatService,
                private user_service: UserService,
                private file_service: FileService) {}


    async create(dto: CreateMessageInput): Promise<Message/*Document*/> 
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            /*let errors: any = {
                user_id: undefined, 
                chat_id: undefined, 
                text: undefined, 
                image: undefined, 
                audio: undefined, 
                video: undefined
            };*/

            const { current_user_id, 
                    chat_id, 
                    text, 
                    image, 
                    audio, 
                    video } = dto;

            if ((!text || text.trim() === '') && !image && !audio && !video) 
                throw new UserInputError('Message is empty!');

            /*const user = *///await this.user_service.get({ id: current_user_id });
            /*const chat = */await this.chat_service.get({ id: chat_id, current_user_id });
            //const messages = await this.get_all({ chat_id, current_user_id });

            //if (text.trim() === '') throw new UserInputError('Message is empty!');

            const data = { user_id: current_user_id, ...dto, current_user_id: undefined }

            const message = await this.prisma.$transaction(async (prisma) => 
            {
                const created_message = await prisma.message.create(
                {
                    data: {
                        //...data,
                        user: { connect: { id: current_user_id } },
                        chat: { connect: { id: chat_id } },
                        text: text.trim(), image, audio, video
                    },
                    select: select_message
                });

                return created_message;
            });

            // const message = await this.message_model.create(
            // [{
            //     ...dto,
            //     user_id: user._id,
            //     chat_id: chat._id
            // }], { session });

            // chat.messages.push(message[0]._id);


            // chat = {
            //     ...chat,
            //     messages: [...messages, message]
            // }

            // chat.save({
            //     ...chat,
            //     messages: [...messages, message._id]
            // })

            //await chat.save({ session });

            // await chat.updateOne(
            // {
            //     $push: { messages: message._id }
            // });
            
            // console.log(chat.messages[messages.length + 1].text)

            //let new_message = await (await this.chat_service.get({id: chat_id, current_user_id})).messages[messages.length];

            //let chats = this.chat_service.get_all({ current_user_id });

            //console.log((await chats).find((c) => c._id === chat._id).messages.push(message._id));
            //console.log(new_message)

            //console.log(chat.messages[messages.length - 1].text)
            //console.log(await this.get({ id: message._id }))

            //await session.commitTransaction();
            return message; //await this.get({ id: message[0]._id });//message; 
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


    async get(dto: GetMessageInput): Promise<Message/*Document*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                message_id: undefined,
                user_id: undefined
            };

            const { id, current_user_id } = dto;
            // const message = await this.message_model.findById(id)
            //                                         .populate('user_id')
            //                                         .populate('reactions')
            //                                         .session(session);

            if (current_user_id) await this.user_service.get({ id: current_user_id });

            const message = await this.prisma.$transaction(async (prisma) => 
            {
                const get_message = await prisma.message.findUnique(
                {
                    where: { id }, select: select_message
                });

                if (!get_message)
                {
                    errors.message_id = 'Message not found!';
                    throw new UserInputError('Message not found!', { errors });
                }

                if (current_user_id && get_message.user_id !== current_user_id)
                {
                    errors.user_id = 'It is not your message!';
                    throw new UserInputError('It is not your message!', { errors });
                }

                return get_message;
            });

                                                   
            // if (!message)
            // {
            //     errors.message_id = 'Message not found';
            //     throw new UserInputError('Message not found', { errors });
            // }

            //await session.commitTransaction();
            return message;
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
    

    async get_all(dto: GetAllMessagesInput): Promise<Message[]/*Document[]*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            /*let errors: any = {
                chat_id: undefined
            };*/

            const { chat_id, current_user_id, limit, offset } = dto;

            //let messages: Message[] | null;//MessageDocument[] | null;

            const chat = await this.chat_service.get({ id: chat_id, current_user_id });

            const messages = await this.prisma.$transaction(async (prisma) => 
            {
                let get_all_messages;

                get_all_messages = await prisma.message.findMany(
                {
                    where: { chat_id },
                    skip: offset,
                    take: limit,
                    select: select_message
                });

                return get_all_messages;
            });

            // if (chat)
            // {
            //     if (count) messages = await this.message_model.find({ chat_id: chat })
            //                                                 .populate('user_id')
            //                                                 .populate('reactions')
            //                                                 .skip(Number(offset))
            //                                                 .limit(Number(count)).
            //                                                 session(session);
            //     else messages = await this.message_model.find({ chat_id: chat })
            //                                             .populate('user_id')
            //                                             .populate('reactions')
            //                                             .skip(Number(offset))
            //                                             .session(session);
                
            // }
            // else 
            // {
            //     await this.delete_all_in_chat({ chat_id, current_user_id })
            // }

            // if (chat) 
            // {
                // messages = await this.prisma.$transaction(async (prisma) => 
                // {
                //     let get_all_messages;

                //     get_all_messages = await prisma.message.findMany(
                //     {
                //         where: { chat_id },
                //         skip: offset,
                //         take: limit,
                //         select: select_message
                //     });

                //     return get_all_messages;
                // });
            // }
            // else
            // {
            //     //await this.delete_all_in_chat({ chat_id, current_user_id });
            //     await this.chat_service.delete_all_messages_in_chat({ id: chat_id, current_user_id });
            // }

            //const messages: Message[] = chat.messages;

            // await session.commitTransaction();
            return messages;
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


    async search(dto: SearchMessageInput): Promise<Message[]/*Document[]*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            const { current_user_id, chat_id, text, limit, offset } = dto;
            
            // let messages = await this.get_all({ chat_id, current_user_id });

            // const text_regexp = new RegExp(text, 'i');

            // messages = messages.filter((message: MessageDocument) => 
            // {
            //     return text_regexp.test(message.text);
            // });

            await this.chat_service.get({ id: chat_id, current_user_id });
            const search_text = text?.trim();

            const messages = await this.prisma.$transaction(async (prisma) => 
            {
                const search_messages = await prisma.message.findMany(
                {
                    where: { 
                        chat_id,
                        text: { contains: search_text, mode: 'insensitive' } 
                    },
                    skip: offset,
                    take: limit,
                    select: select_message
                });

                return search_messages;
            });

            // await session.commitTransaction();
            return messages;
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


    async update(dto: UpdateMessageInput): Promise<Message/*Document*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            // let errors: any = {
            //     message_id: undefined,
            //     user_id: undefined
            // };
            
            const { current_user_id, 
                    message_id, 
                    text, 
                    image, 
                    audio, 
                    video } = dto;

            if ((!text || text.trim() === '') && !image && !audio && !video) 
                throw new UserInputError('Nothing to update!');

            //await this.user_service.get({ id: current_user_id });
            /*let message = */await this.get({ id: message_id, current_user_id });

            // if (message.user_id !== current_user_id)
            // {
            //     errors.user_id = 'It is not your message!';
            //     throw new UserInputError('It is not your message!', { errors });
            // }

            //if (text.trim() === '') throw new UserInputError('Message is empty');
            
            //if (!text && !image && !audio && !video) throw new UserInputError('Nothing to update!');
            
            const data = {
                text: text ? text : undefined,
                image: image ? image : undefined,
                audio: audio ? audio : undefined,
                video: video ? video : undefined
            };

            // if (text) data.text = text;
            // if (image) data.image = image;
            // if (audio) data.audio = audio;
            // if (video) data.video = video;
            
            //await message.save({ session });

            const message = await this.prisma.$transaction(async (prisma) => 
            {
                //if (!text && !image && !audio && !video) throw new UserInputError('Nothing to update!');

                const update_message = await prisma.message.update(
                {
                    where: { id: message_id },
                    data,//: { ...data },
                    select: select_message
                });

                return update_message;
            });

            // await session.commitTransaction();
            return message; //await this.get({ id: message._id });
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


    async delete(dto: GetMessageInput): Promise<string/*ObjectId*/ | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            // let errors: any = {
            //     message_id: undefined,
            //     user_id: undefined
            // };

            const { id, current_user_id } = dto;

            //let message = await this.get({ id });

            //await this.user_service.get({ id: current_user_id });
            /*let message = */await this.get({ id, current_user_id });

            // if (message.user_id !== current_user_id)
            // {
            //     errors.user_id = 'It is not your message!';
            //     throw new UserInputError('It is not your message!', { errors });
            // }

            const message = await this.prisma.$transaction(async (prisma) => 
            {
                const delete_message = await prisma.message.delete(
                {
                    where: { id }, select: { id: true/*, chat_id: true*/ } //select_message
                });

                // await prisma.chat.update(
                // {
                //     where: { id: delete_message.chat_id },
                //     data: { member_ids: { } }
                // });

                return delete_message;
            });

            
            // if (message.user_id.email !== user.email)
            // {
            //     errors.user_id = 'It is not your message';
            //     throw new UserInputError('It is not your message', { errors });
            // }

            //await message.delete({ session });

            // await session.commitTransaction();
            return message.id;
        }
        catch(err)
        {
            // session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     session.endSession();
        // }
    }


    // async delete_all_in_chat(dto: GetAllMessagesInput): Promise<Chat/*Document*/ | null>
    // {
    //     // const session = await this.connection.startSession();
    //     // session.startTransaction();

    //     try 
    //     {
    //         /*let errors: any = {
    //             message_id: undefined,
    //             user_id: undefined
    //         };*/

    //         const { chat_id, current_user_id } = dto;

    //         let chat = await this.chat_service.get({ id: chat_id, current_user_id });

    //         //let messages = await this.get_all({ chat_id, current_user_id });

    //         //await this.message_model.deleteMany({ chat_id: chat }).session(session);

    //         chat = await this.prisma.$transaction(async (prisma) => 
    //         {
    //             // const delete_in_chat = await prisma.chat.findUnique(
    //             // {
    //             //     where: { id: chat_id },
    //             //     select: select_chat
    //             // });

    //             await prisma.message.deleteMany({ where: { chat_id } });
    //             return await prisma.chat.findUnique({ where: { id: chat_id}, select: select_chat });
    //         });

    //         // await session.commitTransaction();
    //         return chat;
    //     }
    //     catch(err)
    //     {
    //         // await session.abortTransaction();
    //         console.error(err);
    //         throw err;
    //     }
    //     // finally
    //     // {
    //     //     session.endSession();
    //     // }
    // }

    // async delete_chat_with_messages(dto: GetAllMessagesInput): Promise<Chat/*Document*/ | null>
    // {
    //     // const session = await this.connection.startSession();
    //     // session.startTransaction();

    //     try 
    //     {
    //         /*let errors: any = {
    //             message_id: undefined,
    //             user_id: undefined
    //         };*/

    //         const { chat_id, current_user_id } = dto;

    //         //const chat = await this.chat_service.get({ id: chat_id, current_user_id });

    //         //let messages = await this.get_all({ chat_id, current_user_id });

    //         //await this.message_model.deleteMany({ chat_id: chat }).session(session);

    //         //await this.chat_service.delete({ id: chat_id, current_user_id });

    //         // await this.prisma.$transaction(async (prisma) => 
    //         // {
    //         //     await prisma.message.deleteMany({ where: { chat_id } });
    //         // })[0];

    //         //const chat = await this.delete_all_in_chat({ chat_id, current_user_id });
    //         const chat = await this.chat_service.delete_all_messages_in_chat({ id: chat_id, current_user_id });
    //         await this.chat_service.delete({ id: chat_id, current_user_id });

    //         // await session.commitTransaction();
    //         return chat;
    //     }
    //     catch(err)
    //     {
    //         // await session.abortTransaction();
    //         console.error(err);
    //         throw err;
    //     }
    //     // finally
    //     // {
    //     //     session.endSession();
    //     // }
    // }

    async create_reaction(dto: CreateReactionInput): Promise<Reaction/*Document*/>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];

        try 
        {
            /*let errors: any = {
                message_id: undefined,
                user_id: undefined
            };*/

            const { message_id, current_user_id, content } = dto;

            if (!reactions.includes(content) || !content ) throw new UserInputError('Invalid reaction');

            /*const user = */await this.user_service.get({ id: current_user_id });
            /*const message = */await this.get({ id: message_id });

            const reaction = await this.prisma.$transaction(async (prisma) => 
            {
                let current_reaction = await prisma.reaction.findFirst(
                {
                    where: { message_id, user_id: current_user_id },
                    select: select_reaction
                });

                if (current_reaction)
                {
                    current_reaction = await prisma.reaction.update(
                    {
                        where: { id: current_reaction.id },
                        data: { content },
                        select: select_reaction
                    });
                }
                else
                {
                    current_reaction = await prisma.reaction.create(
                    {
                        data: {
                            user_id: current_user_id, 
                            message_id: message_id,
                            content: content
                        },
                        select: select_reaction
                    });
                }

                return current_reaction;
            });

            // let reaction = await this.reaction_model.findOne({ message_id: message._id, 
            //                                                         user_id: user /*._id*/ })
            //                                                 //.populate('message_id')
            //                                                 //.populate('user_id')
            //                                                 .session(session);

            // if (reaction) 
            // {
            //     reaction.content = content;
            //     reaction = await reaction.save({ session });
            // }
            // else
            // {
            //     const new_reaction = await this.reaction_model.create(
            //     [{ 
            //         user_id: user._id, 
            //         message_id: message._id,
            //         content: content
            //     }], { session });

            //     message.reactions.push(reaction);
            //     await message.save({ session });
            //     reaction = new_reaction[0];
            // }

            // await session.commitTransaction();
            return reaction; //message;
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

    async delete_reaction(dto: GetReactionInput): Promise<Reaction/*Document*/>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                user_id: undefined,
                reaction: undefined
            };

            const { id, current_user_id } = dto;


            /*const user = */await this.user_service.get({ id: current_user_id });

            // const reaction = await this.reaction_model.findById(id)
            //                                         .populate('user_id')
            //                                         //.populate('message_id')
            //                                         .session(session);

            // if (reaction.user_id.email !== user.email)
            // {
            //     errors.user_id = 'It is not your reaction';
            //     throw new UserInputError('It is not your reaction', { errors });
            // }


            const reaction = await this.prisma.$transaction(async (prisma) => 
            {
                let delete_reaction = await prisma.reaction.findUnique(
                {
                    where: { id },
                    select: select_reaction
                });

                if (!delete_reaction)
                {
                    errors.reaction = 'Reaction not found!';
                    throw new UserInputError('Reaction not found!', { errors });
                }
                
                if (delete_reaction.user_id !== current_user_id)
                {
                    errors.user_id = 'It is not your reaction!';
                    throw new UserInputError('It is not your reaction!', { errors });
                }

                delete_reaction = await prisma.reaction.delete(
                {
                    where: { id },
                    select: select_reaction
                });

                return delete_reaction;
            });


            // if (!reaction)
            // {
            //     errors.reaction = 'Reaction not found!';
            //     throw new UserInputError('Reaction not found!', { errors });
            // }
            // if (reaction.user_id.id !== user.id)
            // {
            //     errors.user_id = 'It is not your reaction!';
            //     throw new UserInputError('It is not your reaction!', { errors });
            // }

            // await reaction.delete({ session });

            // await session.commitTransaction();
            return reaction;
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
}