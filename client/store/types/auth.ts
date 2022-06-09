import { IUser } from "./user";


export interface IAuth
{
    is_auth: boolean;
    user: IUser | null;
}

export interface IAuthState 
{
    auth: IAuth;
    error?: string;
}

export enum AuthActionTypes
{
    LOGIN = 'LOGIN',
    ASYNC_LOGIN = 'ASYNC_LOGIN',
    LOGIN_ERROR = 'LOGIN_ERROR',
    
    LOGOUT = 'LOGOUT',
    ASYNC_LOGOUT = 'ASYNC_LOGOUT',
    LOGOUT_ERROR = 'LOGOUT_ERROR'
    // SET_CURRENT_USER = 'SET_CURRENT_USER',
    // SET_CURRENT_USER_ERROR = 'SET_CURRENT_USER_ERROR',
    // SET_CURRENT_USER = 'SET_CURRENT_USER',
    // SET_CURRENT_USER_ERROR = 'SET_CURRENT_USER_ERROR',
    // REGISTER = 'REGISTER',
    // ASYNC_REGISTER = 'ASYNC_REGISTER',
    // REGISTER_ERROR = 'REGISTER_ERROR'
}

interface ILoginAction
{
    type: AuthActionTypes.LOGIN;
    payload: IAuth;
}

interface IAsyncLoginAction
{
    type: AuthActionTypes.ASYNC_LOGIN;
    payload: IAuth
}

interface ILoginErrorAction
{
    type: AuthActionTypes.LOGIN_ERROR;
    payload: string;
}

interface ILogoutAction
{
    type: AuthActionTypes.LOGOUT;
    payload: IAuth;
}

interface IAsyncLogoutAction
{
    type: AuthActionTypes.ASYNC_LOGOUT;
}

interface ILogoutErrorAction
{
    type: AuthActionTypes.LOGOUT_ERROR;
    payload: string;
}

/*interface IGetCurrentUserAction
{
    type: AuthActionTypes.SET_CURRENT_USER;
    payload: IUser;
}

interface IGetCurrentUserErrorAction
{
    type: AuthActionTypes.SET_CURRENT_USER_ERROR;
    payload: string;
}

interface ISetCurrentUserAction
{
    type: AuthActionTypes.SET_CURRENT_USER;
    payload: IUser;
}

interface ISetCurrentUserErrorAction
{
    type: AuthActionTypes.SET_CURRENT_USER_ERROR;
    payload: string;
}

interface IRegisterAction
{
    type: AuthActionTypes.REGISTER;
    payload: IAuth;
}

interface IAsyncRegisterAction
{
    type: AuthActionTypes.ASYNC_REGISTER;
}

interface IRegisterErrorAction
{
    type: AuthActionTypes.REGISTER_ERROR;
    payload: string;
}*/


export type AuthAction = /*IGetCurrentUserAction
                        | IGetCurrentUserErrorAction
                        | ISetCurrentUserAction
                        | ISetCurrentUserErrorAction*/
                        | ILoginAction
                        | IAsyncLoginAction
                        | ILoginErrorAction
                        | ILogoutAction
                        | IAsyncLogoutAction
                        | ILogoutErrorAction
                        /*| IRegisterAction
                        | IAsyncRegisterAction
                        | IRegisterErrorAction*/;