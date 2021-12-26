import { takeEvery } from "redux-saga/effects";
import { ChatActionTypes } from "../../types/chat";
import { get_all_chats_worker, get_chat_worker, leave_chat_worker } from "../workers/chat-worker";


export function* chat_watcher(): Generator<any>
{
    yield takeEvery<any>(ChatActionTypes.ASYNC_GET_ALL_CHATS, get_all_chats_worker);
    yield takeEvery<any>(ChatActionTypes.ASYNC_GET_CHAT, get_chat_worker);
    yield takeEvery<any>(ChatActionTypes.ASYNC_LEAVE_CHAT, leave_chat_worker);
}