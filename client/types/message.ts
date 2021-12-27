import { IReaction } from "./reaction";
import { IUser } from "./user";


// export interface IReaction
// {
//     id: string;
//     user_id?: string;
//     message_id?: string;
//     content?: '❤️' | '😆' | '😯' | '😢' | '😡' | '👍' | '👎',
//     created_at?: Date;
//     updated_at?: Date;
// }

export interface IMessage
{
    id: string;
    chat_id: string;
    user: IUser;
    text?: string;
    image?: string;
    audio?: string;
    video?: string;
    reactions: IReaction[];
    created_at: Date;
    updated_at?: Date;
}

export interface IMessageState 
{ 
    message: IMessage | null;
    messages: IMessage[];
    error?: string;
}

export enum MessageActionTypes
{
    CREATE_MESSAGE = 'CREATE_MESSAGE',
    ASYNC_CREATE_MESSAGE = 'ASYNC_CREATE_MESSAGE',
    CREATE_MESSAGE_ERROR = 'CREATE_MESSAGE_ERROR',

    SET_MESSAGE = 'SET_MESSAGE',
    ASYNC_SET_MESSAGE = 'ASYNC_SET_MESSAGE',
    SET_MESSAGE_ERROR = 'SET_MESSAGE_ERROR',

    SET_ALL_MESSAGES = 'SET_ALL_MESSAGES',
    ASYNC_SET_ALL_MESSAGES = 'ASYNC_SET_ALL_MESSAGES',
    SET_ALL_MESSAGES_ERROR = 'SET_ALL_MESSAGES_ERROR',

    // UPDATE_MESSAGE = 'UPDATE_MESSAGE',
    // ASYNC_UPDATE_MESSAGE = 'ASYNC_UPDATE_MESSAGE',
    // UPDATE_MESSAGE_ERROR = 'UPDATE_MESSAGE_ERROR',

    SEARCH_MESSAGES = 'SEARCH_MESSAGES',
    ASYNC_SEARCH_MESSAGE = 'ASYNC_SEARCH_MESSAGE',
    SEARCH_MESSAGE_ERROR = 'SEARCH_MESSAGE_ERROR',

    DELETE_MESSAGE = 'DELETE_MESSAGE',
    ASYNC_DELETE_MESSAGE = 'ASYNC_DELETE_MESSAGE',
    DELETE_MESSAGE_ERROR = 'DELETE_MESSAGE_ERROR',

    DELETE_ALL_MESSAGES_IN_CHAT = 'DELETE_ALL_MESSAGES_IN_CHAT',
    ASYNC_DELETE_ALL_MESSAGES_IN_CHAT = 'ASYNC_DELETE_ALL_MESSAGES_IN_CHAT',
    DELETE_ALL_MESSAGES_IN_CHAT_ERROR = 'DELETE_ALL_MESSAGES_IN_CHAT_ERROR'
}

interface ICreateMessageAction
{
    type: MessageActionTypes.CREATE_MESSAGE;
    payload: IMessage;
}

interface IAsyncCreateMessageAction
{
    type: MessageActionTypes.ASYNC_CREATE_MESSAGE;
    payload: IMessage;
}

interface ICreateMessageErrorAction
{
    type: MessageActionTypes.CREATE_MESSAGE_ERROR;
    payload: string;
}

interface IGetMessageAction
{
    type: MessageActionTypes.SET_MESSAGE;
    payload: IMessage;
}

interface IAsyncGetMessageAction
{
    type: MessageActionTypes.ASYNC_SET_MESSAGE;
    payload: IMessage;
}

interface IGetMessageErrorAction
{
    type: MessageActionTypes.SET_MESSAGE_ERROR;
    payload: string;
}

interface IGetAllMessagesAction
{
    type: MessageActionTypes.SET_ALL_MESSAGES;
    payload: IMessage[];
}

interface IAsyncGetAllMessagesAction
{
    type: MessageActionTypes.ASYNC_SET_ALL_MESSAGES;
    payload: IMessage[];
}

interface IGetAllMessagesErrorAction
{
    type: MessageActionTypes.SET_ALL_MESSAGES_ERROR;
    payload: string;
}

// interface IUpdateMessageAction
// {
//     type: MessageActionTypes.UPDATE_MESSAGE;
//     payload: IMessage;
// }

// interface IAsyncUpdateMessageAction
// {
//     type: MessageActionTypes.ASYNC_UPDATE_MESSAGE;
//     payload: IMessage;
// }

// interface IUpdateMessageErrorAction
// {
//     type: MessageActionTypes.UPDATE_MESSAGE_ERROR;
//     payload: string;
// }

interface IDeleteMessageAction
{
    type: MessageActionTypes.DELETE_MESSAGE;
    payload: string;
}

interface IAsyncDeleteMessageAction
{
    type: MessageActionTypes.ASYNC_DELETE_MESSAGE;
    payload: string;
}

interface IDeleteMessageErrorAction
{
    type: MessageActionTypes.DELETE_MESSAGE_ERROR;
    payload: string;
}

interface IDeleteAllMessagesInChatAction
{
    type: MessageActionTypes.DELETE_ALL_MESSAGES_IN_CHAT;
    payload: IMessage;
}

interface IAsyncDeleteAllMessagesInChatAction
{
    type: MessageActionTypes.ASYNC_DELETE_ALL_MESSAGES_IN_CHAT;
    payload: IMessage;
}

interface IDeleteAllMessagesInChatErrorAction
{
    type: MessageActionTypes.DELETE_ALL_MESSAGES_IN_CHAT_ERROR;
    payload: string;
}


export type MessageAction = ICreateMessageAction
                            | IAsyncCreateMessageAction
                            | ICreateMessageErrorAction
                            | IGetMessageAction 
                            | IAsyncGetMessageAction
                            | IGetMessageErrorAction 
                            | IGetAllMessagesAction
                            | IAsyncGetAllMessagesAction
                            | IGetAllMessagesErrorAction
                            // | IUpdateMessageAction
                            // | IAsyncUpdateMessageAction
                            // | IUpdateMessageErrorAction
                            | IDeleteMessageAction
                            | IAsyncDeleteMessageAction
                            | IDeleteMessageErrorAction
                            | IDeleteAllMessagesInChatAction
                            | IAsyncDeleteAllMessagesInChatAction
                            | IDeleteAllMessagesInChatErrorAction;