import { ISelectUser, select_user } from "src/user/selects/user.select";
import { ISelectMessage, select_message } from "./message.select";


export interface ISelectChat
{
    id: boolean;
    admin_id: boolean;
    admin: boolean, //{ select: ISelectUser },
    member_ids: boolean;
    members: { select: ISelectUser };
    // message_ids: boolean;
    messages: { select: ISelectMessage };
    is_private: boolean;
    is_secure: boolean;
    created_at: boolean;
    updated_at: boolean;
}

export const select_chat: ISelectChat = {
    id: true,
    admin_id: true,
    admin: false,//{ select: select_user },
    member_ids: true,
    members: { select: select_user },
    // message_ids: true,
    messages: { select: select_message },
    is_private: true,
    is_secure: true,
    created_at: true,
    updated_at: true
}