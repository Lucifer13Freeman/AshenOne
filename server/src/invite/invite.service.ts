import { Injectable } from "@nestjs/common";
import { Chat, Group, Invite, User } from "@prisma/client";
import { UserInputError } from "apollo-server-express";
import { ChatService } from "src/chat/chat.service";
import { GetChatMemberInput } from "src/chat/inputs/chat/get-member.input";
import { select_chat } from "src/chat/selects/chat.select";
import { FILE_TYPE, INVITE_STATUS } from "src/config/configs/consts.config";
import { FileService } from "src/file/file.service";
import { GroupService } from "src/group/group.service";
import { GetGroupMemberInput } from "src/group/inputs/get-member.input";
import { select_group } from "src/group/selects/group.select";
import { GetPostInput } from "src/post/inputs/post/get-post.input";
import { PrismaService } from "src/prisma/prisma.service";
import { select_user } from "src/user/selects/user.select";
import { UserService } from "src/user/user.service";
import { CreateInviteInput } from "./inputs/create-invite.input";
import { GetAllInvitesInput } from "./inputs/get-all-invites.input";
import { GetInviteInput } from "./inputs/get-invite.input";
import { UpdateInviteInput } from "./inputs/update-invite.input";
import { select_invite } from "./selects/invite.select";



@Injectable()
export class InviteService 
{
    constructor(private prisma: PrismaService,
                private user_service: UserService,
                // private group_service: GroupService,
                // private chat_service: ChatService,
                private file_service: FileService) {}


