import { ISelectPost, select_post } from "src/post/selects/post.select";
import { ISelectUser, select_user } from "src/user/selects/user.select";


export interface ISelectGroup
{
    id: boolean;
    name: boolean;
    avatar: boolean;
    admin_id: boolean;
    admin: boolean;
    moderator_ids: boolean;
    moderators: boolean;
    member_ids: boolean;
    members: { select: ISelectUser };
    posts: { select: ISelectPost };
    is_private: boolean;
    is_secure: boolean;
    created_at: boolean;
    updated_at: boolean;
}

export const select_group: ISelectGroup = {
    id: true,
    name: true,
    avatar: true,
    admin_id: true,
    admin: false,
    moderator_ids: true,
    moderators: false,
    member_ids: true,
    members: { select: select_user },
    posts: { select: select_post },
    is_private: true,
    is_secure: true,
    created_at: true,
    updated_at: true
}