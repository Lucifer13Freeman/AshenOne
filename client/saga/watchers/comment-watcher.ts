import { takeEvery } from "redux-saga/effects";
import { CommentActionTypes } from "../../types/comment";
import { create_comment_worker, 
        delete_comment_worker, 
        set_all_comments_worker, 
        set_comment_worker, 
        like_comment_worker } from "../workers/comment-worker";


export function* comment_watcher(): Generator<any>
{
    yield takeEvery<any>(CommentActionTypes.ASYNC_SET_ALL_COMMENTS, set_all_comments_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_SET_COMMENT, set_comment_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_CREATE_COMMENT, create_comment_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_LIKE_COMMENT, like_comment_worker);
    // yield takeEvery<any>(CommentActionTypes.ASYNC_UPDATE_COMMENT, update_comment_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_DELETE_COMMENT, delete_comment_worker);
}