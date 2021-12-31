import { IMessage } from "./message";


export interface IReaction
{
    id: string;
    user_id: string;
    message_id: string;
    content: '❤️' | '😆' | '😯' | '😢' | '😡' | '👍' | '👎',
    created_at?: Date;
    updated_at?: Date;
}

export enum ReactionActionTypes
{
    CREATE_REACTION = 'CREATE_REACTION',
    ASYNC_CREATE_REACTION = 'ASYNC_CREATE_REACTION',
    CREATE_REACTION_ERROR = 'CREATE_REACTION_ERROR',

    SET_REACTION = 'SET_REACTION',
    ASYNC_SET_REACTION = 'ASYNC_SET_REACTION',
    SET_REACTION_ERROR = 'SET_REACTION_ERROR',

    DELETE_REACTION = 'DELETE_REACTION',
    ASYNC_DELETE_REACTION = 'ASYNC_DELETE_REACTION',
    DELETE_REACTION_ERROR = 'DELETE_REACTION_ERROR'
}

interface ICreateReactionAction
{
    type: ReactionActionTypes.CREATE_REACTION;
    payload: IMessage;
}

interface IAsyncCreateReactionAction
{
    type: ReactionActionTypes.ASYNC_CREATE_REACTION;
    payload: IMessage;
}

interface ICreateReactionErrorAction
{
    type: ReactionActionTypes.CREATE_REACTION_ERROR,
    payload: string;
}

interface SetReactionAction
{
    type: ReactionActionTypes.SET_REACTION;
    payload: IReaction
}

interface IAsyncSetReactionAction
{
    type: ReactionActionTypes.ASYNC_SET_REACTION;
    payload: IReaction
}

interface ISetReactionErrorAction
{
    type: ReactionActionTypes.SET_REACTION_ERROR;
    payload: string
}

interface IDeleteReactionAction
{
    type: ReactionActionTypes.DELETE_REACTION;
    payload: IReaction
}

interface IAsyncDeleteReactionAction
{
    type: ReactionActionTypes.ASYNC_DELETE_REACTION;
    payload: IReaction
}

interface IDeleteReactionErrorAction
{
    type: ReactionActionTypes.DELETE_REACTION_ERROR;
    payload: string
}


export type ReactionAction = ICreateReactionAction 
                            | IAsyncCreateReactionAction
                            | ICreateReactionErrorAction 
                            | SetReactionAction
                            | IAsyncSetReactionAction
                            | ISetReactionErrorAction
                            | IDeleteReactionAction
                            | IAsyncDeleteReactionAction
                            | IDeleteReactionErrorAction;