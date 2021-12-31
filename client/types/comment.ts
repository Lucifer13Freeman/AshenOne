import { IUser } from "./user";


export interface ILikeComment
{
    id: string;
    user_id : string;
    comment_id: string;
}

export interface IComment
{
    id: string;
    post_id: string;
    user: IUser;
    text?: string;
    image?: string;
    audio?: string;
    video?: string;
    likes: ILikeComment[];
    created_at: Date;
    updated_at?: Date;
}

export interface ICommentState 
{ 
    comment: IComment | null;
    comments: IComment[];
    error?: string;
}

export enum CommentActionTypes
{
    CREATE_COMMENT = 'CREATE_COMMENT',
    ASYNC_CREATE_COMMENT = 'ASYNC_CREATE_COMMENT',
    CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR',

    SET_COMMENT = 'SET_COMMENT',
    ASYNC_SET_COMMENT = 'ASYNC_SET_COMMENT',
    SET_COMMENT_ERROR = 'SET_COMMENT_ERROR',

    SET_ALL_COMMENTS = 'SET_ALL_COMMENTS',
    ASYNC_SET_ALL_COMMENTS = 'ASYNC_SET_ALL_COMMENTS',
    SET_ALL_COMMENTS_ERROR = 'SET_ALL_COMMENTS_ERROR',

    // UPDATE_COMMENT = 'UPDATE_COMMENT',
    // ASYNC_UPDATE_COMMENT = 'ASYNC_UPDATE_COMMENT',
    // UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR',

    LIKE_COMMENT = 'LIKE_COMMENT',
    ASYNC_LIKE_COMMENT = 'ASYNC_LIKE_COMMENT',
    LIKE_COMMENT_ERROR = 'LIKE_COMMENT_ERROR',

    SEARCH_COMMENTS = 'SEARCH_COMMENTS',
    ASYNC_SEARCH_COMMENT = 'ASYNC_SEARCH_COMMENT',
    SEARCH_COMMENT_ERROR = 'SEARCH_COMMENT_ERROR',

    DELETE_COMMENT = 'DELETE_COMMENT',
    ASYNC_DELETE_COMMENT = 'ASYNC_DELETE_COMMENT',
    DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR',
}

interface ICreateCommentAction
{
    type: CommentActionTypes.CREATE_COMMENT;
    payload: IComment;
}

interface IAsyncCreateCommentAction
{
    type: CommentActionTypes.ASYNC_CREATE_COMMENT;
    payload: IComment;
}

interface ICreateCommentErrorAction
{
    type: CommentActionTypes.CREATE_COMMENT_ERROR;
    payload: string;
}

interface IGetCommentAction
{
    type: CommentActionTypes.SET_COMMENT;
    payload: IComment;
}

interface IAsyncGetCommentAction
{
    type: CommentActionTypes.ASYNC_SET_COMMENT;
    payload: IComment;
}

interface IGetCommentErrorAction
{
    type: CommentActionTypes.SET_COMMENT_ERROR;
    payload: string;
}

interface IGetAllCommentsAction
{
    type: CommentActionTypes.SET_ALL_COMMENTS;
    payload: IComment[];
}

interface IAsyncGetAllCommentsAction
{
    type: CommentActionTypes.ASYNC_SET_ALL_COMMENTS;
    payload: IComment[];
}

interface IGetAllCommentsErrorAction
{
    type: CommentActionTypes.SET_ALL_COMMENTS_ERROR;
    payload: string;
}

// interface IUpdateCommentAction
// {
//     type: CommentActionTypes.UPDATE_COMMENT;
//     payload: IComment;
// }

// interface IAsyncUpdateCommentAction
// {
//     type: CommentActionTypes.ASYNC_UPDATE_COMMENT;
//     payload: IComment;
// }

// interface IUpdateCommentErrorAction
// {
//     type: CommentActionTypes.UPDATE_COMMENT_ERROR;
//     payload: string;
// }

interface ILikeCommentAction
{
    type: CommentActionTypes.LIKE_COMMENT;
    payload: ILikeComment;
}

interface IAsyncLikeCommentAction
{
    type: CommentActionTypes.ASYNC_LIKE_COMMENT;
    payload: ILikeComment;
}

interface ILikeCommentErrorAction
{
    type: CommentActionTypes.LIKE_COMMENT_ERROR;
    payload: string;
}

interface IDeleteCommentAction
{
    type: CommentActionTypes.DELETE_COMMENT;
    payload: string;
}

interface IAsyncDeleteCommentAction
{
    type: CommentActionTypes.ASYNC_DELETE_COMMENT;
    payload: string;
}

interface IDeleteCommentErrorAction
{
    type: CommentActionTypes.DELETE_COMMENT_ERROR;
    payload: string;
}


export type CommentAction = ICreateCommentAction
                            | IAsyncCreateCommentAction
                            | ICreateCommentErrorAction
                            | IGetCommentAction 
                            | IAsyncGetCommentAction
                            | IGetCommentErrorAction 
                            | IGetAllCommentsAction
                            | IAsyncGetAllCommentsAction
                            | IGetAllCommentsErrorAction
                            // | IUpdateCommentAction
                            // | IAsyncUpdateCommentAction
                            // | IUpdateCommentErrorAction
                            | ILikeCommentAction
                            | IAsyncLikeCommentAction
                            | ILikeCommentErrorAction
                            | IDeleteCommentAction
                            | IAsyncDeleteCommentAction
                            | IDeleteCommentErrorAction;