import { IComment } from "./comment";
import { IUser } from "./user";


export interface ILikePost
{
    id: string;
    user_id : string;
    post_id: string;
}

export interface IPost
{
    id: string;
    post_id: string;
    group_id?: string;
    user: IUser;
    text?: string;
    image?: string;
    audio?: string;
    video?: string;
    views?: number;
    likes: ILikePost[];
    comments: IComment[];
    created_at: Date;
    updated_at?: Date;
}

export interface IPostState 
{ 
    post: IPost | null;
    posts: IPost[];
    error?: string;
}

export enum PostActionTypes
{
    CREATE_POST = 'CREATE_POST',
    ASYNC_CREATE_POST = 'ASYNC_CREATE_POST',
    CREATE_POST_ERROR = 'CREATE_POST_ERROR',

    SET_POST = 'SET_POST',
    ASYNC_SET_POST = 'ASYNC_SET_POST',
    SET_POST_ERROR = 'SET_POST_ERROR',

    SET_ALL_POSTS = 'SET_ALL_POSTS',
    ASYNC_SET_ALL_POSTS = 'ASYNC_SET_ALL_POSTS',
    SET_ALL_POSTS_ERROR = 'SET_ALL_POSTS_ERROR',

    // UPDATE_POST = 'UPDATE_POST',
    // ASYNC_UPDATE_POST = 'ASYNC_UPDATE_POST',
    // UPDATE_POST_ERROR = 'UPDATE_POST_ERROR',

    LIKE_POST = 'LIKE_POST',
    ASYNC_LIKE_POST = 'ASYNC_LIKE_POST',
    LIKE_POST_ERROR = 'LIKE_POST_ERROR',

    // LIKE_COMMENT_IN_POST = 'LIKE_COMMENT_IN_POST',
    // ASYNC_LIKE_COMMENTS_IN_POST = 'ASYNC_LIKE_COMMENT_IN_POST',
    // LIKE_COMMENT_IN_POST_ERROR = 'LIKE_COMMENT_IN_POST_ERROR',

    // UPDATE_COMMENT_IN_POST = 'UPDATE_COMMENT_IN_POST',
    // ASYNC_UPDATE_COMMENT_IN_POST = 'ASYNC_UPDATE_COMMENT_IN_POST',
    // UPDATE_COMMENT_IN_POST_ERROR = 'UPDATE_COMMENT_IN_POST_ERROR',

    SEARCH_POSTS = 'SEARCH_POSTS',
    ASYNC_SEARCH_POST = 'ASYNC_SEARCH_POST',
    SEARCH_POST_ERROR = 'SEARCH_POST_ERROR',

    DELETE_POST = 'DELETE_POST',
    ASYNC_DELETE_POST = 'ASYNC_DELETE_POST',
    DELETE_POST_ERROR = 'DELETE_POST_ERROR',

    DELETE_ALL_COMMENTS_IN_POST = 'DELETE_ALL_COMMENTS_IN_POST',
    ASYNC_DELETE_ALL_COMMENTS_IN_POST = 'ASYNC_DELETE_ALL_COMMENTS_IN_POST',
    DELETE_ALL_COMMENTS_IN_POST_ERROR = 'DELETE_ALL_COMMENTS_IN_POST_ERROR'
}

interface ICreatePostAction
{
    type: PostActionTypes.CREATE_POST;
    payload: IPost;
}

interface IAsyncCreatePostAction
{
    type: PostActionTypes.ASYNC_CREATE_POST;
    payload: IPost;
}

interface ICreatePostErrorAction
{
    type: PostActionTypes.CREATE_POST_ERROR;
    payload: string;
}

interface ISetPostAction
{
    type: PostActionTypes.SET_POST;
    payload: IPost;
}

interface IAsyncSetPostAction
{
    type: PostActionTypes.ASYNC_SET_POST;
    payload: IPost;
}

interface ISetPostErrorAction
{
    type: PostActionTypes.SET_POST_ERROR;
    payload: string;
}

interface ISetAllPostsAction
{
    type: PostActionTypes.SET_ALL_POSTS;
    payload: IPost[];
}

