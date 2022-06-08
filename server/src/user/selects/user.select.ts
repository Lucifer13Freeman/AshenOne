export interface ISelectUser
{
    id: boolean;
    username: boolean;
    email: boolean;
    password: boolean;
    role: boolean;
    avatar: boolean;
    is_banned: boolean;
    created_at: boolean;
    updated_at: boolean;
    // chat_ids: boolean;
    // group_ids: boolean;
    // group_moder_ids: boolean;
}

export const select_user: ISelectUser = {
    id: true,
    username: true,
    email: true,
    password: false,
    role: true,
    avatar: true,
    is_banned: true,
    created_at: true,
    updated_at: true,
    // chat_ids: false,
    // group_ids: false,
    // group_moder_ids: false
}