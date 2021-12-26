import { takeEvery } from "redux-saga/effects";
import { GroupActionTypes } from "../../types/groups";
import { get_all_groups_worker, get_group_worker } from "../workers/group-worker";


export function* group_watcher(): Generator<any>
{
    yield takeEvery<any>(GroupActionTypes.ASYNC_GET_ALL_GROUPS, get_all_groups_worker);
    yield takeEvery<any>(GroupActionTypes.ASYNC_GET_GROUP, get_group_worker);
}