import { takeEvery } from "redux-saga/effects";
import { SubscriptionsActionTypes } from "../../types/subscription";
import { create_subscription_worker, delete_subscription_worker, 
        set_all_subscriptions_worker, set_subscription_worker } from "../workers/subscription-worker";


export function* subscription_watcher(): Generator<any>
{
    yield takeEvery<any>(SubscriptionsActionTypes.ASYNC_SET_ALL_SUBSCRIPTIONS, set_all_subscriptions_worker);
    yield takeEvery<any>(SubscriptionsActionTypes.ASYNC_SET_SUBSCRIPTION, set_subscription_worker);
    yield takeEvery<any>(SubscriptionsActionTypes.ASYNC_CREATE_SUBSCRIPTION, create_subscription_worker);
    yield takeEvery<any>(SubscriptionsActionTypes.ASYNC_DELETE_SUBSCRIPTION, delete_subscription_worker);
}