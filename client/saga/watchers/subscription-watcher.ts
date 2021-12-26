import { takeEvery } from "redux-saga/effects";
import { SubscriptionsActionTypes } from "../../types/subscription";
import { create_subscription_worker, delete_subscription_worker, 
        get_all_subscriptions_worker, get_subscription_worker } from "../workers/subscription-worker";


export function* subscription_watcher(): Generator<any>
{
    yield takeEvery<any>(SubscriptionsActionTypes.ASYNC_GET_ALL_SUBSCRIPTIONS, get_all_subscriptions_worker);
    yield takeEvery<any>(SubscriptionsActionTypes.ASYNC_GET_SUBSCRIPTION, get_subscription_worker);
    yield takeEvery<any>(SubscriptionsActionTypes.ASYNC_CREATE_SUBSCRIPTION, create_subscription_worker);
    yield takeEvery<any>(SubscriptionsActionTypes.ASYNC_DELETE_SUBSCRIPTION, delete_subscription_worker);
}