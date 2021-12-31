import { put } from 'redux-saga/effects';
import { create_chat, set_all_chats, set_chat, 
        leave_chat, 
        delete_chat} from '../../store/actions/chat';
import { IChat } from '../../types/chat';


export function* set_all_chats_worker(payload: IChat[]): Generator<any>
{
    yield put(set_all_chats(payload));
}

export function* set_chat_worker(payload: IChat): Generator<any>
{
    yield put(set_chat(payload));
}

export function* create_chat_worker(payload: IChat): Generator<any>
{
    yield put(create_chat(payload));
}

export function* leave_chat_worker(payload: IChat): Generator<any>
{
    yield put(leave_chat(payload));
}

export function* delete_chat_worker(payload: string): Generator<any>
{
    yield put(delete_chat(payload));
}