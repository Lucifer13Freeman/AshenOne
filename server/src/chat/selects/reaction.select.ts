import { ISelectUser, select_user } from "src/user/selects/user.select";
import { ISelectMessage, select_message } from "./message.select";


export interface ISelectReaction { 
    id: boolean;
    user_id: boolean;
    user: boolean;//{ select: ISelectUser },
    message_id: boolean;
    message: boolean;//{ select: ISelectMessage },
    content: boolean;
    created_at: boolean;
    updated_at: boolean;
}

export const select_reaction = { 
    id: true,
    user_id: true,
    user: false,//{ select: select_user },
    message_id: true,
    message: false,//{ select: select_message },
    content: true,
    created_at: true,
    updated_at: true
}