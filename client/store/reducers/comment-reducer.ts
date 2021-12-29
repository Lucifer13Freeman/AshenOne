import { ICommentState, 
        CommentAction, 
        CommentActionTypes, 
        IComment, 
        ILikeComment } from "../../types/comment"


const initial_state: ICommentState = {

    comment: null,
    comments: [],
    error: undefined
}

export const comment_reducer = (state = initial_state, action: CommentAction): ICommentState =>
{
    switch (action.type) 
    {
        case CommentActionTypes.CREATE_COMMENT:
        {
            return {
                ...state, 
                comment: action.payload,
                comments: [action.payload, ...state.comments],
                error: undefined
            }
        }
        case CommentActionTypes.CREATE_COMMENT_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case CommentActionTypes.SET_COMMENT:
        {
            const update_comments = state.comments.map((comment: IComment) => 
            { 
                if (comment.id === action.payload.id) comment = action.payload
                return comment 
            });

            return {
                ...state, 
                comment: action.payload,
                comments: update_comments,
                error: undefined
            }
        }
        case CommentActionTypes.SET_COMMENT_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case CommentActionTypes.SET_ALL_COMMENTS:
        {
            return {
                ...state, 
                comments: action.payload,
                error: undefined
            }
        }
        case CommentActionTypes.SET_ALL_COMMENTS_ERROR:
        {
            return {
                ...state, 
                error: action.payload
            }
        }
        case CommentActionTypes.LIKE_COMMENT:
        {
            const new_like = action.payload;

            let update_comments = [...state.comments];
            let comment_index = update_comments.findIndex((comment: IComment) => comment.id === new_like.comment_id);
            
            let likes = [...update_comments[comment_index].likes];

            const is_exists = likes?.find((like: ILikeComment) => like.id === new_like.id);

            if (is_exists) likes = likes.filter((like: ILikeComment) => like.id !== new_like.id);
            else likes = [...likes, new_like]

            update_comments[comment_index] = { ...update_comments[comment_index], likes }

            return {
                ...state, 
                comment: update_comments[comment_index],
                comments: update_comments,
                error: undefined
            }
        }
        case CommentActionTypes.LIKE_COMMENT_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case CommentActionTypes.DELETE_COMMENT:
        {
            const updated_comments = state.comments.filter((comment: IComment) => comment.id !== action.payload);

            return {
                ...state, 
                comment: null,
                comments: updated_comments,
                error: undefined
            }
        }
        case CommentActionTypes.DELETE_COMMENT_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
}