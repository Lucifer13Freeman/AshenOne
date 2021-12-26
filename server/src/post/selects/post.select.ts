import { ISelectGroup } from "src/group/selects/group.select";
import { ISelectUser, select_user } from "src/user/selects/user.select";
import { ISelectComment, select_comment } from "./comment.select";
import { ISelectPostLike, select_post_like } from "./like.select";


export interface ISelectPost { 
    id: boolean;
    user_id: boolean;
    user: { select: ISelectUser };
    group_id: boolean;
    group: boolean;//{ select: ISelectGroup };
    comments: { select: ISelectComment };
    likes: { select: ISelectPostLike };
    views: boolean;
    text: boolean;
    image: boolean;
    audio: boolean;
    video: boolean;
    created_at: boolean;
    updated_at: boolean;
}

export const select_post: ISelectPost = { 
    id: true,
    user_id: true,
    user: { select: select_user },
    group_id: true,
    group: false,
    comments: { select: select_comment },
    likes: { select: select_post_like },
    views: true,
    text: true,
    image: true,
    audio: true,
    video: true,
    created_at: true,
    updated_at: true
}