import { put } from 'redux-saga/effects';
import { create_group, set_all_groups, 
    set_group, leave_group, delete_group } from '../../store/actions/group';
import { IGroup } from '../../store/types/group';


export function* set_all_groups_worker(payload: IGroup[]): Generator<any>
{
    yield put(set_all_groups(payload));
}

export function* set_group_worker(payload: IGroup): Generator<any>
{
    yield put(set_group(payload));
}

export function* create_group_worker(payload: IGroup): Generator<any>
{
    yield put(create_group(payload));
}

export function* leave_group_worker(payload: IGroup): Generator<any>
{
    yield put(leave_group(payload));
}

export function* delete_group_worker(payload: string): Generator<any>
{
    yield put(delete_group(payload));
}