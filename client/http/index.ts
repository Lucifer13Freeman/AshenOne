import axios from 'axios';
import { LINKS } from '../utils/constants';
import { get_token_from_cookie } from '../utils/token';


const $host = axios.create(
{
    baseURL: LINKS.HTTP_BASE
});
    
const $auth_host = axios.create(
{
    baseURL: LINKS.HTTP_BASE
});

const auth_interceptor = (config:any) => {

    config.headers.authorization = `Bearer ${get_token_from_cookie()}`
    return config;
};

$auth_host.interceptors.request.use(auth_interceptor);

export {
    $host,
    $auth_host
}