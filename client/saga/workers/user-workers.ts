import { put } from 'redux-saga/effects';
import { set_all_users, set_user } from '../../store/actions/user';
import { IUser } from '../../types/user';


export function* set_all_users_worker(payload: IUser[]): Generator<any>
{
    yield put(set_all_users(payload));
}

export function* set_user_worker(payload: IUser): Generator<any>
{
    yield put(set_user(payload));
}