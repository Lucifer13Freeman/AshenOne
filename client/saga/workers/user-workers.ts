import { put } from 'redux-saga/effects';
import { get_all_users, get_user } from '../../store/actions/user';
import { IUser } from '../../types/user';


export function* get_all_users_worker(payload: IUser[]): Generator<any>
{
    yield put(get_all_users(payload));
}

export function* get_user_worker(payload: IUser): Generator<any>
{
    yield put(get_user(payload));
}