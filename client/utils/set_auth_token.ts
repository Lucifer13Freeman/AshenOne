import axios from 'axios';
import { delete_cookie_with_token, get_token_from_cookie } from './token';


// export const set_auth_token = (token: string | null | undefined | any) => 
// {
//     if (token) axios.defaults.headers.common['Authorization'] = token;
//     else if (token === null) delete axios.defaults.headers.common['Authorization'];
//     else if (token === undefined) axios.defaults.headers.common['Authorization'] = `Bearer ${get_token_from_cookie}`;
// }

export const set_auth_token = () =>
{
    if (get_token_from_cookie()) axios.defaults.headers.common['Authorization'] = `Bearer ${get_token_from_cookie()}`;
}

export const remove_auth_token = () =>
{
    delete axios.defaults.headers.common['Authorization'];
    delete_cookie_with_token();
}
