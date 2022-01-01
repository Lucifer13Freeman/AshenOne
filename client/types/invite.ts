import { IChat } from "./chat";
import { IComment } from "./comment";
import { IGroup } from "./group";
import { IUser } from "./user";


export enum INVITE_STATUS
{
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    WAIT = 'WAIT'
}

export interface IInvite
{
    id: string;
    user_id: string;
    user: IUser;
    sender_id: string;
    sender: IUser;
    chat_id?: string;
    chat?: IChat;
    group_id?: string;
    group?: IGroup;
    status: string;
    created_at: Date;
    updated_at?: Date;
}

export interface IInviteState 
{ 
    invite: IInvite | null;
    invites: IInvite[];
    //received_invites: IInvite[];
    //sent_invites: IInvite[];
    error?: string;
}

export enum InviteActionTypes
{
    CREATE_INVITE = 'CREATE_INVITE',
    ASYNC_CREATE_INVITE = 'ASYNC_CREATE_INVITE',
    CREATE_INVITE_ERROR = 'CREATE_INVITE_ERROR',

    SET_INVITE = 'SET_INVITE',
    ASYNC_SET_INVITE = 'ASYNC_SET_INVITE',
    SET_INVITE_ERROR = 'SET_INVITE_ERROR',

    SET_ALL_INVITES = 'SET_ALL_INVITES',
    ASYNC_SET_ALL_INVITES = 'ASYNC_SET_ALL_INVITES',
    SET_ALL_INVITES_ERROR = 'SET_ALL_INVITES_ERROR',

    // SET_RECEIVED_INVITES = 'SET_RECEIVED_INVITES',
    // ASYNC_SET_RECEIVED_INVITES = 'ASYNC_SET_RECEIVED_INVITES',
    // SET_RECEIVED_INVITES_ERROR = 'SET_RECEIVED_INVITES_ERROR',

    // SET_SENT_INVITES = 'SET_SENT_INVITES',
    // ASYNC_SET_SENT_INVITES = 'ASYNC_SET_SENT_INVITES',
    // SET_SENT_INVITES_ERROR = 'SET_SENT_INVITES_ERROR',

    DELETE_INVITE = 'DELETE_INVITE',
    ASYNC_DELETE_INVITE = 'ASYNC_DELETE_INVITE',
    DELETE_INVITE_ERROR = 'DELETE_INVITE_ERROR'
}

interface ICreateInviteAction
{
    type: InviteActionTypes.CREATE_INVITE;
    payload: IInvite;
}

interface IAsyncCreateInviteAction
{
    type: InviteActionTypes.ASYNC_CREATE_INVITE;
    payload: IInvite;
}

interface ICreateInviteErrorAction
{
    type: InviteActionTypes.CREATE_INVITE_ERROR;
    payload: string;
}

interface ISetInviteAction
{
    type: InviteActionTypes.SET_INVITE;
    payload: IInvite;
}

interface IAsyncSetInviteAction
{
    type: InviteActionTypes.ASYNC_SET_INVITE;
    payload: IInvite;
}

interface ISetInviteErrorAction
{
    type: InviteActionTypes.SET_INVITE_ERROR;
    payload: string;
}

interface ISetAllInvitesAction
{
    type: InviteActionTypes.SET_ALL_INVITES;
    payload: IInvite[];
}

interface IAsyncSetAllInvitesAction
{
    type: InviteActionTypes.ASYNC_SET_ALL_INVITES;
    payload: IInvite[];
}

interface ISetAllInvitesErrorAction
{
    type: InviteActionTypes.SET_ALL_INVITES_ERROR;
    payload: string;
}

// interface ISetReceivedInvitesAction
// {
//     type: InviteActionTypes.SET_RECEIVED_INVITES;
//     payload: IInvite[];
// }

// interface IAsyncSetReceivedInvitesAction
// {
//     type: InviteActionTypes.ASYNC_SET_RECEIVED_INVITES;
//     payload: IInvite[];
// }

// interface ISetReceivedInvitesErrorAction
// {
//     type: InviteActionTypes.SET_RECEIVED_INVITES_ERROR;
//     payload: string;
// }

// interface ISetSentInvitesAction
// {
//     type: InviteActionTypes.SET_SENT_INVITES;
//     payload: IInvite[];
// }

// interface IAsyncSetSentInvitesAction
// {
//     type: InviteActionTypes.ASYNC_SET_SENT_INVITES;
//     payload: IInvite[];
// }

// interface ISetSentInvitesErrorAction
// {
//     type: InviteActionTypes.SET_SENT_INVITES_ERROR;
//     payload: string;
// }

interface IDeleteInviteAction
{
    type: InviteActionTypes.DELETE_INVITE;
    payload: string;
}

interface IAsyncDeleteInviteAction
{
    type: InviteActionTypes.ASYNC_DELETE_INVITE;
    payload: string;
}

interface IDeleteInviteErrorAction
{
    type: InviteActionTypes.DELETE_INVITE_ERROR;
    payload: string;
}


export type InviteAction = ICreateInviteAction
                        | IAsyncCreateInviteAction
                        | ICreateInviteErrorAction
                        | ISetInviteAction 
                        | IAsyncSetInviteAction
                        | ISetInviteErrorAction 
                        | ISetAllInvitesAction
                        | IAsyncSetAllInvitesAction
                        | ISetAllInvitesErrorAction
                        // | ISetReceivedInvitesAction
                        // | IAsyncSetReceivedInvitesAction
                        // | ISetReceivedInvitesErrorAction
                        // | ISetSentInvitesAction
                        // | IAsyncSetSentInvitesAction
                        // | ISetSentInvitesErrorAction
                        | IDeleteInviteAction
                        | IAsyncDeleteInviteAction
                        | IDeleteInviteErrorAction;