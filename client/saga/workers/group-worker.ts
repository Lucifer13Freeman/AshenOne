import { put } from 'redux-saga/effects';
import { get_all_groups, get_group } from '../../store/actions/group';
import { IGroup } from '../../types/groups';


export function* get_all_groups_worker(payload: IGroup[]): Generator<any>
{
    yield put(get_all_groups(payload));
}

export function* get_group_worker(payload: IGroup): Generator<any>
{
    yield put(get_group(payload));
}