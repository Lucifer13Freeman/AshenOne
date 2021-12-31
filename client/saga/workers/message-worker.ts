import { put } from 'redux-saga/effects';
import { create_message, delete_message, 
        set_all_messages, set_message, set_reaction } from '../../store/actions/message';
import { IMessage } from '../../types/message';
import { IReaction } from '../../types/reaction';


export function* set_all_messages_worker(payload: IMessage[]): Generator<any>
{
    yield put(set_all_messages(payload));
}

export function* set_message_worker(payload: IMessage): Generator<any>
{
    yield put(set_message(payload));
}

export function* create_message_worker(payload: IMessage): Generator<any>
{
    yield put(create_message(payload));
}

// export function* update_message_worker(payload: IMessage): Generator<any>
// {
//     yield put(update_message(payload));
// }

export function* delete_message_worker(payload: string): Generator<any>
{
    yield put(delete_message(payload));
}

export function* set_reaction_worker(payload: IReaction): Generator<any>
{
    yield put(set_reaction(payload));
}