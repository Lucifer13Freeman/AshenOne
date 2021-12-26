
export enum URL
{
    HTTP_BASE = 'http://localhost:5000',
    HTTP_LINK = 'http://localhost:5000/graphql',
    WS_LINK = 'ws://localhost:5000/graphql',
    DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    STATIC_FILES_LINK = 'http://localhost:5000/static/',
    DB_ADMIN_LINK = 'http://localhost:5555'
}

export interface NavMenu
{
    text: NAV_MENU,
    href: ROUTES,
    icon: any
}

export enum NAV_MENU
{
    LOGIN = 'Login',
    REGISTER = 'Register',
    LOGOUT = 'Logout',
    HOME = 'Home',
    ADMIN = 'Admin panel',
    CHATS = 'Chats',
    PEOPLE = 'People',
    GROUPS = 'Groups',
    FEED = 'Feed'
}

export enum ROUTES
{
    LOGIN = '/login/',
    REGISTER = '/register/',
    LOGOUT = '/',
    HOME = '/',
    ADMIN = '/admin/',
    CHATS = '/chats/',
    PEOPLE = '/people/',
    GROUPS = '/groups/',
    FEED = '/feed/'
}

export enum ROLES
{
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export const REACTIONS = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];
