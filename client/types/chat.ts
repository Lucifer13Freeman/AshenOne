import { IMessage } from "./message";
import { IUser } from "./user";


export interface IChat
{
    id: string;
    admin_id: string,
    members: IUser[],
    messages: IMessage[],
    is_private?: string,
    is_secure?: string,
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

    GET_CHAT = 'GET_CHAT',
    ASYNC_GET_CHAT = 'ASYNC_GET_CHAT',
    GET_CHAT_ERROR = 'GET_CHAT_ERROR',

    GET_ALL_CHATS = 'GET_ALL_CHATS',
    ASYNC_GET_ALL_CHATS = 'ASYNC_GET_ALL_CHATS',
    GET_ALL_CHATS_ERROR = 'GET_ALL_CHATS_ERROR',

    SEARCH_CHATS = 'SEARCH_CHATS',
    ASYNC_SEARCH_CHATS = 'ASYNC_SEARCH_CHATS',
    SEARCH_CHATS_ERROR = 'SEARCH_CHATS_ERROR',

    DELETE_CHAT = 'DELETE_CHAT',
    ASYNC_DELETE_CHAT = 'ASYNC_DELETE_CHAT',
    DELETE_CHAT_ERROR = 'DELETE_CHAT_ERROR',

    ADD_MEMBER = 'ADD_MEMBER',
    ASYNC_ADD_MEMBER = 'ASYNC_ADD_MEMBER',
    ADD_MEMBER_ERROR = 'ADD_MEMBER_ERROR',

    REMOVE_MEMBER = 'REMOVE_MEMBER',
    ASYNC_REMOVE_MEMBER = 'ASYNC_REMOVE_MEMBER',
    REMOVE_MEMBER_ERROR = 'REMOVE_MEMBER_ERROR',

    LEAVE_CHAT = 'LEAVE_CHAT',
    ASYNC_LEAVE_CHAT = 'ASYNC_LEAVE_CHAT',
    LEAVE_CHAT_ERROR = 'LEAVE_CHAT_ERROR'
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

interface IGetChatAction
{
    type: ChatActionTypes.GET_CHAT;
    payload: IChat
}

interface IAsyncGetChatAction
{
    type: ChatActionTypes.ASYNC_GET_CHAT;
    payload: IChat
}

interface IGetChatErrorAction
{
    type: ChatActionTypes.GET_CHAT_ERROR;
    payload: string
}

interface IGetAllChatsAction
{
    type: ChatActionTypes.GET_ALL_CHATS;
    payload: IChat[]
}

interface IAsyncGetAllChatsAction
{
    type: ChatActionTypes.ASYNC_GET_ALL_CHATS;
    payload: IChat[];
}

interface IGetAllChatsErrorAction
{
    type: ChatActionTypes.GET_ALL_CHATS_ERROR;
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

interface IAddMemberAction
{
    type: ChatActionTypes.ADD_MEMBER;
    payload: IChat
}

interface IAsyncAddMemberAction
{
    type: ChatActionTypes.ASYNC_ADD_MEMBER;
    payload: IChat
}

interface IAddMemberErrorAction
{
    type: ChatActionTypes.ADD_MEMBER_ERROR;
    payload: string
}

interface IRemoveMemberAction
{
    type: ChatActionTypes.REMOVE_MEMBER;
    payload: IChat
}

interface IAsyncRemoveMemberAction
{
    type: ChatActionTypes.ASYNC_REMOVE_MEMBER;
    payload: IChat
}

interface IRemoveMemberErrorAction
{
    type: ChatActionTypes.REMOVE_MEMBER_ERROR;
    payload: string
}

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
                        | IGetChatAction 
                        | IAsyncGetChatAction
                        | IGetChatErrorAction 
                        | IGetAllChatsAction
                        | IAsyncGetAllChatsAction
                        | IGetAllChatsErrorAction
                        | ISearchChatsAction
                        | IAsyncSearchChatsAction
                        | ISearchChatsErrorAction
                        | IDeleteChatAction
                        | IAsyncDeleteChatAction
                        | IDeleteChatErrorAction
                        | IAddMemberAction
                        | IAsyncAddMemberAction
                        | IAddMemberErrorAction
                        | IRemoveMemberAction
                        | IAsyncRemoveMemberAction
                        | IRemoveMemberErrorAction
                        | ILeaveChatAction
                        | IAsyncLeaveChatAction
                        | ILeaveChatErrorAction;