    async create(dto: CreateInviteInput): Promise<Invite> 
    {
        try 
        {
            let errors: any = {
                invite: undefined,
                sender_id: undefined
            };

            const { current_user_id, user_id, chat_id, 
                    group_id, status } = dto;

            if (current_user_id === user_id) 
            {
                errors.sender_id = 'You can not invite yourself!';
                throw new UserInputError('You can not invite yourself!', { errors });
            }

            if (!chat_id && !group_id)
            {
                errors.invite = 'Nowhere to invite!';
                throw new UserInputError('Nowhere to invite!', { errors });
            }

            const existed_invite = await this.get({ user_id, chat_id, sender_id: current_user_id }, true);
            if (existed_invite) await this.delete({ id: existed_invite.id, current_user_id });
            
            const invite = await this.prisma.$transaction(async (prisma) => 
            {
                let create_invite;
                
                if (chat_id)
                {
                    const chat = await prisma.chat.findFirst(
                    {
                        where: { 
                            id: chat_id, 
                            members: { some: { id: current_user_id } } ,
                        },
                        select: { members: { select: { id: true } } }
                    });

                    if (chat)
                    {
                        const is_member = await chat.members.find((m: User) => m.id === user_id);

                        if (is_member)
                        {
                            errors.user_id = 'User are member of this chat already!';
                            throw new UserInputError('User are member of this chat already!', { errors });
                        }

                        create_invite = await prisma.invite.create(
                        {
                            data: { 
                                sender: { connect: { id: current_user_id } }, 
                                user: { connect: { id: user_id } }, 
                                chat: { connect: { id: chat_id } }
                            },
                            select: select_invite
                        });
                    }
                    else 
                    {
                        errors.user_id = 'You are not a member of this chat!';
                        throw new UserInputError('You are not a member of this chat!', { errors });
                    }
                }
                else if (group_id)
                {
                    const group = await prisma.group.findFirst(
                    {
                        where: { 
                            id: group_id, 
                            members: { some: { id: current_user_id } } ,
                        },
                        select: { members: { select: { id: true } } }
                    });
    
                    if (group)
                    {
                        const is_member = await group.members.find((m: User) => m.id === user_id);
                        
                        if (is_member)
                        {
                            errors.user_id = 'User are member of this group already!';
                            throw new UserInputError('User are member of this group already!', { errors });
                        }

                        create_invite = await prisma.invite.create(
                        {
                            data: { 
                                sender: { connect: { id: current_user_id } }, 
                                user: { connect: { id: user_id } }, 
                                group: { connect: { id: group_id } }
                            },
                            select: select_invite
                        });
                    }
                    else 
                    {
                        errors.user_id = 'You are not a member of this group!';
                        throw new UserInputError('You are not a member of this group!', { errors });
                    }
                }
                
                return create_invite;
            });
            
            return invite;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    // async check_status_is_valid(status: string): Promise<boolean>
    // {
    //     try {
    //         return status === INVITE_STATUS.ACCEPTED || status === INVITE_STATUS.WAIT || status === INVITE_STATUS.REJECTED;
    //     } catch (err) {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    async get(dto: GetInviteInput, is_for_check: boolean = false): Promise<Invite | null>
    {
        try 
        {
            let errors: any = {
                invite_id: undefined,
                user_id: undefined
            };

            const { id, current_user_id, user_id, 
                    sender_id, chat_id, group_id } = dto;

            // if (!user_id && !sender_id && !chat_id && !group_id) return;

            if (current_user_id) await this.user_service.get({ id: current_user_id });

            const invite = await this.prisma.$transaction(async (prisma) => 
            {
                let get_invite;
                
                if (id) get_invite = await prisma.invite.findUnique(
                {
                    where: { id },
                    select: select_invite
                });
                else if (user_id) get_invite = await prisma.invite.findFirst(
                {
                    where: { 
                        user_id,
                        chat_id,
                        group_id
                    },
                    select: select_invite
                });
                else if (sender_id) get_invite = await prisma.invite.findFirst(
                {
                    where: { 
                        sender_id,
                        chat_id,
                        group_id,
                    },
                    select: select_invite
                });
                else if (user_id && sender_id) get_invite = await prisma.invite.findFirst(
                {
                    where: { 
                        user_id,
                        sender_id,
                        chat_id,
                        group_id,
                    },
                    select: select_invite
                });

                // get_invite = await prisma.invite.findFirst(
                // {
                //     where: { 
                //         id,
                //         user_id,
                //         sender_id,
                //         chat_id,
                //         group_id
                //     },
                //     select: select_invite
                // });

                if (!get_invite && !is_for_check)
                {
                    errors.invite_id = 'Invite not found!';
                    throw new UserInputError('Invite not found!', { errors });
                }

                if (current_user_id 
                    && get_invite.sender_id !== current_user_id 
                    && get_invite.user_id !== current_user_id)
                {
                    errors.user_id = 'It is not your invite!';
                    throw new UserInputError('It is not your invite!', { errors });
                }

                return get_invite;
            });
            
            return invite;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }
    

    async get_received_invites(dto: GetAllInvitesInput): Promise<Invite[] | null>
    {
        try 
        {
            let errors = {
                status: undefined
            }

            const { current_user_id, chat_id, 
                    group_id, limit, offset, status/*, is_ids_only*/ } = dto;

            await this.user_service.get({ id: current_user_id });

            // let is_valid_status;
            // if (status) 
            // {
            //     is_valid_status = await this.check_status_is_valid(status);

            //     if (!is_valid_status) 
            //     {
            //         errors.status = 'Invalid invite status!';
            //         throw new UserInputError('Invalid invite status!', { errors });
            //     }
            // }

            // const select = !is_ids_only ? select_invite : { id: true };

            const invites = await this.prisma.$transaction(async (prisma) => 
            {
                let get_received_invites;
                
                if (chat_id)
                {
                    if (status === INVITE_STATUS.ACCEPTED 
                        || status === INVITE_STATUS.WAIT 
                        || status === INVITE_STATUS.REJECTED)
                    {
                        get_received_invites = await prisma.invite.findMany(
                        {
                            where: {
                                chat_id,
                                user_id: current_user_id,
                                status
                            },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                    else
                    {
                        get_received_invites = await prisma.invite.findMany(
                        {
                            where: {
                                chat_id,
                                user_id: current_user_id
                            },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                }
                else if (group_id)
                {
                    if (status === INVITE_STATUS.ACCEPTED 
                        || status === INVITE_STATUS.WAIT 
                        || status === INVITE_STATUS.REJECTED)
                    {
                        get_received_invites = await prisma.invite.findMany(
                        {
                            where: {
                                group_id,
                                user_id: current_user_id,
                                status
                            },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                    else
                    {
                        get_received_invites = await prisma.invite.findMany(
                        {
                            where: {
                                group_id,
                                user_id: current_user_id
                            },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                }
                else
                {
                    if (status === INVITE_STATUS.ACCEPTED 
                        || status === INVITE_STATUS.WAIT 
                        || status === INVITE_STATUS.REJECTED)
                    {
                        get_received_invites = await prisma.invite.findMany(
                        {
                            where: { user_id: current_user_id, status },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                    else
                    {
                        get_received_invites = await prisma.invite.findMany(
                        {
                            where: { user_id: current_user_id },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                }

                return get_received_invites;
            });

            // return !is_ids_only ? invites : invites.map((inv: Invite) => inv.id);
            return invites;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async get_sent_invites(dto: GetAllInvitesInput): Promise<Invite[] | null>
    {
        try 
        {
            const { current_user_id, chat_id, 
                    group_id, status, limit, offset/*, is_ids_only*/ } = dto;

            await this.user_service.get({ id: current_user_id });

            //const select = !is_ids_only ? select_invite : { id: true };

            const invites = await this.prisma.$transaction(async (prisma) => 
            {
                let get_sent_invites;
                
                if (chat_id)
                {
                    if (status === INVITE_STATUS.ACCEPTED 
                        || status === INVITE_STATUS.WAIT 
                        || status === INVITE_STATUS.REJECTED)
                    {
                        get_sent_invites = await prisma.invite.findMany(
                        {
                            where: {
                                chat_id,
                                sender_id: current_user_id,
                                status
                            },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                    else
                    {
                        get_sent_invites = await prisma.invite.findMany(
                        {
                            where: {
                                chat_id,
                                sender_id: current_user_id
                            },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                }
                else if (group_id)
                {
                    
                    if (status === INVITE_STATUS.ACCEPTED 
                        || status === INVITE_STATUS.WAIT 
                        || status === INVITE_STATUS.REJECTED)
                    {
                        get_sent_invites = await prisma.invite.findMany(
                        {
                            where: {
                                group_id,
                                sender_id: current_user_id,
                                status
                            },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                    else
                    {
                        get_sent_invites = await prisma.invite.findMany(
                        {
                            where: {
                                group_id,
                                sender_id: current_user_id
                            },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                }
                else
                {
                    if (status === INVITE_STATUS.ACCEPTED 
                        || status === INVITE_STATUS.WAIT 
                        || status === INVITE_STATUS.REJECTED)
                    {
                        get_sent_invites = await prisma.invite.findMany(
                        {
                            where: { sender_id: current_user_id, status },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                    else
                    {
                        get_sent_invites = await prisma.invite.findMany(
                        {
                            where: { sender_id: current_user_id },
                            skip: offset,
                            take: limit,
                            select: select_invite
                        });
                    }
                }

                return get_sent_invites;
            });

            //return !is_ids_only ? invites : invites.map((inv: Invite) => inv.id);
            return invites;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async get_all_invites(dto: GetAllInvitesInput): Promise<Invite[] | null>
    {
        try 
        {
            const sent_invites = await this.get_sent_invites(dto);
            const received_invites = await this.get_received_invites(dto);
            return [...received_invites, ...sent_invites];
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async delete(dto: GetInviteInput): Promise<string | null>
    {
        try 
        {
            const { id, current_user_id } = dto;

            if (current_user_id) await this.get({ id, current_user_id });

            const invite = await this.prisma.$transaction(async (prisma) => 
            {
                const delete_invite = await prisma.invite.delete(
                {
                    where: { id }, select: { id: true }
                });

                return delete_invite;
            });

            return invite.id;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    async update(dto: UpdateInviteInput): Promise<Invite | null>
    {
        try 
        {
            let errors = {
                status: undefined
            }

            const { id, current_user_id, status } = dto;

            if (current_user_id) await this.get({ id, current_user_id });

            if (status === INVITE_STATUS.ACCEPTED 
                || status === INVITE_STATUS.WAIT 
                || status === INVITE_STATUS.REJECTED)
            {
                const invite = await this.prisma.$transaction(async (prisma) => 
                {
                    const update_invite = await prisma.invite.update(
                    {
                        where: { id }, 
                        data: { status },
                        select: select_invite
                    });

                    return update_invite;
                });

                return invite;
            }
            else
            {
                errors.status = 'Invalid invite status!';
                throw new UserInputError('Invalid invite status!', { errors });
            }
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    async update_and_delete(dto: UpdateInviteInput): Promise<Invite | null>
    {
        try 
        {
            const { id, current_user_id } = dto;
            const invite = await this.update(dto);
            if (invite.status === INVITE_STATUS.ACCEPTED 
                || invite.status === INVITE_STATUS.REJECTED)
                await this.delete({ id, current_user_id });
            return invite;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    async delete_all_accepted_invites(dto: GetInviteInput): Promise<string[] | null>
    {
        try 
        {
            const { current_user_id } = dto;

            const invites_ids = (await this.get_all_invites({
                current_user_id,
                status: INVITE_STATUS.ACCEPTED
            })).map((inv: Invite) => inv.id);

            /*const invites = */await this.prisma.$transaction(async (prisma) => 
            {
                const delete_invites = await prisma.invite.deleteMany(
                {
                    where: { id: { in: invites_ids } }
                    // select: { id: true }
                });

                return delete_invites;
            });

            return invites_ids;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    async delete_all_rejected_invites(dto: GetInviteInput): Promise<string[] | null>
    {
        try 
        {
            const { current_user_id } = dto;

            const invites_ids = (await this.get_all_invites({
                current_user_id,
                status: INVITE_STATUS.REJECTED
            })).map((inv: Invite) => inv.id);

            /*const invites = */await this.prisma.$transaction(async (prisma) => 
            {
                const delete_invites = await prisma.invite.deleteMany(
                {
                    where: { id: { in: invites_ids } }
                    // select: { id: true }
                });

                return delete_invites;
            });

            return invites_ids;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    async delete_all_accepted_and_rejected_invites(dto: GetInviteInput): Promise<string[] | null>
    {
        try 
        {
            const { current_user_id } = dto;

            const accepted_invites = await this.delete_all_accepted_invites({ current_user_id });
            const rejected_invites = await this.delete_all_rejected_invites({ current_user_id });
            return [...accepted_invites, ...rejected_invites];
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    // async accept_group_invite(dto: GetGroupMemberInput): Promise<Group | null>
    // {
    //     try 
    //     {
    //         let errors: any = {
    //             user_id: undefined
    //         };

    //         const { user_id, group_id, current_user_id } = dto;

    //         const user = await this.user_service.get({ id: user_id ? user_id : current_user_id });
    //         const invite = await this.get({ user_id: user.id, group_id });

    //         let group = await this.group_service.get({ id: group_id });

    //         const is_member = group.member_ids.find((id: string) => id === user.id);

    //         if (invite && is_member === undefined)
    //         {
    //             group.member_ids.push(user_id);

    //             group = await this.prisma.$transaction(async (prisma) => 
    //             {
    //                 const update_chat = await prisma.group.update(
    //                 {
    //                     where: { id: group_id },
    //                     data: { member_ids: { set: group.member_ids } },
    //                     select: select_group
    //                 });

    //                 return update_chat;
    //             });

    //             await this.update({ id: invite.id, status: INVITE_STATUS.ACCEPTED });

    //             return group;
    //         }
    //         else
    //         {
    //             errors.user_id = 'You are member of this group already!';
    //             throw new UserInputError('You are member of this group already!', { errors });
    //         }
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // async accept_chat_invite(dto: GetChatMemberInput): Promise<Chat | null>
    // {
    //     try 
    //     {
    //         let errors: any = {
    //             user_id: undefined
    //         };

    //         const { user_id, chat_id, current_user_id } = dto;

    //         const user = await this.user_service.get({ id: user_id ? user_id : current_user_id });
    //         const invite = await this.get({ user_id: user.id, chat_id });

    //         let chat = await this.chat_service.get({ id: chat_id });

    //         const is_member = chat.member_ids.find((id: string) => id === user.id);

    //         if (invite && is_member === undefined)
    //         {
    //             chat.member_ids.push(user_id);

    //             chat = await this.prisma.$transaction(async (prisma) => 
    //             {
    //                 const update_chat = await prisma.chat.update(
    //                 {
    //                     where: { id: chat_id },
    //                     data: { member_ids: { set: chat.member_ids } },
    //                     select: select_chat
    //                 });

    //                 return update_chat;
    //             });

    //             await this.update({ id: invite.id, status: INVITE_STATUS.ACCEPTED });

    //             return chat;
    //         }
    //         else
    //         {
    //             errors.user_id = 'You are member of this chat already!';
    //             throw new UserInputError('You are member of this chat already!', { errors });
    //         }
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }



    // async delete_all_posts_in_chat(dto: GetPostInput): Promise<Group | null>
    // {
    //     try 
    //     {
    //         let errors: any = {
    //             user_id: undefined
    //         };

    //         const { id, current_user_id } = dto;

    //         let group = await this.get({ id, current_user_id });

    //         if (group.admin_id !== current_user_id)
    //         {
    //             errors.user_id = 'You are not admin of this group!';
    //             throw new UserInputError('You are not admin of this group!', { errors });
    //         }

    //         group = await this.prisma.$transaction(async (prisma) => 
    //         {
    //             await prisma.post.deleteMany({ where: { group_id: id } });
    //             return await prisma.group.findUnique({ where: { id }, select: select_group });
    //         });

    //         return group;
    //     }
    //     catch(err)
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // async search(dto: SearchGroupInput): Promise<Group[] | null>
    // {
    //     try 
    //     {
    //         const { current_user_id, username, post_text, limit, offset } = dto;

    //         const groups = await this.prisma.$transaction(async (prisma) => 
    //         {
    //             const search_groups = await prisma.group.findMany(
    //             {
    //                 where: {
    //                     members: { 
    //                          some: { 
    //                             id: current_user_id,
    //                             username: { contains: username, mode: 'insensitive' }
    //                         }
    //                     },
    //                     posts: {
    //                         some: {
    //                             text: { contains: post_text, mode: 'insensitive' }
    //                         }
    //                     }
    //                 },
    //                 skip: offset,
    //                 take: limit,
    //                 select: select_group
    //             });
               
    //             return search_groups;
    //         });

    //         return groups;
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // async add_member(dto: GetGroupMemberInput): Promise<Group>
    // {
    //     try 
    //     {
    //         let errors: any = {
    //             user_id: undefined,
    //         };

    //         const { user_id, group_id, current_user_id } = dto;

    //         if (user_id === current_user_id)
    //         {
    //             errors.user_id = 'You are member of this group already!';
    //             throw new UserInputError('You are member of this group already!', { errors });
    //         }

    //         const user = await this.user_service.get({ id: user_id ? user_id : current_user_id });

    //         let group = await this.get({ id: group_id, 
    //                                     current_user_id: current_user_id });
            
    //         const is_member = group.member_ids.find((id: string) => id === user.id);

    //         if (is_member === undefined)
    //         {
    //             group.member_ids.push(user.id);
                
    //             group = await this.prisma.$transaction(async (prisma) => 
    //             {
    //                 const update_group = await prisma.group.update(
    //                 {
    //                     where: { id: group_id },
    //                     data: { member_ids: { set: group.member_ids } },
    //                     select: select_group
    //                 });

    //                 return update_group;
    //             });

    //             return group;
    //         }
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }

    
    // async remove_member(dto: GetGroupMemberInput): Promise<Group | null/*Document*/>//: Promise<Chat> 
    // {
    //     try 
    //     {
    //         const { user_id, group_id, current_user_id } = dto;

    //         const user = await this.user_service.get({ id: user_id ? user_id : current_user_id });
            
    //         let group = await this.get({ id: group_id, 
    //                                 current_user_id: current_user_id });
            
    //         const is_member = group.member_ids.find((id: string) => id === user.id);

    //         if (is_member !== undefined)
    //         {
    //             group.member_ids = group.member_ids.filter((id: string) => id !== user.id);

    //             if (group.member_ids.length === 0) 
    //             { 
    //                 this.delete({ id: group_id, current_user_id });
    //                 //delete all messages from chat
    //             }
    //             else
    //             {
    //                 group = await this.prisma.$transaction(async (prisma) => 
    //                 {
    //                     const update_group = await prisma.group.update(
    //                     {
    //                         where: { id: group_id },
    //                         data: {
    //                             member_ids: { set: group.member_ids },
    //                             admin_id: group.admin_id === user.id ? group.member_ids[0] : group.admin_id
    //                         },
    //                         select: select_group
    //                     });

    //                     return update_group;
    //                 });
    //             }
                
    //             return group;
    //         }
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }


    // async update(dto: UpdateGroupInput): Promise<Group | null>
    // {
    //     try 
    //     {
    //         const { id, current_user_id, add_moderator_id, remove_moderator_id,
    //             avatar, name, is_private, is_secure } = dto;

    //         let group = await this.get({ id, current_user_id });

    //         const is_admin = group.admin_id === current_user_id;
    //         const is_moderator = group.moderator_ids.find(id => id === current_user_id) !== undefined;

    //         group = await this.prisma.$transaction(async (prisma) => 
    //         {
    //             let update_group;
                
    //             if (name || avatar || is_private !== undefined || is_secure != undefined) 
    //             {

    //                 update_group = await prisma.group.update(
    //                 {
    //                     where: { id },
    //                     data: {
    //                         avatar: (is_moderator || is_admin) && avatar ? avatar : group.avatar,
    //                         name: is_admin && name ? name : group.name,
    //                         is_private: is_admin && is_private !== undefined && is_private !== null ? is_private : group.is_private,
    //                         is_secure: is_admin && is_secure !== undefined && is_secure !== null ? is_secure : group.is_secure
    //                     },
    //                     select: select_group
    //                 });
    //             }

    //             if (is_admin && add_moderator_id)
    //             {
    //                 const moderator_ids = [...group.moderator_ids, add_moderator_id];

    //                 update_group = await prisma.group.update(
    //                 {
    //                     where: { id },
    //                     data: {
    //                         moderator_ids: { set: moderator_ids }
    //                     },
    //                     select: select_group
    //                 });
    //             }
    //             else if (is_admin && remove_moderator_id)
    //             {
    //                 const moderator_ids = group.moderator_ids.filter((id: string) => id !== remove_moderator_id);

    //                 update_group = await prisma.group.update(
    //                 {
    //                     where: { id },
    //                     data: { moderator_ids: { set: moderator_ids } },
    //                     select: select_group
    //                 });
    //             }

    //             return update_group;
    //         });
            
    //         return group;
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }

    // async update_avatar(dto: UpdateGroupInput, image): Promise<Group>
    // {
    //     let errors = { user_id: undefined }

    //     try 
    //     {
    //         const { id, current_user_id} = dto;

    //         let group = await this.get({ id, current_user_id });

    //         const is_admin = group.admin_id === current_user_id;
    //         const is_moderator = group.moderator_ids.find(id => id === current_user_id) !== undefined;

    //         if (is_admin || is_moderator)
    //         {
    //             this.file_service.remove_file(group.avatar);
    //             const imagepath = this.file_service.create_file(FileType.IMAGE, image);

    //             group = await this.prisma.$transaction(async (prisma) => 
    //             {
    //                 const update_group = prisma.group.update(
    //                 {
    //                     where: { id },
    //                     data: { avatar: imagepath },
    //                     select: select_group
    //                 });
                    
    //                 return update_group;
    //             });
    //         }
    //         else
    //         {
    //             errors.user_id = 'Access denied!';
    //             throw new UserInputError('Access denied!', { errors });
    //         }

    //         return group;
    //     } 
    //     catch (err) 
    //     {
    //         console.error(err);
    //         throw err;
    //     }
    // }
}