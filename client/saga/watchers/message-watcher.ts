import { takeEvery } from "redux-saga/effects";
import { MessageActionTypes } from "../../types/message";
import { create_message_worker, delete_message_worker, 
        get_all_messages_worker, get_message_worker, 
        update_message_worker } from "../workers/message-worker";


export function* message_watcher(): Generator<any>
{
    yield takeEvery<any>(MessageActionTypes.ASYNC_GET_ALL_MESSAGES, get_all_messages_worker);
    yield takeEvery<any>(MessageActionTypes.ASYNC_GET_MESSAGE, get_message_worker);
    yield takeEvery<any>(MessageActionTypes.ASYNC_CREATE_MESSAGE, create_message_worker);
    yield takeEvery<any>(MessageActionTypes.ASYNC_UPDATE_MESSAGE, update_message_worker);
    yield takeEvery<any>(MessageActionTypes.ASYNC_DELETE_MESSAGE, delete_message_worker);
}