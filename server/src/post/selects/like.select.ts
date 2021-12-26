
export interface ISelectPostLike { 
    id: boolean,
    user_id: boolean,
    user: boolean,
    post_id: boolean,
    post: boolean,
    created_at: boolean,
    updated_at: boolean
}

export const select_post_like: ISelectPostLike = {
    id: true,
    user_id: true,
    user: false,
    post_id: true,
    post: false,
    created_at: true,
    updated_at: true
}

export interface ISelectCommentLike { 
    id: boolean,
    user_id: boolean,
    user: boolean,
    comment_id: boolean,
    comment: boolean,
    created_at: boolean,
    updated_at: boolean
}

export const select_comment_like: ISelectCommentLike = {
    id: true,
    user_id: true,
    user: false,
    comment_id: true,
    comment: false,
    created_at: true,
    updated_at: true
}