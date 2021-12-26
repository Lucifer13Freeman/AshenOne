import { $auth_host, $host } from './index';
import jwt_decode from 'jwt-decode';
import { delete_cookie_with_token, put_token_in_cookie, put_token_in_local_storage } from '../utils/token';

export const registration = async (email:any, password:any) =>
{
    const { data } = await $host.post('api/user/registration', { email, password });
    put_token_in_cookie(data.token);
    return jwt_decode(data.token);
}

export const login = async (email:any, password:any) =>
{
    const { data } = await $host.post('api/user/login', { email, password });
    put_token_in_cookie(data.token);
    return jwt_decode(data.token);
}

export const logout = async () =>
{
    delete_cookie_with_token();
}

export const check_auth = async () =>
{
    const { data } = await $auth_host.get('api/user/auth');
    put_token_in_cookie(data.token);
    return jwt_decode(data.token);
}