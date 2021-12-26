import { IComment, CommentActionTypes, ILikeComment } from '../../types/comment';


export const get_all_comments = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: CommentActionTypes.GET_ALL_COMMENTS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: CommentActionTypes.GET_ALL_COMMENTS_ERROR, 
            payload: 'Comments loading error!'
        });
    }
}

export const async_get_all_comments = (payload: IComment[]) => (
{
    type: CommentActionTypes.ASYNC_GET_ALL_COMMENTS,
    payload
});

export const get_comment = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: CommentActionTypes.GET_COMMENT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: CommentActionTypes.GET_COMMENT_ERROR, 
            payload: 'Comment loading error!'
        });
    }
}

export const async_get_comment = (payload: IComment | null) => (
{
    type: CommentActionTypes.ASYNC_GET_COMMENT,
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

export const update_comment = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: CommentActionTypes.UPDATE_COMMENT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: CommentActionTypes.UPDATE_COMMENT_ERROR, 
            payload: 'Comment loading error!'
        });
    }
}

export const async_update_comment = (payload: IComment | null) => (
{
    type: CommentActionTypes.ASYNC_UPDATE_COMMENT,
    payload
});

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