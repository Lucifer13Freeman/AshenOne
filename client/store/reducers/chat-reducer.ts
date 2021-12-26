import { ChatAction, ChatActionTypes, IChat, IChatState } from "../../types/chat"


const initial_state: IChatState = {

    chat: null,
    chats: [],
    error: undefined//''
}


export const chat_reducer = (state = initial_state, action: ChatAction): IChatState =>
{
    switch (action.type) 
    {
        case ChatActionTypes.CREATE_CHAT:
        {
            return {
                ...state,
                chat: action.payload,
                chats: [action.payload, ...state.chats],
                error: ''
            }
        }
        case ChatActionTypes.CREATE_CHAT_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case ChatActionTypes.GET_CHAT:
        {
            // const new_chat = action.payload;
            // let update_chats = [...state.chats];
            // const chat_index = update_chats.findIndex((chat: IChat) => chat.id === new_chat.id);
            // update_chats[chat_index] = new_chat;

            const update_chats = state.chats.map((chat: IChat) => 
            { 
                if (chat.id === action.payload.id) chat = action.payload
                return chat 
            });

            return {
                ...state, 
                chat: action.payload,
                chats: update_chats,
                error: undefined
            }
        }
        case ChatActionTypes.GET_CHAT_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case ChatActionTypes.GET_ALL_CHATS:
        {
            return {
                ...state, 
                chats: action.payload,
                error: undefined
            }
        }
        case ChatActionTypes.GET_ALL_CHATS_ERROR:
        {
            return {
                ...state, 
                error: action.payload
            }
        }
        case ChatActionTypes.LEAVE_CHAT:
        {
            // const update_chats = state.chats.map((chat: IChat) => 
            // { 
            //     if (chat.id === action.payload.id) chat = action.payload
            //     return chat 
            // });

            const update_chats = state.chats.filter((chat: IChat) => chat.id !== action.payload.id);

            return {
                ...state, 
                chat: null,
                chats: update_chats,
                error: undefined
            }
        }
        case ChatActionTypes.LEAVE_CHAT_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
}