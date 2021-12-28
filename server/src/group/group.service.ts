import { Injectable } from "@nestjs/common";
import { Group } from "@prisma/client";
import { UserInputError } from "apollo-server-express";
import { FileType } from "src/config/configs/consts.config";
import { FileService } from "src/file/file.service";
import { GetPostInput } from "src/post/inputs/post/get-post.input";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
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
                private user_service: UserService,
                private file_service: FileService) {}


    async create(dto: CreateGroupInput): Promise<Group> 
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
            
            return group;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async get(dto: GetGroupInput): Promise<Group | null>
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
                    const is_member = get_group.member_ids.find((id: string) => id === current_user_id);

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
    

    async get_all(dto: GetAllGroupsInput): Promise<Group[] | null>
    {
        try 
        {
            const { current_user_id, is_my, limit, offset } = dto;

            await this.user_service.get({ id: current_user_id });

            const groups = await this.prisma.$transaction(async (prisma) => 
            {
                let get_all_groups;
                
                if (is_my)
                {
                    get_all_groups = await prisma.group.findMany(
                    {
                        //where: { member_ids: { hasSome: [current_user_id] } },
                        where: { members: { some: { id: current_user_id } } },
                        skip: offset,
                        take: limit,
                        select: select_group
                    });
                }
                else 
                {
                    get_all_groups = await prisma.group.findMany(
                    {
                        //where: { member_ids: { hasSome: [current_user_id] } },
                        where: { is_private: false },
                        skip: offset,
                        take: limit,
                        select: select_group
                    });
                }

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


    async delete_all_posts_in_chat(dto: GetPostInput): Promise<Group | null>
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


    async search(dto: SearchGroupInput): Promise<Group[] | null>
    {
        try 
        {
            const { current_user_id, username, post_text, limit, offset } = dto;

            const groups = await this.prisma.$transaction(async (prisma) => 
            {
                const search_groups = await prisma.group.findMany(
                {
                    where: {
                        members: { 
                             some: { 
                                id: current_user_id,
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


    async add_member(dto: GetGroupMemberInput): Promise<Group>
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
            
            const is_member = group.member_ids.find((id: string) => id === user.id);

            if (is_member === undefined)
            {
                group.member_ids.push(user.id);
                
                group = await this.prisma.$transaction(async (prisma) => 
                {
                    const update_group = await prisma.group.update(
                    {
                        where: { id: group_id },
                        data: { member_ids: { set: group.member_ids } },
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

    
    async remove_member(dto: GetGroupMemberInput): Promise<Group | null/*Document*/>//: Promise<Chat> 
    {
        try 
        {
            const { user_id, group_id, current_user_id } = dto;

            const user = await this.user_service.get({ id: user_id ? user_id : current_user_id });
            
            let group = await this.get({ id: group_id, 
                                    current_user_id: current_user_id });
            
            const is_member = group.member_ids.find((id: string) => id === user.id);

            if (is_member !== undefined)
            {
                group.member_ids = group.member_ids.filter((id: string) => id !== user.id);

                if (group.member_ids.length === 0) 
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
                                member_ids: { set: group.member_ids },
                                admin_id: group.admin_id === user.id ? group.member_ids[0] : group.admin_id
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


    async update(dto: UpdateGroupInput): Promise<Group | null>
    {
        try 
        {
            const { id, current_user_id, add_moderator_id, remove_moderator_id,
                avatar, name, is_private, is_secure } = dto;

            let group = await this.get({ id, current_user_id });

            const is_admin = group.admin_id === current_user_id;
            const is_moderator = group.moderator_ids.find(id => id === current_user_id) !== undefined;

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
                    const moderator_ids = [...group.moderator_ids, add_moderator_id];

                    update_group = await prisma.group.update(
                    {
                        where: { id },
                        data: {
                            moderator_ids: { set: moderator_ids }
                        },
                        select: select_group
                    });
                }
                else if (is_admin && remove_moderator_id)
                {
                    const moderator_ids = group.moderator_ids.filter((id: string) => id !== remove_moderator_id);

                    update_group = await prisma.group.update(
                    {
                        where: { id },
                        data: { moderator_ids: { set: moderator_ids } },
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

    async update_avatar(dto: UpdateGroupInput, image): Promise<Group>
    {
        let errors = { user_id: undefined }

        try 
        {
            const { id, current_user_id} = dto;

            let group = await this.get({ id, current_user_id });

            const is_admin = group.admin_id === current_user_id;
            const is_moderator = group.moderator_ids.find(id => id === current_user_id) !== undefined;

            if (is_admin || is_moderator)
            {
                this.file_service.remove_file(group.avatar);
                const imagepath = this.file_service.create_file(FileType.IMAGE, image);

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