import { takeEvery } from "redux-saga/effects";
import { PostActionTypes } from "../../types/post";
import { create_post_worker, 
        delete_post_worker, 
        get_all_posts_worker, 
        get_post_worker, 
        like_post_worker, 
        update_post_worker } from "../workers/post-worker";


export function* post_watcher(): Generator<any>
{
    yield takeEvery<any>(PostActionTypes.ASYNC_GET_ALL_POSTS, get_all_posts_worker);
    yield takeEvery<any>(PostActionTypes.ASYNC_GET_POST, get_post_worker);
    yield takeEvery<any>(PostActionTypes.ASYNC_CREATE_POST, create_post_worker);
    yield takeEvery<any>(PostActionTypes.ASYNC_LIKE_POST, like_post_worker);
    yield takeEvery<any>(PostActionTypes.ASYNC_UPDATE_POST, update_post_worker);
    yield takeEvery<any>(PostActionTypes.ASYNC_DELETE_POST, delete_post_worker);
}