import { useLazyQuery, useQuery } from '@apollo/client';
import { Dispatch } from 'react';
import { IUser, UserAction, UserActionTypes } from '../types/user';


export const set_all_users = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: UserActionTypes.SET_ALL_USERS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: UserActionTypes.SET_ALL_USERS_ERROR, 
            payload: 'Users loading error!'
        });
    }
}

export const async_set_all_users = (payload: IUser[]) => (
{
    type: UserActionTypes.ASYNC_SET_ALL_USERS,
    payload
});

export const set_user = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: UserActionTypes.SET_USER,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: UserActionTypes.SET_USER_ERROR, 
            payload: 'User loading error!'
        });
    }
}

export const async_set_user = (payload: IUser | null) => (
{
    type: UserActionTypes.ASYNC_SET_USER,
    payload
});