interface IAsyncSetAllPostsAction
{
    type: PostActionTypes.ASYNC_SET_ALL_POSTS;
    payload: IPost[];
}

interface ISetAllPostsErrorAction
{
    type: PostActionTypes.SET_ALL_POSTS_ERROR;
    payload: string;
}

// interface IUpdatePostAction
// {
//     type: PostActionTypes.UPDATE_POST;
//     payload: IPost;
// }

// interface IAsyncUpdatePostAction
// {
//     type: PostActionTypes.ASYNC_UPDATE_POST;
//     payload: IPost;
// }

// interface IUpdatePostErrorAction
// {
//     type: PostActionTypes.UPDATE_POST_ERROR;
//     payload: string;
// }

// interface IUpdateCommentsInPostAction
// {
//     type: PostActionTypes.UPDATE_COMMENT_IN_POST;
//     payload: IPost;
// }

// interface IAsyncUpdateCommentsInPostAction
// {
//     type: PostActionTypes.ASYNC_UPDATE_COMMENT_IN_POST;
//     payload: IPost;
// }

// interface IUpdateCommentsInPostErrorAction
// {
//     type: PostActionTypes.UPDATE_COMMENT_IN_POST_ERROR;
//     payload: string;
// }

// interface ILikeCommentInPostAction
// {
//     type: PostActionTypes.LIKE_COMMENT_IN_POST;
//     payload: ILikePost;
// }

// interface IAsyncLikeCommentInPostAction
// {
//     type: PostActionTypes.ASYNC_LIKE_COMMENTS_IN_POST;
//     payload: ILikePost;
// }

// interface ILikeCommentInPostErrorAction
// {
//     type: PostActionTypes.LIKE_COMMENT_IN_POST_ERROR;
//     payload: string;
// }

interface ILikePostAction
{
    type: PostActionTypes.LIKE_POST;
    payload: ILikePost;
}

interface IAsyncLikePostAction
{
    type: PostActionTypes.ASYNC_LIKE_POST;
    payload: ILikePost;
}

interface ILikePostErrorAction
{
    type: PostActionTypes.LIKE_POST_ERROR;
    payload: string;
}

interface IDeletePostAction
{
    type: PostActionTypes.DELETE_POST;
    payload: string;
}

interface IAsyncDeletePostAction
{
    type: PostActionTypes.ASYNC_DELETE_POST;
    payload: string;
}

interface IDeletePostErrorAction
{
    type: PostActionTypes.DELETE_POST_ERROR;
    payload: string;
}

interface IDeleteAllCommentsInPostAction
{
    type: PostActionTypes.DELETE_ALL_COMMENTS_IN_POST;
    payload: IPost;
}

interface IAsyncDeleteAllCommentsInChatAction
{
    type: PostActionTypes.ASYNC_DELETE_ALL_COMMENTS_IN_POST;
    payload: IPost;
}

interface IDeleteAllCommentssInPostErrorAction
{
    type: PostActionTypes.DELETE_ALL_COMMENTS_IN_POST_ERROR;
    payload: string;
}


export type PostAction = ICreatePostAction
                        | IAsyncCreatePostAction
                        | ICreatePostErrorAction
                        | ISetPostAction 
                        | IAsyncSetPostAction
                        | ISetPostErrorAction 
                        | ISetAllPostsAction
                        | IAsyncSetAllPostsAction
                        | ISetAllPostsAction
                        | ISetAllPostsErrorAction
                        // | IUpdatePostAction
                        // | IAsyncUpdatePostAction
                        // | IUpdatePostErrorAction
                        | ILikePostAction
                        | IAsyncLikePostAction
                        | ILikePostErrorAction
                        | IDeletePostAction
                        | IAsyncDeletePostAction
                        | IDeletePostErrorAction
                        | IDeleteAllCommentsInPostAction
                        | IAsyncDeleteAllCommentsInChatAction
                        | IDeleteAllCommentssInPostErrorAction;
                        // | IUpdateCommentsInPostAction
                        // | IAsyncUpdateCommentsInPostAction
                        // | IUpdateCommentsInPostErrorAction
                        // | ILikeCommentInPostAction
                        // | IAsyncLikeCommentInPostAction
                        // | ILikeCommentInPostErrorAction;