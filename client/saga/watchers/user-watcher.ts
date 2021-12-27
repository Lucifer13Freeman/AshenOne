import { takeEvery } from "redux-saga/effects";
import { UserActionTypes } from "../../types/user";
import { set_all_users_worker, set_user_worker } from "../workers/user-workers";


export function* user_watcher(): Generator<any>
{
    yield takeEvery<any>(UserActionTypes.ASYNC_SET_ALL_USERS, set_all_users_worker);
    yield takeEvery<any>(UserActionTypes.ASYNC_SET_USER, set_user_worker);
}