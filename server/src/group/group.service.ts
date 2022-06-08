import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Group, User } from "@prisma/client";
import { UserInputError } from "apollo-server-express";
import { FILE_TYPE, INVITE_STATUS } from "src/config/configs/consts.config";
import { FileService } from "src/file/file.service";
import { InviteService } from "src/invite/invite.service";
import { GetPostInput } from "src/post/inputs/post/get-post.input";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { GroupType } from "./dto/group.dto";
import { CreateGroupInput } from "./inputs/create-group.input";
import { GetAllGroupsInput } from "./inputs/get-all-groups.input";
import { GetGroupInput } from "./inputs/get-group.input";
import { GetGroupMemberInput } from "./inputs/get-member.input";
import { SearchGroupInput } from "./inputs/search-group.input";
import { UpdateGroupInput } from "./inputs/update-group.input";
import { select_group } from "./selects/group.select";



@Injectable()
export class GroupService 
{
    constructor(private prisma: PrismaService,
                @Inject(forwardRef(() => InviteService))
                private invite_service: InviteService,
                private user_service: UserService,
                private file_service: FileService) {}


    async create(dto: CreateGroupInput): Promise<GroupType> 
    {
        try 
        {
            let errors: any = {
                //user_id: undefined,
                name: undefined,
                group_id: undefined
            };

            const { current_user_id, members, name, avatar, is_private, is_secure } = dto;

            let member_ids: string[];
            
            if (!members 
                || members.length === 0 
                || members.includes(current_user_id )) member_ids = [current_user_id];
            else member_ids = [current_user_id, ...members];

            if (name.trim() === '') errors.name = 'Name must not be empty!';

            for (let value of Object.values(errors)) 
                if (value !== undefined) 
                    throw new UserInputError('Bad input', { errors });


            const group = await this.prisma.$transaction(async (prisma) => 
            {
                const create_group = await prisma.group.create(
                {
                    data: { 
                        name, avatar,
                        admin: { connect: { id: current_user_id } }, 
                        members: { connect: member_ids.map((id) => ({id})) },
                        is_private, is_secure
                    },
                    select: select_group
                });

                return create_group;
            });

            // group['moderator_ids'] = group.moderators.map(m => m.id);
            
            return group;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async get(dto: GetGroupInput): Promise<GroupType | null>
    {
        try 
        {
            let errors: any = {
                group_id: undefined,
                user_id: undefined
            };

            const { id, current_user_id } = dto;

            if (current_user_id) await this.user_service.get({ id: current_user_id });

            const group = await this.prisma.$transaction(async (prisma) => 
            {
                const get_group = await prisma.group.findUnique(
                {
                    where: { id },
                    select: select_group
                });

                if (!get_group)
                {
                    errors.group_id = 'Group not found!';
                    throw new UserInputError('Group not found!', { errors });
                }

                if (current_user_id && get_group.is_private) 
                {
                    const is_member = get_group.members.find((m: User) => m.id === current_user_id);

                    if (is_member === undefined)
                    {
                        errors.user_id = 'You are not a member of this group!';
                        throw new UserInputError('You are not a member of this group!', { errors });
                    }
                }

                return get_group;
            });
            
            return group;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }
    

    async get_all(dto: GetAllGroupsInput): Promise<GroupType[] | null>
    {
        try 
        {
            const { current_user_id, is_my, limit, offset } = dto;

            await this.user_service.get({ id: current_user_id });

            const groups = await this.prisma.$transaction(async (prisma) => 
            {
                let get_all_groups;
                
                // if (is_my)
                // {
                //     get_all_groups = await prisma.group.findMany(
                //     {
                //         //where: { member_ids: { hasSome: [current_user_id] } },
                //         // where: { members: { some: { id: current_user_id } } },
                //         skip: offset,
                //         take: limit,
                //         select: select_group
                //     });
                // }
                // else 
                // {
                    get_all_groups = await prisma.group.findMany(
                    {
                        //where: { member_ids: { hasSome: [current_user_id] } },
                        // where: { is_private: false },
                        skip: offset,
                        take: limit,
                        select: select_group
                    });
                // }

                get_all_groups = get_all_groups.filter((group) => 
                    !group.is_private || group.members.find((m: User) => m.id === current_user_id) !== undefined);

                return get_all_groups;
            });

            return groups;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async delete(dto: GetGroupInput): Promise<string | null>
    {
        try 
        {
            let errors: any = {
                user_id: undefined
            };

            const { id, current_user_id } = dto;

            const check_group = await this.get({ id, current_user_id });

            if (check_group.admin_id !== current_user_id)
            {
                errors.user_id = 'You are not admin of this group!';
                throw new UserInputError('You are not admin of this group!', { errors });
            }

            const group = await this.prisma.$transaction(async (prisma) => 
            {
                const delete_group = await prisma.group.delete(
                {
                    where: { id }, select: { id: true }
                });
                
                await prisma.post.deleteMany({ where: { group_id: id } });

                return delete_group;
            });

            return group.id;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    async delete_all_posts_in_chat(dto: GetPostInput): Promise<GroupType | null>
    {
        try 
        {
            let errors: any = {
                user_id: undefined
            };

            const { id, current_user_id } = dto;

            let group = await this.get({ id, current_user_id });

            if (group.admin_id !== current_user_id)
            {
                errors.user_id = 'You are not admin of this group!';
                throw new UserInputError('You are not admin of this group!', { errors });
            }

            group = await this.prisma.$transaction(async (prisma) => 
            {
                await prisma.post.deleteMany({ where: { group_id: id } });
                return await prisma.group.findUnique({ where: { id }, select: select_group });
            });

            return group;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }


    async search(dto: SearchGroupInput): Promise<GroupType[] | null>
    {
        try 
        {
            const { current_user_id, name, username, post_text, limit, offset } = dto;

            const groups = await this.prisma.$transaction(async (prisma) => 
            {
                let search_groups = await prisma.group.findMany(
                {
                    where: {
                        name: { contains: name, mode: 'insensitive' },
                        members: { 
                             some: { 
                                // id: current_user_id,
                                username: { contains: username, mode: 'insensitive' }
                            }
                        },
                        posts: {
                            some: {
                                text: { contains: post_text, mode: 'insensitive' }
                            }
                        }
                    },
                    skip: offset,
                    take: limit,
                    select: select_group
                });

                search_groups = search_groups.filter((group) => 
                    !group.is_private || group.members.find((m: User) => m.id === current_user_id) !== undefined);
               
                return search_groups;
            });

            return groups;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async add_invited_member(dto: GetGroupMemberInput): Promise<GroupType | null>
    {
        try 
        {
            let errors: any = {
                user_id: undefined
            };

            const { user_id, group_id, current_user_id } = dto;

            const user = await this.user_service.get({ id: user_id ? user_id : current_user_id });
            const invite = await this.invite_service.get({ user_id: user.id, group_id });

            let group = await this.get({ id: group_id });

            const is_member = group.members.find((m: User) => m.id === user.id);

            if (invite && is_member === undefined)
            {
                group.members.push(user);

                group = await this.prisma.$transaction(async (prisma) => 
                {
                    const update_chat = await prisma.group.update(
                    {
                        where: { id: group_id },
                        data: { members: { set: group.members.map(m => ({ id: m.id })) } },
                        select: select_group
                    });

                    return update_chat;
                });

                await this.invite_service.update_and_delete({ id: invite.id, status: INVITE_STATUS.ACCEPTED });

                return group;
            }
            else
            {
                errors.user_id = 'You are member of this group already!';
                throw new UserInputError('You are member of this group already!', { errors });
            }
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async add_member(dto: GetGroupMemberInput): Promise<GroupType>
    {
        try 
        {
            let errors: any = {
                user_id: undefined,
            };

            const { user_id, group_id, current_user_id } = dto;

            if (user_id === current_user_id)
            {
                errors.user_id = 'You are member of this group already!';
                throw new UserInputError('You are member of this group already!', { errors });
            }

            const user = await this.user_service.get({ id: user_id ? user_id : current_user_id });

            let group = await this.get({ id: group_id, 
                                        current_user_id: current_user_id });
            
            const is_member = group.members.find((m: User) => m.id === user.id);

            if (is_member === undefined)
            {
                // const invite = await this.invite_service.get({ user_id: user.id, group_id });
                // if (invite) await this.invite_service.delete({ id: invite.id, current_user_id });
                
                group.members.push(user);
                
                group = await this.prisma.$transaction(async (prisma) => 
                {
                    const invite = await prisma.invite.findFirst(
                    {
                        where: { group_id, user_id: user.id },
                        select: { id: true }
                    });

                    if (invite) await prisma.invite.delete({ where: { id: invite.id }});

                    const update_group = await prisma.group.update(
                    {
                        where: { id: group_id },
                        data: { members: { set: group.members.map(m => ({ id: m.id })) } },
                        select: select_group
                    });

                    return update_group;
                });

                return group;
            }
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }

    
    async remove_member(dto: GetGroupMemberInput): Promise<GroupType | null/*Document*/>//: Promise<Chat> 
    {
        try 
        {
            const { user_id, group_id, current_user_id } = dto;

            const user = await this.user_service.get({ id: user_id ? user_id : current_user_id });
            
            let group = await this.get({ id: group_id, 
                                    current_user_id: current_user_id });
            
            const is_member = group.members.find((m: User) => m.id === user.id);

            if (is_member !== undefined)
            {
                const members = group.members.filter((m: User) => m.id !== user.id);

                if (members.length === 0) 
                { 
                    this.delete({ id: group_id, current_user_id });
                    //delete all messages from chat
                }
                else
                {
                    group = await this.prisma.$transaction(async (prisma) => 
                    {
                        const update_group = await prisma.group.update(
                        {
                            where: { id: group_id },
                            data: {
                                members: { set: members.map(m => ({ id: m.id })) },
                                admin_id: group.admin_id === user.id ? group.members[0].id : group.admin_id
                            },
                            select: select_group
                        });

                        return update_group;
                    });
                }
                
                return group;
            }
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async update(dto: UpdateGroupInput): Promise<GroupType | null>
    {
        try 
        {
            const { id, current_user_id, add_moderator_id, remove_moderator_id,
                avatar, name, is_private, is_secure } = dto;

            let group = await this.get({ id, current_user_id });

            const is_admin = group.admin_id === current_user_id;
            const is_moderator = group.moderators.find((m: User) => m.id === current_user_id) !== undefined;

            group = await this.prisma.$transaction(async (prisma) => 
            {
                let update_group;
                
                if (name || avatar || is_private !== undefined || is_secure != undefined) 
                {

                    update_group = await prisma.group.update(
                    {
                        where: { id },
                        data: {
                            avatar: (is_moderator || is_admin) && avatar ? avatar : group.avatar,
                            name: is_admin && name ? name : group.name,
                            is_private: is_admin && is_private !== undefined && is_private !== null ? is_private : group.is_private,
                            is_secure: is_admin && is_secure !== undefined && is_secure !== null ? is_secure : group.is_secure
                        },
                        select: select_group
                    });
                }

                if (is_admin && add_moderator_id)
                {
                    const user = await this.user_service.get({ id: add_moderator_id });
                    // const moderator_ids = [...group.moderators.map(m => m.id), add_moderator_id];

                    update_group = await prisma.group.update(
                    {
                        where: { id },
                        data: {
                            moderators: { 
                                set: [...group.moderators.map(m => ({ id: m.id })), { id: user.id }] 
                            }
                        },
                        select: select_group
                    });
                }
                else if (is_admin && remove_moderator_id)
                {
                    const moderators = group.moderators.filter((m: User) => m.id !== remove_moderator_id);

                    update_group = await prisma.group.update(
                    {
                        where: { id },
                        data: { 
                            moderators: { 
                                set: moderators.map(m => ({ id: m.id })) 
                            } 
                        },
                        select: select_group
                    });
                }

                return update_group;
            });
            
            return group;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async update_avatar(dto: UpdateGroupInput, image): Promise<GroupType>
    {
        let errors = { user_id: undefined }

        try 
        {
            const { id, current_user_id} = dto;

            let group = await this.get({ id, current_user_id });

            const is_admin = group.admin_id === current_user_id;
            const is_moderator = group.moderators.find((m: User) => m.id === current_user_id) !== undefined;

            if (is_admin || is_moderator)
            {
                this.file_service.remove_file(group.avatar);
                const imagepath = this.file_service.create_file(FILE_TYPE.IMAGE, image);

                group = await this.prisma.$transaction(async (prisma) => 
                {
                    const update_group = prisma.group.update(
                    {
                        where: { id },
                        data: { avatar: imagepath },
                        select: select_group
                    });
                    
                    return update_group;
                });
            }
            else
            {
                errors.user_id = 'Access denied!';
                throw new UserInputError('Access denied!', { errors });
            }

            return group;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}