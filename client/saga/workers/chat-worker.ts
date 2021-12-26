import { put } from 'redux-saga/effects';
import { get_all_chats, get_chat, leave_chat } from '../../store/actions/chat';
import { IChat } from '../../types/chat';


export function* get_all_chats_worker(payload: IChat[]): Generator<any>
{
    yield put(get_all_chats(payload));
}

export function* get_chat_worker(payload: IChat): Generator<any>
{
    yield put(get_chat(payload));
}

export function* leave_chat_worker(payload: IChat): Generator<any>
{
    yield put(leave_chat(payload));
}