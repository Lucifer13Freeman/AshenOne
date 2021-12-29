
export enum PROVIDERS
{
    DATABASE_CONNECTION = 'DATABASE_CONNECTION',
    PUB_SUB = 'PUB_SUB',

    USER_REPOSITORY = 'USER_REPOSITORY',
    CHAT_REPOSITORY = 'CHAT_REPOSITORY',
    MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY',
    REACTION_REPOSITORY = 'REACTION_REPOSITORY',
    POST_REPOSITORY = 'POST_REPOSITORY',
    COMMENT_REPOSITORY = 'COMMENT_REPOSITORY'
}

export enum EVENTS
{
    NEW_MESSAGE_EVENT = 'NEW_MESSAGE_EVENT',
    DELETE_MESSAGE_EVENT = 'DELETE_MESSAGE_EVENT',
    NEW_REACTION_EVENT = 'NEW_REACTION_EVENT',
    NEW_POST_EVENT = 'NEW_POST_EVENT',
    NEW_LIKE_POST_EVENT = 'NEW_LIKE_POST_EVENT',
    NEW_COMMENT_EVENT = 'NEW_COMMENT_EVENT',
    NEW_LIKE_COMMENT_EVENT = 'NEW_LIKE_COMMENT_EVENT',
    NEW_INVITE_EVENT = 'NEW_INVITE_EVENT'
}

export enum CONFIG
{
    APP_CONFIG = 'app',
    APP_NAME = 'app.name',
    APP_PORT = 'app.port',

    JWT_CONFIG = 'jwt',
    JWT_SECRET = 'jwt.secret',
    JWT_EXPIRES_IN = 'jwt.expires_in',

    DB_CONFIG = 'database',
    
    DB_MONGO_TYPE = 'database.mongo.type',
    DB_MONGO_URI = 'database.mongo.uri',

    DB_PORT = 'database.port'
}

export class REGEXP
{
    static EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    static FILE_PATH = /http(s?):\/\/[-\w\.]{3,}\.[A-Za-z]{2,3}/;
}

export enum FILE_TYPE
{
    AUDIO = 'audio',
    IMAGE = 'image'
}

export enum ROLES
{
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export enum INVITE_STATUS
{
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    WAIT = 'WAIT'
}

export enum DEFAULT_IMAGES
{
    NO_AVATAR = 'image/no_avatar.png',
    NO_GROUP_AVATAR = 'image/no_group_avatar.png'
}