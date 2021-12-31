import Cookies from "js-cookie";


export enum TOKEN
{
    COOKIE = 'token',
    LOCAL_STORAGE = 'token',
    ERROR_MESSAGE = 'Unauthorized'
}

export const put_token_in_cookie = (token: string) => Cookies.set(TOKEN.COOKIE, token);

export const get_token_from_cookie = () => Cookies.get(TOKEN.COOKIE);

export const delete_cookie_with_token = () => Cookies.remove(TOKEN.COOKIE);

export const put_token_in_local_storage = (token: string) => localStorage.setItem(TOKEN.COOKIE, token);

export const get_token_from_local_storage = () => localStorage.getItem(TOKEN.LOCAL_STORAGE);

export const delete_token_in_local_storage = () => localStorage.removeItem(TOKEN.LOCAL_STORAGE);
