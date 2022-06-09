import { put } from 'redux-saga/effects';
import { create_invite, delete_invite, 
        set_all_invites, set_invite/*, set_sent_invites*/ } from '../../store/actions/invite';
import { IInvite } from '../../store/types/invite';


export function* set_all_invites_worker(payload: IInvite[]): Generator<any>
{
    yield put(set_all_invites(payload));
}

// export function* set_sent_invites_worker(payload: IInvite[]): Generator<any>
// {
//     yield put(set_sent_invites(payload));
// }

export function* set_invite_worker(payload: IInvite): Generator<any>
{
    yield put(set_invite(payload));
}

export function* create_invite_worker(payload: IInvite): Generator<any>
{
    yield put(create_invite(payload));
}

export function* delete_invite_worker(payload: string): Generator<any>
{
    yield put(delete_invite(payload));
}