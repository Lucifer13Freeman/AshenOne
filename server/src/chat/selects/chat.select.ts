import { Prisma } from "@prisma/client";
import { ISelectUser, select_user } from "src/user/selects/user.select";
import { ISelectMessage, select_message } from "./message.select";


export interface ISelectChat
{
    id: boolean;
    admin_id: boolean;
    admin: boolean, //{ select: ISelectUser },
    // member_ids: boolean;
    members: { select: ISelectUser };
    // message_ids: boolean;
    messages: { select: ISelectMessage };
    // chat_invite: boolean;
    is_private: boolean;
    is_secure: boolean;
    created_at: boolean;
    updated_at: boolean;
}


export const select_chat: ISelectChat /*Prisma.ChatSelect*/ = {
    id: true,
    admin_id: true,
    admin: false,//{ select: select_user },
    // member_ids: true,
    members: { select: select_user },
    // message_ids: true,
    messages: { select: select_message },
    // chat_invite: true,
    is_private: true,
    is_secure: true,
    created_at: true,
    updated_at: true,
}