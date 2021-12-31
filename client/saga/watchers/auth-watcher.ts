import { takeEvery, takeLatest } from "redux-saga/effects";
import { AuthActionTypes } from "../../types/auth";
import { login_worker, logout_worker } from "../workers/auth-workers";


export function* auth_watcher(): Generator<any>
{
    //yield takeEvery<any>(AuthActionTypes.ASYNC_LOGIN, login_worker);
    yield takeLatest<any>(AuthActionTypes.ASYNC_LOGIN, login_worker);
    yield takeEvery(AuthActionTypes.ASYNC_LOGOUT, logout_worker);
}