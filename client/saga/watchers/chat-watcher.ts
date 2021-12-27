import { takeEvery } from "redux-saga/effects";
import { ChatActionTypes } from "../../types/chat";
import { create_chat_worker, set_all_chats_worker, set_chat_worker, leave_chat_worker } from "../workers/chat-worker";


export function* chat_watcher(): Generator<any>
{
    yield takeEvery<any>(ChatActionTypes.ASYNC_SET_ALL_CHATS, set_all_chats_worker);
    yield takeEvery<any>(ChatActionTypes.ASYNC_SET_CHAT, set_chat_worker);
    yield takeEvery<any>(ChatActionTypes.ASYNC_LEAVE_CHAT, leave_chat_worker);
    yield takeEvery<any>(ChatActionTypes.ASYNC_CREATE_CHAT, create_chat_worker);
}