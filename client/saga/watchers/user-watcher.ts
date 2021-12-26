import { takeEvery } from "redux-saga/effects";
import { UserActionTypes } from "../../types/user";
import { get_all_users_worker, get_user_worker } from "../workers/user-workers";


export function* user_watcher(): Generator<any>
{
    yield takeEvery<any>(UserActionTypes.ASYNC_GET_ALL_USERS, get_all_users_worker);
    yield takeEvery<any>(UserActionTypes.ASYNC_GET_USER, get_user_worker);
}