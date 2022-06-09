import { ILikePost, IPost, PostActionTypes } from '../types/post';


export const set_all_posts = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: PostActionTypes.SET_ALL_POSTS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: PostActionTypes.SET_ALL_POSTS_ERROR, 
            payload: 'Posts loading error!'
        });
    }
}

export const async_set_all_posts = (payload: IPost[]) => (
{
    type: PostActionTypes.ASYNC_SET_ALL_POSTS,
    payload
});

export const set_post = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: PostActionTypes.SET_POST,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: PostActionTypes.SET_POST_ERROR, 
            payload: 'Post loading error!'
        });
    }
}

export const async_set_post = (payload: IPost | null) => (
{
    type: PostActionTypes.ASYNC_SET_POST,
    payload
});

export const create_post = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: PostActionTypes.CREATE_POST,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: PostActionTypes.CREATE_POST_ERROR, 
            payload: 'Post loading error!'
        });
    }
}

export const async_create_post = (payload: IPost | null) => (
{
    type: PostActionTypes.ASYNC_CREATE_POST,
    payload
});

// export const update_post = ({ payload }: any) =>
// {
//     try
//     { 
//         return (
//         {
//             type: PostActionTypes.UPDATE_POST,
//             payload
//         });
//     } 
//     catch (err) 
//     {
//         return (
//         { 
//             type: PostActionTypes.UPDATE_POST_ERROR, 
//             payload: 'Post loading error!'
//         });
//     }
// }

// export const async_update_post = (payload: IPost | null) => (
// {
//     type: PostActionTypes.ASYNC_UPDATE_POST,
//     payload
// });

export const like_post = ({ payload }: any) =>
{
    try
    {
        return (
        {
            type: PostActionTypes.LIKE_POST,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: PostActionTypes.LIKE_POST_ERROR, 
            payload: 'Post loading error!'
        });
    }
}

export const async_like_post = (payload: ILikePost | null) =>
({
    type: PostActionTypes.ASYNC_LIKE_POST,
    payload
});

export const delete_post = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: PostActionTypes.DELETE_POST,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: PostActionTypes.DELETE_POST_ERROR, 
            payload: 'Post loading error!'
        });
    }
}

export const async_delete_post = (payload: IPost | null) => (
{
    type: PostActionTypes.ASYNC_DELETE_POST,
    payload
});