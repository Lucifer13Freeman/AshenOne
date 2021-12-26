import { takeEvery } from "redux-saga/effects";
import { CommentActionTypes } from "../../types/comment";
import { create_comment_worker, 
        delete_comment_worker, 
        get_all_comments_worker, 
        get_comment_worker, 
        like_comment_worker, 
        update_comment_worker } from "../workers/comment-worker";


export function* comment_watcher(): Generator<any>
{
    yield takeEvery<any>(CommentActionTypes.ASYNC_GET_ALL_COMMENTS, get_all_comments_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_GET_COMMENT, get_comment_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_CREATE_COMMENT, create_comment_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_LIKE_COMMENT, like_comment_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_UPDATE_COMMENT, update_comment_worker);
    yield takeEvery<any>(CommentActionTypes.ASYNC_DELETE_COMMENT, delete_comment_worker);
}