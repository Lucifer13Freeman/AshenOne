import { ISelectUser, select_user } from "src/user/selects/user.select";
import { ISelectCommentLike, select_comment_like } from "./like.select";


export interface ISelectComment { 
    id: boolean,
    user_id: boolean,
    user: { select: ISelectUser },
    post_id: boolean,
    post: boolean,
    likes: { select: ISelectCommentLike },
    text: boolean,
    image: boolean,
    audio: boolean,
    video: boolean,
    created_at: boolean,
    updated_at: boolean
}

export const select_comment: ISelectComment = {
    id: true,
    user_id: true,
    user: { select: select_user },
    post_id: true,
    post: false,
    likes: { select: select_comment_like },
    text: true,
    image: true,
    audio: true,
    video: true,
    created_at: true,
    updated_at: true
}