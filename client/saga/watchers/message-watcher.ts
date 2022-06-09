import { takeEvery } from "redux-saga/effects";
import { MessageActionTypes } from "../../store/types/message";
import { ReactionActionTypes } from "../../store/types/reaction";
import { create_message_worker, delete_message_worker, 
        set_all_messages_worker, set_message_worker, 
        set_reaction_worker } from "../workers/message-worker";


export function* message_watcher(): Generator<any>
{
    yield takeEvery<any>(MessageActionTypes.ASYNC_SET_ALL_MESSAGES, set_all_messages_worker);
    yield takeEvery<any>(MessageActionTypes.ASYNC_SET_MESSAGE, set_message_worker);
    yield takeEvery<any>(MessageActionTypes.ASYNC_CREATE_MESSAGE, create_message_worker);
    // yield takeEvery<any>(MessageActionTypes.ASYNC_UPDATE_MESSAGE, update_message_worker);
    yield takeEvery<any>(MessageActionTypes.ASYNC_DELETE_MESSAGE, delete_message_worker);
    yield takeEvery<any>(ReactionActionTypes.ASYNC_SET_REACTION, set_reaction_worker);
}