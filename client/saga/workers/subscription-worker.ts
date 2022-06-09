import { put } from 'redux-saga/effects';
import { create_subscription, delete_subscription, set_all_subscriptions, set_subscription } from '../../store/actions/subscription';
import { ISubscription } from '../../store/types/subscription';


export function* set_all_subscriptions_worker(payload: ISubscription[]): Generator<any>
{
    yield put(set_all_subscriptions(payload));
}

export function* set_subscription_worker(payload: ISubscription): Generator<any>
{
    yield put(set_subscription(payload));
}

export function* create_subscription_worker(payload: ISubscription): Generator<any>
{
    yield put(create_subscription(payload));
}

export function* delete_subscription_worker(payload: string): Generator<any>
{
    yield put(delete_subscription(payload));
}