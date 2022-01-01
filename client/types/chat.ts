import { IMessage } from "./message";
import { IUser } from "./user";


export interface IChat
{
    id: string;
    admin_id: string,
    members: IUser[],
    messages: IMessage[],
    is_private?: boolean,
    is_secure?: boolean,
    created_at: Date;
    updated_at?: Date;
}

export interface IChatState 
{ 
    chat: IChat | null;
    chats: IChat[];
    error?: string;
}

export enum ChatActionTypes
{
    CREATE_CHAT = 'CREATE_CHAT',
    ASYNC_CREATE_CHAT = 'ASYNC_CREATE_CHAT',
    CREATE_CHAT_ERROR = 'CREATE_CHAT_ERROR',

    SET_CHAT = 'SET_CHAT',
    ASYNC_SET_CHAT = 'ASYNC_SET_CHAT',
    SET_CHAT_ERROR = 'SET_CHAT_ERROR',

    SET_ALL_CHATS = 'SET_ALL_CHATS',
    ASYNC_SET_ALL_CHATS = 'ASYNC_SET_ALL_CHATS',
    SET_ALL_CHATS_ERROR = 'SET_ALL_CHATS_ERROR',

    SEARCH_CHATS = 'SEARCH_CHATS',
    ASYNC_SEARCH_CHATS = 'ASYNC_SEARCH_CHATS',
    SEARCH_CHATS_ERROR = 'SEARCH_CHATS_ERROR',

    LEAVE_CHAT= 'LEAVE_CHAT',
    ASYNC_LEAVE_CHAT= 'ASYNC_LEAVE_CHAT',
    LEAVE_CHAT_ERROR = 'LEAVE_CHAT_ERROR',

    // ADD_CHAT_MEMBER = 'ADD_CHAT_MEMBER',
    // ASYNC_ADD_CHAT_MEMBER = 'ASYNC_ADD_CHAT_MEMBER',
    // ADD_CHAT_MEMBER_ERROR = 'ADD_CHAT_MEMBER_ERROR',

    // REMOVE_CHAT_MEMBER = 'REMOVE_CHAT_MEMBER',
    // ASYNC_REMOVE_CHAT_MEMBER = 'ASYNC_REMOVE_CHAT_MEMBER',
    // REMOVE_CHAT_MEMBER_ERROR = 'REMOVE_CHAT_MEMBER_ERROR',

    DELETE_CHAT = 'DELETE_CHAT',
    ASYNC_DELETE_CHAT = 'ASYNC_DELETE_CHAT',
    DELETE_CHAT_ERROR = 'DELETE_CHAT_ERROR'
}

interface ICreateChatAction
{
    type: ChatActionTypes.CREATE_CHAT;
    payload: IChat
}

interface IAsyncCreateChatAction
{
    type: ChatActionTypes.ASYNC_CREATE_CHAT;
    payload: IChat
}

interface ICreateChatErrorAction
{
    type: ChatActionTypes.CREATE_CHAT_ERROR;
    payload: string
}

interface ISetChatAction
{
    type: ChatActionTypes.SET_CHAT;
    payload: IChat
}

interface IAsyncSetChatAction
{
    type: ChatActionTypes.ASYNC_SET_CHAT;
    payload: IChat
}

interface ISetChatErrorAction
{
    type: ChatActionTypes.SET_CHAT_ERROR;
    payload: string
}

interface ISetAllChatsAction
{
    type: ChatActionTypes.SET_ALL_CHATS;
    payload: IChat[]
}

interface IAsyncSetAllChatsAction
{
    type: ChatActionTypes.ASYNC_SET_ALL_CHATS;
    payload: IChat[];
}

interface ISetAllChatsErrorAction
{
    type: ChatActionTypes.SET_ALL_CHATS_ERROR;
    payload: string
}

interface ISearchChatsAction
{
    type: ChatActionTypes.SEARCH_CHATS;
    payload: IChat[]
}

interface IAsyncSearchChatsAction
{
    type: ChatActionTypes.ASYNC_SEARCH_CHATS;
    payload: IChat[];
}

interface ISearchChatsErrorAction
{
    type: ChatActionTypes.SEARCH_CHATS_ERROR;
    payload: string
}

interface IDeleteChatAction
{
    type: ChatActionTypes.DELETE_CHAT;
    payload: string
}

interface IAsyncDeleteChatAction
{
    type: ChatActionTypes.ASYNC_DELETE_CHAT;
    payload: string
}

interface IDeleteChatErrorAction
{
    type: ChatActionTypes.DELETE_CHAT_ERROR;
    payload: string
}

// interface IAddChatMemberAction
// {
//     type: ChatActionTypes.ADD_CHAT_MEMBER;
//     payload: IChat
// }

// interface IAsyncAddChatMemberAction
// {
//     type: ChatActionTypes.ASYNC_ADD_CHAT_MEMBER;
//     payload: IChat
// }

// interface IAddChatMemberErrorAction
// {
//     type: ChatActionTypes.ADD_CHAT_MEMBER_ERROR;
//     payload: string
// }

// interface IRemoveChatMemberAction
// {
//     type: ChatActionTypes.REMOVE_CHAT_MEMBER;
//     payload: IChat
// }

// interface IAsyncRemoveChatMemberAction
// {
//     type: ChatActionTypes.ASYNC_REMOVE_CHAT_MEMBER;
//     payload: IChat
// }

// interface IRemoveChatMemberErrorAction
// {
//     type: ChatActionTypes.REMOVE_CHAT_MEMBER_ERROR;
//     payload: string
// }

interface ILeaveChatAction
{
    type: ChatActionTypes.LEAVE_CHAT;
    payload: IChat
}

interface IAsyncLeaveChatAction
{
    type: ChatActionTypes.ASYNC_LEAVE_CHAT;
    payload: IChat
}

interface ILeaveChatErrorAction
{
    type: ChatActionTypes.LEAVE_CHAT_ERROR;
    payload: string
}


export type ChatAction = ICreateChatAction 
                        | IAsyncCreateChatAction
                        | ICreateChatErrorAction
                        | ISetChatAction 
                        | IAsyncSetChatAction
                        | ISetChatErrorAction 
                        | ISetAllChatsAction
                        | IAsyncSetAllChatsAction
                        | ISetAllChatsErrorAction
                        | ISearchChatsAction
                        | IAsyncSearchChatsAction
                        | ISearchChatsErrorAction
                        | IDeleteChatAction
                        | IAsyncDeleteChatAction
                        | IDeleteChatErrorAction
                        // | IAddChatMemberAction
                        // | IAsyncAddChatMemberAction
                        // | IAddChatMemberErrorAction
                        // | IRemoveChatMemberAction
                        // | IAsyncRemoveChatMemberAction
                        // | IRemoveChatMemberErrorAction
                        | ILeaveChatAction
                        | IAsyncLeaveChatAction
                        | ILeaveChatErrorAction;