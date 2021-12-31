import { ISelectUser, select_user } from "src/user/selects/user.select";
import { ISelectChat, select_chat } from "./chat.select";
import { ISelectReaction, select_reaction } from "./reaction.select";


export interface ISelectMessage
{
    id: boolean,
    chat_id: boolean,
    chat: boolean,//{ select: ISelectChat },
    user_id: boolean,
    user: { select: ISelectUser },
    // reaction_ids: boolean,
    reactions: { select: ISelectReaction },
    text: boolean,
    audio: boolean,
    image: boolean,
    video: boolean,
    is_read: boolean,
    is_edited: boolean,
    is_forwarded: boolean,
    created_at: boolean,
    updated_at: boolean
}

export const select_message: ISelectMessage = {
    id: true,
    chat_id: true,
    chat: true, //{ select: select_chat },
    user_id: true,
    user: { select: select_user },
    // reaction_ids: true,
    reactions: { select: select_reaction },
    text: true,
    audio: true,
    image: true,
    video: true,
    is_read: true,
    is_edited: true,
    is_forwarded: true,
    created_at: true,
    updated_at: true
}