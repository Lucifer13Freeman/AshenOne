import { takeEvery } from "redux-saga/effects";
import { GroupActionTypes } from "../../types/group";
import { create_group_worker, set_all_groups_worker,
        set_group_worker, leave_group_worker } from "../workers/group-worker";


export function* group_watcher(): Generator<any>
{
    yield takeEvery<any>(GroupActionTypes.ASYNC_SET_ALL_GROUPS, set_all_groups_worker);
    yield takeEvery<any>(GroupActionTypes.ASYNC_SET_GROUP, set_group_worker);
    yield takeEvery<any>(GroupActionTypes.ASYNC_LEAVE_GROUP, leave_group_worker);
    yield takeEvery<any>(GroupActionTypes.ASYNC_CREATE_GROUP, create_group_worker);
}