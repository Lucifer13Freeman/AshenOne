import jwtDecode from 'jwt-decode';
import { Dispatch } from 'react';
import { AuthAction, AuthActionTypes, IAuth } from '../../types/auth';
import { IUser, UserAction, UserActionTypes } from '../../types/user';
import Cookies from 'js-cookie';
import { delete_cookie_with_token, get_token_from_cookie } from '../../utils/token';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ROUTES } from '../../utils/constants';
import { remove_auth_token, set_auth_token } from '../../utils/set_auth_token';


export const async_login = (payload: IAuth) => (
{
    type: AuthActionTypes.ASYNC_LOGIN,
    payload
});

export const login = ({ payload }: any) =>
{
    try
    { 
        const { user } = payload;

        const token = get_token_from_cookie();

        // console.log(token)

        let decoded: any;
        if (token) 
        {
            decoded = jwtDecode(token);
            // set_auth_token('Bearer ' + token);
            set_auth_token();
        }

        if (decoded.id === user.id)
        {
            return (
            {
                type: AuthActionTypes.LOGIN,
                payload: { user, is_auth: true }
            });
        }
        else throw Error;
    } 
    catch (err) 
    {
        return (
        { 
            type: AuthActionTypes.LOGIN_ERROR, 
            payload: 'Login error!'
        });
    }
}

export const async_logout = () => (
{
    type: AuthActionTypes.ASYNC_LOGOUT
});

export const logout = () =>
{
    try
    { 
        // const router = useRouter();
        // router.push(ROUTES.LOGIN);

        //delete_cookie_with_token();
        remove_auth_token();
        localStorage.removeItem('persist:root');


        return (
        {
            type: AuthActionTypes.LOGOUT,
            payload: { user: null, is_auth: false }
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: AuthActionTypes.LOGOUT_ERROR, 
            payload: 'Login error!'
        });
    }
}


// export const login = ({ payload }: any) => (dispatch: Dispatch<AuthAction>) =>
// {
//     try
//     { 
//         const { user } = payload;
//         const token = get_token_from_cookie();

//         if (token)
//         { 
//             const decoded: any = jwtDecode(token);

//             //if (decoded.id === user.id) set_current_user(user);

//             //console.log({ user, is_auth: true })
        
//             dispatch (
//             {
//                 type: AuthActionTypes.LOGIN,
//                 payload: { user, is_auth: true }
//             });
//         }
//         else throw Error;
//     } 
//     catch (err) 
//     {
//         return (
//         { 
//             type: AuthActionTypes.LOGIN_ERROR, 
//             payload: 'Login error!'
//         });
//     }
// }


/*export const set_current_user = (user: IUser) => 
{
    try
    {
        //console.log(user)
        return {
            type: AuthActionTypes.SET_CURRENT_USER,
            payload: user
                //     id: payload.id,
                //     email: payload.email,
                //     surname: payload.username
                // }
        }
    }
    catch(err)
    {
        return (
        { 
            type: AuthActionTypes.SET_CURRENT_USER_ERROR, 
            payload: 'Set current user error!'
        });
    }
};*/

// export const register = (payload: IAuth) =>
// {
//     try
//     { 
//         return (
//         {
//             type: AuthActionTypes.REGISTER,
//             payload
//         });
//     } 
//     catch (err) 
//     {
//         return (
//         { 
//             type: AuthActionTypes.REGISTER_ERROR, 
//             payload: 'Login error!'
//         });
//     }
// }
