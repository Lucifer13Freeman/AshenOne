import { IComment, CommentActionTypes, ILikeComment } from '../../types/comment';


export const set_all_comments = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: CommentActionTypes.SET_ALL_COMMENTS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: CommentActionTypes.SET_ALL_COMMENTS_ERROR, 
            payload: 'Comments loading error!'
        });
    }
}

export const async_set_all_comments = (payload: IComment[]) => (
{
    type: CommentActionTypes.ASYNC_SET_ALL_COMMENTS,
    payload
});

export const set_comment = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: CommentActionTypes.SET_COMMENT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: CommentActionTypes.SET_COMMENT_ERROR, 
            payload: 'Comment loading error!'
        });
    }
}

export const async_set_comment = (payload: IComment | null) => (
{
    type: CommentActionTypes.ASYNC_SET_COMMENT,
    payload
});

export const create_comment = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: CommentActionTypes.CREATE_COMMENT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: CommentActionTypes.CREATE_COMMENT_ERROR, 
            payload: 'Comment loading error!'
        });
    }
}

export const async_create_comment = (payload: IComment | null) => (
{
    type: CommentActionTypes.ASYNC_CREATE_COMMENT,
    payload
});

// export const update_comment = ({ payload }: any) =>
// {
//     try
//     { 
//         return (
//         {
//             type: CommentActionTypes.UPDATE_COMMENT,
//             payload
//         });
//     } 
//     catch (err) 
//     {
//         return (
//         { 
//             type: CommentActionTypes.UPDATE_COMMENT_ERROR, 
//             payload: 'Comment loading error!'
//         });
//     }
// }

// export const async_update_comment = (payload: IComment | null) => (
// {
//     type: CommentActionTypes.ASYNC_UPDATE_COMMENT,
//     payload
// });

export const like_comment = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: CommentActionTypes.LIKE_COMMENT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: CommentActionTypes.LIKE_COMMENT_ERROR, 
            payload: 'Comment loading error!'
        });
    }
}

export const async_like_comment = (payload: ILikeComment | null) => (
{
    type: CommentActionTypes.ASYNC_LIKE_COMMENT,
    payload
});

export const delete_comment = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: CommentActionTypes.DELETE_COMMENT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: CommentActionTypes.DELETE_COMMENT_ERROR, 
            payload: 'Comment loading error!'
        });
    }
}

export const async_delete_comment = (payload: IComment | null) => (
{
    type: CommentActionTypes.ASYNC_DELETE_COMMENT,
    payload
});