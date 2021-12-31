import { ISelectChat, select_chat } from "src/chat/selects/chat.select";
import { ISelectGroup, select_group } from "src/group/selects/group.select";
import { ISelectUser, select_user } from "src/user/selects/user.select";


export interface ISelectInvite
{
    id: boolean;
    user_id: boolean;
    user:  { select: ISelectUser };
    sender_id: boolean;
    sender: { select: ISelectUser };
    chat_id: boolean;
    chat: { select: ISelectChat };
    group_id: boolean;
    group: { select: ISelectGroup };
    status: boolean;
    created_at: boolean;
    updated_at: boolean;
}

export const select_invite: ISelectInvite = { 
    id: true,
    user_id: true,
    user:  { select: select_user },
    sender_id: true,
    sender: { select: select_user },
    chat_id: true,
    chat: { select: select_chat },
    group_id: true,
    group: { select: select_group },
    status: true,
    created_at: true,
    updated_at: true
}