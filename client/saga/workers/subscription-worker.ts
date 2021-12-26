import { put } from 'redux-saga/effects';
import { create_subscription, delete_subscription, get_all_subscriptions, get_subscription } from '../../store/actions/subscription';
import { ISubscription } from '../../types/subscription';


export function* get_all_subscriptions_worker(payload: ISubscription[]): Generator<any>
{
    yield put(get_all_subscriptions(payload));
}

export function* get_subscription_worker(payload: ISubscription): Generator<any>
{
    yield put(get_subscription(payload));
}

export function* create_subscription_worker(payload: ISubscription): Generator<any>
{
    yield put(create_subscription(payload));
}

export function* delete_subscription_worker(payload: string): Generator<any>
{
    yield put(delete_subscription(payload));
}