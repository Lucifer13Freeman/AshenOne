import { useLazyQuery, useQuery } from '@apollo/client';
import { Dispatch } from 'react';
import { IUser, UserAction, UserActionTypes } from '../../types/user';


export const get_all_users = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: UserActionTypes.GET_ALL_USERS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: UserActionTypes.GET_ALL_USERS_ERROR, 
            payload: 'Users loading error!'
        });
    }
}

export const async_get_all_users = (payload: IUser[]) => (
{
    type: UserActionTypes.ASYNC_GET_ALL_USERS,
    payload
});

export const get_user = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: UserActionTypes.GET_USER,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: UserActionTypes.GET_USER_ERROR, 
            payload: 'User loading error!'
        });
    }
}

export const async_get_user = (payload: IUser | null) => (
{
    type: UserActionTypes.ASYNC_GET_USER,
    payload
});

