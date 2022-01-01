import { takeEvery } from "redux-saga/effects";
import { InviteActionTypes } from "../../types/invite";
import { create_invite_worker, 
        delete_invite_worker, 
        set_all_invites_worker, 
        set_invite_worker, 
        /*set_sent_invites_worker*/} from "../workers/invite-worker";


export function* invite_watcher(): Generator<any>
{
    yield takeEvery<any>(InviteActionTypes.ASYNC_SET_ALL_INVITES, set_all_invites_worker);
    // yield takeEvery<any>(InviteActionTypes.ASYNC_SET_SENT_INVITES, set_sent_invites_worker);
    yield takeEvery<any>(InviteActionTypes.ASYNC_SET_INVITE, set_invite_worker);
    yield takeEvery<any>(InviteActionTypes.ASYNC_CREATE_INVITE, create_invite_worker);
    yield takeEvery<any>(InviteActionTypes.ASYNC_DELETE_INVITE, delete_invite_worker);
}