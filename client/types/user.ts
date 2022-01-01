
export interface IUser
{
    id: string;
    username: string;
    email?: string;
    avatar: string;
    role: string;
    is_banned: boolean;
    created_at?: Date;
    updated_at?: Date;
    //is_followed?: Boolean | null;
}

export interface IUserState 
{ 
    user: IUser | null;
    users: IUser[];
    error?: string;
}

export enum UserActionTypes
{
    SET_USER = 'SET_USER',
    ASYNC_SET_USER = 'ASYNC_SET_USER',
    SET_USER_ERROR = 'SET_USER_ERROR',

    SET_ALL_USERS = 'SET_ALL_USERS',
    ASYNC_SET_ALL_USERS = 'ASYNC_SET_ALL_USERS',
    SET_ALL_USERS_ERROR = 'SET_ALL_USERS_ERROR',

    DELETE_USER = 'DELETE_USER',
    ASYNC_DELETE_USER = 'ASYNC_DELETE_USER',
    DELETE_USER_ERROR = 'DELETE_USER_ERROR'
}

interface ISetUserAction
{
    type: UserActionTypes.SET_USER;
    payload: IUser
}

interface IAsyncSetUserAction
{
    type: UserActionTypes.ASYNC_SET_USER;
    payload: IUser
}

interface ISetUserErrorAction
{
    type: UserActionTypes.SET_USER_ERROR;
    payload: string
}

interface ISetAllUsersAction
{
    type: UserActionTypes.SET_ALL_USERS;
    payload: IUser[]
}

interface IAsyncSetAllUsersAction
{
    type: UserActionTypes.ASYNC_SET_ALL_USERS;
    payload: IUser[];
}

interface ISetAllUsersErrorAction
{
    type: UserActionTypes.SET_ALL_USERS_ERROR;
    payload: string
}

interface IDeleteUserAction
{
    type: UserActionTypes.DELETE_USER;
    payload: string
}

interface IAsyncDeleteUserAction
{
    type: UserActionTypes.ASYNC_DELETE_USER;
    payload: string
}

interface IDeleteUserErrorAction
{
    type: UserActionTypes.DELETE_USER_ERROR;
    payload: string
}


export type UserAction = ISetUserAction 
                        | IAsyncSetUserAction
                        | ISetUserErrorAction 
                        | ISetAllUsersAction
                        | IAsyncSetAllUsersAction
                        | ISetAllUsersErrorAction
                        | IDeleteUserAction
                        | IAsyncDeleteUserAction
                        | IDeleteUserErrorAction;