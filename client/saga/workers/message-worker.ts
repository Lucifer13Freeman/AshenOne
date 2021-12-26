import { put } from 'redux-saga/effects';
import { create_message, delete_message, get_all_messages, get_message, update_message } from '../../store/actions/message';
import { IMessage } from '../../types/message';


export function* get_all_messages_worker(payload: IMessage[]): Generator<any>
{
    yield put(get_all_messages(payload));
}

export function* get_message_worker(payload: IMessage): Generator<any>
{
    yield put(get_message(payload));
}

export function* create_message_worker(payload: IMessage): Generator<any>
{
    yield put(create_message(payload));
}

export function* update_message_worker(payload: IMessage): Generator<any>
{
    yield put(update_message(payload));
}

export function* delete_message_worker(payload: string): Generator<any>
{
    yield put(delete_message(payload));
}